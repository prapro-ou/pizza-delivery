import { buttonStates, ImgaeButton } from "./Button.mjs";
import { resource } from "../resource.mjs";

export const sqbColors = {
    yellow: 0,
    green: 1,
    white: 2,
}

// タイトルの縁取りの色
const strokeColors = {
    [sqbColors.yellow]: ["#7f5500", "#585858"],
    [sqbColors.green]: ["#6c7f00", "#6b6b6b"],
    [sqbColors.white]: ["#7f7b72", "#7b7b7b"],
}

export class SquareButton extends ImgaeButton {
    constructor(sqbColor) {
        if (!Object.values(sqbColors).includes(sqbColor)) console.error("無効なsqbColor:", sqbColor);
        super(resource.images.squareButton, 288, 88);
        this.text = "";
        this.column = sqbColor;
    }

    draw(ctx, x, y) {
        super.draw(ctx, x, y);
        const tx = x + this.width * this.scaleFactor / 2;
        const ty = y + (this.height / 2 + 14) * this.scaleFactor;
        ctx.font = `bold ${Math.round(36 * this.scaleFactor)}px Arial`;
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
