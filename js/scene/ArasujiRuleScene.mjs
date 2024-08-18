import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { resource } from '../resource.mjs';
import { sqbColors, SquareButton } from '../component/SquareButton.mjs';
import { rndbColors, RoundButton } from '../component/RoundButton.mjs';

// あらすじとルール説明を表示する画面
export class ArasujiRuleScene extends Scene {
    sceneWillAppear() {
        this.sceneRouter.setBGM(resource.bgm.MusMusBGM103);
        this.backButtonArea = null;
        this.nextPageButtonArea = null;
        this.previousPageButtonArea = null;
        this.page = 1; //ページ数
        this.maxPage = 2;
        this.setUpUI();
    }

    setUpUI(){
        this.closePageButton = new SquareButton(sqbColors.yellow);
        this.closePageButton.text = "配達に行く";
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
        if (this.page < this.maxPage) {
            this.nextPageButton.enable();
        } else {
            this.nextPageButton.disable();
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

        this.closePageButton.draw(ctx, 285, 537);
        this.nextPageButton.draw(ctx, 572, 537);
        this.previousPageButton.draw(ctx, 26, 537);

        this.renderPage(ctx, this.page * 2 - 1, 42, 30, 350, 471);
        this.renderPage(ctx, this.page * 2, 408, 30, 350, 471);
    }

    renderPage(ctx, page, x, y, width, height) {
        const titles = [
            "あらすじ",
            "ルール説明 (1/3)",
            "ルール説明 (2/3)",
            "ルール説明 (3/3)"
        ]
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
                    "ピザ配達でアルバイトを始めた主人公。",
                    "",
                    "いつものように配達の準備をしていると、",
                    "食材が何者かによってすべて盗まれていた。",
                    "あるのは焼けたピザ生地だけ。",
                    "スーパーに食材を買いに行く時間もない、",
                    "熱々のピザ生地が冷めてしまう、顧客の",
                    "信頼が崩れてしまう...。",
                    "",
                    "途方に暮れて道路に目をやると、そこには",
                    "一枚のベーコンが。これだ！時間がない！",
                    "主人公は食材を道中で集めることにした。",
                    "",
                    "たくさんの食材を集めて顧客を満足させろ。",
                    "",
                    "「食材は拾った」",
                ];
                for (let i = 0; i < lines.length; i++) {
                    ctx.fillText(lines[i], x + 23, y + 78 + 24 * i, width - 40);
                }
                break;

            case 2:
                this.drawImage(ctx, resource.images.screenshot01, x + 25, y + 60, width - 50);
                lines = [
                    "まずは、バイクの運転方法！",
                    "PCの人は方向キー(↑↓←→)、スマホやタブ",
                    "レットの人は画面内のどこかをタップした",
                    "まま引っ張ると操作できるよ。",
                    "← 左　→ 右　↑ 加速　↓ ブレーキ",
                    "（少しだけ左とか加速とかはできないよ）",
                ];
                for (let i = 0; i < lines.length; i++) {
                    ctx.fillText(lines[i], x + 23, y + 318 + 24 * i, width - 40);
                }
                break;

            case 3:
                this.drawImage(ctx, resource.images.screenshot01, x + 25, y + 60, width - 50);
                lines = [
                    "次に、画面について！",
                    "道に落ちている食材に触れると、右上の",
                    "アイテム欄に追加されるよ。",
                    "車や泥などの障害物にぶつかると左下の",
                    "ライフが減少するよ。３回ぶつかると",
                    "ゲームオーバーなので気をつけて！",
                ];
                for (let i = 0; i < lines.length; i++) {
                    ctx.fillText(lines[i], x + 23, y + 318 + 24 * i, width - 40);
                }
                break;

            case 4:
                this.drawImage(ctx, resource.images.screenshot02, x + 25, y + 60, width - 50);
                lines = [
                    "配達場所まで到着したら、ピザを焼いて",
                    "顧客に提供するよ！",
                    "集めた食材の中から４つを選んでピザを",
                    "作るよ。食材の組み合わせについては",
                    "右上のピザレシピを参考にしてみてね！",
                    "ちなみに、拾える食材は８つまでだよ。",
                ];
                for (let i = 0; i < lines.length; i++) {
                    ctx.fillText(lines[i], x + 23, y + 318 + 24 * i, width - 40);
                }
                break;
        }
    }

    drawImage(ctx, image, x, y, width) {
        ctx.drawImage(image, x, y, width, width * image.height / image.width);
    }

    onClickClosePage(){
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(scenes.stageSelection);
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
