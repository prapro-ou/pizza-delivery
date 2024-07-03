import { Scene } from "./Scene.mjs";
import { scenes } from "../enum/scenes.mjs";

// 設定画面
export class ConfigScene extends Scene {
    constructor(tapEventListener) {
        super();
        this.changeScene = null;
        this.tapEventListener = tapEventListener;
    }

    init() {
        this.tapEventListener.addListener(this.onTap.bind(this));
        this.backButtonRange = null;
        this.volumeButtonRange = null;
        this.seButtonRange = null;
    }

    update(deltaTime) {}

    render(renderer) {
        const { max_x, max_y } = renderer;
        renderer.fillRect("lightblue", 0, 0, max_x, max_y);
        renderer.fillText("設定画面", 50, 50, "black", "left", "50px Arial");

        // タイトルに戻るボタン
        let r = { x: max_x - 200, y: max_y - 100, w: 200, h: 50 };
        renderer.drawButton("タイトルに戻る", r.x, r.y, r.w, r.h, "white", "blue", "20px Arial");
        this.backButtonRange = r;
        // 音量ボタン
        r = { x: max_x / 2 - 100, y: max_y / 2 - 25, w: 200, h: 50 };
        renderer.drawButton("音量 on/off", r.x, r.y, r.w, r.h, "white", "blue", "20px Arial");
        this.volumeButtonRange = r;
        // SEボタン
        r = { x: max_x / 2 - 100, y: max_y / 2 + 50, w: 200, h: 50 };
        renderer.drawButton("SE on/off", r.x, r.y, r.w, r.h, "white", "blue", "20px Arial");
        this.seButtonRange = r;
    }

    destroy() {
        this.tapEventListener.clearListeners();
    }

    // 画面内のどこかがタップされた
    onTap(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        let r = this.backButtonRange;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapBack();
        }
        r = this.volumeButtonRange;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapVolume();
        }
        r = this.seButtonRange;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapSe();
        }
    }

    didTapBack() {
        this.changeScene?.(scenes.title);
    }

    didTapVolume() {
        console.log("didTapVolume");
    }

    didTapSe() {
        console.log("didTapSe");
    }
}
