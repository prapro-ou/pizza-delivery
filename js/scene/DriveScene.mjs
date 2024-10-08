import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { obstacleType, makeObstacle } from '../gameObject/obstacleSettings.mjs';
import { Player, PlayerWithInertia } from '../gameObject/Player.mjs';
import { Ingredient } from '../gameObject/Ingredient.mjs';
import { randomIngredientType, imageForIngredient } from '../gameObject/ingredients.mjs';
import { speedSettings } from '../stage/speedModes.mjs';
import { Car } from '../gameObject/Car.mjs';
import { resource } from '../resource.mjs';
import { Joystick } from '../component/Joystick.mjs';
import { TheStrongGamerLabel } from '../component/TheStrongGamerLabel.mjs';
import { buttonStates, ColorButton } from '../component/Button.mjs';

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
        this.joystick = new Joystick()
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

        this.setUpUI();
    }

    setUpUI() {
        const styles = {
            [buttonStates.normal]: "rgba(20, 20, 204, 0.5)",
            [buttonStates.hovered]: "rgba(20, 20, 204, 0.9)",
            [buttonStates.clicked]: "rgba(28, 28, 140, 1.0)",
        }
        this.retryButton = new ColorButton(styles);
        this.retryButton.onClick = this.onClickRetry.bind(this);
        this.retryButtonIsHidden = true;
        this.retireButton = new ColorButton(styles);
        this.retireButton.onClick = this.onClickRetire.bind(this);
        this.retireButtonIsHidden = true;
    }

    updateStates(deltaTime, mouse, pressedKeys) {
        this.joystick.updateStates(mouse);
        if (!this.retryButtonIsHidden) this.retryButton.updateStates(mouse);
        if (!this.retireButtonIsHidden) this.retireButton.updateStates(mouse);
        const leftPressed = pressedKeys.has("ArrowLeft") || this.joystick.leftPressed;
        const rightPressed = pressedKeys.has("ArrowRight") || this.joystick.rightPressed;
        const upPressed = pressedKeys.has("ArrowUp") || this.joystick.upPressed;
        const downPressed = pressedKeys.has("ArrowDown") || this.joystick.downPressed;
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
        // ゲームオーバー・クリア判定
        if (!this.gameOverFlg && this.player.life <= 0) {
            this.sceneRouter.playSE(resource.se.gameOverEffect);
            this.gameOverFlg = true;
            this.sharedData.gameOverCount += 1;
        } else if (!this.goalFlg && this.player.d > this.stage.goalDistance) {
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

        this.drawBackground(max_x, max_y, ctx);

        this.drawRoad(max_x, max_y, ctx);
        if (this.stage.nightMode) {
            this.drawLamp(max_x, max_y, ctx);
        }
        this.drawObstacle(max_x, max_y, ctx);
        this.drawIngredients(max_x, max_y, ctx);
        this.drawCars(max_x, max_y, ctx);
        if (this.stage.nightMode) {
            this.drawShadow(max_x, max_y, ctx);
        }
        this.player.draw(max_x, max_y, ctx, this.pixelSize, this.cameraDistance);

        this.drawStageNumberAndTime(ctx);
        this.drawCollectedIngredients(max_x, max_y, ctx);
        this.drawHeart(ctx, max_y);
        if (this.gameOverFlg) {
            this.drawGameOver(ctx, max_x, max_y);
        }
        if (this.startAnimationFlg) {
            this.drawStartAnimation(max_x, max_y, ctx);
        }
        if (!this.gameOverFlg) {
            this.joystick.draw(ctx, this.stage.nightMode);
        }
    }

    transitToNextScene() {
        this.sharedData.goalTime = this.elapsedTime;
        this.sharedData.collectedIngredients = this.collectedIngredients;
        this.sharedData.gameOverCount = this.gameOverCount;
        this.sharedData.collisionCount = this.collisionCount;
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
                } else if (this.player.collisionCactus) {
                    this.sceneRouter.playSE(resource.se.cactusEffect);
                    this.player.collisionCactus = false;
                } else if (this.player.collisionIce) {
                    this.sceneRouter.playSE(resource.se.freezeEffect);
                    this.player.collisionIce = false;
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
                this.player.collideAndBackToCenter(this.roadX.bind(this));
                this.collisionCount += 1;
            }
        }
        for (let i = 0; i < this.stage.ingredients.length; i++) {
            const ingredient = this.stage.ingredients[i];
            if (this.collectedIngredients.length < 8) {
                if (ingredient.checkCollision(this.player.x, this.player.d)) {
                    this.sceneRouter.playSE(resource.se.getIngredientEffect);
                    this.collectedIngredients.push(ingredient.type);
                    ingredient.disappear();
                }
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
        const d = this.cameraDistance + max_y / this.pixelSize;
        const x = Math.random() * this.stage.roadWidth + this.roadX(d).left;
        if (this.stage.cars.length < this.stage.nCars) {
            const car = new Car(x, d, this.speedSetting);
            car.d += car.image.height * car.scaleFactor / this.pixelSize + 1;
            this.stage.cars.push(car);
        }

        this.stage.cars = this.stage.cars.filter((car) =>
            car.d >= this.cameraDistance - car.image.height * car.scaleFactor / this.pixelSize - 14);
    }

    moveCars(deltaTime) {
        for (let i = 0 ; i < this.stage.cars.length; i++) {
            this.stage.cars[i].updatePosition(deltaTime, this.roadX.bind(this))
        }
    }

    drawBackground(max_x, max_y, ctx){

        const imageHeight = this.stage.background.height * 2;
        const imageIteration = Math.max(0, Math.floor((this.cameraDistance + 10) * this.pixelSize / imageHeight));
        let y1 = ((this.cameraDistance + 10) * this.pixelSize - imageHeight * imageIteration)
        let y2 = (-imageHeight + y1);
        
        ctx.drawImage(this.stage.background, 0, y1, max_x, max_y);
        ctx.drawImage(this.stage.background, 0, y2, max_x, max_y);
    }

    drawRoad(max_x, max_y, ctx) {
        const whiteLineSpacing = 10;
        const nWhiteLine = 2;
        const whiteLineWidth = this.pixelSize * 0.8;
        let goalSquareSize = 1.7;
        for (let d = Math.floor(this.cameraDistance); d <= this.cameraDistance + Math.ceil(max_y / this.pixelSize) + 1; d++) {
            const { center, left, right } = this.roadX(d);
            // 道路の外側
            // ctx.fillStyle = "green";
            // ctx.fillRect(0, max_y - ((d - this.cameraDistance) * this.pixelSize), max_x, this.pixelSize);
            // 道路の内側
            if (this.stage.stageNumber == 4) {
                ctx.fillStyle = "khaki";
            } else if (this.stage.stageNumber == 5) {
                ctx.fillStyle = "lightskyblue";
            } else {
            ctx.fillStyle = "gray";
            }
            ctx.fillRect(left * this.pixelSize, max_y - ((d - this.cameraDistance) * this.pixelSize), (right - left) * this.pixelSize, this.pixelSize + 1);
            // 白線
            if (d % (whiteLineSpacing * 2) < whiteLineSpacing) {
                if (this.stage.stageNumber == 4) {
                    ctx.fillStyle = "lightyellow";
                } else if (this.stage.stageNumber == 5) {
                    ctx.fillStyle = "white";
                } else {
                ctx.fillStyle = "white";
                }
                for (let i = 0; i < nWhiteLine; i++) {
                    const ratio = (i + 1) / (nWhiteLine + 1)
                    const x = left * (1 - ratio) + right * ratio
                    ctx.fillRect(x * this.pixelSize - whiteLineWidth / 2, max_y - ((d - this.cameraDistance) * this.pixelSize), whiteLineWidth, this.pixelSize + 2);
                }
            }
            // 道路の境界
            if (this.stage.stageNumber == 4) {
                ctx.fillStyle = "lightyellow";
            } else if (this.stage.stageNumber == 5) {
                ctx.fillStyle = "white";
            } else {
                ctx.fillStyle = "black";
            }
            ctx.fillRect((left - 1) * this.pixelSize, max_y - ((d - this.cameraDistance) * this.pixelSize), this.pixelSize, this.pixelSize + 1);
            ctx.fillRect(right * this.pixelSize, max_y - ((d - this.cameraDistance) * this.pixelSize), this.pixelSize, this.pixelSize + 1);
            // ゴール線
            const gd = Math.round(d) - (this.stage.goalDistance - 4)
            if (gd >= 0 && gd < 3) {
                const nGoalSquares = Math.floor((right - left) / goalSquareSize);
                for (let i = 0; i < nGoalSquares; i += 1) {
                    const x = left + (right - left) * i / nGoalSquares;
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
        const shadowPoint = [
            {
                x: this.player.x,
                d: this.player.d + 6,
                cos: Math.cos(-this.player.theta),
                sin: Math.sin(-this.player.theta),
                coefficient: 1 / 2,
                r: 22
            }
        ]
        const lampDistance = 40;
        const firstD = Math.floor(this.cameraDistance / lampDistance) * lampDistance;
        for (let d = firstD; d <= this.cameraDistance + Math.ceil(max_y / this.pixelSize) + lampDistance; d += lampDistance) {
            const { left, right } = this.roadX(d);
            shadowPoint.push(
                { x: left + 1, d: d, cos: 1, sin: 0, coefficient: 1, r: 16 },
                { x: right - 1, d: d, cos: 1, sin: 0, coefficient: 1, r: 16 },
            )
        }
        this.stage.cars.forEach((car) => {
            shadowPoint.push(
                { x: car.x, d: car.d + 6, cos: 1, sin: 0, coefficient: 1 / 3, r: 14 }
            )
        });
        for (let d = this.cameraDistance; d <= this.cameraDistance + Math.ceil(max_y / this.pixelSize); d++) {
            for (let x = 0; x < max_x / this.pixelSize + 1; x++) {
                // 個別の光源で計算された alpha の値
                const alphas = shadowPoint.map((p) => {
                    const dx = (x - p.x);
                    const dd = (d - p.d);
                    return Math.sqrt(((dx * p.cos + dd * p.sin)**2 + (-dx * p.sin + dd * p.cos)**2 * p.coefficient)) / p.r
                })
                const alpha = 0.9 - alphas.map((a) => Math.max(0.9 - a, 0)).reduce((sum, tmp) => sum + tmp, 0)
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
        ctx.imageSmoothingEnabled = false;
        const [bg, scaleFactor] = [resource.images.itemBackGround, 1.8];
        const [w, h] = [bg.width * scaleFactor, bg.height * scaleFactor];
        for (let i = 0; i < 8; i++) {
            ctx.drawImage(bg, max_x - w, i * h, w, h);
            const ingredient = this.collectedIngredients[i];
            if (ingredient) {
                const image = imageForIngredient(ingredient);
                ctx.drawImage(image, max_x - w + 4, i * h + 4, w - 8, h - 8);
            }
        }
    }

    drawStageNumberAndTime(ctx) {
        ctx.fillStyle = "rgba(30, 30, 102, 0.7)";
        ctx.fillRect(0, 0, 144, 91);

        const label = new TheStrongGamerLabel();
        label.spacing = 2;
        label.text = `STAGE${this.stage.stageNumber}`;
        label.draw(ctx, 25, 12);
        label.text = "TIME";
        label.draw(ctx, 41, 42);
        const minutes = Math.floor(this.elapsedTime / 60) % 10;
        const seconds = Math.floor(this.elapsedTime % 60);
        const commaSeconds = Math.floor((this.elapsedTime % 1) * 100);
        const secondsString = `${seconds}`.padStart(2, '0');
        const commaSecondsString = `${commaSeconds}`.padStart(2, '0');
        label.text = `${minutes}:${secondsString}:${commaSecondsString}`;
        label.draw(ctx, 17, 64);
    }

    drawHeart(ctx, max_y) {
        ctx.imageSmoothingEnabled = false;
        const scaleFactor = 3;
        for (let i = 0; i < 3; i++) {
            let image = (i < this.player.life) ? resource.images.maxHeart : resource.images.emptyHeart;
            ctx.drawImage(image, 12 + 48 * i, max_y - 42, image.width * scaleFactor, image.height * scaleFactor);
        }
    }

    drawGameOver(ctx, max_x, max_y) {
        this.sceneRouter.stopBGM();
        this.sceneRouter.stopSE(resource.se.bikeEngineEffect);
        if (this.gameOverAnimationTime >= 1.0) {
            ctx.fillStyle = "rgba(" + [0, 0, 0, 0.4] + ")";
            ctx.fillRect(0, 0, max_x, max_y);

            const text = "GAME OVER!"
            ctx.font = "50px Arial";
            ctx.lineJoin = "round";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle"
            ctx.lineWidth = 5;
            ctx.strokeStyle = "rgba(229, 229, 255, 0.2)";
            ctx.strokeText(text, max_x / 2, max_y / 2 - 90);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
            ctx.strokeText(text, max_x / 2, max_y / 2 - 90);
            ctx.fillStyle = "red";
            ctx.fillText(text, max_x / 2, max_y / 2 - 90);

            let r = { x: max_x / 2 - 100, y: max_y / 2, w: 200, h: 50 };
            this.retryButton.scaleFactor = r.w / this.retryButton.width;
            this.retryButtonIsHidden = false;
            this.retryButton.draw(ctx, r.x, r.y, r.w, r.h);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("リトライ", r.x + r.w / 2, r.y + r.h / 2 + 1);

            r = { x: max_x / 2 - 100, y: max_y / 2 + 90, w: 200, h: 50 };
            this.retireButton.scaleFactor = r.w / this.retryButton.width;
            this.retireButtonIsHidden = false;
            this.retireButton.draw(ctx, r.x, r.y, r.w, r.h);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("ステージ選択に戻る", r.x + r.w / 2, r.y + r.h / 2 + 1);

        } else if (this.gameOverAnimationTime > 0.9) {
            ctx.fillStyle = "rgba(" + [0, 0, 0, (this.gameOverAnimationTime - 0.9) * 0.4 / (1.0 - 0.9)] + ")";;
            ctx.fillRect(0, 0, max_x, max_y);
        }
    }

    drawOnPosition(ctx, x, d, image, scaleFactor = 1) {
        const cy = ctx.canvas.height - (d - this.cameraDistance) * this.pixelSize;
        const cx = x * this.pixelSize;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
            image,
            cx - image.width * scaleFactor / 2,
            cy - image.height * scaleFactor / 2,
            image.width * scaleFactor,
            image.height * scaleFactor,
        );
    }

    drawLamp(max_x, max_y, ctx) {
        const distance = 40;
        const firstD = Math.floor(this.cameraDistance / distance) * distance
        for (let d = firstD; d <= this.cameraDistance + Math.ceil(max_y / this.pixelSize); d += distance) {
            const { left, right } = this.roadX(d);
            this.drawOnPosition(ctx, left, d, resource.images.lampLeft, 2);
            this.drawOnPosition(ctx, right, d, resource.images.lampRight, 2)
        }
    }

    onClickRetry() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(scenes.drive);
    }

    onClickRetire() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(scenes.stageSelection);
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
