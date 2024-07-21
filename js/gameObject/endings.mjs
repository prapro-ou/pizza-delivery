// エンディングの種類を列挙した連想配列
export const endings = {
    後遺症エンド: "endings.後遺症エンド",
    入院エンド: "endings.入院エンド",
    ピザ生地冷めちゃったエンド: "endings.ピザ生地冷めちゃったエンド",
    パーフェクトエンド: "endings.パーフェクトエンド",
    素材の味_旧ピザ生地職人エンド: "endings.素材の味_旧ピザ生地職人エンド",
    海の家エンド: "endings.海の家エンド",
    イタリア人ぶち切れエンド: "endings.イタリア人ぶち切れエンド",
    イタリア修行エンド: "endings.イタリア修行エンド",
    ピザ博士エンド: "endings.ピザ博士エンド",
    満腹エンド: "endings.満腹エンド",
    社員エンド: "endings.社員エンド",
    クビエンド: "endings.クビエンド",
}

// エンディングの表示名
export const endingName = {
    [endings.後遺症エンド]: "後遺症エンド",
    [endings.入院エンド]: "入院エンド",
    [endings.ピザ生地冷めちゃったエンド]: "ピザ生地冷めちゃったエンド",
    [endings.パーフェクトエンド]: "パーフェクトエンド",
    [endings.素材の味_旧ピザ生地職人エンド]: "素材の味_旧ピザ生地職人エンド",
    [endings.海の家エンド]: "海の家エンド",
    [endings.イタリア人ぶち切れエンド]: "イタリア人ぶち切れエンド",
    [endings.イタリア修行エンド]: "イタリア修行エンド",
    [endings.ピザ博士エンド]: "ピザ博士エンド",
    [endings.満腹エンド]: "満腹エンド",
    [endings.社員エンド]: "社員エンド",
    [endings.クビエンド]: "クビエンド",
}

// エンディングの優先順位(最初の方ほど優先される)
export const endingOrder = [
    endings.後遺症エンド,
    endings.入院エンド,
    endings.ピザ生地冷めちゃったエンド,
    endings.パーフェクトエンド,
    endings.素材の味_旧ピザ生地職人エンド,
    endings.海の家エンド,
    endings.イタリア人ぶち切れエンド,
    endings.イタリア修行エンド,
    endings.ピザ博士エンド,
    endings.満腹エンド,
    endings.社員エンド,
    endings.クビエンド,
]

// エンディングの解放方法についてのヒント
export const endingHint = {
    [endings.後遺症エンド]:
        "障害物にたくさんぶつかる または\nたくさんゲームオーバーする",

    [endings.入院エンド]:
        "ゲテモノ系のピザばかりを作る",

    [endings.ピザ生地冷めちゃったエンド]:
        "全ステージ目標タイムをオーバーして\nクリアする",

    [endings.パーフェクトエンド]:
        "すべてのピザを完成させたうえで\n高いスコアでエンディングを見る",

    [endings.素材の味_旧ピザ生地職人エンド]:
        "ただのピザ生地ばかりを作る",

    [endings.海の家エンド]:
        "シーフードピザ または\nスパイシーシーフードピザを3回作る",

    [endings.イタリア人ぶち切れエンド]:
        "本場のピザを作らずにエンディングを見る",

    [endings.イタリア修行エンド]:
        "高いスコアでエンディングを見る",

    [endings.ピザ博士エンド]:
        "n種類のピザを作る",

    [endings.満腹エンド]:
        "ピザをたくさん作る",

    [endings.社員エンド]:
        "普通ぐらいのスコアでエンディングを見る",

    [endings.クビエンド]:
        "少ないスコアでエンディングを見る",
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
