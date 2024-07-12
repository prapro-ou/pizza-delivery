// エンディングの解放状態などの情報
export class EndingInfo {
    constructor(unlockedEndings = {}){
        this.unlockedEndings = unlockedEndings;
    }

    //エンディングがアンロックされているかを確認
    isUnlocked(ending) {
        return ending in this.unlockedEndings;
    }

    // エンディングを解禁した時に呼び出すメソッド
    unlock(ending) {
        if (ending in this.unlockedEndings){
            this.unlockedEndings[ending]++;
        } else {
            this.unlockedEndings[ending] = 1;
        }
    }

    static createFromJSONData(data) {
        return new EndingInfo(data.unlockedEndings);
    }
}
