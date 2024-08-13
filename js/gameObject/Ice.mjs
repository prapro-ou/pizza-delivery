import { Obstacle } from "./Obstacle.mjs";
import { obstacleType } from "./obstacleSettings.mjs";
import { resource } from "../resource.mjs";

// 障害物の泥水
export class Ice extends Obstacle {
    constructor(x, d) {
        super(x, d);
        this.type = obstacleType.ice;
        this.image = resource.images.ice;
        this.scaleFactor = 1.8;
        this.collisionCountUp = true;
    }

    checkCollision(x, d, pixelSize) {
        const px2d = this.scaleFactor / pixelSize;
        const inWidth = Math.abs(this.x - x) <= this.image.width * px2d / 2;
        const bottom = (this.d - d) <= this.image.height * px2d / 2;
        const underTriangle = (d - this.d) < -3/2 * Math.abs(x - this.x) + 32 * px2d;
        return inWidth && bottom && underTriangle;
    }

    handleCollision(player, roadX) {
        player.collisionIce = true;
        player.inCollision = true;
        player.collideAndBackToCenter(roadX);
    }
}
