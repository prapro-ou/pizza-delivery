import { Obstacle } from "./Obstacle.mjs";
import { obstacleType } from "./obstacleSettings.mjs";
import { resource } from "../resource.mjs";

// 障害物の泥水
export class Cactus extends Obstacle {
    constructor(x, d) {
        super(x, d);
        this.type = obstacleType.cactus;
        this.image = resource.images.cactus;
        this.scaleFactor = 1.8;
        this.collisionCountUp = true;
    }

    checkCollision(x, d, pixelSize) {
        const px2d = this.scaleFactor / pixelSize;
            
        // 中央の幹部分の横幅チェック
        const inCenterWidth = Math.abs(this.x - x) <= (this.image.width * px2d / 4);
            
        // 幹の高さチェック
        const inHeight = Math.abs(this.d - d) <= (this.image.height * px2d / 2);
            
        // 左側の枝の円形当たり判定
        const inLeftArm = (x - this.x) <= 0 && (x - this.x) >= -this.image.width * px2d / 2 && Math.abs(this.d - d) <= this.image.height * px2d / 4;
        
        // 右側の枝の円形当たり判定
        const inRightArm = (x - this.x) >= 0 && (x - this.x) <= this.image.width * px2d / 2 && Math.abs(this.d - d) <= this.image.height * px2d / 4;
            
        return (inCenterWidth && inHeight) || inLeftArm || inRightArm;
    }

    handleCollision(player, roadX) {
        player.collisionCactus = true;
        player.inCollision = true;
        player.collideAndBackToCenter(roadX);
    }
}
