// ステージを1回クリアするごとに生成される結果の情報
export class StageResult {
    constructor(stageNumber, score, pizza, goalTime, gameOverCount, collisionCount, collectedIngredient) {
        this.stageNumber = stageNumber;
        this.score = score;
        this.pizza = pizza;
        this.goalTime = goalTime;
        this.gameOverCount = gameOverCount;
        this.collisionCount = collisionCount;
        this.collectedIngredient = collectedIngredient;
    }

    static createFromJSONData(data) {
        if (data.stage) data.stageNumber = data.stage.stageNumber;  // 古いバージョンとの互換性保持
        return new StageResult(
            data.stageNumber,
            data.score,
            data.pizza,
            data.goalTime,
            data.gameOverCount,
            data.collisionCount,
            data.collectedIngredient,
        );
    }
}
