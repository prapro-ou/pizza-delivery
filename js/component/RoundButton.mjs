import { buttonStates, ImgaeButton } from "./Button.mjs";
import { resource } from "../resource.mjs";

export const rndbColors = {
    green: 0,
    red: 1,
}

// テキストの縁取りの色
const strokeColors = {
    [rndbColors.green]: ["#6c7f00", "#6b6b6b"],
    [rndbColors.red]: ["#7f2630", "#424242"],
}

export class RoundButton extends ImgaeButton {
    constructor(rndbColor) {
        if (!Object.values(rndbColors).includes(rndbColor)) console.error("無効なrndbColor:", rndbColor);
        super(resource.images.roundButton, 249, 88);
        this.text = "";
        this.column = rndbColor;
    }

    draw(ctx, x, y) {
        super.draw(ctx, x, y);
        const tx = x + this.width / 2;
        const ty = y + this.height / 2 + 14;
        ctx.font = "bold 36px Arial";
        ctx.lineWidth = 5;
        ctx.lineJoin = "round";
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.strokeStyle = strokeColors[this.column][this.state == buttonStates.disabled ? 1 : 0];
        ctx.strokeText(this.text, tx, ty);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(this.text, tx, ty);
    }
}
