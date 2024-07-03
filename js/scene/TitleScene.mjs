import { Scene } from "./Scene.mjs";
import { scenes } from "../enum/scenes.mjs";

// タイトル画面
export class TitleScene extends Scene {
    constructor(tapEventListener) {
        super();
        this.changeScene = null;
        this.tapEventListener = tapEventListener;
    }

    init() {
        this.tapEventListener.addListener(this.onTap.bind(this));
        this.startFromBeginningButtonRange = null;
    }

    update(deltaTime) {}

    render(renderer) {
        const { max_x, max_y } = renderer;
        renderer.fillRect("silver", 0, 0, max_x, max_y);
        renderer.fillText("タイトル画面", 50, 50, "black", "left", "50px Arial");
        let r = { x: max_x / 2 - 100, y: max_y / 2 - 25, w: 200, h: 50 };
        renderer.drawButton("最初から始める", r.x, r.y, r.w, r.h, "white", "blue", "20px Arial");
        this.startFromBeginningButtonRange = r;
        r = { x: max_x / 2 - 100, y: max_y / 2 + 50, w: 200, h: 50 };
        renderer.drawButton("設定画面", r.x, r.y, r.w, r.h, "white", "blue", "20px Arial");
        this.configButtonRange = r;
    }

    destroy() {
        this.tapEventListener.clearListeners();
    }

    // 画面内のどこかがタップされた
    onTap(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        let r = this.startFromBeginningButtonRange;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapStartFromBeginning();
        }
        r = this.configButtonRange;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapConfig();
        }
    }

    // 「最初から始める」をタップした時の処理
    didTapStartFromBeginning() {
        this.changeScene?.(scenes.arasuji);
    }

    didTapConfig() {
        console.log("didTapConfig");
        this.changeScene?.(scenes.configScene);
    }
}
