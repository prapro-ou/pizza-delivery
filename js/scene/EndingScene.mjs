import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { cookieKeys } from '../dataObject/cookieKeysSettings.mjs';
import { endingName, judgeEnding, endingMessage } from '../gameObject/endings.mjs';
import { Slot } from '../dataObject/Slot.mjs';

// エンディング画面
// - 入力
//   - this.sharedData.playingSlotIndex: 現在プレイしているスロット番号
export class EndingScene extends Scene {
    sceneWillAppear() {
        this.goToTitleButtonArea = null;
        const slots = this.sceneRouter.load(cookieKeys.slots);
        const slot = slots[this.sharedData.playingSlotIndex] ?? new Slot();
        this.ending = judgeEnding(slot);
        this.endingMessage = endingMessage[this.ending];
        this.showsResult = false;
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

        ctx.fillStyle = "black";
        ctx.font = "24px Arial";
        ctx.textAlign = "left";
        ctx.fillText("店長「配達ご苦労であった。それにしても君...」", 100, 200);

        if (this.showsResult) {
            ctx.fillStyle = "black";
            ctx.font = "24px Arial";
            ctx.textAlign = "left";
            const lines = this.endingMessage.split("\n");
            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], 100, 200 + 50 * (i + 1));
            }

            // エンディング名
            ctx.fillStyle = "black";
            ctx.font = "24px Arial";
            ctx.textAlign = "center";
            ctx.fillText(`『${endingName[this.ending]}』`, max_x / 2, max_y - 170);

            let r = { x: max_x / 2 - 75, y: max_y - 100, w: 150, h: 50 };
            this.goToTitleButtonArea = r;
            ctx.fillStyle = "blue";
            ctx.fillRect(r.x, r.y, r.w, r.h);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("タイトルへ戻る", r.x + r.w / 2, r.y + r.h / 2);

        } else {
            ctx.fillStyle = "black";
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("（タップして続ける）", 350, 270);
        }
    }

    didTap(x, y) {
        this.showsResult = true;

        const r = this.goToTitleButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapDelivery();
        }
    }

    didTapDelivery() {
        this.sceneRouter.changeScene(scenes.title);
    }

}
