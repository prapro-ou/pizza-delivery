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

    checkCollision(x, d) {
        return (this.x - x)**2 + (this.d - d)**2 <= 3**2;
    }

    handleCollision(player, roadX) {
        player.collisionIce = true;
        player.inCollision = true;
        player.collideAndBackToCenter(roadX);
    }
}
