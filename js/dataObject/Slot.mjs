import { StageResult } from "./StageResult.mjs";

// セーブデータ
export class Slot {
    constructor(stageResults = [], ending = null) {
        this.stageResults = stageResults;
        this.ending = ending;
    }

    static createFromJSONData(data) {
        const slot = new Slot();
        slot.stageResults = data.stageResults.map(StageResult.createFromJSONData);
        slot.ending = data.ending ?? null;
        return slot;
    }

    withAddedStageResult(stageResult) {
        return new Slot([...this.stageResults, stageResult], ending);
    }
}
