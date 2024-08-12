import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { imageForIngredient, ingredientName } from '../gameObject/ingredients.mjs';
import { getPizza, imageForPizza, pizzaName } from '../gameObject/pizzas.mjs';
import { resource } from '../resource.mjs';
import { dataKeys } from '../dataObject/dataKeysSettings.mjs';
import { PizzaInfo } from '../dataObject/PizzaInfo.mjs';

import { ingredientType } from '../gameObject/ingredients.mjs';

// ピザを作る画面
// - 出力
//   - this.sharedData.cookedPizza: 作ったピザ
export class CookingScene extends Scene {
    sceneWillAppear() {
        this.sceneRouter.setBGM(resource.bgm.MusMusBGM146);
        this.collectedIngredients = this.sharedData.collectedIngredients;
        this.selectedIndices = (this.sharedData.previousScene == scenes.cooking) ? 
            this.sharedData.selectedIndices : []; 
        this.errorShowing = false;
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
    }

    updateStates(deltaTime) {}

    render(ctx) {
        const maxX = ctx.canvas.width;
        const maxY = ctx.canvas.height;

        ctx.fillStyle = "silver";
        ctx.fillRect(0, 0, maxX, maxY);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText("調理画面", 50, 50);

        this.drawCollectedIngredients(ctx, 100, 120, 200, maxY - 230);

        if (this.errorShowing) {
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "red"
            ctx.fillText("選択できるのは4つまでです", 200, maxY - 80);
        }

        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.fillText("→", maxX / 2, maxY / 2 );

        let r = { x: maxX - 150, y: 25, w: 100, h: 40 };
        this.PizzaRecipeArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "18px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("ピザレシピ", r.x + r.w / 2, r.y + r.h / 2);

        r = { x: maxX - 240, y: maxY - 80, w: 100, h: 45 };
        this.decisionArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "22px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("決定", r.x + r.w / 2, r.y + r.h / 2);

        this.drawPizza(ctx, 495, 120, 220, 250);
        this.drawSelectedIngredients(ctx, 490, 400, 230, 120);
    }

    drawCollectedIngredients(ctx, x, y, width, height) {
        const areaWidth = 40;
        ctx.fillStyle = "gainsboro";
        ctx.fillRect(x, y, width, height);

        let place = 0;
        this.ingredientPositions = [];
        for (let place = 0; place < this.collectedIngredients.length; place++) {
            const ingredient = this.collectedIngredients[place];
            // 左から Math.floor(place / 4) 番目 上から place % 4 番目の場所に描画
            const image = imageForIngredient(ingredient);
            const ix = x + Math.floor(place / 4) * (width / 2) + (width / 4);
            const iy = y + place % 4 * (height / 4) + 45;
            const scaleFactor = 2.5;
            const pos = {
                x: ix - image.width * scaleFactor / 2,
                y: iy - image.height * scaleFactor / 2,
                width: image.width * scaleFactor,
                height: image.height * scaleFactor,
            };
            if (image.complete) {
                if (this.selectedIndices.includes(place)) {
                    ctx.fillStyle = 'yellow';
                    ctx.fillRect(pos.x - 3, pos.y - 3, pos.width + 6, pos.height + 6);
                }
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(image, pos.x, pos.y, pos.width, pos.height);
            }
            this.ingredientPositions.push(pos);
        }
    }

    drawPizza(ctx, x, y, width, height) {
        if (!this.pizza) return;
        const name = pizzaName[this.pizza];
        const isUnlocked = this.pizzaInfo.isUnlocked(this.pizza);
        const image = isUnlocked ? imageForPizza(this.pizza) : resource.images.unknownPizza;
        if (image.complete) {
            ctx.drawImage(image, x, y + height - width, width, width);
            ctx.font = "24px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.fillText(`${isUnlocked ? name : "???"}`, x + width / 2, y + 20);

        }
    }

    drawSelectedIngredients(ctx, x, y, width, height) {
        ctx.fillStyle = "gainsboro";
        ctx.fillRect(x, y, width, height);
        for (let i = 0; i < this.selectedIndices.length; i++) {
            const ingredient = this.collectedIngredients[this.selectedIndices[i]];
            ctx.font = "20px Arial";
            ctx.textAlign = "left";
            ctx.fillStyle = "black";
            ctx.fillText(`・${ingredientName[ingredient]}`, x+10, y + i * (height / 4) + 20, );
        }
    }

    didTap(x, y) {
        for (let i = 0; i < this.ingredientPositions.length; i++) {
            if (
                x >= this.ingredientPositions[i].x &&
                x <= this.ingredientPositions[i].x + this.ingredientPositions[i].width &&
                y >= this.ingredientPositions[i].y &&
                y <= this.ingredientPositions[i].y + this.ingredientPositions[i].height
            ) {
                if (this.selectedIndices.includes(i)) {
                    this.selectedIndices = this.selectedIndices.filter((e) => e != i);
                    this.errorShowing = false;
                    const selectedIngredients = this.selectedIndices.map((i) => this.collectedIngredients[i]);
                    this.pizza = getPizza(selectedIngredients);
                } else if (this.selectedIndices.length < 4) {
                    this.selectedIndices.push(i);
                    const selectedIngredients = this.selectedIndices.map((i) => this.collectedIngredients[i]);
                    this.pizza = getPizza(selectedIngredients);
                } else {
                    this.errorShowing = true;
                }
                break;
            }
        }
        
        let r = this.PizzaRecipeArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.sharedData.previousScene = scenes.cooking;
            this.sharedData.selectedIndices = this.selectedIndices;
            this.sceneRouter.playSE(resource.se.clickEffect);
            this.sceneRouter.changeScene(scenes.pizzaCollection);
        }

        r = this.decisionArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.sceneRouter.playSE(resource.se.clickEffect);
            this.sharedData.selectedIndices = [];
            this.sharedData.cookedPizza = this.pizza;
            this.sceneRouter.changeScene(scenes.result);
        }

    }
}
