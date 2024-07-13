import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { pizzaType, imageForPizza} from "../gameObject/pizzas.mjs";
import { ingredientType, imageForIngredient} from "../gameObject/ingredients.mjs"


//スコアリザルト画面
export class ScoreResultScene extends Scene {
    sceneWillAppear(){
        this.NextButton = null;
        
        //CookingSceneでチーズを1つ、バジルを２つ、トマトを１つ選択したと想定
        this.sharedData.selectedIngredients = {};
        this.sharedData.selectedIngredients[ingredientType.cheese] = 1;
        this.sharedData.selectedIngredients[ingredientType.basil] = 2;
        this.sharedData.selectedIngredients[ingredientType.tomato] = 1;
        
        this.resultIngredients = this.sharedData.selectedIngredients;
        console.log(this.resultIngredients);
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
        ctx.fillText("スコアリザルト画面", 50, 50);

        

        let r = { x: max_x - 300, y: max_y - 100, w: 200, h: 50 };
        this.NextButton = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("次のシーンへ", r.x + r.w / 2, r.y + r.h / 2);

        this.drawResultIngredients(max_x, max_y, ctx);
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
        const areaWidth = 80; // 白い枠の幅
        const itemHeight = 30; // 各食材の高さ
    
        ctx.fillStyle = "white";
        ctx.fillRect(xOffset, yOffset, areaWidth, itemHeight * Object.keys(this.resultIngredients).length);
    
        const keys = Object.keys(this.resultIngredients);
        for (let i = 0; i < keys.length; i++) {
            const type = keys[i];
            const count = this.resultIngredients[type];
            const image = imageForIngredient(type);
            const x = xOffset + 10;
            const y = yOffset + (itemHeight * i) + (itemHeight / 2);
            const scaleFactor = 2; // 画像の拡大率を調整
    
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
    
}