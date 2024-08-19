import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { resource } from '../resource.mjs';
import { dataKeys } from '../dataObject/dataKeysSettings.mjs';
import { EndingInfo } from '../dataObject/EndingInfo.mjs';
import { endingName, judgeEnding, endingMessage, goodEnding} from '../gameObject/endings.mjs';
import { Slot } from '../dataObject/Slot.mjs';
import { buttonStates, ColorButton } from '../component/Button.mjs';
import { sqbColors, SquareButton } from '../component/SquareButton.mjs';

// エンディング画面
// - 入力
//   - this.sharedData.playingSlotIndex: 現在プレイしているスロット番号
export class EndingScene extends Scene {
    sceneWillAppear() {
        const slots = this.sceneRouter.load(dataKeys.slots);
        const slotIndex = this.sharedData.playingSlotIndex;
        let slot = slots[slotIndex] ?? new Slot();

        this.ending = slot.ending ?? judgeEnding(slot);
        slot.ending = this.ending;
        slots[slotIndex] = slot;
        this.sceneRouter.save(dataKeys.slots, slots);

        const ending = this.sceneRouter.load(dataKeys.endingInfo) ?? new EndingInfo();
        ending.unlock(this.ending);
        this.sceneRouter.save(dataKeys.endingInfo,ending);

        this.endingMessage = endingMessage[this.ending];
        this.showsResult = false;
        this.setUpUI();
    }

    setUpUI(){
        this.nextButton = new ColorButton({
            [buttonStates.normal]: "rgba(0, 0, 0, 0)"
        });
        this.nextButton.onClick = this.onClickNext.bind(this);

        this.goToTitleButton = new SquareButton(sqbColors.green);
        this.goToTitleButton.text = "タイトルへ";
        this.goToTitleButton.scaleFactor = 0.8;
        this.goToTitleButton.onClick = this.onClickGoToTitle.bind(this);
    }

    updateStates(deltaTime, mouse) {
        if (this.showsResult) {
            this.goToTitleButton.updateStates(mouse);
        } else {
            this.nextButton.updateStates(mouse);
        }
    }

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.imageSmoothingEnabled = false;
        const bg = resource.images.woodBackground;
        ctx.drawImage(bg, 0, 0, max_x, max_y);
        const bookBg = resource.images.bookBackground;
        ctx.drawImage(bookBg, 20, 26, bookBg.width, bookBg.height);

        if (this.showsResult) {
            this.goToTitleButton.draw(ctx, 285, 537);
        } else {
            this.nextButton.draw(ctx, 0, 0, max_x, max_y);
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseLine = "middle";
            ctx.fillText("ー 画面をクリックして続きを読む ー", max_x / 2, max_y - 50);
        }

        this.renderPage(ctx, 1, 42, 30, 350, 471);
        this.renderPage(ctx, 2, 408, 30, 350, 471);
    }

    renderPage(ctx, page, x, y, width, height) {
        const titles = ["エンディング (1/2)", "エンディング (2/2)"]
        ctx.fillStyle = "black";
        ctx.font = "28px Arial";
        ctx.textAlign = "left";
        ctx.textBaseLine = "middle";
        ctx.fillText(titles[page - 1], x + 18, y + 42);

        ctx.fillStyle = "black";
        ctx.font = "15.5px Arial";
        ctx.textAlign = "left";
        ctx.textBaseLine = "middle";
        ctx.imageSmoothingEnabled = true;
        let lines;
        switch (page) {
            case 1:
                lines = [
                    "配達を終えた主人公は店に戻った。",
                    "",
                    "主人公",
                    "「配達終わりました」",
                    "",
                    "店長",
                    "「うむ。ご苦労であった」",
                    "",
                    "主人公",
                    "「食材を盗んだ犯人は見つかりましたか？」",
                    "",
                    "店長",
                    "「いや。一応警察に連絡したんだが」",
                    "",
                    "主人公",
                    "「そうですか」",
                    "",
                    "店長",
                    "「それにしても君...」",
                ];
                for (let i = 0; i < lines.length; i++) {
                    ctx.fillText(lines[i], x + 23, y + 78 + 20 * i, width - 40);
                }
                break;

            case 2:
                if (this.showsResult) {
                    lines = endingMessage[this.ending].split("\n");
                    for (let i = 0; i < lines.length; i++) {
                        ctx.fillText(lines[i], x + 17, y + 78 + 20 * i, width - 40);
                    }
                    ctx.textAlign = "center";
                    ctx.font = "bold 15.5px Arial";
                    ctx.fillText(`『${endingName[this.ending]}』`,
                        x + width / 2, y + 78 + 20 * (lines.length + 1), width - 40);
                }
                break;
        }
    }

    onClickNext() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        const endingBGM = goodEnding.includes(this.ending) ?
            resource.bgm.MusMusBGM155 :
            resource.bgm.MusMusBGM144;
        this.sceneRouter.setBGM(endingBGM);
        this.showsResult = true;
    }

    onClickGoToTitle() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(scenes.title);
    }
}
