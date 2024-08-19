import { pizzas } from "./pizzas.mjs"
import { stages } from "../stage/stages.mjs"


// エンディングの種類を列挙した連想配列
export const endings = {
    重症エンド: "endings.重症エンド",
    入院エンド: "endings.入院エンド",
    ピザ生地冷めちゃったエンド: "endings.ピザ生地冷めちゃったエンド",
    パーフェクトエンド: "endings.パーフェクトエンド",
    素材の味エンド: "endings.素材の味エンド",
    海の家エンド: "endings.海の家エンド",
    本場リスペクトエンド: "endings.本場リスペクトエンド",
    ピザ博士エンド: "endings.ピザ博士エンド",
    イタリア修行エンド: "endings.イタリア修行エンド",
    満腹エンド: "endings.満腹エンド",
    社員エンド: "endings.社員エンド",
    ピザ見習いエンド: "endings.ピザ見習いエンド",
}

// エンディングの表示名
export const endingName = {
    [endings.重症エンド]: "重症エンド",
    [endings.入院エンド]: "入院エンド",
    [endings.ピザ生地冷めちゃったエンド]: "ピザ生地冷めちゃったエンド",
    [endings.パーフェクトエンド]: "パーフェクトエンド",
    [endings.素材の味エンド]: "素材の味エンド",
    [endings.海の家エンド]: "海の家エンド",
    [endings.本場リスペクトエンド]: "本場リスペクトエンド",
    [endings.ピザ博士エンド]: "ピザ博士エンド",
    [endings.イタリア修行エンド]: "イタリア修行エンド",
    [endings.満腹エンド]: "満腹エンド",
    [endings.社員エンド]: "社員エンド",
    [endings.ピザ見習いエンド]: "ピザ見習いエンド",
}

// エンディングの優先順位(最初の方ほど優先される)
export const endingOrder = [
    endings.重症エンド,
    endings.入院エンド,
    endings.ピザ生地冷めちゃったエンド,
    endings.パーフェクトエンド,
    endings.素材の味エンド,
    endings.海の家エンド,
    endings.本場リスペクトエンド,
    endings.ピザ博士エンド,
    endings.イタリア修行エンド,
    endings.満腹エンド,
    endings.社員エンド,
    endings.ピザ見習いエンド,
]

export const goodEnding = [
    endings.パーフェクトエンド,
    endings.素材の味エンド,
    endings.海の家エンド,
    endings.本場リスペクトエンド,
    endings.ピザ博士エンド,
    endings.イタリア修行エンド,
    endings.満腹エンド,
    endings.社員エンド
]

export const badEnding = [
    endings.重症エンド,
    endings.入院エンド,
    endings.ピザ生地冷めちゃったエンド,
    endings.ピザ見習いエンド,
]

// エンディングの解放方法についてのヒント
export const endingHint = {
    [endings.重症エンド]:
        "たくさんゲームオーバーする",

    [endings.入院エンド]:
        "ゲテモノピザばかりを作る",

    [endings.ピザ生地冷めちゃったエンド]:
        "常に目標タイムをオーバーして\nクリアする",

    [endings.パーフェクトエンド]:
        "すべてのピザを完成させたうえで\n高いスコアでエンディングを見る",

    [endings.素材の味エンド]:
        "ただのピザ生地ばかりを作る",

    [endings.海の家エンド]:
        "シーフードピザ または\nスパイシーシーフードピザばかり作る",

    [endings.本場リスペクトエンド]:
        "本場のピザばかり作る",
        
    [endings.ピザ博士エンド]:
        "たくさんの種類のピザを作る",

    [endings.イタリア修行エンド]:
        "高いスコアでエンディングを見る",

    [endings.満腹エンド]:
        "ピザをたくさん作る",

    [endings.社員エンド]:
        "普通ぐらいのスコアでエンディングを見る",

    [endings.ピザ見習いエンド]:
        "少ないスコアでエンディングを見る",
}

// judgeEnding動作確認用
// import { Slot } from "../dataObject/Slot.mjs"
// import { StageResult } from "../dataObject/StageResult.mjs"
// import { ingredientType } from "./ingredients.mjs"
// const slotTmp = new Slot([
//     new StageResult(stages[1], 1000, pizzas.marinara, 2, 0, 3, [ingredientType.bacon]),
//     new StageResult(stages[2], 1010, pizzas.margherita, 2, 0, 0, [ingredientType.bacon]),
//     new StageResult(stages[3], 1000, pizzas.dough, 2, 0, 0, [ingredientType.bacon]),
//     new StageResult(stages[4], 1000, pizzas.uniquePizza, 2, 0, 0, [ingredientType.bacon]),
//     new StageResult(stages[5], 1000, pizzas.spicySeafood, 2, 0, 0, [ingredientType.bacon]),
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

    const totalStrangePizzaRatio = totalPizzaRatio(slot, pizzas.strangePizza);
    const totalDoughRatio = totalPizzaRatio(slot, pizzas.dough);
    const totalSeafoodRatio = totalPizzaRatio(slot, pizzas.seafood);
    const totalSpicySeafoodRatio = totalPizzaRatio(slot, pizzas.spicySeafood);
    const totalSeafoodAndSpicyRatio = totalSeafoodRatio + totalSpicySeafoodRatio;
    const totalMargheritaRatio = totalPizzaRatio(slot, pizzas.margherita);
    const totalMarinaraRatio = totalPizzaRatio(slot, pizzas.marinara);
    const totalQuattroFormaggiRatio = totalPizzaRatio(slot, pizzas.quattroFormaggi);
    const totalDiabolaRatio = totalPizzaRatio(slot, pizzas.diabola);
    //本場のピザ(マルゲリータ・マリナーラ・クアトロフォルマッジ・ディアボラ)の割合
    const totalAuthenticPizzaRatio = totalMargheritaRatio + totalMarinaraRatio + totalQuattroFormaggiRatio + totalDiabolaRatio;

    const pizzasType = (new Set(slot.stageResults.map(result => result.pizza))).size;

    if (totalGameOverCount >= 11) {
        return endings.重症エンド;
    } else if(totalStrangePizzaRatio >= 0.6){
        return endings.入院エンド;
    } else if(slot.stageResults && isEveryExceedTargetTime){
        return endings.ピザ生地冷めちゃったエンド;
    } else if(pizzasType == Object.values(pizzas).length - 1 && totalScore >= 10000){
        return endings.パーフェクトエンド;
    } else if(totalDoughRatio >= 0.6){
        return endings.素材の味エンド;
    } else if(totalSeafoodAndSpicyRatio >= 0.6){
        return endings.海の家エンド;
    } else if(totalAuthenticPizzaRatio >= 0.6){
        return endings.本場リスペクトエンド;
    } else if(pizzasType >= Math.floor(Object.values(pizzas).length * 0.75)){
        return endings.ピザ博士エンド;
    } else if(totalScore >= 10000){
        return endings.イタリア修行エンド;
    } else if(slot.stageResults.length >= 8){
        return endings.満腹エンド;
    } else if(totalScore >= 5000){
        return endings.社員エンド;
    } else {
        return endings.ピザ見習いエンド;
    }
}

function totalPizzaRatio(slot, pizza){
    const pizzaCount = slot.stageResults.reduce((count, result) => {
        return result.pizza === pizza ? count + 1 : count;
    }, 0);

    return pizzaCount / slot.stageResults.length;
}

// エンディング画面で表示するテキスト
export const endingMessage = {
    [endings.重症エンド]:
    "店長\n「なんか体ボロボロじゃないか？」\n\n主人公\n「...実は何回も衝突しちゃって」\n\n店長\n「なんで早く言わないんだ。病院行くぞ」\n\n主人公\n「...大丈夫...です」\n\nバタンッ!\n主人公は病院に運ばれ、全治一か月の怪我を\n負った。",
    [endings.入院エンド]:
    "店長\n「なんか顔色悪くないか？」\n\n主人公\n「そんなこと...ウッ」\n\nバタンッ!\n密かにゲテモノピザを味見していた主人公は\nお腹をこわし、病院に運ばれた。\n\n店長\n「やっぱり道に落ちている食材ではダメか。\n　もう食材を仕入れる費用は無いし、この店\n　もおしまいか」",
    [endings.ピザ生地冷めちゃったエンド]:
    "店長\n「届けるのが遅すぎるよ。せっかくの熱々な\n　ピザ生地が冷めてしまったじゃないか」\n\n主人公\n「はっ！...すみません」\n\n食材集めに夢中になっていた主人公は時間を\n忘れ、最高の状態でお客様に提供できなかっ\nたことを悔やんだ。\n\nまかないの照り焼きチキンピザは熱々でとて\nもおいしかった。このピザのおいしさを全て\nのお客様に届けれるよう全力で配達をするこ\nとを決心した。",
    [endings.パーフェクトエンド]:
    "店長\n「お客様からお褒めの言葉をたくさんいただ\n　いてるぞ。おかげでこの店の将来も安泰\n　だ」\n\n主人公\n「ありがとうございます」\n\n店長\n「そういえば君宛に手紙が届いているぞ」\n\n　\"Congratulations!\n　 ここまで遊んでくれてありがとう!\"\n\n店長\n「よく分らんが、優秀な部下を持って私も\n　鼻が高いよ」",
    [endings.素材の味エンド]:
    "店長\n「トッピング無しの状態でお客様に提供した\n　ようだな...」\n\n主人公\n「...はい。食材が集められなくて...」\n\n店長\n「よく分かっているじゃないか。一番おいし\n　いのはピザ生地そのものなんだよ。この調\n　子でピザ生地本来のよさを広めていってく\n　れ」\n\n主人公\n「え? あっはい。分かりました(もしかして\n　そのために食材を捨てたりとか...ないよな)｣",
    [endings.海の家エンド]:
    "店長\n「魚介系のピザをたくさん作ったようだな」\n\n主人公\n「はい。せっかくなら取れたての海鮮を使っ\n　たピザを作りたくて」\n\n店長\n「そんな君に知り合いが経営している海の家\n　で得意のシーフートピザを振舞ってもらえ\n　ないか？」\n\n主人公\n「ぜひ！」",
    [endings.本場リスペクトエンド]:
    "店長\n「ワタシノ　ボコクノ　ピッツァノ　ミリョ\n　クヲ イロイロナヒト二　ヒロメテクレタ\n　ヨウダネ。アリガトウ」\n\n主人公\n「え？店長急にカタコトになってどうしたん\n　ですか？」\n\n店長\n「ジツハ　ワタシ　コウフンスルト　カタコ\n　ト二　ナルノデスヨ」\n\n主人公\n「...初耳です」",
    [endings.ピザ博士エンド]:
    "店長\n「よくこんなにピザの種類を知っていたね」\n\n主人公\n「もちろんです。ピザ屋のアルバイターです\n　から」\n\n店長\n「そういえばお客様から見たことのないピザ\n　が届いたと電話が来たのだが君オリジナル\n　のピザかい？」\n\n主人公\n「...そうですね(適当に作ったなんて言えない)｣",
    [endings.イタリア修行エンド]:
    "店長\n「スバラシイ　シゴトブリダッタ。ワタシノ\n　ボコク　イタリアデ　ピザノ　シュギョウ\n　スルキハナイ？」\n\n主人公\n「海外はちょっと...」\n\n店長\n「キョヒケンハ　アリマセーン。\n　イマカラ　イキマショーウ」\n\n主人公\n「ひぇぇ...！」",
    [endings.満腹エンド]:
    "主人公\n「その前に僕からいいですか？」\n\n店長\n「構わん。何でも言ってくれ」\n\n主人公\n「なんか前より太ってません？」\n\n店長\n「食材を買ってきたんだが君がたくさんピザ\n　を作っているところを見るとおなかがすい\n　てね。もぉう食べられないよぉ」\n\n主人公\n「何やってんだこの人」",
    [endings.社員エンド]:
    "店長\n「よくこの危機的状況を乗り越えてくれた」\n\n主人公\n「ありがとうございます。店長の助けをする\n　のが私の役割ですから」\n\n店長\n「君さえよければこの店の社員になって欲し\n　いんだがどうかな？」\n\n主人公\n「いいんですか？こちらこそよろしくお願い\n　します」",
    [endings.ピザ見習いエンド]:
    "店長\n「お客様からクレームがたくさん来ているぞ｡\n　店の信頼はダダ下がりだ。明日から来なく\n　ていいよ」\n\n主人公\n「それだけは勘弁してください。ピザに対す\n　る情熱は本物です」\n\n店長\n「なんちゃって。明日からまた頑張ってくれ\n　ればいいよ」\n\n主人公\n「店長ぉぉぉ」",
}
