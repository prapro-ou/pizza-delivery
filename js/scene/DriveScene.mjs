import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { stage1 } from '../stage/stage1.mjs';
import { obstacleType } from '../stage/enum.mjs';

class Player {
    constructor(x) {
        this.x = x;
        this.d = 0;
        this.speed = 60; // px/s
        this.image = new Image();
        this.image.src = '../../../resource/image/rider.png';
    }

    draw(max_x, max_y, ctx, pixelSize, cameraDistance) {
        const y = max_y - (this.d - cameraDistance) * pixelSize;
        const x = this.x * pixelSize;
        const centerX = x - this.image.width;
        const centerY = y - this.image.height;
        const scaleFactor = 1.5;

        if (this.image.complete) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(this.image, centerX, centerY, this.image.width * scaleFactor, this.image.height * scaleFactor);
        } else {
            this.image.onload = () => {
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(this.image, centerX, centerY, this.image.width * scaleFactor, this.image.height * scaleFactor);
            };
        }
    }

    updatePosition(deltaTime) {
        this.d += this.speed * deltaTime / 1000
    }
}

export class DriveScene extends Scene {
    sceneWillAppear() {
        this.elapsedTime = 0.0
        this.stage = stage1
        this.cameraDistance = -10
        this.pixelSize = 8
        this.mudImage = new Image();
        this.mudImage.src = '../../../resource/image/mud.png';
        const playerX = this.stage.roadPoint.find((e) => e.d == 0).x;
        this.player = new Player(playerX);
    }

    updateStates(deltaTime) {
        this.player.updatePosition(deltaTime);
        this.cameraDistance = this.player.d - 10;
    }

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.fillStyle = "silver";
        ctx.fillRect(0, 0, max_x, max_y);

        this.drawRoad(max_x, max_y, ctx);

        this.drawObstacle(max_x, max_y, ctx);

        this.player.draw(max_x, max_y, ctx, this.pixelSize, this.cameraDistance);

        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.fillText("STAGE 1", 50, 50);

        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.fillText("タイム", max_x - 120, 50);

        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.fillText("拾った食材", max_x - 120, max_y - 30);
    }


    drawRoad(max_x, max_y, ctx) {
        let i = 0;
        for (let d = this.cameraDistance; d <= this.cameraDistance + Math.ceil(max_y / this.pixelSize); d++) {
            while (this.stage.roadPoint[i+1].d < d) { i += 1; }
            const r = (d - this.stage.roadPoint[i].d) / (this.stage.roadPoint[i+1].d - this.stage.roadPoint[i].d);
            const center = this.stage.roadPoint[i+1].x * r + this.stage.roadPoint[i].x * (1-r);
            const roadLeft = Math.round(center - this.stage.roadWidth / 2);
            const roadRight = Math.round(center + this.stage.roadWidth / 2);
            for (let x = 0; x < max_x / this.pixelSize + 1; x++) {
                if (x >= roadLeft && x <= roadRight) {
                    ctx.fillStyle = "gray";
                } else if (x == roadLeft - 1 || x == roadRight + 1) {
                    ctx.fillStyle = "black";
                } else {
                    ctx.fillStyle = "green";
                }
                ctx.fillRect(x * this.pixelSize, max_y - ((d - this.cameraDistance) * this.pixelSize), this.pixelSize, this.pixelSize);
            }
        }
    }

    drawObstacle(max_x, max_y, ctx) {
        this.stage.obstacles.forEach(obstacle => {
            const y = max_y - (obstacle.d - this.cameraDistance) * this.pixelSize;
            const x = obstacle.x * this.pixelSize;
            const centerX = x - (this.mudImage.width / 2);
            const centerY = y - (this.mudImage.height / 2);

            if (this.mudImage.complete) {
                ctx.drawImage(this.mudImage, centerX, centerY);
            } else {
                this.mudImage.onload = () => {
                    ctx.drawImage(this.mudImage, centerX, centerY);
                };
            }
        });
    }


}
