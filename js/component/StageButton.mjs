import { ImgaeButton } from "./Button.mjs";
import { resource } from "../resource.mjs";

export const stgbColors = {
    green: 0,
    purple: 1,
    pink: 2,
    orange: 3,
    blue: 4,
}

// ステージ選択の時に使うボタン
export class StageButton extends ImgaeButton {
    constructor(stgbColor) {
        if (!Object.values(stgbColors).includes(stgbColor)) console.error("無効なsqbColor:", stgbColor);
        super(resource.images.stageButton, 128, 136);
        this.column = stgbColor;
    }
}
