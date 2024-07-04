import { makeScene } from "./scene/special/sceneSettings.mjs";

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
                const x = e.offsetX;
                const y = e.offsetY;
                this.currentScene.didTap(x, y);
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
            let rect = e.target.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        }.bind(this));
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

    // 内部状態などの更新処理。フレームごとに呼び出される
    updateStates(deltaTime) {
        if (this.currentScene) {
            this.currentScene.updateStates(deltaTime, this.mouse);
        }
    }

    // 画面の描画処理。フレームごとに呼び出される
    render() {
        if (this.currentScene) {
            this.currentScene.render(this.ctx);
        }
    }
}
