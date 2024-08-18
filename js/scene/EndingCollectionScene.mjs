import { endingHint, endingName, endingOrder } from '../gameObject/endings.mjs';
import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { dataKeys } from '../dataObject/dataKeysSettings.mjs';
import { resource } from '../resource.mjs';
import { sqbColors, SquareButton } from '../component/SquareButton.mjs';
import { rndbColors, RoundButton } from '../component/RoundButton.mjs';

// ピザコレクション画面
export class EndingCollectionScene extends Scene {
    sceneWillAppear() {
        this.sceneRouter.setBGM(resource.bgm.MusMusBGM103);
        this.backButtonArea = null;
        this.nextPageButtonArea = null;
        this.previousPageButtonArea = null;
        this.page = 1; //ページ数
        this.endingFrame = [];
        this.endingInfo = this.sceneRouter.load(dataKeys.endingInfo);
        this.setUpUI();
    }

    setUpUI(){
        this.closePageButton = new SquareButton(sqbColors.white);
        this.closePageButton.text = "閉じる";
        this.closePageButton.scaleFactor = 0.8;
        this.closePageButton.onClick = this.onClickClosePage.bind(this);

        this.nextPageButton = new RoundButton(rndbColors.green);
        this.nextPageButton.text = "次へ";
        this.nextPageButton.scaleFactor = 0.8;
        this.nextPageButton.onClick = this.onClickNextPage.bind(this);

        this.previousPageButton = new RoundButton(rndbColors.green);
        this.previousPageButton.text = "前へ";
        this.previousPageButton.scaleFactor = 0.8;
        this.previousPageButton.mirror = true;
        this.previousPageButton.onClick = this.onClickPreviousPage.bind(this);
    }

    updateStates(deltaTime, mouse) {
        this.closePageButton.updateStates(mouse);
        this.nextPageButton.updateStates(mouse);
        this.previousPageButton.updateStates(mouse);

        if (this.page > 1) {
            this.previousPageButton.enable();
        } else {
            this.previousPageButton.disable();
        }
        if (endingOrder.length - this.endingFrame.length * this.page > 0) {
            this.nextPageButton.enable();
        } else {
            this.nextPageButton.disable();
        }
    }

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;
        //エンディングのテキストを配置する枠の位置
        this.endingFrame = [{x:220, y:122}, {x:220, y:250}, {x:220, y:378},
                            {x:582, y:122}, {x:582, y:250}, {x:582, y:378} ]

        ctx.imageSmoothingEnabled = false;
        const bg = resource.images.woodBackground;
        ctx.drawImage(bg, 0, 0, max_x, max_y);
        const bookBg = resource.images.bookBackground;
        ctx.drawImage(bookBg, 20, 26, bookBg.width, bookBg.height);
        this.closePageButton.draw(ctx, 285, 537);
        this.nextPageButton.draw(ctx, 572, 537);
        this.previousPageButton.draw(ctx, 26, 537);

        const maxPage = Math.ceil(endingOrder.length / this.endingFrame.length * 2);
        ctx.fillStyle = "black";
        ctx.font = "28px Arial";
        ctx.textAlign = "left";
        ctx.textBaseLine = "middle";
        ctx.fillText(`エンディング集 (${this.page * 2 - 1}/${maxPage})`, 60, 72);
        ctx.fillText(`エンディング集 (${this.page * 2}/${maxPage})`, 422, 72);
        this.renderPage(ctx, this.page);
    }

    renderPage(ctx, page) {
        for(let i = 0; i < this.endingFrame.length; i++){
            const endingIndex = this.endingFrame.length * (page - 1) + i;
            if (endingIndex >= endingOrder.length) break;
            const ending = endingOrder[endingIndex];
            this.drawEnding(ctx, ending, this.endingFrame[i].x, this.endingFrame[i].y)
        }
    }

    drawEnding(ctx, ending, x, y) {
        // エンディングのテキストを配置
        const isUnlocked = this.endingInfo.isUnlocked(ending);
        ctx.fillStyle = "black";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.textBaseLine = "middle";
        ctx.fillText(isUnlocked ? endingName[ending] : "？？？", x, y, 300);

        // ヒントのテキストを配置
        ctx.fillStyle = "black";
        ctx.font = "15px Arial";
        ctx.textAlign = "left";
        const hintLines = endingHint[ending].split("\n");
        for (let i = 0; i < hintLines.length; i++) {
            ctx.fillText(hintLines[i], x - 150 , y + 30 + 22 * i, 300);
        }
    }

    onClickClosePage(){
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(scenes.title);
    }

    onClickNextPage(){
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.page += 1;
    }

    onClickPreviousPage(){
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.page -= 1;
    }
}
