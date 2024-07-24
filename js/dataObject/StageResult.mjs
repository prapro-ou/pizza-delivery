// ステージを1回クリアするごとに生成される結果の情報
export class StageResult {
    constructor(stage, score, pizza, goalTime, gameOverCount, collisionCount, collectedIngredient) {
        this.stage = stage;
        this.score = score;
        this.pizza = pizza;
        this.goalTime = goalTime;
        this.gameOverCount = gameOverCount;
        this.collisionCount = collisionCount;
        this.collectedIngredient = collectedIngredient;
    }

    static createFromJSONData(data) {
        return new StageResult(
            data.stage,
            data.score,
            data.pizza,
            data.goalTime,
            data.gameOverCount,
            data.collisionCount,
            data.collectedIngredient,
        );
    }
}
