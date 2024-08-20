import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { resource } from '../resource.mjs';
import { stageDescriptions, stages } from '../stage/stages.mjs';
import { dataKeys } from '../dataObject/dataKeysSettings.mjs';
import { Slot } from '../dataObject/Slot.mjs';
import { StageButton, stgbColors } from '../component/StageButton.mjs';
import { PizzaRecipeButton } from '../component/PizzaRecipeButton.mjs';
import { SquareButton, sqbColors } from '../component/SquareButton.mjs';
import { endingName } from '../gameObject/endings.mjs';
import { TopButton } from '../component/TopButton.mjs';
import { buttonStates } from '../component/Button.mjs';

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
        this.stageErrorShowing = false;
        this.endingErrorShowing = false;

        const slots = this.sceneRouter.load(dataKeys.slots);
        const slot = slots[this.sharedData.playingSlotIndex] ?? new Slot();
        this.unlockedStageNumber = slot.maxStageNumber();
        this.ending = slot.ending;

        this.setUpUI();
    }

    setUpUI() {
        this.recipeButton = new PizzaRecipeButton();
        this.recipeButton.scaleFactor = 2;
        this.recipeButton.onClick = this.onClickRecipe.bind(this);

        this.topButton = new TopButton();
        this.topButton.onClick = this.onClickTop.bind(this);

        this.endingButton = new SquareButton(this.ending ? sqbColors.white : sqbColors.green);
        this.endingButton.text = "配達を終える";
        this.endingButton.onClick = this.onClickEnding.bind(this);

        this.stageButtons = [];
        const colors = [stgbColors.green, stgbColors.purple, stgbColors.pink, stgbColors.orange, stgbColors.blue];
        for (let i = 0; i < 5; i++) {
            const stageButton = new StageButton(colors[i]);
            stageButton.onClick = function() {
                this.onClickStage(i + 1);
            }.bind(this);
            this.stageButtons.push(stageButton);
        }
    }

    updateStates(deltaTime, mouse) {
        this.recipeButton.updateStates(mouse);
        this.topButton.updateStates(mouse);
        this.endingButton.updateStates(mouse);
        this.stageButtons.forEach((btn) => btn.updateStates(mouse));
    }

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(resource.images.woodBackground, 0, 0, max_x, max_y);
        this.recipeButton.draw(ctx, max_x - 185, 14);
        this.topButton.draw(ctx, max_x - 95, 14)

        ctx.fillStyle = "black";
        ctx.font = "49px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText("ステージを選択", 30, 60);

        const colors = ["#099023", "#3f3185", "#b7304f", "#ed5308", "#0642A6"];
        for (let i = 0; i < 5; i++) {
            const [x, y] = [[20, 405][i % 2], 115 + 170 * Math.floor(i / 2)];
            const unlocked = i <= this.unlockedStageNumber;
            this.stageButtons[i].draw(ctx, x, y);
            if (!unlocked) this.stageButtons[i].state = buttonStates.disabled;

            ctx.fillStyle = unlocked ? colors[i] : "gray";
            ctx.font = "bold 36px serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(`STAGE ${i+1}`, x + 140, y + 30);

            ctx.fillStyle = unlocked ? "black" : "gray";
            ctx.font = "22px Arial";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            const lines = unlocked ? stageDescriptions[i+1].split("\n") : Array(2).fill("？".repeat(5));
            for (let j = 0; j < lines.length; j++) {
                ctx.fillText(lines[j], x + 142, y + 70 + 35 * j);
            }
        }

        if (this.ending) {
            ctx.fillStyle = "black";
            ctx.font = "26px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(endingName[this.ending], 600, 480);
        }
        if (this.unlockedStageNumber < 5) {
            this.endingButton.state = buttonStates.disabled
        }
        this.endingButton.draw(ctx, 457, 505);
    }

    onClickStage(stageIndex) {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.stopBGM();
        this.sharedData.stage = stages[stageIndex];
        this.sharedData.gameOverCount = 0;
        if (this.sharedData.stage) {
            if(stageIndex <= this.unlockedStageNumber + 1){
                this.sceneRouter.changeScene(scenes.drive);
            } else {
                this.stageErrorShowing = true;
                this.endingErrorShowing = false;
            }
        } else {
            console.error(`未実装のstageです: ${stageIndex}`)
        }
    }

    onClickTop() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(scenes.title);
    }

    onClickRecipe() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sharedData.previousScene = scenes.stageSelection;
        this.sceneRouter.changeScene(scenes.pizzaCollection);
    }

    onClickEnding(){
        if (this.unlockedStageNumber == 5) {
            this.sceneRouter.playSE(resource.se.clickEffect);
            this.sceneRouter.stopBGM();
            this.sceneRouter.changeScene(scenes.ending);
        } else {
            this.stageErrorShowing = false;
            this.endingErrorShowing = true;
        }
    }
}

