import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { resource } from '../resource.mjs';
import { stages } from '../stage/stages.mjs';

// ステージ選択画面
// - 出力
//   - this.sharedData.stage: ステージ
//   - this.sharedData.gameOverCount: ゲームオーバーした回数 (0に初期化)
export class StageSelectionScene extends Scene {
    sceneWillAppear() {
        this.sceneRouter.setBGM(resource.bgm.MusMusBGM103);
        this.stageButtonAreas = null;
        this.goToEndingButtonArea = null;
        this.pizzaCollectionArea = null;
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
        for (let i = 0; i < 5; i++) {
            let r = { x: 150, y: 100*(i+1), w: 100, h: 50 };
            this.stageButtonAreas.push(r);
            ctx.fillStyle = "blue";
            ctx.fillRect(r.x, r.y, r.w, r.h);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`ステージ${i+1}`, r.x + r.w / 2, r.y + r.h / 2);
        }

        let r = { x: 600, y: 550, w: 150, h: 50 };
        this.goToEndingButtonArea = r;
        ctx.fillStyle = "lightblue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("エンディングへ", r.x + r.w / 2, r.y + r.h / 2);

        r = { x: 500, y: 150, w: 240, h: 50 };
        this.pizzaCollectionArea = r;
        ctx.fillStyle = "pink";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("ピザコレクション画面へ", r.x + r.w / 2, r.y + r.h / 2);

        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText("選択中のスロット : " + this.sharedData.playingSlotIndex, max_x - 20, 30);
    }

    didTap(x, y) {
        for (let i = 0; i < 5; i++) {
            const r = this.stageButtonAreas[i];
            if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
                this.didTapStage(i + 1);
            }
        }

        let r = this.goToEndingButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapEnding();
        }
        
        r = this.pizzaCollectionArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.sceneRouter.playSE(resource.se.clickEffect);
            this.sharedData.previousScene = scenes.stageSelection;
            this.sceneRouter.changeScene(scenes.pizzaCollection);
            
        }

    }

    didTapStage(stageIndex) {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.stopBGM();
        this.sharedData.stage = stages[stageIndex];
        this.sharedData.gameOverCount = 0;
        if (this.sharedData.stage) {
            this.sceneRouter.changeScene(scenes.drive);
        } else {
            console.error(`未実装のstageです: ${stageIndex}`)
        }
    }

    didTapEnding(){
        this.sceneRouter.changeScene(scenes.ending);
    }
}
