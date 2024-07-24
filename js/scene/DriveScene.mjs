import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { obstacleType, makeObstacle } from '../gameObject/obstacleSettings.mjs';
import { Player, PlayerWithInertia } from '../gameObject/Player.mjs';
import { Ingredient } from '../gameObject/Ingredient.mjs';
import { randomIngredientType, imageForIngredient } from '../gameObject/ingredients.mjs';
import { speedSettings } from '../stage/speedModes.mjs';
import { Car } from '../gameObject/Car.mjs';
import { resource } from '../resource.mjs';

// ステージ選択画面
// - 入力
//   - this.sharedData.stage: ステージ
//   - this.sharedData.gameOverCount: ゲームオーバーした回数
// - 出力
//   - this.sharedData.goalTime: タイム
//   - this.sharedData.collectedIngredients: 集めた食材の配列
//   - this.sharedData.gameOverCount: ゲームオーバーした回数
//   - this.sharedData.collisionCount: 障害物に衝突した回数
export class DriveScene extends Scene {
    sceneWillAppear() {
        this.elapsedTime = 0.0
        this.stage = this.sharedData.stage
        this.cameraDistance = -10
        this.pixelSize = 8
        this.speedSetting = speedSettings[this.stage.speedMode];
        const playerX = this.stage.roadPoint.find((e) => e.d == 0).x;
        if (this.stage.inertia) {
            this.player = new PlayerWithInertia(playerX, this.speedSetting);
        } else {
            this.player = new Player(playerX, this.speedSetting);
        }
        this.collectedIngredients = [];
        this.goalFlg = false;
        this.elapsedTime = 0.0;
        this.gameOverFlg = false;
        this.gameOverAnimationTime = 0.0;
        this.gameOverCount = this.sharedData.gameOverCount;
        this.collisionCount = 0;
        this.startFlg = true;
        this.startAnimationFlg = false;
        this.startAnimationTime = 0.0;
        if (this.stage.nightMode) {
            this.textColor = "white";
        } else {
            this.textColor = "black";
        }
        // 0 秒後にsetTimeoutしないと、setTimeout が 3.0 になるタイミングと 3 秒後の setTimeout の間に何故かラグが生まれてしまう
        setTimeout(() => {
            this.startAnimationFlg = true;
        }, 0);
        setTimeout(() => {
            this.startFlg = false;
        }, 3000);

        // this.stage.obstacles をクラスに変換
        this.stage.obstacles = this.stage.obstacles.map((e) => makeObstacle(e.type, e.x, e.d));
        // this.stage.ingredients をクラスに変換
        this.stage.ingredients = this.stage.ingredients.map((e) => {
            const type = randomIngredientType();
            return new Ingredient(type, e.x, e.d);
        });
        // ここに動く障害物を追加して管理する
        this.stage.cars = [];
        this.sceneRouter.setBGM(this.stage.bgm);
        this.sceneRouter.playSE(resource.se.startEffect);
    }

    updateStates(deltaTime, mouse, pressedKeys) {
        const leftPressed = pressedKeys.has("ArrowLeft");
        const rightPressed = pressedKeys.has("ArrowRight");
        const upPressed = pressedKeys.has("ArrowUp");
        const downPressed = pressedKeys.has("ArrowDown");
        if (!this.goalFlg && !this.gameOverFlg && !this.startFlg) {
            this.elapsedTime += deltaTime / 1000;
        }
        if (this.gameOverFlg) {
            this.gameOverAnimationTime += deltaTime / 1000;
        }
        if (this.startAnimationFlg) {
            this.startAnimationTime += deltaTime / 1000;
        }
        if (!this.startFlg) {
            this.player.updatePosition(deltaTime, leftPressed, rightPressed, upPressed, downPressed);
            if (this.player.d <= this.stage.goalDistance && !this.player.inCollision) {
                this.checkCollision(deltaTime);
            }
            this.moveCars(deltaTime);
        }
        if (!this.goalFlg && this.player.d > this.stage.goalDistance) {
            this.sceneRouter.playSE(resource.se.goalEffect);
            this.sceneRouter.stopSE(resource.se.bikeEngineEffect);
            this.goalFlg = true;
            setTimeout(() => {
                this.transitToNextScene()
            }, 1000);
        }
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
        if (this.stage.nightMode) {
            this.drawShadow(max_x, max_y, ctx);
        }
        this.player.draw(max_x, max_y, ctx, this.pixelSize, this.cameraDistance);

        ctx.fillStyle = this.textColor;
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.fillText("STAGE 1", 50, 50);

        this.drawTime(ctx);
        this.drawCollectedIngredients(max_x, max_y, ctx);
        if (this.gameOverFlg) {
            this.drawGameOver(ctx, max_x, max_y);
        }
        if (this.startAnimationFlg) {
            this.drawStartAnimation(max_x, max_y, ctx);
        }
    }

    transitToNextScene() {
        this.sharedData.goalTime = this.elapsedTime;
        this.sharedData.collectedIngredients = this.collectedIngredients;
        this.sharedData.gameOverCount = this.gameOverCount;
        this.sharedData.collisionCount = this.collisionCount;
        console.log(this.sharedData)
        this.sceneRouter.changeScene(scenes.cooking);
    }

    checkCollision(deltaTime) {
        const { center, left, right } = this.roadX(this.player.d);
        if (this.player.x < left || this.player.x > right) {
            this.sceneRouter.playSE(resource.se.courseOutEffect);
            this.player.collideAndBackToCenter(this.roadX.bind(this));
        }
        for (let i = 0; i < this.stage.obstacles.length; i++) {
            const obstacle = this.stage.obstacles[i];
            if (obstacle.checkCollision(this.player.x, this.player.d, this.pixelSize)) {
                if (obstacle.collisionCountUp) this.collisionCount += 1;
                obstacle.handleCollision(this.player, this.roadX.bind(this), deltaTime);
                if (this.player.onMud) {
                    this.sceneRouter.playSE(resource.se.mudEffect);
                    this.player.onMud = false;
                } else if (this.player.onSpeedingBoard) {
                    this.sceneRouter.playSE(resource.se.speedUpEffect);
                    this.player.onSpeedingBoard = false;
                }
            }
        }
        for (let i = 0; i < this.stage.cars.length; i++) {
            const car = this.stage.cars[i];
            if (car.checkCollision(this.player.x, this.player.d, this.pixelSize)) {
                this.sceneRouter.playSE(resource.se.crashEffect);
                this.sceneRouter.stopBGM();
                this.gameOverFlg = true;
                this.sharedData.gameOverCount += 1;
                car.handleCollision(this.player, this.roadX.bind(this));
            }
        }
        for (let i = 0; i < this.stage.ingredients.length; i++) {
            const ingredient = this.stage.ingredients[i];
            if (ingredient.checkCollision(this.player.x, this.player.d)) {
                this.sceneRouter.playSE(resource.se.getIngredientEffect);
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
        if (this.stage.cars.length < this.stage.nCars) {
            const car = new Car(x, d, this.speedSetting);
            this.stage.cars.push(car);
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
        const nWhiteLine = 2;
        const whiteLineWidth = this.pixelSize * 0.8;
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
                for (let i = 0; i < nWhiteLine; i++) {
                    const ratio = (i + 1) / (nWhiteLine + 1)
                    const x = left * (1 - ratio) + right * ratio
                    ctx.fillRect(x * this.pixelSize - whiteLineWidth / 2, max_y - ((d - this.cameraDistance) * this.pixelSize), whiteLineWidth, this.pixelSize);
                }
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

    drawShadow(max_x, max_y, ctx) {
        const px = this.player.x;
        const pd = this.player.d;
        const cos = Math.cos(-this.player.theta);
        const sin = Math.sin(-this.player.theta);
        for (let d = this.cameraDistance; d <= this.cameraDistance + Math.ceil(max_y / this.pixelSize); d++) {
            for (let x = 0; x < max_x / this.pixelSize + 1; x++) {
                const dx = (x - px);
                const dd = (d - pd);
                const alpha = Math.min(
                    ((dx * cos + dd * sin)**2 + (-dx * sin + dd * cos)**2 / 2) / 16**2 * 0.9,
                    0.9
                )
                ctx.fillStyle = "rgba(" + [0, 0, 0, alpha] + ")";
                ctx.fillRect(x * this.pixelSize, max_y - ((d - this.cameraDistance) * this.pixelSize), this.pixelSize, this.pixelSize);
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
        ctx.fillStyle = this.textColor;
        ctx.font = "25px Arial";
        ctx.textAlign = "left";
        const minutes = Math.floor(this.elapsedTime / 60);
        const seconds = Math.floor(this.elapsedTime % 60);
        const commaSeconds = Math.floor((this.elapsedTime % 1) * 100);
        const secondsString = `${seconds}`.padStart(2, '0');
        const commaSecondsString = `${commaSeconds}`.padStart(2, '0');
        ctx.fillText(`${minutes}:${secondsString}:${commaSecondsString}`, 50, 100);
    }

    drawGameOver(ctx, max_x, max_y) {
        if (this.gameOverAnimationTime >= 1.0) {
            ctx.fillStyle = "rgba(" + [0, 0, 0, 0.4] + ")";
            ctx.fillRect(0, 0, max_x, max_y);

            ctx.fillStyle = "red";
            ctx.font = "50px Arial";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER!", max_x / 2, max_y / 2 - 90);

            let r = { x: max_x / 2 - 100, y: max_y / 2, w: 200, h: 50 };
            this.retryButtonArea = r;
            ctx.fillStyle = "blue";
            ctx.fillRect(r.x, r.y, r.w, r.h);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("リトライ", r.x + r.w / 2, r.y + r.h / 2);

            r = { x: max_x / 2 - 100, y: max_y / 2 + 90, w: 200, h: 50 };
            this.continueButtonArea = r;
            ctx.fillStyle = "blue";
            ctx.fillRect(r.x, r.y, r.w, r.h);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("ステージ選択に戻る", r.x + r.w / 2, r.y + r.h / 2);

        } else if (this.gameOverAnimationTime > 0.9) {
            ctx.fillStyle = "rgba(" + [0, 0, 0, (this.gameOverAnimationTime - 0.9) * 0.4 / (1.0 - 0.9)] + ")";;
            ctx.fillRect(0, 0, max_x, max_y);
        }
    }

    didTap(x, y) {
        let r = this.retryButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.sceneRouter.playSE(resource.se.clickEffect);
            this.sceneRouter.changeScene(scenes.drive);
        }
        r = this.continueButtonArea;
        if (r && x >= r.x && x <= r.x+r.w && y >= r.y && y <= r.y + r.h) {
            this.sceneRouter.playSE(resource.se.clickEffect);
            this.sceneRouter.changeScene(scenes.stageSelection);
        }
    }

    drawStartAnimation(max_x, max_y, ctx) {
        ctx.fillStyle = this.textColor;
        ctx.font = "64px Arial";
        ctx.textAlign = "center";
        if (this.startAnimationTime < 1) {
            ctx.fillText("3", max_x / 2, max_y / 2);
        } else if (this.startAnimationTime < 2) {
            ctx.fillText("2", max_x / 2, max_y / 2);
        } else if (this.startAnimationTime < 3) {
            ctx.fillText("1", max_x / 2, max_y / 2);
        } else if (this.startAnimationTime < 3.5) {
            ctx.fillText("START", max_x / 2, max_y / 2);
        } else {
            this.startAnimationFlg = false;
            this.sceneRouter.playSE(resource.se.bikeEngineEffect, true);
        }
    }
}
