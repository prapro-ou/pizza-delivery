import { buttonStates, ColorButton } from "./Button.mjs";
import { resource } from "../resource.mjs";

// ピザレシピの画面に遷移するボタン
export class ItemButton extends ColorButton {
    constructor() {
        super({
            [buttonStates.normal]: "rgba(0, 0, 0, 0)",
            [buttonStates.hovered]: "rgba(255, 255, 255, 0.3)",
            [buttonStates.clicked]: "rgba(0, 0, 0, 0.1)",
            [buttonStates.disabled]: "rgba(0, 0, 0, 0)",
        });
        this.image = resource.images.itemBackGround
        this.scaleFactor = 3.0;
    }

    draw(ctx, x, y) {
        const sf = this.scaleFactor;
        const [w, h] = [this.image.width * sf, this.image.height * sf]
        ctx.drawImage(this.image, x, y, w, h);
        super.draw(ctx, x + sf, y + sf, w - 2 * sf, h - 2 * sf);
        [this.x, this.y, this.width, this.height] = [x, y, w, h];
    }
}
