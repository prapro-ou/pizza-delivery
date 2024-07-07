import { Obstacle } from "./Obstacle.mjs";
import { obstacleType } from "./obstacleSettings.mjs";

// 障害物の泥水
export class Mud extends Obstacle {
    constructor(x, d) {
        super(x, d);
        this.type = obstacleType.mud;
        this.image = new Image();
        this.image.src = '../../../resource/image/mud.png';
    }

    draw(max_x, max_y, ctx, pixelSize, cameraDistance) {
        const y = max_y - (this.d - cameraDistance) * pixelSize;
        const x = this.x * pixelSize;
        const scaleFactor = 1.5;

        if (this.image.complete) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(
                this.image,
                x - this.image.width * scaleFactor / 2,
                y - this.image.height * scaleFactor / 2,
                this.image.width * scaleFactor,
                this.image.height * scaleFactor,
            );
        }
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
