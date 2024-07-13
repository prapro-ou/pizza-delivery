// DriveScene で走るプレイヤー
export class Player {
    constructor(x) {
        this.x = x;
        this.d = 0;
        this.xControlSpeed = 20; // px/s
        this.dControlSpeed = 30; // px/s
        this.dSpeed = 50; // px/s
        this.dBoostedSpeed = 0; // 加速板でブーストされた速度
        this.dBoostedSpeedDecay = 60; // 加速板でブーストされた速度の減衰速度 px/s^2
        this.image = new Image();
        this.image.src = 'resource/image/rider.png';
        this.theta = 0;
        this.inCollision = false;
        this.collideAnimating = false;
        this.collideAnimationDuration = 1; // 秒 アニメーション継続時間
        this.collideAnimationTime = 0; // 秒 アニメーション開始からの経過時間
        this.collideAnimationFromX = 0;
        this.collideAnimationToX = 0;
    }

    draw(max_x, max_y, ctx, pixelSize, cameraDistance) {
        const y = max_y - (this.d - cameraDistance) * pixelSize;
        const x = this.x * pixelSize;
        const scaleFactor = 1.4;
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
            if (this.inCollision) {
                ctx.globalAlpha = 0.7;
            }
            ctx.drawImage(
                this.image,
                -this.image.width * scaleFactor / 2,
                -this.image.height * scaleFactor / 2,
                this.image.width * scaleFactor,
                this.image.height * scaleFactor
            );
            ctx.restore();
            // // 当たり判定の確認用
            // ctx.fillStyle = "blue"
            // ctx.fillRect(x-4, y-4, 8, 8)
        }
    }

    updatePosition(deltaTime, leftPressed, rightPressed, upPressed, downPressed) {
        if (this.collideAnimating) {
            this.collideAnimationTime += deltaTime / 1000;
            const ratio = this.collideAnimationTime / this.collideAnimationDuration;
            this.x = this.collideAnimationFromX * (1 - ratio) + this.collideAnimationToX * ratio;
        }

        if (this.inCollision) return;
        this.d += (this.dSpeed + this.dBoostedSpeed) * deltaTime / 1000
        this.dBoostedSpeed = Math.max(0, this.dBoostedSpeed - this.dBoostedSpeedDecay * deltaTime / 1000)
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

    collideAndBackToCenter(roadX) {
        this.inCollision = true;
        const { center } = roadX(this.d);
        setTimeout(() => {
            this.collideAnimating = true;
            this.collideAnimationDuration = 0.4;
            this.collideAnimationTime = 0;
            this.collideAnimationFromX = this.x;
            this.collideAnimationToX = center;
        }, 400);
        setTimeout(() => {
            this.collideAnimating = false;
        }, 800);
        setTimeout(() => {
            this.inCollision = false;
            this.x = center;
        }, 1000);
    }
}
