import { makeScene } from "./scene/special/sceneSettings.mjs";
import { convertToKey, parseJSONData, defaultValueFor } from "./dataObject/dataKeysSettings.mjs";
import { resource } from "./resource.mjs";
import { dataKeys } from "./dataObject/dataKeysSettings.mjs";

// LocalStorageの操作をするためのクラス
class LocalDBHandler {
    // LocalStorageに保存する関数
    save(dataKey, value) {
        const key = convertToKey(dataKey);
        let jsonData = JSON.stringify(value);
        localStorage.setItem(key, jsonData);
    }

    // LocalStorageから読み込む。データがない場合はnullを返す
    load(dataKey) {
        const key = convertToKey(dataKey);
        const jsonData = localStorage.getItem(key);
        if (jsonData) {
            const data = JSON.parse(jsonData);
            return parseJSONData(dataKey, data);
        }
        return null;
    }
}

// タッチやマウスの操作を読み取ってデータに変換するクラス
class MouseHandler {
    constructor(canvas) {
        this.canvas = canvas;

        // マウスに関する情報を追跡する
        this.mouse = {
            startX: 0,
            startY: 0,
            x: 0,
            y: 0,
            isDown: false
        };
        this.startTrackingMouse();
    }

    listenClick(callback) {
        this.canvas.addEventListener("click", function(e) {
            const pos = this.getCanvasMousePosition(e);
            callback(pos.x, pos.y);
        }.bind(this));
    }

    startTrackingMouse() {
        // マウス操作
        this.canvas.addEventListener("mousedown", function(e) {
            this.mouse.isDown = true;
            this.mouse.startX = this.mouse.x;
            this.mouse.startY = this.mouse.y;
        }.bind(this));
        this.canvas.addEventListener("mouseup", function(e) {
            this.mouse.isDown = false;
        }.bind(this));
        this.canvas.addEventListener('mouseleave', function(e) {
            this.mouse.isDown = false;
        }.bind(this));
        this.canvas.addEventListener("mousemove", function(e) {
            const pos = this.getCanvasMousePosition(e)
            this.mouse.x = pos.x;
            this.mouse.y = pos.y;
        }.bind(this));

        // タッチ操作
        this.canvas.addEventListener("touchstart", function(e) {
            this.mouse.isDown = true;
            const pos = this.getCanvasTouchPosition(e);
            this.mouse.x = pos.x;
            this.mouse.y = pos.y;
            this.mouse.startX = pos.x;
            this.mouse.startY = pos.y;
        }.bind(this));
        this.canvas.addEventListener("touchend", function(e) {
            this.mouse.isDown = false;
        }.bind(this));
        this.canvas.addEventListener("touchcancel", function(e) {
            this.mouse.isDown = false;
        }.bind(this));
        this.canvas.addEventListener("touchmove", function(e) {
            if (!this.mouse.isDown) return;
            const pos = this.getCanvasTouchPosition(e);
            this.mouse.x = pos.x;
            this.mouse.y = pos.y;
        }.bind(this));
    }

    // マウスの位置を計算する
    getCanvasMousePosition(event) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        return { x, y };
    }

    // タッチの位置を計算する
    getCanvasTouchPosition(event) {
        return this.getCanvasMousePosition(event.changedTouches[0]);
    }
}

// キー操作を読み取ってデータに変換するクラス
class KeyHandler {
    constructor() {
        // 現在押されているキーの集合
        this.pressedKeys = new Set();
        this.startTrackingKeys();
    }

    startTrackingKeys() {
        document.addEventListener("keydown", function(e) {
            this.pressedKeys.add(e.key)
        }.bind(this));
        document.addEventListener("keyup", function(e) {
            this.pressedKeys.delete(e.key)
        }.bind(this));
    }
}

// シーンの生成と画面遷移を行うクラス
export class SceneRouter {
    constructor(canvas) {
        this.currentScene = null;
        this.presentingModal = null; // currentSceneの上に覆い被さって表示されるScene
        this.currentBGM = null;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = canvas.clientWidth;
        this.canvas.height = canvas.clientHeight;
        this.sharedData = {}; // 状態を保持するオブジェクト

        this.mouseHandler = new MouseHandler(canvas);
        this.keyHandler = new KeyHandler()
        this.localDBHandler = new LocalDBHandler();

        this.mouseHandler.listenClick(function(x, y) {
            if (this.presentingModal) {
                this.presentingModal.didTap?.(x, y);
            } else if (this.currentScene) {
                this.currentScene.didTap?.(x, y);
            }
        }.bind(this));

        resource.startLoadingAllImages();
    }

    // 画面遷移の処理
    changeScene(newScene) {
        if (this.currentScene) {
            this.currentScene.sceneWillDisappear();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.dismissModal()
        this.currentScene = makeScene(newScene, this, this.sharedData);
        this.currentScene.sceneWillAppear();
    }

    // モーダル画面の表示
    presentModal(scene) {
        this.presentingModal = makeScene(scene, this, this.sharedData);
        this.presentingModal.sceneWillAppear();
    }

    // 開いているモーダルを閉じる
    dismissModal() {
        if (!this.presentingModal) return;
        this.presentingModal.sceneWillDisappear();
        this.presentingModal = null;
    }

    // LocalStorageに書き込み
    save(dataKey, value) {
        if (dataKey == dataKeys.userConfig) {
            this.setBGMVolume(value.bgmVolume);
        }
        this.localDBHandler.save(dataKey, value)
    }

    // LocalStorageから読み込み。データがない場合はデフォルトのデータを保存して返す
    load(dataKey) {
        let value = this.localDBHandler.load(dataKey);
        if (value == null) {
            // LocalStorageにデータが存在しなかった場合はデフォルトの値をセーブ
            value = defaultValueFor(dataKey);
            this.save(dataKey, value);
        }
        return value
    }

    // BGMをセットする
    setBGM(bgm) {
        if (!bgm) {
            this.stopBGM();
        } else if (bgm != this.currentBGM) {
            this.stopBGM();
            const volume = this.load(dataKeys.userConfig).bgmVolume;
            bgm.currentTime = 0;
            bgm.loop = true;
            bgm.volume = volume * 0.1;
            bgm.play();
            this.currentBGM = bgm;
        }
    }

    stopBGM() {
        if (this.currentBGM) {
            this.currentBGM.pause();
            this.currentBGM.currentTime = 0;
        }
        this.currentBGM = null;
    }

    setBGMVolume(volume) {
        if (this.currentBGM) {
            this.currentBGM.volume = volume * 0.1;
        }
    }

    // SEを流す
    playSE(se, loop = false) {
        se.currentTime = 0;
        se.loop = loop;
        se.volume = this.load(dataKeys.userConfig).seVolume * 0.1;
        se.play();
    }

    // SEを止める
    stopSE(se) {
        se.pause();
        se.currentTime = 0;
    }

    // 内部状態などの更新処理。フレームごとに呼び出される
    updateStates(deltaTime) {
        if (this.presentingModal) {
            this.presentingModal.updateStates(deltaTime, this.mouseHandler.mouse, this.keyHandler.pressedKeys);
        } else if (this.currentScene) {
            this.currentScene.updateStates(deltaTime, this.mouseHandler.mouse, this.keyHandler.pressedKeys);
        }
    }

    // 画面の描画処理。フレームごとに呼び出される
    render() {
        if (this.currentScene) {
            this.currentScene.render(this.ctx);
        }
        if (this.presentingModal) {
            this.presentingModal.render(this.ctx);
        }
    }
}
