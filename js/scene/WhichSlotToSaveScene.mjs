import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { cookieKeys } from '../dataObject/cookieKeysSettings.mjs';
import { StageResult } from '../dataObject/StageResult.mjs';
import { Slot } from '../dataObject/Slot.mjs';

// どのスロットにセーブするかを選択する画面
// - 入力
//   ^ this.sharedData.playingSlotIndex: 現在プレイしているスロット番号
//   - this.sharedData.stage: ステージ
//   - this.sharedData.score: スコア
//   - this.sharedData.cookedPizza: 作ったピザ
//   - this.sharedData.goalTime: タイム
//   - this.sharedData.collectedIngredients: 集めた食材の配列
//   - this.sharedData.gameOverCount: ゲームオーバーした回数
//   - this.sharedData.collisionCount: 障害物に衝突した回数
export class WhichSlotToSaveScene extends Scene{
    sceneWillAppear(){
        this.slotToSaveButtonAreas = [];
    }

    updateStates(deltaTime){}

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.fillStyle = "pink"
        ctx.fillRect(0, 0, max_x, max_y);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText("セーブ上書きシーン", 50, 50)

        for( let i = 0; i < 4 ; i++ ){
            let r = { x: max_x/2 -100, y: max_y/2 -150 + 100*i, w: 200, h: 50 };
            this.slotToSaveButtonAreas.push(r);
            ctx.fillStyle = "blue";
            ctx.fillRect(r.x, r.y, r.w, r.h);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`セーブデータ${i+1}`, r.x + r.w / 2, r.y + r.h / 2);
        }
    }

    didTap(x, y){
        for ( let i = 0; i < 4; i++ ){
            let r = this.slotToSaveButtonAreas[i];
            if (r && x >= r.x && x <= r.x+r.w && y >= r.y && y <= r.y+r.h) {
                this.didTapSlot(i + 1);
            }
        }
    }

    didTapSlot(slotIndex) {
        const stageResult = new StageResult(
            this.sharedData.stage.stageNumber,
            this.sharedData.score,
            this.sharedData.cookedPizza,
            this.sharedData.goalTime,
            this.sharedData.gameOverCount,
            this.sharedData.collisionCount,
            this.sharedData.collectedIngredients,
        )
        const slots = this.sceneRouter.load(cookieKeys.slots);
        const playingIndex = this.sharedData.playingSlotIndex;
        let slot = slots[playingIndex] ?? new Slot();
        slots[slotIndex] = slot.withAddedStageResult(stageResult);

        this.sceneRouter.save(cookieKeys.slots, slots);
        this.sceneRouter.changeScene(scenes.stageSelection);
    }
}
