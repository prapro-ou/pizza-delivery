import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { stage1 } from '../stage/stage1.mjs';
import { obstacleType, makeObstacle } from '../gameObject/obstacleSettings.mjs';
import { Player } from '../gameObject/Player.mjs';

export class DriveScene extends Scene {
    sceneWillAppear() {
        this.elapsedTime = 0.0
        this.stage = stage1
        this.cameraDistance = -10
        this.pixelSize = 8
        const playerX = this.stage.roadPoint.find((e) => e.d == 0).x;
        this.player = new Player(playerX);

        // this.stage.obstacles をクラスに変換
        this.stage.obstacles = this.stage.obstacles.map((e) => makeObstacle(e.type, e.x, e.d))
    }

    updateStates(deltaTime, mouse, pressedKeys) {
        const leftPressed = pressedKeys.has("ArrowLeft");
        const rightPressed = pressedKeys.has("ArrowRight");
        const upPressed = pressedKeys.has("ArrowUp");
        const downPressed = pressedKeys.has("ArrowDown");
        this.player.updatePosition(deltaTime, leftPressed, rightPressed, upPressed, downPressed);
        this.cameraDistance = this.player.d - 10;
        if (!this.player.inCollision) {
            this.checkCollision();
        }
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

    checkCollision() {
        const { center, left, right } = this.roadX(this.player.d);
        if (this.player.x < left || this.player.x > right) {
            this.player.inCollision = true
            setTimeout(() => {
                this.player.inCollision = false
                this.player.x = center;
            }, 1000);
        }
        for (let i = 0; i < this.stage.obstacles.length; i++) {
            const obstacle = this.stage.obstacles[i];
            if (obstacle.checkCollision(this.player.x, this.player.d)) {
                obstacle.handleCollision(this.player, this.roadX(this.player.d));
            }
        }
    }

    roadX(d) {
        let i = 0;
        while (this.stage.roadPoint[i+1].d < d) { i += 1; }
        const r = (d - this.stage.roadPoint[i].d) / (this.stage.roadPoint[i+1].d - this.stage.roadPoint[i].d);
        const center = this.stage.roadPoint[i+1].x * r + this.stage.roadPoint[i].x * (1-r);
        const left = center - this.stage.roadWidth / 2;
        const right = center + this.stage.roadWidth / 2;
        return { center: center, left: left, right: right };
    }

    drawRoad(max_x, max_y, ctx) {
        const whiteLineSpacing = 10;
        for (let d = this.cameraDistance; d <= this.cameraDistance + Math.ceil(max_y / this.pixelSize); d++) {
            const { center, left, right } = this.roadX(d);
            // 道路の外側
            ctx.fillStyle = "green";
            ctx.fillRect(0, max_y - ((d - this.cameraDistance) * this.pixelSize), max_x, this.pixelSize);
            // 道路の内側
            ctx.fillStyle = "gray";
            ctx.fillRect(left * this.pixelSize, max_y - ((d - this.cameraDistance) * this.pixelSize), (right - left) * this.pixelSize, this.pixelSize);
            // 白線
            if (d % (whiteLineSpacing * 2) < whiteLineSpacing) {
                ctx.fillStyle = "white";
                const roadCenter = Math.round(center * 3) / 3;
                ctx.fillRect(roadCenter * this.pixelSize, max_y - ((d - this.cameraDistance) * this.pixelSize), this.pixelSize, this.pixelSize);
            }
            // 道路の境界
            ctx.fillStyle = "black";
            ctx.fillRect(left * this.pixelSize, max_y - ((d - this.cameraDistance) * this.pixelSize), this.pixelSize, this.pixelSize);
            ctx.fillRect(right * this.pixelSize, max_y - ((d - this.cameraDistance) * this.pixelSize), this.pixelSize, this.pixelSize);
        }
    }

    drawObstacle(max_x, max_y, ctx) {
        for (let i = 0; i < this.stage.obstacles.length; i++) {
            this.stage.obstacles[i].draw(max_x, max_y, ctx, this.pixelSize, this.cameraDistance);
        }
    }
}
