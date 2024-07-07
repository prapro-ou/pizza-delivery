import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";

// ピザコレクション画面
export class EndingCollectionScene extends Scene {
    sceneWillAppear() {
        this.backButtonArea = null;
        this.nextPageButtonArea = null;
        this.previousPageButtonArea = null;
        this.page = 1; //ページ数
    }

    updateStates(deltaTime) {

    }

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        //ピザと材料の画像を配置する枠の位置
        //計算で出した値を使うように修正すべきかも
        const endingFrame = [{x:50, y:100}, {x:50, y:250},  {x:50, y:400}, 
                             {x:450, y:100}, {x:450, y:250}, {x:450, y:400} ]

        ctx.fillStyle = "pink";
        ctx.fillRect(0, 0, max_x, max_y);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`エンディングコレクション画面${this.page}`, 50, 50);

        //エンディングの画像とヒントを表示する矩形を配置
        for(let i = 0; i <= 5; i++){
            ctx.fillStyle = "white";
            ctx.fillRect(endingFrame[i].x, endingFrame[i].y, 275, 125);
        
            // if(this.pizzaExampleImage1.complete) {
            //     ctx.imageSmoothingEnabled = false;
            //     ctx.drawImage(this.pizzaExampleImage1, pizzaFrame[i].x, pizzaFrame[i].y, 90, 90);
            // }
        }
        

        // タイトルに戻るボタン
        let r = { x: max_x / 2 - 100, y: max_y - 100, w: 200, h: 50 };
        this.backButtonArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("タイトルに戻る", r.x + r.w / 2, r.y + r.h / 2);


        // 1ページ目
        if(this.page === 1){

            //エンディングのテキストを配置
            //現在はxxxエンディングを仮置き
            for(let i = 0; i <= 5; i++){
            
                //if(this.xxxEnding.complete) {
                    ctx.fillStyle = "black";
                    ctx.font = "30px Arial";
                    ctx.textAlign = "left";
                    ctx.fillText(`xxxエンディング`, endingFrame[i].x + 25, endingFrame[i].y+20 );
                //}
            }

            //ヒントのテキストを配置
            for(let i = 0; i <= 5; i++) {
                 
                //iに応じて表示するヒントを変える
                    ctx.fillStyle = "black";
                    ctx.font = "15px Arial";
                    ctx.textAlign = "left";
                    ctx.fillText("xxxエンディングのヒント", endingFrame[i].x + 5 , endingFrame[i].y + 50 );
            }


            // 次のページに遷移するボタン
            r = { x: max_x - 50, y: max_y - 100, w: 50, h: 50 }
            this.nextPageButtonArea = r;
            ctx.fillStyle = "blue";
            ctx.fillRect(r.x, r.y, r.w, r.h);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("→", r.x + r.w / 2, r.y + r.h / 2);
        }

        //2ページ目
        if(this.page === 2){

           //エンディングのテキストを配置
            //現在はoooエンディングを仮置き
            for(let i = 0; i <= 5; i++){
            
                //if(this.xxxEnding.complete) {
                    ctx.fillStyle = "black";
                    ctx.font = "30px Arial";
                    ctx.textAlign = "left";
                    ctx.fillText(`oooエンディング`, endingFrame[i].x + 25, endingFrame[i].y+20 );
                //}
            }

            //ヒントのテキストを配置
            for(let i = 0; i <= 5; i++) {
                 
                //iに応じて表示するヒントを変える
                    ctx.fillStyle = "black";
                    ctx.font = "15px Arial";
                    ctx.textAlign = "left";
                    ctx.fillText("oooエンディングのヒント", endingFrame[i].x + 5 , endingFrame[i].y + 50 );
            }
            
            // 前のページに遷移するボタン
            r = { x: 0, y: max_y - 100, w: 50, h: 50 }
            this.previousPageButtonArea = r;
            ctx.fillStyle = "blue";
            ctx.fillRect(r.x, r.y, r.w, r.h);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("←", r.x + r.w / 2, r.y + r.h / 2);
        }


    }

    // 画面内のどこかがタップされた
    didTap(x, y) {
        let r = this.backButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapBack();
        }
        r = this.nextPageButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapNextPage();
        }
        r = this.previousPageButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapPrePage();
        }
    }

    
    drawPizzaAndIngredients(ctx, pizzaName, ingredients, x, y) {
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, 350, 90);

        const pizzaImage = this.pizzaImages[pizzaName];
        if (pizzaImage && pizzaImage.complete) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(pizzaImage, x, y, 90, 90);
        }

        ingredients.forEach((ingredient, index) => {
            const ingredientImage = this.ingredientImages[ingredient];
            if (ingredientImage && ingredientImage.complete) {
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(ingredientImage, x + 100 + (index * 60), y, 50, 50);
            }
        });
    }
    
    // 「タイトルに戻る」ボタンがタップされた
    didTapBack() {
        this.sceneRouter.changeScene(scenes.title);
    }

    // 「→」がタップされた
    didTapNextPage(){
        this.page = 2;

    }

    // 「←」がタップされた．
    didTapPrePage(){
        this.page = 1;
    }

}