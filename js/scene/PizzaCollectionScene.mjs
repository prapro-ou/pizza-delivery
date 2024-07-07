import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";

// ピザコレクション画面
export class PizzaCollectionScene extends Scene {
    sceneWillAppear() {
        this.backButtonArea = null;
        this.nextPageButtonArea = null;
        this.previousPageButtonArea = null;
        this.page = 1; //ページ数

        this.pizzaImages = {
            margherita: new Image(),
            marinara: new Image(),
            seafood: new Image()
        }

        // this.pizzaMargherita = new Image();
        // this.pizzaMarinara = new Image();
        // this.pizzaSeafood = new Image();

        this.ingredientImages = {
            cheese: new Image(),
            basil: new Image(),
            octopus: new Image(),
            tomato: new Image(),
            onion: new Image(),
            squid: new Image(),
        };

        // this.ingredientCheese = new Image();
        // this.ingredientBasil = new Image();
        // this.ingredientOctopus = new Image();
        // this.ingredientTomato = new Image();
        
        this.pizzaImages.margherita.src = "../../resources/image/margherita.png";
        this.pizzaImages.marinara.src = "../../resources/image/marinara.png";
        this.pizzaImages.seafood.src = "../../resources/image/seafood.png"

        this.ingredientImages.cheese.src = "../../resources/image/cheese.png";
        this.ingredientImages.basil.src = "../../resources/image/basil.png";
        this.ingredientImages.octopus.src = "../../resources/image/octopus.png";
        this.ingredientImages.tomato.src = "../../resources/image/tomato.png";
        this.ingredientImages.onion.src = "../../resources/image/onion.png";
        this.ingredientImages.squid.src = "../../resources/image/squid.png";

        this.imagesLoaded = 0;
        const images = [
            ...Object.values(this.pizzaImages),
            ...Object.values(this.ingredientImages)
        ];

        // 画像の読み込み
        images.forEach(image => { 
            image.onload = () => {
                this.imagesLoaded++;
                if (this.imagesLoaded === images.length) {
                    this.allImagesLoaded = true;
                }
            };
            image.onerror = () => {
                console.error(`Failed to load image: ${image.src}`);
            };
        });

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

        // //ピザの画像とレシピを表示する矩形を配置
        // for(let i = 0; i <= 7; i++){
        //     ctx.fillStyle = "white";
        //     ctx.fillRect(pizzaFrame[i].x, pizzaFrame[i].y, 350, 90);
        
        //     // if(this.pizzaExampleImage1.complete) {
        //     //     ctx.imageSmoothingEnabled = false;
        //     //     ctx.drawImage(this.pizzaExampleImage1, pizzaFrame[i].x, pizzaFrame[i].y, 90, 90);
        //     // }
        // }

        
        

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

            if (this.allImagesLoaded) {
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

            if (this.allImagesLoaded) {
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

    // ピザの画像とピザ名と材料を描画
    drawPizzaAndIngredients(ctx, pizzaName, displayName, ingredients, x, y) {
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, 350, 90);

        ctx.fillStyle = 'black';
        ctx.font = "30px Arial";
        ctx.textAlign = "left";
        ctx.fillText(displayName, x + 100, y + 25);

        const pizzaImage = this.pizzaImages[pizzaName];
        if (pizzaImage && pizzaImage.complete) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(pizzaImage, x, y, 90, 90);
        }

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