import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { pizzaType, imageForPizza } from "../gameObject/pizzas.mjs";
import { ingredientType, imageForIngredient } from "../gameObject/ingredients.mjs"


//リザルト画面
export class ResultScene extends Scene {
    sceneWillAppear(){
        this.NextButton = null;
        
        //仮データ
        this.sharedData.cookedPizza = pizzaType.margherita;
        this.pizza = this.sharedData.cookedPizza;
        //CookingSceneでチーズを1つ、バジルを２つ、トマトを１つ選択したと想定
        this.sharedData.selectedIngredients = {};
        this.sharedData.selectedIngredients[ingredientType.cheese] = 1;
        this.sharedData.selectedIngredients[ingredientType.basil] = 2;
        this.sharedData.selectedIngredients[ingredientType.tomato] = 1;
        
        this.resultIngredients = this.sharedData.selectedIngredients;
        this.sharedData.goalTime = 14.8405241;
        console.log(this.resultIngredients);
        console.log(this.sharedData.goalTime);

        this.pizzaList = {
            margherita: { displayName: 'マルゲリータ', score: 1000},
            marinara: { displayName: 'マリナーラ', score: 2000},
            seafood: { displayName: 'シーフード', score: 3000}
        }

        this.ingredientScore = {
            cheese: 50,
            basil: 75,
            tomato: 100
        }

        this.targetTime = {
            stage1: 20,
            stage2: 25,
            stage3: 30
        }

        this.timeBonusFactor = 1;

        //仮データ終わり
        
        //`スコア = 作ったピザの点数 + 食材毎の点数 +  (目標タイム - 経過時間) * n`

        
    }

    updateStates(deltaTime){}

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.fillStyle = "royalblue";
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
        this.calculateScore();
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
        const xOffset = 350; 
        const yOffset = 200; 
        const itemHeight = 50; // 各食材の高さ
        
        const keys = Object.keys(this.resultIngredients);
        for (let i = 0; i < keys.length; i++) {
            const type = keys[i];
            const count = this.resultIngredients[type];
            const image = imageForIngredient(type);
            const x = xOffset + 10;
            const y = yOffset + (itemHeight * i) + (itemHeight / 2);
            const scaleFactor = 3; // 画像の拡大率を調整
    
            if (image.complete) {
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(
                    image,
                    x,
                    y - (image.height * scaleFactor / 2),
                    image.width * scaleFactor,
                    image.height * scaleFactor
                );
            }
    
            ctx.fillStyle = "black";
            ctx.font = "20px Arial";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(`x${count}`, x + image.width * scaleFactor + 10, y);
        }
    }

    drawPizza(max_x, max_y, ctx) {
        const pizzaImage = imageForPizza(this.sharedData.cookedPizza);
        const xOffset = 150;
        const yOffset = 200;
        const scaleFactor = 5; // 画像の拡大率を調整

        if (pizzaImage.complete) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(
                pizzaImage,
                xOffset,
                yOffset,
                pizzaImage.width * scaleFactor,
                pizzaImage.height * scaleFactor
            );
            
            ctx.fillStyle = "black";
            ctx.font = "20px Arial";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            // ctx.fillText();
        }
    }

    calculateScore() {
    
        // 余分な部分を取り除いてキーを抽出
        const cookedPizzaKey = this.sharedData.cookedPizza.split('.')[1];
    
        const cookedPizzaScore = this.pizzaList[cookedPizzaKey].score;
        let ingredientScoreTotal = 0;
    
        // 食材毎のスコアを計算
        const ingredientKeys = Object.keys(this.sharedData.selectedIngredients);
        for (let i = 0; i < ingredientKeys.length; i++) {
            const ingredientKey = ingredientKeys[i];
            const ingredientCount = this.sharedData.selectedIngredients[ingredientKey];
            const ingredientScore = this.ingredientScore[ingredientKey];
            ingredientScoreTotal += ingredientScore * ingredientCount;
        }

    
        const timeBonus = (this.targetTime.stage1 - this.sharedData.goalTime) * this.timeBonusFactor;

        const totalScore = cookedPizzaScore + ingredientScoreTotal + timeBonus;
        return totalScore;
        
    }
    
}