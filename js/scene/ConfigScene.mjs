import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";

// 設定画面
export class ConfigScene extends Scene {
    sceneWillAppear() {
        this.backButtonArea = null;
        this.volumeButtonArea = null;
        this.seButtonArea = null;
    }

    updateStates(deltaTime) {}

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.fillStyle = "lightblue";
        ctx.fillRect(0, 0, max_x, max_y);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText("設定画面", 50, 50);

        // タイトルに戻るボタン
        let r = { x: max_x - 200, y: max_y - 100, w: 200, h: 50 };
        this.backButtonArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("タイトルに戻る", r.x + r.w / 2, r.y + r.h / 2);

        // 音量ボタン
        r = { x: max_x / 2 - 100, y: max_y / 2 - 25, w: 200, h: 50 };
        this.volumeButtonArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("音量 on/off", r.x + r.w / 2, r.y + r.h / 2);

        // SEボタン
        r = { x: max_x / 2 - 100, y: max_y / 2 + 50, w: 200, h: 50 };
        this.seButtonArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("SE on/off", r.x + r.w / 2, r.y + r.h / 2);
    }

    sceneWillDisappear() {}

    // 画面内のどこかがタップされた
    didTap(x, y) {
        let r = this.backButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapBack();
        }
        r = this.volumeButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapVolume();
        }
        r = this.seButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapSe();
        }
    }

    // 「タイトルに戻る」ボタンがタップされた
    didTapBack() {
        this.sceneRouter.changeScene(scenes.title);
    }

    // 音量ボタンがタップされた
    didTapVolume() {
        console.log("didTapVolume");
    }

    // SEボタンがタップされた
    didTapSe() {
        console.log("didTapSe");
    }
}
