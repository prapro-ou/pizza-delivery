import { Obstacle } from "./Obstacle.mjs";
import { obstacleType } from "./obstacleSettings.mjs";

export class Car extends Obstacle {
    constructor(x, d) {
        super(x, d);
        this.dSpeed = 20 + Math.random() * 20
        this.type = obstacleType.car;
        this.image = new Image();
        this.image.src = 'resource/image/car_red.png';
    }

    updatePosition(deltaTime, roadX) {
        const new_d = this.d + this.dSpeed * deltaTime / 1000;
        this.x += roadX(new_d).center - roadX(this.d).center;
        this.d = new_d;
    }

    checkCollision(x, d, pixelSize) {
        return Math.abs(this.x - x) <= this.image.width / (2 * pixelSize) && Math.abs(this.d - d) <= this.image.height / (2 * pixelSize);
    }

    handleCollision(player, roadX) {
        player.inCollision = true;
    }
}

