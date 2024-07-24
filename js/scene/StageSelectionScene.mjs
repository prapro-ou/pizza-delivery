import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { stages } from '../stage/stages.mjs';

// ステージ選択画面
// - 出力
//   - this.sharedData.stage: ステージ
//   - this.sharedData.gameOverCount: ゲームオーバーした回数 (0に初期化)
export class StageSelectionScene extends Scene {
    sceneWillAppear() {
        this.stageButtonAreas = null;
    }

    updateStates(deltaTime) {}

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.fillStyle = "silver";
        ctx.fillRect(0, 0, max_x, max_y);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText("ステージ選択画面", 50, 50);

        this.stageButtonAreas = [];
        for (let i = 0; i < 4; i++) {
            let r = { x: 150, y: 150+100*i, w: 100, h: 50 };
            this.stageButtonAreas.push(r);
            ctx.fillStyle = "blue";
            ctx.fillRect(r.x, r.y, r.w, r.h);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`ステージ${i+1}`, r.x + r.w / 2, r.y + r.h / 2);
        }
    }

    didTap(x, y) {
        for (let i = 0; i < 4; i++) {
            const r = this.stageButtonAreas[i];
            if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
                this.didTapStage(i + 1);
            }
        }
    }

    didTapStage(stageIndex) {
        this.sharedData.stage = stages[stageIndex];
        this.sharedData.gameOverCount = 0;
        this.sceneRouter.changeScene(scenes.drive);
    }
}
