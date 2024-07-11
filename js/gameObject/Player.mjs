// DriveScene で走るプレイヤー
export class Player {
    constructor(x) {
        this.x = x;
        this.d = 0;
        this.xControlSpeed = 30; // px/s
        this.dControlSpeed = 30; // px/s
        this.dSpeed = 60; // px/s
        this.image = new Image();
        this.image.src = '../../resource/image/rider.png';
        this.theta = 0;
        this.inCollision = false;
    }

    draw(max_x, max_y, ctx, pixelSize, cameraDistance) {
        const y = max_y - (this.d - cameraDistance) * pixelSize;
        const x = this.x * pixelSize;
        const scaleFactor = 1.5;
        const centerX = x - this.image.width * scaleFactor / 2;
        const centerY = y - this.image.height * scaleFactor / 2;

        if (this.image.complete) {
            ctx.save();
            ctx.imageSmoothingEnabled = false;
            ctx.translate(
                centerX + this.image.width * scaleFactor / 2,
                centerY + this.image.height * scaleFactor / 2
            );
            ctx.rotate(this.theta);
            ctx.drawImage(
                this.image,
                -this.image.width * scaleFactor / 2,
                -this.image.height * scaleFactor / 2,
                this.image.width * scaleFactor,
                this.image.height * scaleFactor
            );
            ctx.restore();
        }
    }

    updatePosition(deltaTime, leftPressed, rightPressed, upPressed, downPressed) {
        if (this.inCollision) return;
        this.d += this.dSpeed * deltaTime / 1000
        if (leftPressed) {
            this.x -= this.xControlSpeed * deltaTime / 1000
        }
        if (rightPressed) {
            this.x += this.xControlSpeed * deltaTime / 1000
        }
        if (upPressed) {
            this.d += this.dControlSpeed * deltaTime / 1000
        }
        if (downPressed) {
            this.d -= this.dControlSpeed * deltaTime / 1000
        }
        const currentXSpeed = ((rightPressed - leftPressed) * this.xControlSpeed);
        const currentDSpeed = ((upPressed - downPressed) * this.dControlSpeed) + this.dSpeed;
        this.theta = Math.atan(currentXSpeed / currentDSpeed);
    }
}
