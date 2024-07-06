import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";

export class DriveScene extends Scene {
    updateStates(deltaTime) {}

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.fillStyle = "silver";
        ctx.fillRect(0, 0, max_x, max_y);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText("配達画面", 50, 50);
    }
}
