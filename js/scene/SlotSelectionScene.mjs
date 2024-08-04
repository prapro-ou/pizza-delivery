import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { resource } from '../resource.mjs';
import { endingName } from '../gameObject/endings.mjs';
import { cookieKeys } from '../dataObject/cookieKeysSettings.mjs';
import { Slot } from '../dataObject/Slot.mjs';

// セーブデータ選択画面
// - 出力
//   - this.sharedData.playingSlotIndex: 現在プレイしているスロット番号
export class SlotSelectionScene extends Scene {
    sceneWillAppear(){
        this.sceneRouter.setBGM(resource.bgm.MusMusBGM103);
        this.slotButtonAreas = [];
    }

    updateStates(deltaTime){}

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.fillStyle = "pink";
        ctx.fillRect(0, 0, max_x, max_y);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText("セーブ選択画面", 50, 50);

        //タイトルに戻る
        let r = { x: max_x / 2 - 100, y: max_y - 100, w: 200, h: 50 };
        this.backButtonArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("タイトルに戻る", r.x + r.w / 2, r.y + r.h / 2);


        for( let i = 0; i < 4 ; i++ ){   
            let r = { x: max_x/2 -100, y: max_y/2 -200 + 100*i, w: 200, h: 50 };
            this.slotButtonAreas.push(r);
            ctx.fillStyle = "blue";
            ctx.fillRect(r.x, r.y, r.w, r.h);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`セーブデータ${i+1}`, r.x + r.w / 2, r.y + r.h / 2);

            r = { x: max_x/2 -100, y: max_y/2 -200 + 100*i, w: 200, h: 50 };
            ctx.fillStyle = "black";
            ctx.font = "20px Arial";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";

            const slots = this.sceneRouter.load(cookieKeys.slots);
            let slot = slots[i + 1] ?? new Slot();
            const endingNameToDisplay = endingName[slot.ending] ?? "";
            ctx.fillText(endingNameToDisplay, r.x + r.w / 2 + 130, r.y + r.h / 2);

        }
    }

    didTap(x, y){
        //タイトルに戻る
        let r = this.backButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapBack();
        }
        //各セーブデータ
        for ( let i = 0; i < 4; i++ ){
            let r = this.slotButtonAreas[i];
            if (r && x >= r.x && x <= r.x+r.w && y >= r.y && y <= r.y+r.h) {
                this.didTapSlot(i + 1);
            }
        }   
    }

    //タイトルに戻るが押されたとき
    didTapBack(){
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(scenes.title);
    }

    //各セーブデータが押されたとき
    didTapSlot(slotIndex) {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sharedData.playingSlotIndex = slotIndex;
        this.sceneRouter.changeScene(scenes.stageSelection);
    }
}
