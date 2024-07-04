import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";

export class ArasujiScene extends Scene {
    updateStates(deltaTime) {
        // 更新処理が必要な場合に実装
    }

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.fillStyle = "lightblue";
        ctx.fillRect(0, 0, max_x, max_y);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText("あらすじ画面", 50, 50);

        if (this.sharedData.fromTitle) {
            ctx.fillText("タイトル画面から来ました", 50, 100);
        }
    }
}
