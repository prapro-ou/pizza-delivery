import { StageResult } from "./StageResult.mjs";

// セーブデータ
export class Slot {
    constructor(stageResults = []) {
        this.stageResults = stageResults;
    }

    static createFromJSONData(data) {
        const slot = new Slot();
        slot.stageResults = data.stageResults.map(StageResult.createFromJSONData);
        return slot;
    }

    withAddedStageResult(stageResult) {
        return new Slot([...this.stageResults, stageResult]);
    }
}
