import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { imageForIngredient, ingredientName } from '../gameObject/ingredients.mjs';
import { getPizza, imageForPizza, pizzaName } from '../gameObject/pizzas.mjs';
import { resource } from '../resource.mjs';
import { dataKeys } from '../dataObject/dataKeysSettings.mjs';
import { PizzaInfo } from '../dataObject/PizzaInfo.mjs';
import { PizzaRecipeButton } from '../component/PizzaRecipeButton.mjs';
import { rndbColors, RoundButton } from '../component/RoundButton.mjs';
import { ItemButton } from '../component/ItemButton.mjs';

// ピザを作る画面
// - 出力
//   - this.sharedData.cookedPizza: 作ったピザ
export class CookingScene extends Scene {
    sceneWillAppear() {
        this.sceneRouter.setBGM(resource.bgm.MusMusBGM146);
        this.collectedIngredients = this.sharedData.collectedIngredients;
        this.selectedIndices = (this.sharedData.previousScene == scenes.cooking) ? 
            this.sharedData.selectedIndices : []; 
        this.pizza = getPizza(this.selectedIndices.map((i) => this.collectedIngredients[i]));

        this.pizzaInfo = new PizzaInfo();
        const slots = this.sceneRouter.load(dataKeys.slots);
        const slot = slots[this.sharedData.playingSlotIndex];

        if (slot && slot.stageResults) {
            for (const stageResult of slot.stageResults) {
                const pizza = stageResult.pizza;
                this.pizzaInfo.unlock(pizza);
            }
        }

        this.setUpUI();
    }

    setUpUI() {
        this.recipeButton = new PizzaRecipeButton();
        this.recipeButton.scaleFactor = 2;
        this.recipeButton.onClick = this.onClickRecipe.bind(this);

        this.completeButton = new RoundButton(rndbColors.green)
        this.completeButton.text = "完了";
        this.completeButton.onClick = this.onClickComplete.bind(this);

        this.itemButtons = [];
        for (let i = 0; i < 8; i++) {
            const button = new ItemButton();
            button.onClick = function() {
                this.onClickItemButton(i);
            }.bind(this);
            button.disable();
            this.itemButtons.push(button);
        }
        this.itemButtons2 = [];
        for (let i = 0; i < 4; i++) {
            const button = new ItemButton();
            button.onClick = function() {
                this.onClickItemButton2(i);
            }.bind(this);
            button.disable();
            this.itemButtons2.push(button);
        }
    }

    updateStates(deltaTime, mouse) {
        this.recipeButton.updateStates(mouse);
        this.completeButton.updateStates(mouse);
        this.itemButtons.forEach((button) => button.updateStates(mouse));
        this.itemButtons2.forEach((button) => button.updateStates(mouse));
    }

    render(ctx) {
        const maxX = ctx.canvas.width;
        const maxY = ctx.canvas.height;
        let image;

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(resource.images.woodBackground, 0, 0, maxX, maxY);
        image = resource.images.cooking
        ctx.drawImage(image, 48, 155, image.width * 4, image.height * 4);
        image = resource.images.brownArrow
        ctx.drawImage(image, 373, 184, image.width * 3, image.height * 3);
        image = resource.images.goldFrame
        ctx.drawImage(image, 390, 317, image.width, image.height);

        ctx.fillStyle = "black";
        ctx.font = "52px Arial";
        ctx.textAlign = "left";
        ctx.fillText("ピザを焼こう！", 35, 70);

        this.drawCollectedIngredients(ctx);
        this.recipeButton.draw(ctx, maxX - 85, 14);
        this.completeButton.draw(ctx, 522, 514);
        this.drawPizza(ctx, 503, 135);
        image = resource.images.goldFrame
        this.drawPizzaDetail(ctx, 390, 317, image.width, image.height);
    }

    drawCollectedIngredients(ctx) {
        ctx.imageSmoothingEnabled = false;
        for (let i = 0; i < 8; i++) {
            const [x, y] = [58 + 78 * (i % 4), 386 + 78 * Math.floor(i / 4)];
            this.itemButtons[i].draw(ctx, x, y);
            const ingredient = this.collectedIngredients[i];
            if (ingredient && !this.selectedIndices.includes(i)) {
                this.itemButtons[i].enable();
                const image = imageForIngredient(ingredient);
                ctx.drawImage(image, x + 5, y + 5, 68, 68);
            } else {
                this.itemButtons[i].disable();
            }
        }
        for (let i = 0; i < 4; i++) {
            const [x, y] = [188 + 78 * (i % 2), 135 + 78 * Math.floor(i / 2)];
            this.itemButtons2[i].draw(ctx, x, y);
            if (this.selectedIndices.length > i) {
                this.itemButtons2[i].enable();
                const index = this.selectedIndices[i];
                const ingredient = this.collectedIngredients[index];
                const image = imageForIngredient(ingredient);
                ctx.drawImage(image, x + 5, y + 5, 68, 68);
            } else {
                this.itemButtons2[i].disable();
            }
        }
    }

    drawPizza(ctx, x, y) {
        let bg = resource.images.itemBackGroundBig;
        const [width, height] = [bg.width * 3, bg.height * 3];
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(bg, x, y, width, height);

        if (!this.pizza) return;
        const isUnlocked = this.pizzaInfo.isUnlocked(this.pizza);
        const image = isUnlocked ? imageForPizza(this.pizza) : resource.images.unknownPizza;
        ctx.drawImage(image, x, y + height - width, width, width);
    }

    drawPizzaDetail(ctx, x, y) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const isUnlocked = this.pizzaInfo.isUnlocked(this.pizza);
        ctx.fillText(`${isUnlocked ? pizzaName[this.pizza] : "？？？"}`, 578, 360, 350);

        let lines = ["ー 使用した食材 ー", "", ""];
        for (let i = 0; i < this.selectedIndices.length; i++) {
            const ingredient = this.collectedIngredients[this.selectedIndices[i]];
            lines[1 + Math.floor(i / 2)] += ((i % 2) ? "　" : "") + ingredientName[ingredient];
        }
        ctx.font = "20px Arial";
        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], 578, 395 + i * 30, 350);
        }
    }

    onClickItemButton(index) {
        if (this.selectedIndices.includes(index) || this.selectedIndices.length == 4) return;
        if (index >= this.collectedIngredients.length) return;
        this.selectedIndices.push(index);
        const selectedIngredients = this.selectedIndices.map((i) => this.collectedIngredients[i]);
        this.pizza = getPizza(selectedIngredients);
    }

    onClickItemButton2(index) {
        if (index >= this.selectedIndices.length) return;
        this.selectedIndices.splice(index, 1);
        this.errorShowing = false;
        const selectedIngredients = this.selectedIndices.map((i) => this.collectedIngredients[i]);
        this.pizza = getPizza(selectedIngredients);
    }

    onClickRecipe() {
        this.sharedData.previousScene = scenes.cooking;
        this.sharedData.selectedIndices = this.selectedIndices;
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(scenes.pizzaCollection);
    }

    onClickComplete() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sharedData.selectedIndices = [];
        this.sharedData.cookedPizza = this.pizza;
        this.sceneRouter.changeScene(scenes.result);
    }
}
