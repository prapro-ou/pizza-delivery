import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { pizzaName, recipe, pizzaOrder, imageForPizza } from '../gameObject/pizzas.mjs';
import { imageForIngredient } from '../gameObject/ingredients.mjs';
import { dataKeys } from '../dataObject/dataKeysSettings.mjs';
import { resource } from '../resource.mjs';
import { PizzaInfo } from '../dataObject/PizzaInfo.mjs';
import { Slot } from '../dataObject/Slot.mjs';
import { rndbColors, RoundButton } from '../component/RoundButton.mjs';
import { sqbColors, SquareButton } from '../component/SquareButton.mjs';

// ピザコレクション画面
export class PizzaCollectionScene extends Scene {
    sceneWillAppear() {
        this.previousScene = this.sharedData.previousScene;
        const bgm = this.previousScene == scenes.cooking ?
                    resource.bgm.MusMusBGM146 : resource.bgm.MusMusBGM103;
        this.sceneRouter.setBGM(bgm);
        this.page = 1; //ページ数
        this.pizzaFrame = [];

        if (this.previousScene === scenes.cooking || this.previousScene === scenes.stageSelection) {
            this.pizzaInfo = new PizzaInfo();
            const slots = this.sceneRouter.load(dataKeys.slots);
            const slot = slots[this.sharedData.playingSlotIndex];
            
            if (slot && slot.stageResults) {
                for (const stageResult of slot.stageResults) {
                    const pizza = stageResult.pizza;
                    this.pizzaInfo.unlock(pizza);
                }
            } 

        } else {
            this.pizzaInfo = this.sceneRouter.load(dataKeys.pizzaInfo);
        }

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
        if (pizzaOrder.length - this.pizzaFrame.length * this.page > 0) {
            this.nextPageButton.enable();
        } else {
            this.nextPageButton.disable();
        }
    }

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;
        let image;

        ctx.imageSmoothingEnabled = false;
        image = resource.images.woodBackground;
        ctx.drawImage(image, 0, 0, max_x, max_y);
        image = resource.images.notebookBackground;
        ctx.drawImage(image, 27, 24, image.width, image.height);
        this.closePageButton.draw(ctx, 285, 537);
        this.nextPageButton.draw(ctx, 572, 537);
        this.previousPageButton.draw(ctx, 26, 537);

        // ピザと材料の画像を配置する枠の位置
        this.pizzaFrame = [{x:51, y:91}, {x:51, y:193}, {x:51, y:295}, {x:51, y:397},
                            {x:443, y:91}, {x:443, y:193}, {x:443, y:295}, {x:443, y:397}];

        ctx.fillStyle = "black";
        ctx.font = "28px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`ピザレシピ(${this.page * 2 - 1}/${Math.ceil(pizzaOrder.length / 4)})`, 48, 70);
        ctx.fillText(`ピザレシピ(${this.page  * 2}/${Math.ceil(pizzaOrder.length / 4)})`, 440, 70);
        
        ctx.fillStyle = "#ccbba3";
        ctx.font = "bold 24px serif";
        ctx.textAlign = "right";
        const slotInformationText = (this.sharedData.previousScene == scenes.title) ? 
        "" : `DATA${this.sharedData.playingSlotIndex}`;
        ctx.fillText(slotInformationText, 763, 55);

        this.renderPage(ctx, this.page);
    }

    onClickClosePage(){
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(this.previousScene);
    }

    onClickNextPage(){
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.page += 1;
    }

    onClickPreviousPage(){
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.page -= 1;
    }

    renderPage(ctx, page) {
        for (let i = 0; i < this.pizzaFrame.length; i++) {
            const pizzaIndex = this.pizzaFrame.length * (page - 1) + i;
            if (pizzaIndex >= pizzaOrder.length) break;
            const pizza = pizzaOrder[pizzaIndex];
            this.drawPizzaAndIngredients(ctx, pizza, this.pizzaFrame[i].x, this.pizzaFrame[i].y);
        }
    }

    // ピザの画像とピザ名と材料の画像を描画
    drawPizzaAndIngredients(ctx, pizza, x, y) {

        const isUnlocked = this.pizzaInfo.isUnlocked(pizza);

        // ピザ名
        const fontSize = 26;
        ctx.fillStyle = 'black';
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = "left";
        ctx.fillText(isUnlocked ? pizzaName[pizza] : "？？？", x + 102, y + 20, 195);

        // ピザ画像
        const pizzaImage = isUnlocked ? imageForPizza(pizza): resource.images.unknownPizza;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(pizzaImage, x, y, 90, 90);

        // 材料画像
        const ingredients = recipe[pizza];
        for (let i = 0; i < ingredients.length; i++) {
            const ingredientImage = imageForIngredient(ingredients[i]);
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(ingredientImage, x + 102 + (i * 48), y + 39, 45, 45);
        }
    }
}