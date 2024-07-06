import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";

// ピザコレクション画面
export class PizzaCollectionScene extends Scene {
    sceneWillAppear() {
        this.backButtonArea = null;
        this.nextPageButtonArea = null;
        this.previousPageButtonArea = null;
        this.page = 1; //ページ数

        this.pizzaExampleImage1 = new Image();
        this.pizzaExampleImage2 = new Image();
        this.pizzaExampleImage1.src = "../../resources/image/margherita.png";
        this.pizzaExampleImage2.src = "../../resources/image/marinara.png";
    }

    updateStates(deltaTime) {}

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        //ピザと材料の画像を配置する枠の位置
        //計算で出した値を使うように修正すべきかも
        const pizzaFrame = [{x:25, y:100}, {x:25, y:200}, {x:25, y:300}, {x:25, y:400},
                            {x:425, y:100}, {x:425, y:200}, {x:425, y:300}, {x:425, y:400} ]

        ctx.fillStyle = "pink";
        ctx.fillRect(0, 0, max_x, max_y);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`ピザコレクション画面${this.page}`, 50, 50);

        //ピザの画像とレシピを表示する矩形を配置
        for(let i = 0; i <= 7; i++){
            ctx.fillStyle = "gray";
            ctx.fillRect(pizzaFrame[i].x, pizzaFrame[i].y, 350, 90);
        
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

            //ピザの画像を配置  
            //現在はmargherita.pngを仮置き
            for(let i = 0; i <= 7; i++){
            
                if(this.pizzaExampleImage1.complete) {
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(this.pizzaExampleImage1, pizzaFrame[i].x, pizzaFrame[i].y, 90, 90);
                }
            }

            //材料の画像を配置


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

            //ピザの画像を配置
            //現在はmarinara.pngを仮置き
            for(let i = 0; i <= 7; i++){
            
                if(this.pizzaExampleImage2.complete) {
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(this.pizzaExampleImage2, pizzaFrame[i].x, pizzaFrame[i].y, 90, 90);
                }
            }

            //材料の画像を配置
            
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