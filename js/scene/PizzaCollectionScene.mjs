import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { resource } from '../resource.mjs';

// ピザコレクション画面
export class PizzaCollectionScene extends Scene {
    sceneWillAppear() {
        this.sceneRouter.setBGM(resource.bgm.MusMusBGM103);
        this.backButtonArea = null;
        this.nextPageButtonArea = null;
        this.previousPageButtonArea = null;
        this.page = 1; //ページ数

        this.pizzaImages = { // ピザの画像
            margherita: resource.images.margherita,
            marinara: resource.images.marinara,
            seafood: resource.images.seafood
        }

        this.ingredientImages = { //材料の画像
            cheese: resource.images.cheese,
            basil: resource.images.basil,
            octopus: resource.images.octopus,
            tomato: resource.images.tomato,
            onion: resource.images.onion,
            squid: resource.images.squid,
        };
    }

    updateStates(deltaTime) {}

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        //ピザと材料の画像を配置する枠の位置
        //計算で出した値を使うように修正すべき
        const pizzaFrame = [{x:25, y:100}, {x:25, y:200}, {x:25, y:300}, {x:25, y:400},
                            {x:425, y:100}, {x:425, y:200}, {x:425, y:300}, {x:425, y:400} ]

        ctx.fillStyle = "pink";
        ctx.fillRect(0, 0, max_x, max_y);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`ピザコレクション画面${this.page}`, 50, 50);

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

            // sharedDataの形式に合わせて後ほど修正
            const pizzasPage1 = [
                { name: 'margherita', displayName:'マルゲリータ', ingredients: ['cheese', 'tomato', 'onion', 'basil'] },
                { name: 'marinara', displayName:'マリナーラ', ingredients: ['basil', 'octopus', 'cheese', 'squid'] },
                { name: 'seafood', displayName:'シーフード', ingredients: ['basil', 'octopus', 'cheese', 'squid'] },
                { name: 'margherita', displayName:'マルゲリータ', ingredients: ['cheese', 'tomato', 'onion', 'basil'] },
                { name: 'marinara', displayName:'マリナーラ', ingredients: ['basil', 'octopus', 'cheese', 'squid'] },
                { name: 'marinara', displayName:'マリナーラ', ingredients: ['basil', 'octopus', 'cheese', 'squid'] },
                { name: 'margherita', displayName:'マルゲリータ', ingredients: ['cheese', 'tomato', 'onion', 'basil'] },
                { name: 'seafood', displayName:'シーフード', ingredients: ['cheese', 'cheese', 'cheese', 'cheese'] }
            ];

            for (let i = 0; i < 8; i++) {
                const pizza = pizzasPage1[i];
                this.drawPizzaAndIngredients(ctx, pizza.name, pizza.displayName, pizza.ingredients, pizzaFrame[i].x, pizzaFrame[i].y);
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

            const pizzasPage2 = [
                { name: 'margherita', displayName:'マルゲリータ', ingredients: ['cheese', 'tomato', 'onion', 'basil'] },
                { name: 'margherita', displayName:'マルゲリータ', ingredients: ['cheese', 'tomato', 'onion', 'basil'] },
                { name: 'margherita', displayName:'マルゲリータ', ingredients: ['cheese', 'tomato', 'onion', 'basil'] },
                { name: 'marinara', displayName:'マリナーラ', ingredients: ['basil', 'octopus', 'cheese', 'squid'] },
                { name: 'marinara', displayName:'マリナーラ', ingredients: ['basil', 'octopus', 'cheese', 'squid'] },
                { name: 'seafood', displayName:'シーフード', ingredients: ['basil', 'octopus', 'cheese', 'squid'] },
                { name: 'marinara', displayName:'マリナーラ', ingredients: ['basil', 'octopus', 'cheese', 'squid'] },
                { name: 'seafood', displayName:'シーフード', ingredients: ['cheese', 'cheese', 'cheese', 'cheese'] }
            ];

            for (let i = 0; i < 8; i++) {
                const pizza = pizzasPage2[i];
                this.drawPizzaAndIngredients(ctx, pizza.name, pizza.displayName,pizza.ingredients, pizzaFrame[i].x, pizzaFrame[i].y);
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

    // ピザの画像とピザ名と材料の画像を描画
    drawPizzaAndIngredients(ctx, pizzaName, displayName, ingredients, x, y) {
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, 350, 90);

        // ピザ名
        // FIXME：名前が長い(クアトロ・フォルマッジやスパイシーシーフードピザ)は
        //        ピザは枠に入りきらない
        ctx.fillStyle = 'black';
        ctx.font = "30px Arial";
        ctx.textAlign = "left";
        ctx.fillText(displayName, x + 100, y + 25);

        // ピザ画像
        const pizzaImage = this.pizzaImages[pizzaName];
        if (pizzaImage && pizzaImage.complete) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(pizzaImage, x, y, 90, 90);
        }

        // 材料画像
        ingredients.forEach((ingredient, index) => {
            const ingredientImage = this.ingredientImages[ingredient];
            if (ingredientImage && ingredientImage.complete) {
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(ingredientImage, x + 100 + (index * 60), y + 38, 50, 50);
            }
        });
    }
    
    // 「タイトルに戻る」ボタンがタップされた
    didTapBack() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(scenes.title);
    }

    // 「→」がタップされた
    didTapNextPage(){
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.page = 2;

    }

    // 「←」がタップされた．
    didTapPrePage(){
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.page = 1;
    }



}