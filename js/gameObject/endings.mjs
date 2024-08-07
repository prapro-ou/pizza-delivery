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

// エンディングを判定する
export function judgeEnding(slot) {
    
    const totalCollisionCount = slot.stageResults.reduce((total, result) => {
        total + result.collisionCount
    }, 0);
    const totalGameOverCount = slot.stageResults.reduce((total, result) => {
        total + result.gameOverCount
    }, 0);
    
    const isEveryExceedTargetTime  = 
    slot.stageResults.every(result => {
        const stage = stages[result.stage];
        return stage && result.goalTime > stage.targetTime;
    })
    
    const totalStrangePizzaCount = totalPizzaCount(slot, pizzas.strangePizza);
    const totalDoughCount = totalPizzaCount(slot, pizzas.strangePizza);
    const totalSeafoodCount = totalPizzaCount(slot, pizzas.strangePizza);
    const totalSpicySeafoodCount = totalPizzaCount(slot, pizzas.strangePizza);
    const totalMargheritaCount = totalPizzaCount(slot, pizzas.margherita);
    const totalMarinaraCount = totalPizzaCount(slot, pizzas.marinara);
    const totalQuattroFormaggiCount = totalPizzaCount(slot, pizzas.quattroFormaggi);
    //本場のピザ(マルゲリータ・マリナーラ・クアトロフォルマッジ)の合計
    const AuthenticPizzaCount = totalMargheritaCount + totalMarinaraCount + totalQuattroFormaggiCount;

    const pizzasType = (new Set(slot.stageResults.map(result => result.pizza))).size;

    if (totalCollisionCount >= 5 || totalGameOverCount >= 10) {
        return endings.後遺症エンド;
    } else if(totalStrangePizzaCount >= 4){
        return endings.入院エンド;
    } else if(slot.stageResults.length >= 1 && isEveryExceedTargetTime){
        return endings.ピザ生地冷めちゃったエンド;
    // TODO:パーフェクトエンド
    } else if(totalDoughCount >= 4){
        return endings.素材の味エンド;
    } else if(totalSeafoodCount + totalSpicySeafoodCount >= 3){
        return endings.海の家エンド;
    } else if(slot.stageResults.length >= 1 && AuthenticPizzaCount === 0){
        return endings.イタリア人ぶち切れエンド;
    // TODO:イタリア修行エンド
    } else if(pizzasType >= 4){
        return endings.ピザ博士エンド;
    } else if(slot.stageResults.length >= 4){
        return endings.満腹エンド;
    }
    // TODO:社員エンド
    else {
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

