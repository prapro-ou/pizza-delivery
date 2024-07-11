import { Obstacle } from "./Obstacle.mjs";
import { obstacleType } from "./obstacleSettings.mjs";

// 障害物の泥水
export class Mud extends Obstacle {
    constructor(x, d) {
        super(x, d);
        this.type = obstacleType.mud;
        this.image = new Image();
        this.image.src = 'resource/image/mud.png';
        this.scaleFactor = 1.5;
    }

    checkCollision(x, d) {
        return (this.x - x)**2 + (this.d - d)**2 <= 3**2;
    }

    handleCollision(player, roadX) {
        player.inCollision = true;
        setTimeout(() => {
            player.inCollision = false;
            player.x = roadX.center;
        }, 1000);
    }
}
