import { resource } from "../resource.mjs";

const letters = "0123456789AEGIMST:"
const letterWidth = 14;
const letterHeight = 16;

// x8y12pxTheStrongGamer のフォントでテキストを描画する
export class TheStrongGamerLabel {
    constructor() {
        this.image = resource.images.theStrongGamerWhiteFont;
        this.text = "";
        this.spacing = 2;
    }

    draw(ctx, x, y) {
        ctx.imageSmoothingEnabled = false;
        let tx = x;
        [...this.text].forEach((char) => {
            let index = letters.indexOf(char);
            if (index != -1) {
                ctx.drawImage(
                    this.image,
                    letterWidth * index, 0, letterWidth, letterHeight,
                    tx, y, letterWidth, letterHeight
                );
            } else {
                console.error("使用できない文字:", char);
            }
            tx += letterWidth + this.spacing;
        })
    }
}
