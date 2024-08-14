// ボタンの状態。値はスプライトシートの行を表す
const buttonStates = {
    normal: 0,
    hovered: 1,
    clicked: 2,
    disabled: 3,
}

// 四角いボタンのUI
export class Button {
    constructor(image, columnWidth, rowHeight) {
        this.image = image;
        this.columnWidth = columnWidth;
        this.rowHeight = rowHeight;
        this.column = 0;
        this.state = buttonStates.normal; // = row

        this.onClick = () => {};
        this.scaleFactor = 1.0;
        this.mirror = false;

        this.x = null;
        this.y = null;
    }

    updateStates(mouse) {
        if (this.state == buttonStates.disabled) return;
        if (!this.x || !this.y) return;

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
        return (x > this.x && x < this.x + this.columnWidth)
            && (y > this.y && y < this.y + this.rowHeight);
    }

    draw(ctx, x, y) {
        [this.x, this.y] = [x, y];
        const image = this.image;
        const [columnWidth, rowHeight] = [this.columnWidth, this.rowHeight]
        const [column, row] = [this.column, this.state];
        ctx.drawImage(
            image,
            columnWidth * column, rowHeight * row, columnWidth, rowHeight,
            x, y, columnWidth, rowHeight
        );
    }
}