// Canvasへの描画ロジックを記述したクラス
export class Renderer {
    constructor(ctx, canvas_width, canvas_height) {
        this.ctx = ctx;
        this.max_x = canvas_width;
        this.max_y = canvas_height;
    }

    // すべてクリアする。css/main.cssで記述しているbackground-colorが画面全体に映し出されます
    clear() {
        this.ctx.clearRect(0, 0, this.max_x, this.max_y);
    }

    // 長方形を描画する
    fillRect(color, x, y, width, height) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    // テキストを描画する
    fillText(text, x, y, color, alignment, font) {
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.font = font;
        this.ctx.fillText(text, x, y);
    }

    // ボタンを描画する
    drawButton(text, x, y, width, height, textColor, bgColor, font) {
        // 背景の描画
        this.ctx.fillStyle = bgColor;
        this.ctx.fillRect(x, y, width, height);

        // テキストの描画
        this.ctx.fillStyle = textColor;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = font;
        this.ctx.fillText(text, x + width / 2, y + height / 2);
    }
}
