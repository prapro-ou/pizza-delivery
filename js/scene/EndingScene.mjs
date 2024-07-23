import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";

export class EndingScene extends Scene {
    sceneWillAppear() {
        this.goToTitleButtonArea = null;
    }

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
        ctx.fillText("エンディング", 50, 50);

        let r = { x: 150, y: 550, w: 150, h: 50 };
        this.goToTitleButtonArea = r;
        ctx.fillStyle = "gainsboro";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("タイトルへ戻る", r.x + r.w / 2, r.y + r.h / 2);


    }

    didTap(x, y) {
        const r = this.goToTitleButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapDelivery();
        }
    }

    didTapDelivery() {
        this.sceneRouter.changeScene(scenes.title);
    }

}
