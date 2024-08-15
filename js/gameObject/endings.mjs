import { pizzas } from "./pizzas.mjs"
import { stages } from "../stage/stages.mjs"


// エンディングの種類を列挙した連想配列
export const endings = {
    重症エンド: "endings.重症エンド",
    入院エンド: "endings.入院エンド",
    ピザ生地の冷めた日エンド: "endings.ピザ生地の冷めた日エンド",
    パーフェクトエンド: "endings.パーフェクトエンド",
    素材の味エンド: "endings.素材の味エンド",
    海の家エンド: "endings.海の家エンド",
    本場リスペクトエンド: "endings.本場リスペクトエンド",
    イタリア修行エンド: "endings.イタリア修行エンド",
    ピザ博士エンド: "endings.ピザ博士エンド",
    満腹エンド: "endings.満腹エンド",
    社員エンド: "endings.社員エンド",
    ピザ見習いエンド: "endings.ピザ見習いエンド",
}

// エンディングの表示名
export const endingName = {
    [endings.重症エンド]: "重症エンド",
    [endings.入院エンド]: "入院エンド",
    [endings.ピザ生地の冷めた日エンド]: "ピザ生地の冷めた日エンド",
    [endings.パーフェクトエンド]: "パーフェクトエンド",
    [endings.素材の味エンド]: "素材の味エンド",
    [endings.海の家エンド]: "海の家エンド",
    [endings.本場リスペクトエンド]: "本場リスペクトエンド",
    [endings.イタリア修行エンド]: "イタリア修行エンド",
    [endings.ピザ博士エンド]: "ピザ博士エンド",
    [endings.満腹エンド]: "満腹エンド",
    [endings.社員エンド]: "社員エンド",
    [endings.ピザ見習いエンド]: "ピザ見習いエンド",
}

// エンディングの優先順位(最初の方ほど優先される)
export const endingOrder = [
    endings.重症エンド,
    endings.入院エンド,
    endings.ピザ生地の冷めた日エンド,
    endings.パーフェクトエンド,
    endings.素材の味エンド,
    endings.海の家エンド,
    endings.本場リスペクトエンド,
    endings.イタリア修行エンド,
    endings.ピザ博士エンド,
    endings.満腹エンド,
    endings.社員エンド,
    endings.ピザ見習いエンド,
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
    endings.重症エンド,
    endings.入院エンド,
    endings.ピザ生地の冷めた日エンド,
    endings.本場リスペクトエンド,
    endings.ピザ見習いエンド,
]

// エンディングの解放方法についてのヒント
export const endingHint = {
    [endings.重症エンド]:
        "障害物にたくさんぶつかる または\nたくさんゲームオーバーする",

    [endings.入院エンド]:
        "ゲテモノピザばかりを作る",

    [endings.ピザ生地の冷めた日エンド]:
        "常に目標タイムをオーバーして\nクリアする",

    [endings.パーフェクトエンド]:
        "すべてのピザを完成させたうえで\n高いスコアでエンディングを見る",

    [endings.素材の味エンド]:
        "ただのピザ生地ばかりを作る",

    [endings.海の家エンド]:
        "シーフードピザ または\nスパイシーシーフードピザを3回作る",

    [endings.本場リスペクトエンド]:
        "本場のピザを作らずにエンディングを見る",

    [endings.イタリア修行エンド]:
        "高いスコアでエンディングを見る",

    [endings.ピザ博士エンド]:
        "n種類のピザを作る",

    [endings.満腹エンド]:
        "ピザをたくさん作る",

    [endings.社員エンド]:
        "普通ぐらいのスコアでエンディングを見る",

    [endings.ピザ見習いエンド]:
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
        return endings.重症エンド;
    } else if(totalStrangePizzaCount >= 4){
        return endings.入院エンド;
    } else if(slot.stageResults && isEveryExceedTargetTime){
        return endings.ピザ生地の冷めた日エンド;
    } else if(pizzasType == Object.values(pizzas).length - 1 && totalScore >= 10000){
        return endings.パーフェクトエンド;
    } else if(totalDoughCount >= 4){
        return endings.素材の味エンド;
    } else if(totalSeafoodCount + totalSpicySeafoodCount >= 3){
        return endings.海の家エンド;
    } else if(slot.stageResults && authenticPizzaCount == 0){
        return endings.本場リスペクトエンド;
    } else if(totalScore >= 10000){
        return endings.イタリア修行エンド;
    } else if(pizzasType >= Math.floor(Object.values(pizzas).length * 0.75)){
        return endings.ピザ博士エンド;
    } else if(slot.stageResults.length >= 8){
        return endings.満腹エンド;
    } else if(totalScore >= 5000){
        return endings.社員エンド;
    } else {
        return endings.ピザ見習いエンド;
    }
}

function totalPizzaCount(slot, pizza){
    return slot.stageResults.reduce((count, result) => {
        return result.pizza === pizza ? count + 1 : count;
    }, 0);
}

// エンディング画面で表示するテキスト
export const endingMessage = {
    [endings.ピザ見習いエンド]:
        "店長「お客様からクレームがたくさん来ているぞ。\n店の信頼はダダ下がりだ。明日から来なくていいよ。」\n主人公「それだけは勘弁してください」\n店長「なんちゃって。明日からまた頑張ってくれればいいよ」\n主人公「店長ぉぉぉ」",
    [endings.満腹エンド]:
        "主人公「その前に僕からいいですか？\nなんか前より太ってません？」\n店長「君がたくさんピザを作っているところを見るとおなかがすいてね。\nもぉう食べられないよぉ」\n主人公「何やってんだこの人」",
    [endings.重症エンド]:
        "店長「なんか体ボロボロじゃないか？」\n主人公「...大丈夫..です」\nバタンッ!\n主人公は病院に運ばれ、全治一か月の怪我を負った。",
    [endings.入院エンド]:
        "店長「なんか顔色悪くないか？」\n主人公「そんなこと...ウッ」\nバタンッ!\n密かにゲテモノピザを味見していた主人公は\nお腹をこわし、病院に運ばれた。",
    [endings.ピザ生地の冷めた日エンド]:
        "店長「届けるのが遅すぎるよ。\nせっかくの熱々なピザ生地が台無しじゃないか！」\n 主人公「...すみません」\nピザに対する情熱も冷め、アルバイトを辞めることも考えた。\nが、まかないのピザを食べて情熱を取り戻し、彼はまた宅配に向かった。",
    [endings.パーフェクトエンド]:
        "店長「君宛にこんな手紙が届いているぞ」\n\"Congratulations! ここまで遊んでくれてありがとう!\" \n店長「よく分らんが、優秀な部下を持って私も鼻が高いよ」",
    [endings.素材の味エンド]:
        "店長「トッピング無しの状態でお客様に提供したようだな...\nよく分かっているじゃないか。\n一番おいしいのはピザ生地そのものなんだよ。\nこの調子でピザ生地本来のよさを広めていってくれ」\n主人公「はい。(もしかしてそのために食材を捨てたりとか...ないよな)」",
    [endings.海の家エンド]:
        "店長「魚介系のピザをたくさん作ったようだな。\nそんな君に知り合いが経営している海の家で \n得意のシーフートピザを振舞ってもらえないか？」\n主人公：「ぜひ！」",
    [endings.本場リスペクトエンド]:
        "店長「ワタシノ　ボコクノ　ピッツァノ　ミリョクヲ\nイロイロナヒト二　ヒロメテクレタ　ヨウダネ。\nアリガトウ」\n主人公「そういえば店長イタリア人だった」",
    [endings.イタリア修行エンド]:
        "店長「スバラシイ　シゴトブリダッタ。\nワタシノ　ボコク　イタリアデ　ピザノ シュギョウ　スルキハナイ？」\n主人公「海外はちょっと...」\n店長「キョヒケンハ　アリマセーン。イマカラ　イキマショーウ」",
    [endings.ピザ博士エンド]:
        "店長「よくこんなにピザの種類を知ってたね」\n主人公「はい。ピザ屋のアルバイターですから」\n(適当に作ったなんて言えない。)",
    [endings.社員エンド]:
        "店長「よくこの危機的状況を乗り越えてくれた。\n是非とも社員になってくれ」\n主人公「ありがとうございます」",
}
