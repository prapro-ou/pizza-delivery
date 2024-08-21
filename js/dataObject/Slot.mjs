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
        return new Slot([...this.stageResults, stageResult], this.ending);
    }

    maxStageNumber(){
        if(this.stageResults.length === 0){
            return 0;
        } else {
            return this.stageResults.reduce((max, result) => {
                return Math.max(max,result.stageNumber);
            }, 1);
        }
    }
}
