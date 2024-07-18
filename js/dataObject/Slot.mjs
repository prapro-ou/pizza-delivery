import { StageResult } from "./StageResult.mjs";

// セーブデータ
export class Slot {
    constructor() {
        this.stageResults = [];
    }

    static createFromJSONData(data) {
        const slot = new Slot();
        slot.stageResults = data.stageResults.map(StageResult.createFromJSONData);
        return slot;
    }

    appendStageResult(stageResult) {
        this.stageResults.push(stageResult);
    }
}
