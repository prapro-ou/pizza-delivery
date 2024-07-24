import { endingHint, endingName, endingOrder } from '../gameObject/endings.mjs';
import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { cookieKeys } from '../dataObject/cookieKeysSettings.mjs';
import { resource } from '../resource.mjs';

// ピザコレクション画面
export class EndingCollectionScene extends Scene {
    sceneWillAppear() {
        this.sceneRouter.setBGM(resource.bgm.MusMusBGM103);
        this.backButtonArea = null;
        this.nextPageButtonArea = null;
        this.previousPageButtonArea = null;
        this.page = 1; //ページ数
        this.endingFrame = [];
        this.endingInfo = this.sceneRouter.load(cookieKeys.endingInfo);
    }

    updateStates(deltaTime) {}

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        //エンディングのテキストを配置する枠の位置
        this.endingFrame = [{x:50, y:100}, {x:50, y:240},  {x:50, y:380},
                            {x:430, y:100}, {x:430, y:240}, {x:430, y:380} ]

        ctx.fillStyle = "pink";
        ctx.fillRect(0, 0, max_x, max_y);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`エンディングコレクション画面${this.page}`, 50, 50);

        // タイトルに戻るボタン
        let r = { x: max_x / 2 - 100, y: max_y - 100, w: 200, h: 50 };
        this.backButtonArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("タイトルに戻る", r.x + r.w / 2, r.y + r.h / 2);

        if (endingOrder.length - this.endingFrame.length * this.page > 0) {
            r = { x: max_x - 50, y: max_y - 100, w: 50, h: 50 }
            this.nextPageButtonArea = r;
            ctx.fillStyle = "blue";
            ctx.fillRect(r.x, r.y, r.w, r.h);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("→", r.x + r.w / 2, r.y + r.h / 2);
        }

        if (this.page > 1) {
            r = { x: 0, y: max_y - 100, w: 50, h: 50 }
            this.previousPageButtonArea = r;
            ctx.fillStyle = "blue";
            ctx.fillRect(r.x, r.y, r.w, r.h);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("←", r.x + r.w / 2, r.y + r.h / 2);
        }

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
        // エンディングの画像とヒントを表示する矩形を配置
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, 320, 120);

        // エンディングのテキストを配置
        const isUnlocked = this.endingInfo.isUnlocked(ending);
        if (isUnlocked) {
            const fontSize = Math.min(250 / 11, 250 / endingName[ending].length);
            ctx.fillStyle = "black";
            ctx.font = `${fontSize}px Arial`;
            ctx.textAlign = "center";
            ctx.fillText(endingName[ending], x + 320 / 2, y + 30);
        } else {
            ctx.fillStyle = "black";
            ctx.font = `${250 / 11}px Arial`;
            ctx.textAlign = "center";
            ctx.fillText("？？？", x + 320 / 2, y + 30);
        }

        // ヒントのテキストを配置
        ctx.fillStyle = "black";
        ctx.font = "15px Arial";
        ctx.textAlign = "left";
        const hintLines = endingHint[ending].split("\n");
        for (let i = 0; i < hintLines.length; i++) {
            ctx.fillText(hintLines[i], x + 10 , y + 60 + 22 * i);
        }
    }

    // 画面内のどこかがタップされた
    didTap(x, y) {
        let r = this.backButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapBack();
        }
        r = this.nextPageButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapNextPage();
        }
        r = this.previousPageButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapPrePage();
        }
    }

    // 「タイトルに戻る」ボタンがタップされた
    didTapBack() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(scenes.title);
    }

    // 「→」がタップされた
    didTapNextPage(){
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.page = 2;

    }

    // 「←」がタップされた．
    didTapPrePage(){
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.page = 1;
    }
}
