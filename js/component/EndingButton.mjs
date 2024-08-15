import { ImgaeButton } from "./Button.mjs";
import { resource } from "../resource.mjs";

// エンディングコレクションの画面に遷移するボタン
export class EndingButton extends ImgaeButton {
    constructor() {
        super(resource.images.bookButton, 43, 42);
        this.scaleFactor = 3.0;
    }
}
