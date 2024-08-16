import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { pizzas, pizzaName, pizzaScore,imageForPizza } from "../gameObject/pizzas.mjs";
import { dataKeys } from '../dataObject/dataKeysSettings.mjs';
import { ingredientType, ingredientName, ingredientScore, imageForIngredient } from "../gameObject/ingredients.mjs"
import { resource } from '../resource.mjs';
import { rndbColors, RoundButton } from '../component/RoundButton.mjs';
import { StageResult } from '../dataObject/StageResult.mjs';
import { Slot } from '../dataObject/Slot.mjs';

// リザルト画面
// - 入力
//   - this.sharedData.stage: ステージ
//   - this.sharedData.cookedPizza: 作ったピザ
//   - this.sharedData.goalTime: タイム
//   - this.sharedData.collectedIngredients: 集めた食材の配列
//   - this.sharedData.selectedIndices: 集めた食材の中で、選択した食材のインデックスの配列
// - 出力
//   - this.sharedData.score: スコア
export class ResultScene extends Scene {
    sceneWillAppear(){
        this.sceneRouter.setBGM(resource.bgm.MusMusBGM115);

        this.pizza = this.sharedData.cookedPizza;
        this.stage = this.sharedData.stage;
        this.goalTime = this.sharedData.goalTime;
        this.targetTime = this.sharedData.stage.targetTime;

        const pizzaInfo = this.sceneRouter.load(dataKeys.pizzaInfo);
        pizzaInfo.unlock(this.pizza);
        this.sceneRouter.save(dataKeys.pizzaInfo, pizzaInfo);

        this.collectedIngredients = this.sharedData.collectedIngredients;
        this.selectedIndices = this.sharedData.selectedIndices;
        this.ingredientCounts = this.collectedIngredients.reduce((obj, ingredient) => {
            if (obj[ingredient]) {
                obj[ingredient]++;
            } else {
                obj[ingredient] = 1;
            }
            return obj;
        }, {});

        // クリアタイムによるスコア変動の倍率
        this.timeBonusFactor = 1;

        this.scoreDetail = this.calculateScoreDetail();
        this.totalScore = this.scoreDetail.pizzaScore + this.scoreDetail.ingredientsScore + this.scoreDetail.timeBonus;

        this.setUpUI();
    }

    setUpUI() {
        this.saveButton = new RoundButton(rndbColors.green);
        this.saveButton.text = "セーブ";
        this.saveButton.onClick = this.onClickSave.bind(this);
        this.notSaveButton = new RoundButton(rndbColors.red);
        this.notSaveButton.text = "保存しない";
        this.notSaveButton.onClick = this.onClickNotSave.bind(this);
    }

    updateStates(deltaTime, mouse) {
        this.saveButton.updateStates(mouse);
        this.notSaveButton.updateStates(mouse);
    }

    render(ctx) {
        const maxX = ctx.canvas.width;
        const maxY = ctx.canvas.height;

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(resource.images.woodBackground, 0, 0, maxX, maxY);

        ctx.fillStyle = "black";
        ctx.font = "52px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText("リザルト", 35, 70);

        this.drawPizza(ctx, 147, 135);
        this.drawPizzaDetail(ctx, 34, 317);
        this.drawScoreResult(ctx, 443, 0, 303);
        this.saveButton.draw(ctx, 522, 514);
        this.notSaveButton.draw(ctx, 249, 514);
    }

    drawPizza(ctx, x, y) {
        let bg = resource.images.itemBackGroundBig;
        const [width, height] = [bg.width * 3, bg.height * 3];
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(bg, x, y, width, height);
        ctx.drawImage(imageForPizza(this.pizza), x, y + height - width, width, width);
    }

    drawPizzaDetail(ctx, x, y) {
        const image = resource.images.goldFrame
        ctx.drawImage(image, x, y, image.width, image.height);
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(pizzaName[this.pizza], x + 188, y + 43, 350);

        let lines = ["ー 使用した食材 ー", "", ""];
        for (let i = 0; i < this.selectedIndices.length; i++) {
            const ingredient = this.collectedIngredients[this.selectedIndices[i]];
            lines[1 + Math.floor(i / 2)] += ((i % 2) ? "　" : "") + ingredientName[ingredient];
        }
        ctx.font = "20px Arial";
        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], x + 188, y + 78 + i * 30, 350);
        }
    }

    onClickSave() {
        this.sharedData.onSelectSlot = this.onSelectSlot.bind(this);
        this.sceneRouter.presentModal(scenes.slotSelection);
    }

    onSelectSlot(slotIndex) {
        const stageResult = new StageResult(
            this.sharedData.stage,
            this.totalScore,
            this.sharedData.cookedPizza,
            this.sharedData.goalTime,
            this.sharedData.gameOverCount,
            this.sharedData.collisionCount,
            this.sharedData.collectedIngredients,
        )
        const slots = this.sceneRouter.load(dataKeys.slots);
        let slot = slots[this.sharedData.playingSlotIndex] ?? new Slot();
        slots[slotIndex] = slot.withAddedStageResult(stageResult);
        this.sceneRouter.save(dataKeys.slots, slots);

        this.sharedData.playingSlotIndex = slotIndex;
        this.sharedData.selectedIndices = [];
        this.sceneRouter.changeScene(scenes.stageSelection);
    }

    onClickNotSave() {
        this.sharedData.selectedIndices = [];
        this.sceneRouter.changeScene(scenes.stageSelection);
    }

    drawScoreResult(ctx, x, y, width) {
        ctx.font = "21px Arial";
        ctx.textBaseline = "middle";
        const padding = 18;
        const [left, center, right] = [x + padding, x + width / 2, x + width - padding];
        const textW = width - padding * 2
        const i2s = (n) => n == 0 ? "0" : n.toLocaleString("ja-JP");

        let lines = [];
        lines.push((y) => {
            ctx.textAlign = "center";
            ctx.fillText("提供したピザ", center, y);
        });
        lines.push((y) => {
            ctx.textAlign = "left";
            ctx.fillText(pizzaName[this.pizza], left, y);
            ctx.textAlign = "right";
            ctx.fillText(i2s(pizzaScore[this.pizza]), right, y);
        });
        lines.push((y) => {
            ctx.textAlign = "center";
            ctx.fillText("拾った食材", center, y);
        });
        Object.entries(this.ingredientCounts).forEach(([ingredient, count]) => {
            if (count == 1) {
                lines.push((y) => {
                    ctx.textAlign = "left";
                    ctx.fillText(ingredientName[ingredient], left, y);
                    ctx.textAlign = "right";
                    ctx.fillText(i2s(ingredientScore[ingredient]), right, y);
                })
            } else {
                lines.push((y) => {
                    ctx.textAlign = "left";
                    ctx.fillText(ingredientName[ingredient], left, y);
                })
                lines.push((y) => {
                    ctx.textAlign = "left";
                    ctx.fillText(`　@${ingredientScore[ingredient]} x${count}`, left, y);
                    ctx.textAlign = "right";
                    ctx.fillText(i2s(ingredientScore[ingredient] * count), right, y);
                })
            }
        });
        lines.push((y) => {
            ctx.textAlign = "center";
            ctx.fillText("その他", center, y);
        });
        lines.push((y) => {
            ctx.textAlign = "left";
            ctx.fillText(`タイム ${this.goalTime.toFixed(2)}s`, left, y);
            ctx.textAlign = "right";
            ctx.fillText(i2s(this.scoreDetail.timeBonus), right, y);
        });
        lines.push((y) => {
            ctx.textAlign = "center";
            ctx.fillText("−−−−−−−−−−−−−−−−−−−−−−", center, y, textW);
        });
        lines.push((y) => {
            ctx.textAlign = "left";
            ctx.fillText("合計スコア", left, y);
            ctx.textAlign = "right";
            ctx.font = "bold " + ctx.font
            ctx.fillText(i2s(this.totalScore), right, y);
            ctx.font = ctx.font.substring("bold ".length);
        });

        ctx.fillStyle = "white";
        ctx.fillRect(443, 0, 303, 44 + 29 * lines.length);

        ctx.fillStyle = "black";
        let ty = y + 40;
        for (let i = 0; i < lines.length; i++) {
            lines[i](ty);
            ty += 29
        }
    }

    drawResultIngredients(ctx, xOffset, yOffset, width) {

        ctx.fillStyle = "lightblue";
        ctx.fillRect(xOffset, yOffset, width, (width / 4 + 15) * 2);

        const ingredientKeys = Object.keys(this.ingredientCounts);
        for (let i = 0; i < ingredientKeys.length; i++) {
            const row = Math.floor(i / 4);
            const column = i % 4;
            const ingredient = ingredientKeys[i];
            const ingredientCount = this.ingredientCounts[ingredient];
            this.drawIngredient(
                ctx,
                ingredient,
                ingredientCount,
                xOffset + column * width / 4 + 10,
                yOffset + row * (width / 4 + 15),
                80
            )
        }
    }

    //スコア = 作ったピザの点数 + 食材毎の点数 + (目標タイム - 経過時間) * timeBonusFactor
    calculateScoreDetail() {
        const scoreDetail = {
            pizzaScore: 0,
            ingredientsScore: 0,
            timeBonus: 0,
        }

        scoreDetail.pizzaScore = pizzaScore[this.pizza];

        for(let ingredientKey in this.ingredientCounts) {
            scoreDetail.ingredientsScore += ingredientScore[ingredientKey] * this.ingredientCounts[ingredientKey];
        }

        scoreDetail.timeBonus = Math.round((this.targetTime - this.goalTime) * this.timeBonusFactor);
        return scoreDetail;
    }
}
