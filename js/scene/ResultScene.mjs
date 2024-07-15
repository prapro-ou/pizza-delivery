import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { pizzas, pizzaName, pizzaScore,imageForPizza } from "../gameObject/pizzas.mjs";
import { ingredientType, ingredientName, ingredientScore, imageForIngredient } from "../gameObject/ingredients.mjs"


//リザルト画面
export class ResultScene extends Scene {
    sceneWillAppear(){
        this.NextButton = null;
        
        //仮データ
        this.sharedData.cookedPizza = pizzas.marinara;
        this.pizza = this.sharedData.cookedPizza;
        //CookingSceneでチーズを1つ、バジルを２つ、トマトを１つ選択したと想定
        this.sharedData.selectedIngredients = [
            ingredientType.cheese,
            ingredientType.basil,
            ingredientType.basil,
            ingredientType.tomato,
            
        ];

        this.ingredientCounts = this.sharedData.selectedIngredients.reduce((obj, ingredient) => {
            if (obj[ingredient]) {
                obj[ingredient]++;
            } else {
                obj[ingredient] = 1;
            }
            return obj;
        }, {});

        
        // ゴールまでの時間
        this.sharedData.goalTime = 16.8405241;

        //規定タイム
        this.sharedData.targetTime = 20;

        this.timeBonusFactor = 1;




        // this.score = {
        //     pizzaScore: [number],
        //     ingredientsScore: [number],
        //     timeBonus:  [number],
        // }

        this.score = this.calculateScore();
        this.totalScore = this.score.pizzaScore + this.score.ingredientsScore + this.score.timeBonus;

        console.log('トータルスコア : ' + this.totalScore);


        //仮データ終わり
        
        
        
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

        this.drawPizza(max_x,max_y,ctx);

        this.drawResultIngredients(max_x, max_y, ctx);

        this.drawTime(max_x, max_y, ctx);

        this.drawScore(max_x, max_y, ctx);
        
    }

    didTap(x, y){
        let r = this.NextButton;
        if (r && x >= r.x && x <= r.x+r.w && y >= r.y && y <= r.y+r.h) {
            this.didTapNext();
        }
    }
    
    didTapNext() {
        console.log('セーブスロット選択画面へ遷移');
    }

    drawResultIngredients(max_x, max_y, ctx) {
        const xOffset = 150;
        const yOffset = 250;
        const scaleFactor = 5; // 画像の拡大率を調整
        
        const ingredientKeys = Object.keys(this.ingredientCounts);
        // console.log(ingredientKeys);
        for (let i = 0; i < ingredientKeys.length; i++) {
            const ingredient = ingredientKeys[i];
            const ingredientCount = this.ingredientCounts[ingredient];
            // console.log(ingredient);
            const ingredientImage = imageForIngredient(ingredient);
            if (ingredientImage.complete) {
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(
                    ingredientImage,
                    xOffset + i * 100,
                    yOffset,
                    ingredientImage.width * scaleFactor,
                    ingredientImage.height * scaleFactor
                );
                ctx.fillStyle = "black";
                ctx.font = "20px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(`x${ingredientCount}`, xOffset + i * 100 + ingredientImage.width * scaleFactor / 2, yOffset + ingredientImage.height * scaleFactor + 10);
            }
        }
    }

    drawPizza(max_x, max_y, ctx) {
        const xOffset = max_x / 2 - 50;
        const yOffset = 100;
        const scaleFactor = 5; // 画像の拡大率を調整
        const pizzaImage = imageForPizza(this.pizza);
        if (pizzaImage.complete) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(
                pizzaImage,
                xOffset,
                yOffset,
                pizzaImage.width * scaleFactor,
                pizzaImage.height * scaleFactor
            );
        }

        const pizzaDisplayName = pizzaName[this.pizza];

        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(pizzaDisplayName, xOffset + 40, yOffset + 100, 100, 100);

    }

    //クリアタイムを画面左下に表示する
    drawTime(max_x, max_y, ctx) {
        const time = this.sharedData.goalTime;
        const timeText = `クリアタイム: ${time.toFixed(2)}s`;

        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.fillText(timeText, 400, 450);
    }

    //ピザの画像の右側にピザのスコアを、材料の画像の右側に材料の合計のスコアを、クリアタイムの右側にタイムボーナスを表示する

    drawScore(max_x, max_y, ctx){
        const pizzaScoreText = `ピザのスコア: ${this.score.pizzaScore}`;
        const ingredientsScoreText = `材料のスコア: ${this.score.ingredientsScore}`;
        const timeBonusText = `タイムボーナス: ${this.score.timeBonus}`;
        const totalScoreText = `合計スコア: ${this.totalScore}`;

        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.fillText(pizzaScoreText, 700, 150);
        ctx.fillText(ingredientsScoreText, 700, 300);
        ctx.fillText(timeBonusText, 700, 450);

        ctx.font = "30px Arial";
        ctx.fillText(totalScoreText, 400, 570);

    }


    //スコア = 作ったピザの点数 + 食材毎の点数 +  max(0, (目標タイム - 経過時間) * timeBonusFactor)
    calculateScore() {

        const scoreDetails = {
            pizzaScore: 0,
            ingredientsScore: 0,
            timeBonus: 0,
        }

        scoreDetails.pizzaScore = pizzaScore[this.pizza];

        for(let ingredientKey in this.ingredientCounts){
            scoreDetails.ingredientsScore += ingredientScore[ingredientKey] * this.ingredientCounts[ingredientKey];
        }

        scoreDetails.timeBonus =  Math.max(0, Math.round((this.sharedData.targetTime - this.sharedData.goalTime) * this.timeBonusFactor));
        return scoreDetails;
    }
}
