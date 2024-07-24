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

// エンディングの表示名
export const endingName = {
    [endings.満腹エンド]: "満腹エンド",
    [endings.引きこもりエンド]: "引きこもりエンド",
}

// エンディングを判定する
export function judgeEnding(slot) {
    if (slot.stageResults.length >= 1) {
        return endings.満腹エンド;
    } else {
        return endings.引きこもりエンド;
    }
}

// エンディング画面で表示するテキスト
export const endingMessage = {
    [endings.引きこもりエンド]:
        "店長「引きこもってないで仕事しなさい！」\n主人公「ひえぇ」",
    [endings.満腹エンド]:
        "店長「ご苦労！顧客はみんな満腹になったぞ！」\n主人公「やったー」",
}
