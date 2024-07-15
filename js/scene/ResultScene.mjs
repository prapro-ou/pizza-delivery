import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { pizzas, pizzaName, pizzaScore,imageForPizza } from "../gameObject/pizzas.mjs";
import { ingredientType, ingredientName, ingredientScore, imageForIngredient } from "../gameObject/ingredients.mjs"


//リザルト画面
export class ResultScene extends Scene {
    sceneWillAppear(){
        this.NextButton = null;
        
        //仮データ
        this.sharedData.cookedPizza = pizzas.margherita;
        this.pizza = this.sharedData.cookedPizza;
        //CookingSceneでチーズを1つ、バジルを２つ、トマトを１つ選択したと想定
        this.sharedData.selectedIngredients = [
            ingredientType.cheese,
            ingredientType.basil,
            ingredientType.basil,
            ingredientType.tomato
        ];

        this.ingredientCounts = this.sharedData.selectedIngredients.reduce((obj, ingredient) => {
            if (obj[ingredient]) {
                obj[ingredient]++;
            } else {
                obj[ingredient] = 1;
            }
            return obj;
        }, {});

        this.sharedData.goalTime = 14.8405241;
        console.log(this.ingredientCounts);
        console.log(this.sharedData.goalTime);

        this.timeBonusFactor = 1;

        //仮データ終わり
        
        //`スコア = 作ったピザの点数 + 食材毎の点数 +  (目標タイム - 経過時間) * n`


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
        ctx.fillText("リザルト画面", 50, 50);

        

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
        // this.calculateScore();
    }

    didTap(x, y){
        let r = this.NextButton;
        if (r && x >= r.x && x <= r.x+r.w && y >= r.y && y <= r.y+r.h) {
            this.didTapNext();
        }
    }
    
    didTapNext() {
        console.log('nextScene');
    }

    drawResultIngredients(max_x, max_y, ctx) {
        const xOffset = 250;
        const yOffset = 400;
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
        const xOffset = 150;
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
        ctx.fillText(pizzaDisplayName, xOffset, yOffset, 100, 100);

    }
    

    calculateScore() {
        let score = 0;
        score += pizzaScore[this.pizza];
        const ingredientKeys = Object.keys(this.resultIngredients);
        for (let i = 0; i < ingredientKeys.length; i++) {
            const ingredientKey = ingredientKeys[i];
            const ingredientCount = this.resultIngredients[ingredientKey];
            score += ingredientScore[ingredientKey] * ingredientCount;
        }
        score += (this.sharedData.goalTime - this.sharedData.elapsedTime) * this.timeBonusFactor;
        console.log(`スコア: ${score}`);
    }
    
}