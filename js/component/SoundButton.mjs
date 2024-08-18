import { ImgaeButton } from "./Button.mjs";
import { resource } from "../resource.mjs";

export const sndbStates = {
    off: 0,
    on: 1,
}

export class SoundButton extends ImgaeButton {
    constructor(sndbState) {
        if (!Object.values(sndbStates).includes(sndbState)) console.error("無効なsndbState:", sndbState);
        super(resource.images.soundButton, 69, 58);
        this.column = sndbState;
    }

    setSoundButtonState(sndbState) {
        this.column = sndbState;
    }
}