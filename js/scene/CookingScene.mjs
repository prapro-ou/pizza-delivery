import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { imageForIngredient, ingredientName } from '../gameObject/ingredients.mjs';

export class CookingScene extends Scene {
    sceneWillAppear() {
        this.collectedIngredients = this.sharedData.collectedIngredients;
        this.selectedIndices = [];
        this.errorShowing = false;
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
                } else if (this.selectedIndices.length < 4) {
                    this.selectedIndices.push(i);
                    
                } else {
                    this.errorShowing = true;
                }
                break;
            }
        }
    }
}
