import { Obstacle } from "./Obstacle.mjs";
import { obstacleType } from "./obstacleSettings.mjs";
import { resource } from "../resource.mjs";

export class Car extends Obstacle {
    constructor(x, d, speedSetting) {
        super(x, d);
        this.dSpeed = speedSetting.carDSpeed + Math.random() * 20;
        this.type = obstacleType.car;
        this.image = resource.images.carRed;
        this.scaleFactor = 2.0;
    }

    updatePosition(deltaTime, roadX) {
        const new_d = this.d + this.dSpeed * deltaTime / 1000;
        this.x += roadX(new_d).center - roadX(this.d).center;
        this.d = new_d;
    }

    checkCollision(x, d, pixelSize) {
        return Math.abs(this.x - x) <= this.image.width * this.scaleFactor / (2 * pixelSize) && Math.abs(this.d - d) <= this.image.height * this.scaleFactor / (2 * pixelSize);
    }

    handleCollision(player, roadX) {
        player.inCollision = true;
    }
}

