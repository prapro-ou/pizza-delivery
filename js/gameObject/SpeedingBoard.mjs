import { Obstacle } from "./Obstacle.mjs";
import { obstacleType } from "./obstacleSettings.mjs";
import { resource } from "../resource.mjs";

// 障害物の泥水
export class SpeedingBoard extends Obstacle {
    constructor(x, d) {
        super(x, d);
        this.type = obstacleType.speedingBoard;
        this.image = resource.images.speedup;
        this.scaleFactor = 2.0;
        this.acceleration = 2000.0; // px/s^2
    }

    checkCollision(x, d, pixelSize) {
        return Math.abs(this.x - x) <= this.image.width / (2 * pixelSize) && Math.abs(this.d - d) <= this.image.height / (2 * pixelSize);
    }

    handleCollision(player, roadX, deltaTime) {
        player.dBoostedSpeed += this.acceleration * deltaTime / 1000;
    }
}
