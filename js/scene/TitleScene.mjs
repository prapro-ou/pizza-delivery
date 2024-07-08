import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";

export class TitleScene extends Scene {
    updateStates(deltaTime) {}

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.fillStyle = "silver";
        ctx.fillRect(0, 0, max_x, max_y);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText("タイトル画面", 50, 50);

        let r = { x: max_x / 2 - 100, y: max_y / 2 - 75, w: 200, h: 50 };
        this.startFromBeginningButtonArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("最初から始める", r.x + r.w / 2, r.y + r.h / 2);

        r = { x: max_x / 2 - 100, y: max_y / 2 + 25, w: 200, h: 50 };
        this.continueButtonArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("続きから始める", r.x + r.w / 2, r.y + r.h / 2);

        r = { x: max_x / 2 - 100, y: max_y / 2 + 125, w: 200, h: 50 };
        this.configButtonArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("設定画面", r.x + r.w / 2, r.y + r.h / 2);

        
        r = { x: max_x / 2 + 100 , y: max_y / 2 + 225, w: 200, h: 50 };
        this.endingCollectionButtonArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("エンディング集", r.x + r.w / 2, r.y + r.h / 2);
    }

    didTap(x, y) {
        let r = this.startFromBeginningButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.sceneRouter.changeScene(scenes.arasuji);
        }
        r = this.continueButtonArea;
        if (r && x >= r.x && x <= r.x+r.w && y >= r.y && y <= r.y+r.h) {
            this.sceneRouter.changeScene(scenes.slotSelection);
        }
        r = this.configButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.sceneRouter.changeScene(scenes.config);
        }
        r = this.endingCollectionButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.sceneRouter.changeScene(scenes.endingCollection);
        }
    }
}
