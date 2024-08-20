// ボタンの状態。値はスプライトシートの行を表す
export const buttonStates = {
    normal: 0,
    hovered: 1,
    clicked: 2,
    disabled: 3,
}

// ボタンのUIの親クラス
export class Button {
    constructor() {
        this.state = buttonStates.normal;
        this.onClick = () => {};

        this.x = null;
        this.y = null;
        this.width = 0;
        this.height = 0;
    }

    updateStates(mouse) {
        if (this.state == buttonStates.disabled) return;
        if (this.x == null || this.y == null) return;

        const isMouseInside = this.isInside(mouse.x, mouse.y);
        const clickStartedInside = this.isInside(mouse.startX, mouse.startY);
        const clicking = isMouseInside && mouse.isDown && clickStartedInside;
        const hovering = isMouseInside && !clicking;
        const touchUpInside = this.state == buttonStates.clicked && hovering;

        if (clicking) {
            this.state = buttonStates.clicked;
        } else if (hovering) {
            this.state = buttonStates.hovered;
        } else {
            this.state = buttonStates.normal;
        }

        if (touchUpInside) this.onClick();
    }

    isInside(x, y) {
        return (x > this.x && x < this.x + this.width)
            && (y > this.y && y < this.y + this.height);
    }

    draw(ctx, x, y) {
        [this.x, this.y] = [x, y];
    }

    // ボタンを無効化
    disable() {
        this.state = buttonStates.disabled
    }

    // ボタンの無効化を解除
    enable() {
        if (this.state != buttonStates.disabled) return;
        this.state = buttonStates.normal;
    }
}

// スプライトシートの画像素材のボタンの親クラス
export class ImgaeButton extends Button {
    constructor(image, columnWidth, rowHeight) {
        super();
        this.image = image;
        this.width = columnWidth;
        this.height = rowHeight;
        this.column = 0;
        this.scaleFactor = 1.0;
        this.mirror = false; // 左右反転して表示する
    }

    isInside(x, y) {
        return (x > this.x && x < this.x + this.width * this.scaleFactor)
            && (y > this.y && y < this.y + this.height * this.scaleFactor);
    }

    draw(ctx, x, y) {
        super.draw(ctx, x, y);
        const image = this.image;
        const [columnWidth, rowHeight] = [this.width, this.height]
        const [column, row] = [this.column, this.state];
        // ミラーの場合は反転
        if (this.mirror) {
            ctx.scale(-1, 1);
            x = -x - this.width * this.scaleFactor
        }
        ctx.drawImage(
            image,
            columnWidth * column, rowHeight * row, columnWidth, rowHeight,
            x, y, this.width * this.scaleFactor, this.height * this.scaleFactor
        );
        // 元に戻す
        if (this.mirror) {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
}

// 単色塗りつぶしのボタン
export class ColorButton extends Button {
    constructor(fillStyles) {
        if (!Object.keys(fillStyles).includes(`${buttonStates.normal}`)) {
            console.error("ColorButtonの色が指定されていません。")
        }
        super();
        this.fillStyles = fillStyles;
    }

    draw(ctx, x, y, width, height) {
        super.draw(ctx, x, y);
        [this.width, this.height] = [width, height];
        ctx.fillStyle = this.fillStyles[this.state] ?? this.fillStyles[buttonStates.normal];
        ctx.fillRect(x, y, width, height);
    }
}
