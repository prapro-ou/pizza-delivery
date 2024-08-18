import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { resource } from '../resource.mjs';
import { endingName } from '../gameObject/endings.mjs';
import { dataKeys } from '../dataObject/dataKeysSettings.mjs';
import { Slot } from '../dataObject/Slot.mjs';
import { buttonStates, ColorButton } from '../component/Button.mjs';


// セーブデータ選択画面
// - 入力
//   - this.sharedData.slotSelectionMessage: メッセージ
//   - this.sharedData.onSelectSlot: スロットを選択してこの画面が閉じるときに行う処理
//   - this.sharedData.playingSlotIndex: 現在プレイしているスロット番号
export class SlotSelectionScene extends Scene {
    sceneWillAppear(){
        this.setUpUI();
    }

    setUpUI() {
        this.closeButton = new ColorButton({
            [buttonStates.normal]: "rgba(179, 9, 33, 0.75)",
            [buttonStates.hovered]: "rgba(179, 9, 33, 1.0)",
            [buttonStates.clicked]: "rgba(127, 6, 22, 1.0)",
        });
        this.closeButton.onClick = this.onClickClose.bind(this);

        this.slotButtons = [];
        for (let i = 0; i < 4; i++) {
            const slotButton = (i + 1 == this.sharedData.playingSlotIndex) ?
                new ColorButton({
                    [buttonStates.normal]: "rgba(255, 255, 127, 0.7)",
                    [buttonStates.hovered]: "rgba(255, 255, 127, 0.8)",
                    [buttonStates.clicked]: "rgba(204, 204, 102, 0.7)",
                }) :
                new ColorButton({
                    [buttonStates.normal]: "rgba(255, 255, 255, 0.7)",
                    [buttonStates.hovered]: "rgba(255, 255, 255, 0.8)",
                    [buttonStates.clicked]: "rgba(207, 207, 207, 0.7)",
                });
            slotButton.onClick = function() {
                this.onClickSlot(i + 1);
            }.bind(this);
            this.slotButtons.push(slotButton);
        }
    }

    updateStates(deltaTime, mouse) {
        this.closeButton.updateStates(mouse);
        this.slotButtons.forEach((btn) => btn.updateStates(mouse));
    }

    render(ctx) {
        ctx.fillStyle = "rgba(30, 30, 102, 0.7)";
        ctx.fillRect(39, 74, 722, 503);

        this.closeButton.draw(ctx, 690, 74, 71, 71);
        ctx.fillStyle = "white";
        ctx.font = "100px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
        ctx.fillText("×", 696, 145);

        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fillRect(53, 86, 631, 59);
        ctx.fillStyle = "black";
        ctx.font = "34px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(this.sharedData.slotSelectionMessage, 63, 120);

        const slots = this.sceneRouter.load(dataKeys.slots);

        for(let i = 0; i < 4; i++){
            const [x, y, w, h] = [53, 152 + 105 * i, 694, 98];
            this.slotButtons[i].draw(ctx, x, y, w, h);

            ctx.fillStyle = "black";
            ctx.font = "28px Arial";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(`セーブデータ ${i+1}`, x + 5, y + 24);

            if (i + 1 == this.sharedData.playingSlotIndex) {
                ctx.fillStyle = "#7c7c00";
                ctx.font = "bold 28px Arial";
                ctx.textAlign = "right";
                ctx.textBaseline = "middle";
                ctx.fillText("プレイ中", x + w - 6, y + 24);
            }

            ctx.fillStyle = "black";
            ctx.font = "36px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            let overViewText = this.slotOverViewText(slots[i + 1]);
            ctx.fillText(overViewText, x + w / 2, y + h / 2 + 16);
        }
    }

    slotOverViewText(slot) {
        if(!slot){
            return "空きスロット"
        } else if(slot.ending){
            return endingName[slot.ending];
        } else {
            return `ステージ${slot.maxStageNumber()}までクリア`;
        }
    }

    onClickClose(){
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.dismissModal();
    }

    onClickSlot(slotIndex) {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sharedData.onSelectSlot(slotIndex);
    }

}
