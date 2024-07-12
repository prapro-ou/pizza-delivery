// ステージを1回クリアするごとに生成される結果の情報
export class StageResult {
    constructor(stage, score, pizza) {
        this.stage = stage;
        this.score = score;
        this.pizza = pizza;
    }

    static createFromJSONData(data) {
        return new StageResult(data.stage, data.score, data.pizza);
    }
}
