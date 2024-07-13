// 障害物の親クラス
export class Obstacle {
    constructor(x, d) {
        this.type = null;
        this.x = x;
        this.d = d;
        this.image = null;
        this.scaleFactor = 1;
    }

    draw(max_x, max_y, ctx, pixelSize, cameraDistance) {
        const y = max_y - (this.d - cameraDistance) * pixelSize;
        const x = this.x * pixelSize;

        if (this.image.complete) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(
                this.image,
                x - this.image.width * this.scaleFactor / 2,
                y - this.image.height * this.scaleFactor / 2,
                this.image.width * this.scaleFactor,
                this.image.height * this.scaleFactor,
            );
        }
        // // 当たり判定の確認用
        // ctx.fillStyle = "rgba(" + [255, 0, 255, 0.5] + ")";
        // ctx.fillRect(x - this.image.width * this.scaleFactor / 2, y - this.image.height * this.scaleFactor / 2, this.image.width * this.scaleFactor, this.image.height * this.scaleFactor)
    }
}
