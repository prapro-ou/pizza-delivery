import { ImgaeButton } from "./Button.mjs";
import { resource } from "../resource.mjs";

// ピザレシピの画面に遷移するボタン
export class PizzaRecipeButton extends ImgaeButton {
    constructor() {
        super(resource.images.recipeButton, 36, 40);
        this.scaleFactor = 3.0;
    }
}
