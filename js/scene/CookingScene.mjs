import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { imageForIngredient } from '../gameObject/ingredients.mjs';

export class CookingScene extends Scene {
    sceneWillAppear() {
        this.collectedIngredients = this.sharedData.collectedIngredients;
        for (let ingredient in this.collectedIngredients) {
            console.log(`${ingredient} が ${this.collectedIngredients[ingredient]} 個`);
        this.selectedIngredients = [];
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

        ctx.font = "50px Arial";
        // ctx.fillText("→", maxX / 2, maxY / 2 + );


        this.drawCollectedIngredients(ctx, 100, 157, 200, maxY - 230);
    }

    drawCollectedIngredients(ctx, x, y, width, height) {
        const areaWidth = 40;
        ctx.fillStyle = "gainsboro";
        ctx.fillRect(x, y, width, height);

        let place = 0;
        this.ingredientPositions = [];
        for (let ingredient in this.collectedIngredients) {
            for (let i = 0; i < this.collectedIngredients[ingredient]; i++) {
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
                this.ingredientPositions.push(pos);
                if (image.complete) {
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(image, pos.x, pos.y, pos.width, pos.height);
                }
                place++;
            }
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
                if (this.selectedIngredients.includes(i)) {
                    this.selectedIngredients = this.selectedIngredients.filter((e) => e != i);
                } else {
                    this.selectedIngredients.push(i);
                }
                console.log(this.selectedIngredients);
                break;
            }
        }
    }s

}
