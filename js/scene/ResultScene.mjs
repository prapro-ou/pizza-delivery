import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { pizzas, pizzaName, pizzaScore,imageForPizza } from "../gameObject/pizzas.mjs";
import { ingredientType, ingredientName, ingredientScore, imageForIngredient } from "../gameObject/ingredients.mjs"

// リザルト画面
// - 入力
//   - this.sharedData.stage: ステージ
//   - this.sharedData.cookedPizza: 作ったピザ
//   - this.sharedData.goalTime: タイム
//   - this.sharedData.collectedIngredients: 集めた食材の配列
// - 出力
//   - this.sharedData.score: スコア
export class ResultScene extends Scene {
    sceneWillAppear(){
        this.NextButton = null;

        this.pizza = this.sharedData.cookedPizza;
        this.stage = this.sharedData.stage;
        this.goalTime = this.sharedData.goalTime;
        this.targetTime = this.sharedData.stage.targetTime;

        const collectedIngredients = this.sharedData.collectedIngredients;
        this.ingredientCounts = collectedIngredients.reduce((obj, ingredient) => {
            if (obj[ingredient]) {
                obj[ingredient]++;
            } else {
                obj[ingredient] = 1;
            }
            return obj;
        }, {});

        // クリアタイムによるスコア変動の倍率
        this.timeBonusFactor = 1;

        this.scoreDetail = this.calculateScoreDetail();
        this.totalScore = this.scoreDetail.pizzaScore + this.scoreDetail.ingredientsScore + this.scoreDetail.timeBonus;

        console.log('トータルスコア : ' + this.totalScore);
    }

    updateStates(deltaTime){}

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, max_x, max_y);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText("リザルト画面", 50, 60);

        let r = { x: max_x - 300, y: max_y - 100, w: 200, h: 50 };
        this.NextButton = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("次のシーンへ", r.x + r.w / 2, r.y + r.h / 2);

        this.drawPizza(ctx, 160, 80, 140);

        this.drawResultIngredients(ctx, 45, 270, 400);

        this.drawTime(ctx, 50, max_y - 50);

        this.drawScore(max_x, max_y, ctx);
    }

    didTap(x, y){
        let r = this.NextButton;
        if (r && x >= r.x && x <= r.x+r.w && y >= r.y && y <= r.y+r.h) {
            this.didTapNext();
        }
    }

    didTapNext() {
        this.sceneRouter.changeScene(scenes.whichSlotToSave);
    }

    drawResultIngredients(ctx, xOffset, yOffset, width) {
        const ingredientKeys = Object.keys(this.ingredientCounts);
        for (let i = 0; i < ingredientKeys.length; i++) {
            const row = Math.floor(i / 4);
            const column = i % 4;
            const ingredient = ingredientKeys[i];
            const ingredientCount = this.ingredientCounts[ingredient];
            this.drawIngredient(
                ctx,
                ingredient,
                ingredientCount,
                xOffset + column * width / 4 + 10,
                yOffset + row * (width / 4 + 15),
                80
            )
        }
    }

    drawIngredient(ctx, ingredient, ingredientCount, xOffset, yOffset, width) {
        ctx.imageSmoothingEnabled = false;
        const ingredientImage = imageForIngredient(ingredient);
        ctx.drawImage(ingredientImage, xOffset, yOffset, width, width);
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
            `x${ingredientCount}`,
            xOffset + width / 2,
            yOffset + width + 10
        );
    }

    drawPizza(ctx, xOffset, yOffset, width) {
        const pizzaImage = imageForPizza(this.pizza);
        if (pizzaImage.complete) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(
                pizzaImage,
                xOffset,
                yOffset,
                width,
                width
            );
        }

        const pizzaDisplayName = pizzaName[this.pizza];

        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(pizzaDisplayName, xOffset + width / 2, yOffset + width + 10, width, 100);

    }

    //クリアタイムを画面左下に表示する
    drawTime(ctx, xOffset, yOffset) {
        const time = this.goalTime;
        const timeText = `クリアタイム: ${time.toFixed(2)}s`;

        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
        ctx.fillText(timeText, xOffset, yOffset);
    }

    //ピザの画像の右側にピザのスコアを、材料の画像の右側に材料の合計のスコアを、クリアタイムの右側にタイムボーナスを表示する

    drawScore(max_x, max_y, ctx){
        const pizzaScoreText = `ピザのスコア: ${this.scoreDetail.pizzaScore}`;
        const ingredientsScoreText = `材料のスコア: ${this.scoreDetail.ingredientsScore}`;
        const timeBonusText = `${this.scoreDetail.timeBonus >= 0 ? 'タイムボーナス' : 'タイムペナルティ'}: ${this.scoreDetail.timeBonus}`;
        const totalScoreText = `合計スコア: ${this.totalScore}`;

        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.fillText(pizzaScoreText, 730, 130);
        ctx.fillText(ingredientsScoreText, 730, 265);
        ctx.fillText(timeBonusText, 730, 370); 
        ctx.fillText(totalScoreText, 730, 450);

        ctx.fillStyle = "black";
        ctx.fillRect(465, 380, 275, 5);

    }

    //スコア = 作ったピザの点数 + 食材毎の点数 + (目標タイム - 経過時間) * timeBonusFactor
    calculateScoreDetail() {
        const scoreDetail = {
            pizzaScore: 0,
            ingredientsScore: 0,
            timeBonus: 0,
        }

        scoreDetail.pizzaScore = pizzaScore[this.pizza];

        for(let ingredientKey in this.ingredientCounts) {
            scoreDetail.ingredientsScore += ingredientScore[ingredientKey] * this.ingredientCounts[ingredientKey];
        }

        scoreDetail.timeBonus = Math.round((this.targetTime - this.goalTime) * this.timeBonusFactor);
        return scoreDetail;
    }
}
