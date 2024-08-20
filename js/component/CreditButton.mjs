import { ImgaeButton } from "./Button.mjs";
import { resource } from "../resource.mjs";

// ピザレシピの画面に遷移するボタン
export class CreditButton extends ImgaeButton {
    constructor() {
        super(resource.images.creditButton, 49, 58);
        this.scaleFactor = 1.0;
    }
}
