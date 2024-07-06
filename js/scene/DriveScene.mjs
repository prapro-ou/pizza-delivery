import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { stage1 } from '../stage/stage1.mjs';
import { obstacleType } from '../stage/enum.mjs';

export class DriveScene extends Scene {
    sceneWillAppear() {
        this.elapsedTime = 0.0
        this.stage = stage1
        this.totalDistance = 0
        this.pixelSize = 8
    }

    updateStates(deltaTime) {}

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.fillStyle = "silver";
        ctx.fillRect(0, 0, max_x, max_y);

        this.drawRoad(max_x, max_y, ctx);

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
        for (let d = this.totalDistance; d <= Math.ceil(max_y / this.pixelSize); d++) {
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
                ctx.fillRect(x * this.pixelSize, max_y - (d * this.pixelSize), this.pixelSize, this.pixelSize);
            }
        }
    }
}
