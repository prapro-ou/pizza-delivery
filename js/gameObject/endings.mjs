// エンディングの種類を列挙した連想配列
export const endings = {
    ピザ生地職人エンド: "ending.ピザ生地職人エンド",
    引きこもりエンド: "ending.引きこもりエンド",
    満腹エンド: "ending.満腹エンド",
    海の家エンド: "ending.海の家エンド",
    入院エンド: "ending.入院エンド",
    イタリア修行エンド: "ending.イタリア修行エンド",
    イタリア人ぶち切れエンド: "ending.イタリア人ぶち切れエンド"
}

// エンディングを判定する
export function judgeEnding(slot) {
    if (slot.stageResults.length >= 1) {
        return endings.満腹エンド;
    } else {
        return endings.引きこもりエンド;
    }
}
