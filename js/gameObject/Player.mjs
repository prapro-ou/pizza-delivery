// DriveScene で走るプレイヤー
export class Player {
    constructor(x, speedSetting) {
        this.x = x;
        this.d = 0;
        this.xControlSpeed = speedSetting.playerXControlSpeed; // px/s
        this.dControlSpeed = speedSetting.playerDControlSpeed; // px/s
        this.dSpeed = speedSetting.playerDSpeed; // px/s
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
        const xSpeed = 0
            + this.getXControlledSpeed(leftPressed, rightPressed, deltaTime);
        const dSpeed = this.dSpeed
            + this.getDBoostedSpeed(deltaTime)
            + this.getDControlledSpeed(upPressed, downPressed, deltaTime);
        this.x += xSpeed * deltaTime / 1000;
        this.d += dSpeed * deltaTime / 1000;
        this.theta = Math.atan(xSpeed / dSpeed);
    }

    getDBoostedSpeed(deltaTime) {
        this.dBoostedSpeed = Math.max(0, this.dBoostedSpeed - this.dBoostedSpeedDecay * deltaTime / 1000)
        return this.dBoostedSpeed
    }

    getDControlledSpeed(upPressed, downPressed, deltaTime) {
        let dSpeed = 0
        if (upPressed) {
            dSpeed += this.dControlSpeed
        }
        if (downPressed) {
            dSpeed -= this.dControlSpeed
        }
        return dSpeed;
    }

    getXControlledSpeed(leftPressed, rightPressed, deltaTime) {
        let xSpeed = 0
        if (leftPressed) {
            xSpeed -= this.xControlSpeed
        }
        if (rightPressed) {
            xSpeed += this.xControlSpeed
        }
        return xSpeed
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


// 慣性付きのプレイヤー
export class PlayerWithInertia extends Player {
    constructor(x) {
        super(x);
        this.xAcceleratedSpeed = 0;
        this.xControlAcceleration = 50; // px/s^2
        this.dAcceleratedSpeed = 0;
        this.dControlAcceleration = 50; // px/s^2
        this.dAccelerationDecay = 50; // px/s^2
    }

    getDControlledSpeed(upPressed, downPressed, deltaTime) {
        if (upPressed && !downPressed) {
            this.dAcceleratedSpeed += this.dControlAcceleration * deltaTime / 1000
            this.dAcceleratedSpeed = Math.min(this.dAcceleratedSpeed, this.dControlSpeed)
        }
        if (downPressed && !upPressed) {
            this.dAcceleratedSpeed -= this.dControlAcceleration * deltaTime / 1000
            this.dAcceleratedSpeed = Math.max(this.dAcceleratedSpeed, -this.dControlSpeed)
        }
        if (upPressed == downPressed) {
            if (this.dAcceleratedSpeed > 0) {
                this.dAcceleratedSpeed -= this.dAccelerationDecay * deltaTime / 1000
                this.dAcceleratedSpeed = Math.max(this.dAcceleratedSpeed, 0)
            } else if (this.dAcceleratedSpeed < 0) {
                this.dAcceleratedSpeed += this.dAccelerationDecay * deltaTime / 1000
                this.dAcceleratedSpeed = Math.min(this.dAcceleratedSpeed, 0)
            }
        }
        return this.dAcceleratedSpeed;
    }

    getXControlledSpeed(leftPressed, rightPressed, deltaTime) {
        if (leftPressed) {
            this.xAcceleratedSpeed -= this.xControlAcceleration * deltaTime / 1000
        }
        if (rightPressed) {
            this.xAcceleratedSpeed += this.xControlAcceleration * deltaTime / 1000
        }
        return this.xAcceleratedSpeed
    }

    collideAndBackToCenter(roadX) {
        super.collideAndBackToCenter(roadX);
        this.xAcceleratedSpeed = 0;
        this.dAcceleratedSpeed = 0;
    }
}