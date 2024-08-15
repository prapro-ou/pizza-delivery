import { ImgaeButton } from "./Button.mjs";
import { resource } from "../resource.mjs";

// タイトル画面に遷移するボタン
export class TopButton extends ImgaeButton {
    constructor() {
        super(resource.images.topButton, 41, 40);
        this.scaleFactor = 2.0;
    }
}
