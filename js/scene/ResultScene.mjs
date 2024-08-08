import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { pizzas, pizzaName, pizzaScore,imageForPizza } from "../gameObject/pizzas.mjs";
import { cookieKeys } from '../dataObject/cookieKeysSettings.mjs';
import { ingredientType, ingredientName, ingredientScore, imageForIngredient } from "../gameObject/ingredients.mjs"
import { resource } from '../resource.mjs';

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
        this.sceneRouter.setBGM(resource.bgm.MusMusBGM115);
        this.NextButton = null;

        this.pizza = this.sharedData.cookedPizza;
        this.stage = this.sharedData.stage;
        this.goalTime = this.sharedData.goalTime;
        this.targetTime = this.sharedData.stage.targetTime;

        const pizzaInfo = this.sceneRouter.load(cookieKeys.pizzaInfo) ?? new PizzaInfo();
        pizzaInfo.unlock(this.pizza);
        this.sceneRouter.save(cookieKeys.pizzaInfo, pizzaInfo);

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
        this.sharedData.score = this.totalScore;

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

        const IngredientsX = 45
        const IngredientsW = 400
        const centerX = IngredientsX + IngredientsW / 2
        this.drawPizza(ctx, centerX - 140 / 2, 80, 140);
        this.drawResultIngredients(ctx, IngredientsX, 270, IngredientsW);
        this.drawTime(ctx, centerX, max_y - 60);
        this.drawScore(ctx);
    }

    didTap(x, y){
        let r = this.NextButton;
        if (r && x >= r.x && x <= r.x+r.w && y >= r.y && y <= r.y+r.h) {
            this.sceneRouter.playSE(resource.se.clickEffect);
            this.didTapNext();
        }
    }

    didTapNext() {
        this.sceneRouter.changeScene(scenes.whichSlotToSave);
    }

    drawResultIngredients(ctx, xOffset, yOffset, width) {

        ctx.fillStyle = "lightblue";
        ctx.fillRect(xOffset, yOffset, width, (width / 4 + 15) * 2);

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
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(timeText, xOffset, yOffset);
    }

    //ピザの画像の右側にピザのスコアを、材料の画像の右側に材料の合計のスコアを、クリアタイムの右側にタイムボーナスを表示する

    drawScore(ctx){
        const scoreDetailX = 490;
        const scoreDetailMaxX = 740;
        const scoreDetailY = 300;
        const totalScoreX = (scoreDetailX + scoreDetailMaxX) / 2;
        const timeBonusText = this.scoreDetail.timeBonus >= 0 ? "タイムボーナス" : "タイムペナルティ";

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.font = "24px Arial";
        ctx.fillText("合計スコア", totalScoreX, 140);

        ctx.font = "64px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${this.totalScore}`, totalScoreX, 210);

        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("ー スコア内訳 ー", totalScoreX, scoreDetailY - 35);
        ctx.textAlign = "left";
        ctx.fillText("ピザのスコア", scoreDetailX, scoreDetailY);
        ctx.fillText("材料のスコア", scoreDetailX, scoreDetailY + 30);
        ctx.fillText(timeBonusText, scoreDetailX, scoreDetailY + 60);
        ctx.textAlign = "right";
        ctx.fillText(`${this.scoreDetail.pizzaScore}`, scoreDetailMaxX, scoreDetailY);
        ctx.fillText(`${this.scoreDetail.ingredientsScore}`, scoreDetailMaxX, scoreDetailY + 30);
        ctx.fillText(`${this.scoreDetail.timeBonus}`, scoreDetailMaxX, scoreDetailY + 60);

        // ctx.fillStyle = "black";
        // ctx.fillRect(465, 380, 275, 5);

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
