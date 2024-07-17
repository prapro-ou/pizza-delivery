import { makeScene } from "./scene/special/sceneSettings.mjs";
import { convertToKey, parseJSONData } from "./dataObject/cookieKeysSettings.mjs";

// Cookie操作をするためのクラス
class CookieHandler {
    // Cookieに保存する関数
    save(cookieKey, value) {
        const key = convertToKey(cookieKey);
        let jsonData = JSON.stringify(value);
        jsonData = encodeURIComponent(jsonData);
        document.cookie = `${key}=${jsonData}; path=/;`;
    }

    // Cookieから読み込む関数
    load(cookieKey) {
        const cookieArray = document.cookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            const [key, value] = cookieArray[i].trim().split('=');
            if (key == convertToKey(cookieKey)) {
                const jsonData = decodeURIComponent(value);
                const data = JSON.parse(jsonData);
                return parseJSONData(cookieKey, data);
            }
        }
        return null;
    }
}

// シーンの生成と画面遷移を行うクラス
export class SceneRouter {
    constructor(canvas) {
        this.currentScene = null;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = canvas.clientWidth;
        this.canvas.height = canvas.clientHeight;
        this.sharedData = {}; // 状態を保持するオブジェクト

        // Canvas内がクリックされたら didTap を呼び出す
        this.canvas.addEventListener("click", function(e) {
            if (this.currentScene && this.currentScene.didTap) {
                const pos = this.getCanvasMousePosition(e);
                this.currentScene.didTap(pos.x, pos.y);
            }
        }.bind(this));

        // マウスに関する情報を追跡する
        this.mouse = {
            startX: 0,
            startY: 0,
            x: 0,
            y: 0,
            isDown: false
        };
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

        // キーに関する情報を追跡する
        this.pressedKeys = new Set();
        document.addEventListener("keydown", function(e) {
            this.pressedKeys.add(e.key)
        }.bind(this));
        document.addEventListener("keyup", function(e) {
            this.pressedKeys.delete(e.key)
        }.bind(this));

        this.cookieHandler = new CookieHandler();
    }

    // 画面遷移の処理
    changeScene(newScene, data = {}) {
        if (this.currentScene) {
            this.currentScene.sceneWillDisappear();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        this.sharedData = { ...this.sharedData, ...data };
        this.currentScene = makeScene(newScene, this, this.sharedData)
        this.currentScene.sceneWillAppear();
    }

    // Cookieに読み込み
    save(cookieKey, value) {
        this.cookieHandler.save(cookieKey, value)
    }

    // Cookieから読み込み
    load(cookieKey) {
        return this.cookieHandler.load(cookieKey);
    }

    // 内部状態などの更新処理。フレームごとに呼び出される
    updateStates(deltaTime) {
        if (this.currentScene) {
            this.currentScene.updateStates(deltaTime, this.mouse, this.pressedKeys);
        }
    }

    // 画面の描画処理。フレームごとに呼び出される
    render() {
        if (this.currentScene) {
            this.currentScene.render(this.ctx);
        }
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
}
