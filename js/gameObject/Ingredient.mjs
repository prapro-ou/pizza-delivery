import { ingredientType, imageForIngredient } from "./ingredients.mjs";

// DriveScene に出てくる食材
export class Ingredient {
    constructor(type, x, d) {
        this.type = type;
        this.x = x;
        this.d = d;
        this.image = imageForIngredient(this.type);
        this.disappeared = false;
    }

    draw(max_x, max_y, ctx, pixelSize, cameraDistance) {
        if (this.disappeared) return;
        const y = max_y - (this.d - cameraDistance) * pixelSize;
        const x = this.x * pixelSize;
        const scaleFactor = 2;

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
        return !this.disappeared && (this.x - x)**2 + (this.d - d)**2 <= 3**2;
    }

    disappear() {
        this.disappeared = true;
    }
}
