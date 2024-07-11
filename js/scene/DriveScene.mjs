import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { stage1 } from '../stage/stage1.mjs';
import { obstacleType, makeObstacle } from '../gameObject/obstacleSettings.mjs';
import { Player } from '../gameObject/Player.mjs';
import { Ingredient } from '../gameObject/Ingredient.mjs';
import { randomIngredientType, imageForIngredient } from '../gameObject/ingredients.mjs';

export class DriveScene extends Scene {
    sceneWillAppear() {
        this.elapsedTime = 0.0
        this.stage = stage1
        this.cameraDistance = -10
        this.pixelSize = 8
        const playerX = this.stage.roadPoint.find((e) => e.d == 0).x;
        this.player = new Player(playerX);
        this.collectedIngredients = [];
        this.goalFlg = false;
        this.elapsedTime = 0.0;

        // this.stage.obstacles をクラスに変換
        this.stage.obstacles = this.stage.obstacles.map((e) => makeObstacle(e.type, e.x, e.d));
        // this.stage.ingredients をクラスに変換
        this.stage.ingredients = this.stage.ingredients.map((e) => {
            const type = randomIngredientType();
            return new Ingredient(type, e.x, e.d);
        });
        // ここに動く障害物を追加して管理する
        this.stage.cars = [];
    }

    updateStates(deltaTime, mouse, pressedKeys) {
        const leftPressed = pressedKeys.has("ArrowLeft");
        const rightPressed = pressedKeys.has("ArrowRight");
        const upPressed = pressedKeys.has("ArrowUp");
        const downPressed = pressedKeys.has("ArrowDown");
        if (!this.goalFlg) { 
            this.elapsedTime += deltaTime / 1000;
        }
        this.player.updatePosition(deltaTime, leftPressed, rightPressed, upPressed, downPressed);
        if (this.player.d <= this.stage.goalDistance && !this.player.inCollision) {
            this.checkCollision();
        }
        if (!this.goalFlg && this.player.d > this.stage.goalDistance) {
            this.goalFlg = true;
            setTimeout(() => {
                this.transitToNextScene()
            }, 1000);
        }
        this.moveCars(deltaTime)
    }

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        this.cameraDistance = Math.min(this.player.d - 10, this.stage.goalDistance - max_y / this.pixelSize - 1);
        this.putCars(max_y);

        ctx.fillStyle = "silver";
        ctx.fillRect(0, 0, max_x, max_y);

        this.drawRoad(max_x, max_y, ctx);
        this.drawObstacle(max_x, max_y, ctx);
        this.drawCars(max_x, max_y, ctx);
        this.drawIngredients(max_x, max_y, ctx);
        this.player.draw(max_x, max_y, ctx, this.pixelSize, this.cameraDistance);

        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.fillText("STAGE 1", 50, 50);

        this.drawTime(ctx);
        this.drawCollectedIngredients(max_x, max_y, ctx);
    }

    transitToNextScene() {
        const occurrences = {};
        for (let i = 0; i < this.collectedIngredients.length; i++) {
            const ingredient = this.collectedIngredients[i];
            if (occurrences[ingredient]) {
                occurrences[ingredient]++;
            } else {
                occurrences[ingredient] = 1;
            }
        }
        this.sharedData.collectedIngredients = occurrences;
        console.log(occurrences);
        console.log("次の画面に遷移します。");
    }

    checkCollision() {
        const { center, left, right } = this.roadX(this.player.d);
        if (this.player.x < left || this.player.x > right) {
            this.player.inCollision = true
            setTimeout(() => {
                this.player.inCollision = false
                this.player.x = center;
            }, 1000);
        }
        for (let i = 0; i < this.stage.obstacles.length; i++) {
            const obstacle = this.stage.obstacles[i];
            if (obstacle.checkCollision(this.player.x, this.player.d)) {
                obstacle.handleCollision(this.player, this.roadX(this.player.d));
            }
        }
        for (let i = 0; i < this.stage.cars.length; i++) {
            const car = this.stage.cars[i];
            if (car.checkCollision(this.player.x, this.player.d, this.pixelSize)) {
                car.handleCollision(this.player, this.roadX(this.player.d));
            }
        }
        for (let i = 0; i < this.stage.ingredients.length; i++) {
            const ingredient = this.stage.ingredients[i];
            if (ingredient.checkCollision(this.player.x, this.player.d)) {
                this.collectedIngredients.push(ingredient.type);
                ingredient.disappear();
            }
        }
    }

    roadX(d) {
        if (d > this.stage.goalDistance) d = this.stage.goalDistance;
        let i = 0;
        while (this.stage.roadPoint[i+1].d < d) { i += 1; }
        const r = (d - this.stage.roadPoint[i].d) / (this.stage.roadPoint[i+1].d - this.stage.roadPoint[i].d);
        const center = this.stage.roadPoint[i+1].x * r + this.stage.roadPoint[i].x * (1-r);
        const left = center - this.stage.roadWidth / 2;
        const right = center + this.stage.roadWidth / 2;
        return { center: center, left: left, right: right };
    }

    putCars(max_y) {
        const d = this.cameraDistance + max_y / this.pixelSize + 10;
        const x = Math.random() * this.stage.roadWidth + this.roadX(d).left;
        if (this.stage.cars.length < 2) {
            this.stage.cars.push(makeObstacle(obstacleType.car, x, d));
        }

        this.stage.cars = this.stage.cars.filter((car) => car.d >= this.cameraDistance - 10);
    }

    moveCars(deltaTime) {
        for (let i = 0 ; i < this.stage.cars.length; i++) {
            this.stage.cars[i].updatePosition(deltaTime, this.roadX.bind(this))
        }
    }

    drawRoad(max_x, max_y, ctx) {
        const whiteLineSpacing = 10;
        let goalSquareSize = 1.7;
        for (let d = this.cameraDistance; d <= this.cameraDistance + Math.ceil(max_y / this.pixelSize); d++) {
            const { center, left, right } = this.roadX(d);
            // 道路の外側
            ctx.fillStyle = "green";
            ctx.fillRect(0, max_y - ((d - this.cameraDistance) * this.pixelSize), max_x, this.pixelSize);
            // 道路の内側
            ctx.fillStyle = "gray";
            ctx.fillRect(left * this.pixelSize, max_y - ((d - this.cameraDistance) * this.pixelSize), (right - left) * this.pixelSize, this.pixelSize);
            // 白線
            if (d % (whiteLineSpacing * 2) < whiteLineSpacing) {
                ctx.fillStyle = "white";
                const roadCenter = Math.round(center * 3) / 3;
                ctx.fillRect(roadCenter * this.pixelSize, max_y - ((d - this.cameraDistance) * this.pixelSize), this.pixelSize, this.pixelSize);
            }
            // 道路の境界
            ctx.fillStyle = "black";
            ctx.fillRect((left - 1) * this.pixelSize, max_y - ((d - this.cameraDistance) * this.pixelSize), this.pixelSize, this.pixelSize);
            ctx.fillRect(right * this.pixelSize, max_y - ((d - this.cameraDistance) * this.pixelSize), this.pixelSize, this.pixelSize);
            // ゴール線
            const gd = Math.round(d) - (this.stage.goalDistance - 4)
            if (gd >= 0 && gd < 3) {
                goalSquareSize = (right - left) / Math.floor((right - left) / goalSquareSize);
                let i = 0;
                for (let x = left; x < right; x += goalSquareSize) {
                    i += 1;
                    ctx.fillStyle = ((i + gd) % 2 == 0) ? "black" : "white";
                    ctx.fillRect(
                        x * this.pixelSize,
                        max_y - ((d - this.cameraDistance) * this.pixelSize),
                        goalSquareSize * this.pixelSize,
                        this.pixelSize
                    );
                }
            }
        }
    }

    drawObstacle(max_x, max_y, ctx) {
        for (let i = 0; i < this.stage.obstacles.length; i++) {
            this.stage.obstacles[i].draw(max_x, max_y, ctx, this.pixelSize, this.cameraDistance);
        }
    }

    drawCars(max_x, max_y, ctx) {
        for (let i = 0; i < this.stage.cars.length; i++) {
            this.stage.cars[i].draw(max_x, max_y, ctx, this.pixelSize, this.cameraDistance);
        }
    }

    drawIngredients(max_x, max_y, ctx) {
        for (let i = 0; i < this.stage.ingredients.length; i++) {
            this.stage.ingredients[i].draw(max_x, max_y, ctx, this.pixelSize, this.cameraDistance);
        }
    }

    drawCollectedIngredients(max_x, max_y, ctx) {
        const areaWidth = 40;
        ctx.fillStyle = "gainsboro";
        ctx.fillRect(max_x - areaWidth, 0, max_y, 8 * (this.collectedIngredients.length != 0) + 30 * this.collectedIngredients.length);
        for (let i = 0; i < this.collectedIngredients.length; i++) {
            const type = this.collectedIngredients[i];
            const image = imageForIngredient(type);
            const x = max_x - 20;
            const y = 20 + 30 * i;
            const scaleFactor = 2;
            if (image.complete) {
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(
                    image,
                    x - image.width * scaleFactor / 2,
                    y - image.height * scaleFactor / 2,
                    image.width * scaleFactor,
                    image.height * scaleFactor,
                );
            }
        }
    }

    drawTime(ctx) {
        ctx.fillStyle = "black";
        ctx.font = "25px Arial";
        ctx.textAlign = "left";
        const minutes = Math.floor(this.elapsedTime / 60);
        const seconds = Math.floor(this.elapsedTime % 60);
        const commaSeconds = Math.floor((this.elapsedTime % 1) * 100);
        const secondsString = `${seconds}`.padStart(2, '0');
        const commaSecondsString = `${commaSeconds}`.padStart(2, '0');
        ctx.fillText(`${minutes}:${secondsString}:${commaSecondsString}`, 50, 100);
    }
}
