import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { pizzaName, recipe, pizzaOrder, imageForPizza } from '../gameObject/pizzas.mjs';
import { imageForIngredient } from '../gameObject/ingredients.mjs';
import { dataKeys } from '../dataObject/dataKeysSettings.mjs';
import { resource } from '../resource.mjs';

// ピザコレクション画面
export class PizzaCollectionScene extends Scene {
    sceneWillAppear() {
        this.sceneRouter.setBGM(resource.bgm.MusMusBGM103);
        this.backButtonArea = null;
        this.nextPageButtonArea = null;
        this.previousPageButtonArea = null;
        this.page = 1; //ページ数
        this.pizzaFrame = [];
    }

    updateStates(deltaTime) {}

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        // ピザと材料の画像を配置する枠の位置
        // TODO: 計算で出した値を使うように修正すべき
        this.pizzaFrame = [{x:25, y:100}, {x:25, y:200}, {x:25, y:300}, {x:25, y:400},
                            {x:425, y:100}, {x:425, y:200}, {x:425, y:300}, {x:425, y:400}];

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

        this.renderPage(ctx, this.page);

        if (pizzaOrder.length - this.pizzaFrame.length * this.page > 0) {
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
        } else {
            this.nextPageButtonArea = null;
        }
        if (this.page > 1) {
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
        } else {
            this.previousPageButtonArea = null;
        }
    }

    renderPage(ctx, page) {
        for (let i = 0; i < this.pizzaFrame.length; i++) {
            const pizzaIndex = this.pizzaFrame.length * (page - 1) + i;
            if (pizzaIndex >= pizzaOrder.length) break;
            const pizza = pizzaOrder[pizzaIndex];
            this.drawPizzaAndIngredients(ctx, pizza, this.pizzaFrame[i].x, this.pizzaFrame[i].y);
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
    drawPizzaAndIngredients(ctx, pizza, x, y) {
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, 350, 90);

        // ピザ名
        const fontSize = Math.min(24, 240 / pizzaName[pizza].length)
        ctx.fillStyle = 'black';
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = "left";
        ctx.fillText(pizzaName[pizza], x + 100, y + 25);

        // ピザ画像
        const isUnlocked = this.sceneRouter.load(dataKeys.pizzaInfo).isUnlocked(pizza);
        const pizzaImage = isUnlocked ? imageForPizza(pizza): resource.images.unknownPizza;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(pizzaImage, x, y, 90, 90);

        // 材料画像
        const ingredients = recipe[pizza];
        for (let i = 0; i < ingredients.length; i++) {
            const ingredientImage = imageForIngredient(ingredients[i]);
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(ingredientImage, x + 100 + (i * 60), y + 38, 50, 50);
        }
    }

    // 「タイトルに戻る」ボタンがタップされた
    didTapBack() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(scenes.title);
    }

    // 「→」がタップされた
    didTapNextPage(){
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.page += 1;
    }

    // 「←」がタップされた．
    didTapPrePage(){
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.page -= 1;
    }
}