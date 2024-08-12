import { pizzas } from "./pizzas.mjs"
import { stages } from "../stage/stages.mjs"


// エンディングの種類を列挙した連想配列
export const endings = {
    後遺症エンド: "endings.後遺症エンド",
    入院エンド: "endings.入院エンド",
    ピザ生地冷めちゃったエンド: "endings.ピザ生地冷めちゃったエンド",
    パーフェクトエンド: "endings.パーフェクトエンド",
    素材の味エンド: "endings.素材の味エンド",
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
    [endings.素材の味エンド]: "素材の味エンド",
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
    endings.素材の味エンド,
    endings.海の家エンド,
    endings.イタリア人ぶち切れエンド,
    endings.イタリア修行エンド,
    endings.ピザ博士エンド,
    endings.満腹エンド,
    endings.社員エンド,
    endings.クビエンド,
]

export const goodEnding = [
    endings.パーフェクトエンド,
    endings.素材の味エンド,
    endings.海の家エンド,
    endings.イタリア修行エンド,
    endings.ピザ博士エンド,
    endings.満腹エンド,
    endings.社員エンド
]

export const badEnding = [
    endings.後遺症エンド,
    endings.入院エンド,
    endings.ピザ生地冷めちゃったエンド,
    endings.イタリア人ぶち切れエンド,
    endings.クビエンド,
]



// エンディングの解放方法についてのヒント
export const endingHint = {
    [endings.後遺症エンド]:
        "障害物にたくさんぶつかる または\nたくさんゲームオーバーする",

    [endings.入院エンド]:
        "ゲテモノ系のピザばかりを作る",

    [endings.ピザ生地冷めちゃったエンド]:
        "常に目標タイムをオーバーして\nクリアする",

    [endings.パーフェクトエンド]:
        "すべてのピザを完成させたうえで\n高いスコアでエンディングを見る",

    [endings.素材の味エンド]:
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

// // judgeEnding動作確認用
// import { Slot } from "../dataObject/Slot.mjs"
// import { StageResult } from "../dataObject/StageResult.mjs"
// import { ingredientType } from "./ingredients.mjs"
// const slotTmp = new Slot([
//     new StageResult(stages[1], 5000, pizzas.seafood, 2, 3, 3, [ingredientType.bacon]),
//     new StageResult(stages[4], 2300, pizzas.margherita, 2, 0, 0, [ingredientType.bacon]),
//     new StageResult(stages[4], 7000, pizzas.spicySeafood, 2, 0, 0, [ingredientType.bacon]),
//     new StageResult(stages[4], 6600, pizzas.margherita, 2, 0, 0, [ingredientType.bacon]),
// ]);
// console.log(judgeEnding(slotTmp));

// エンディングを判定する
export function judgeEnding(slot) {
    const totalCollisionCount = slot.stageResults
        .reduce((total, result) => total + result.collisionCount, 0);
    const totalGameOverCount = slot.stageResults
        .reduce((total, result) => total + result.gameOverCount, 0);

    const isEveryExceedTargetTime =
    slot.stageResults.every(result => {
        const stage = result.stage;
        return stage && result.goalTime > stage.targetTime;
    })

    const totalScore = Object.keys(stages).map((stageNumber) =>
        // stages[stageNumber] のスコアの最大値
        slot.stageResults
            .filter((result) => result.stage.stageNumber == stageNumber)
            .map((result) => result.score)
            .reduce((maxScore, score) => Math.max(maxScore, score))
    ).reduce((total, score) => total + score, 0)

    const totalStrangePizzaCount = totalPizzaCount(slot, pizzas.strangePizza);
    const totalDoughCount = totalPizzaCount(slot, pizzas.dough);
    const totalSeafoodCount = totalPizzaCount(slot, pizzas.seafood);
    const totalSpicySeafoodCount = totalPizzaCount(slot, pizzas.spicySeafood);
    const totalMargheritaCount = totalPizzaCount(slot, pizzas.margherita);
    const totalMarinaraCount = totalPizzaCount(slot, pizzas.marinara);
    const totalQuattroFormaggiCount = totalPizzaCount(slot, pizzas.quattroFormaggi);
    const totalDiabolaCount = totalPizzaCount(slot, pizzas.diabola);
    //本場のピザ(マルゲリータ・マリナーラ・クアトロフォルマッジ・ディアボラ)の合計
    const authenticPizzaCount = totalMargheritaCount + totalMarinaraCount + totalQuattroFormaggiCount + totalDiabolaCount;

    const pizzasType = (new Set(slot.stageResults.map(result => result.pizza))).size;

    if (totalCollisionCount >= 5 || totalGameOverCount >= 10) {
        return endings.後遺症エンド;
    } else if(totalStrangePizzaCount >= 4){
        return endings.入院エンド;
    } else if(slot.stageResults && isEveryExceedTargetTime){
        return endings.ピザ生地冷めちゃったエンド;
    } else if(pizzasType == Object.values(pizzas).length - 1 && totalScore >= 10000){
        return endings.パーフェクトエンド;
    } else if(totalDoughCount >= 4){
        return endings.素材の味エンド;
    } else if(totalSeafoodCount + totalSpicySeafoodCount >= 3){
        return endings.海の家エンド;
    } else if(slot.stageResults && authenticPizzaCount == 0){
        return endings.イタリア人ぶち切れエンド;
    } else if(totalScore >= 10000){
        return endings.イタリア修行エンド;
    } else if(pizzasType >= Math.floor(Object.values(pizzas).length * 0.75)){
        return endings.ピザ博士エンド;
    } else if(slot.stageResults.length >= 8){
        return endings.満腹エンド;
    } else if(totalScore >= 5000){
        return endings.社員エンド;
    } else {
        return endings.クビエンド;
    }
}

function totalPizzaCount(slot, pizza){
    return slot.stageResults.reduce((count, result) => {
        return result.pizza === pizza ? count + 1 : count;
    }, 0);
}

// エンディング画面で表示するテキスト
export const endingMessage = {
    [endings.クビエンド]:
        "店長「明日から来なくていい！クビだ！」\n主人公「ひえぇ」",
    [endings.満腹エンド]:
        "店長「ご苦労！顧客はみんな満腹になったぞ！」\n主人公「やったー」",
    [endings.後遺症エンド]:
        "後遺症エンドのテキストです",
    [endings.入院エンド]:
        "入院エンドのテキストです",
    [endings.ピザ生地冷めちゃったエンド]:
        "ピザ生地冷めちゃったエンドのテキストです",
    [endings.パーフェクトエンド]:
        "パーフェクトエンドのテキストです",
    [endings.素材の味エンド]:
        "素材の味エンドのテキストです",
    [endings.海の家エンド]:
        "海の家エンドのテキストです",
    [endings.イタリア人ぶち切れエンド]:
        "イタリア人ぶち切れエンドのテキストです",
    [endings.イタリア修行エンド]:
        "イタリア修行エンドのテキストです",
    [endings.ピザ博士エンド]:
        "ピザ博士エンドのテキストです",
    [endings.社員エンド]:
        "社員エンドのテキストです",
}
