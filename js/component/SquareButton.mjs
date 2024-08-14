import { Button } from "./Button.mjs";
import { resource } from "../resource.mjs";

export const sqbColors = {
    yellow: 0,
    green: 1,
    white: 2,
}

// タイトルの縁取りの色
const strokeColors = {
    [sqbColors.yellow]: "#7f5500",
    [sqbColors.green]: "#6c7f00",
    [sqbColors.white]: "#7f7b72",
}

export class SquareButton extends Button {
    constructor(sqbColor) {
        if (!Object.values(sqbColors).includes(sqbColor)) console.error("無効なsqbColor:", sqbColor);
        super(resource.images.squareButton, 288, 88);
        this.text = "";
        this.column = sqbColor;
    }

    draw(ctx, x, y) {
        super.draw(ctx, x, y);
        const tx = x + this.columnWidth / 2;
        const ty = y + this.rowHeight / 2 + 14;
        ctx.font = "bold 36px Arial";
        ctx.lineWidth = 5;
        ctx.lineJoin = "round";
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.strokeStyle = strokeColors[this.column];
        ctx.strokeText(this.text, tx, ty);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(this.text, tx, ty);
    }
}
