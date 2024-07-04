import { scenes } from "../enum/scenes.mjs";
import { Renderer } from "../adapter/Renderer.mjs";
import { TapEventListener } from '../adapter/TapEventListener.mjs';

import { TitleScene } from "../scene/TitleScene.mjs";
import { ArasujiScene } from "../scene/ArasujiScene.mjs";
import { SlotSelectionScene } from "../scene/SlotSelectionScene.mjs";

// シーンの生成と画面遷移を行うクラス
export class SceneRouter {
    constructor(canvas) {
        this.currentScene = null;
        this.tapEventListener = new TapEventListener(canvas);
        const ctx = canvas.getContext('2d');
        this.renderer = new Renderer(ctx, canvas.width, canvas.height);
    }

    // 画面遷移の処理
    changeScene(newScene) {
        if (this.currentScene) {
            this.currentScene.destroy();
            this.renderer.clear()
        }
        switch (newScene) {
            case scenes.title:
                this.currentScene = new TitleScene(this.tapEventListener);
                this.currentScene.changeScene = this.changeScene.bind(this);
                this.currentScene.init();
                break;

            case scenes.arasuji:
                this.currentScene = new ArasujiScene();
                this.currentScene.changeScene = this.changeScene.bind(this);
                this.currentScene.init();
                break;

            case scenes.slotSelection:
                this.currentScene = new SlotSelectionScene(this.tapEventListener);
                this.currentScene.changeScene = this.changeScene.bind(this);
                this.currentScene.init();
                break;
        }
    }

    // 内部状態などの更新処理。フレームごとに呼び出される
    update(deltaTime) {
        if (this.currentScene) {
            this.currentScene.update(deltaTime);
        }
    }

    // 画面の描画処理。フレームごとに呼び出される
    render() {
        if (this.currentScene) {
            this.currentScene.render(this.renderer);
        }
    }
}
