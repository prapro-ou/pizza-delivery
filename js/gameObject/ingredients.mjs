import { resource } from "../resource.mjs";

// 食材の種類の列挙した連想配列
export const ingredientType = {
    bacon: "ingredientType.bacon",
    basil: "ingredientType.basil",
    cheese: "ingredientType.cheese",
    chicken: "ingredientType.chicken",
    corn: "ingredientType.corn",
    durian: "ingredientType.durian",
    mayonnaise: "ingredientType.mayonnaise",
    mysteriousMushroom: "ingredientType.mysteriousMushroom",
    natto: "ingredientType.natto",
    onion: "ingredientType.onion",
    redPepper: "ingredientType.redPepper",
    rottenEgg: "ingredientType.rottenEgg",
    salami: "ingredientType.salami",
    shrimp: "ingredientType.shrimp",
    squid: "ingredientType.squid",
    tomato: "ingredientType.tomato",
}

// 食材の表示名
export const ingredientName = {
    [ingredientType.bacon]: "ベーコン",
    [ingredientType.basil]: "バジル",
    [ingredientType.cheese]: "チーズ",
    [ingredientType.chicken]: "チキン",
    [ingredientType.corn]: "コーン",
    [ingredientType.durian]: "ドリアン",
    [ingredientType.mayonnaise]: "マヨネーズ",
    [ingredientType.mysteriousMushroom]: "ふしぎなきのこ",
    [ingredientType.natto]: "納豆",
    [ingredientType.onion]: "玉ねぎ",
    [ingredientType.redPepper]: "唐辛子",
    [ingredientType.rottenEgg]: "腐った卵",
    [ingredientType.salami]: "サラミ",
    [ingredientType.shrimp]: "エビ",
    [ingredientType.squid]: "イカ",
    [ingredientType.tomato]: "トマト",
}

// 食材のスコア
export const ingredientScore = {
    [ingredientType.bacon]: 150,
    [ingredientType.basil]: 150,
    [ingredientType.cheese]: 100,
    [ingredientType.chicken]: 100,
    [ingredientType.corn]: 150,
    [ingredientType.durian]: 30,
    [ingredientType.mayonnaise]: 150,
    [ingredientType.mysteriousMushroom]: 500,
    [ingredientType.natto]: 30,
    [ingredientType.onion]: 100,
    [ingredientType.redPepper]: 150,
    [ingredientType.rottenEgg]: 30,
    [ingredientType.salami]: 150,
    [ingredientType.shrimp]: 150,
    [ingredientType.squid]: 150,
    [ingredientType.tomato]: 100,
}

// 食材の出現重み
export const ingredientWeight = {
    // 3種類のピザに登場
    [ingredientType.tomato]: 2,
    [ingredientType.cheese]: 2,
    [ingredientType.chicken]: 2,
    [ingredientType.onion]: 2,
    // 2種類のピザに登場
    [ingredientType.bacon]: 1,
    [ingredientType.basil]: 1,
    [ingredientType.corn]: 1,
    [ingredientType.mayonnaise]: 1,
    [ingredientType.redPepper]: 1,
    [ingredientType.salami]: 1,
    [ingredientType.shrimp]: 1,
    [ingredientType.squid]: 1,
    // ゲテモノ食材
    [ingredientType.durian]: 1/3,
    [ingredientType.natto]: 1/3,
    [ingredientType.rottenEgg]: 1/3,
    // キノコ
    [ingredientType.mysteriousMushroom]: 1/10,
}

// 重み付きランダム
function weightedRandom(choices, weights) {
    let totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    for (let i = 0; i < choices.length; i++) {
        if (random < weights[i]) {
            return choices[i];
        }
        random -= weights[i];
    }
}

// ランダムなingredientTypeを返す関数
export function randomIngredientType() {
    const ingredients = Object.values(ingredientType);
    const weights = ingredients.map((ingredient) => ingredientWeight[ingredient]);
    return weightedRandom(ingredients, weights);
}

export function imageForIngredient(type) {
    switch (type) {
        case ingredientType.bacon:
            return resource.images.bacon

        case ingredientType.basil:
            return resource.images.basil

        case ingredientType.cheese:
            return resource.images.cheese

        case ingredientType.chicken:
            return resource.images.chicken

        case ingredientType.corn:
            return resource.images.corn

        case ingredientType.durian:
            return resource.images.durian

        case ingredientType.mayonnaise:
            return resource.images.mayonnaise

        case ingredientType.mysteriousMushroom:
            return resource.images.mysteriousMushroom

        case ingredientType.natto:
            return resource.images.natto

        case ingredientType.onion:
            return resource.images.onion

        case ingredientType.redPepper:
            return resource.images.redPepper

        case ingredientType.rottenEgg:
            return resource.images.rottenEgg

        case ingredientType.salami:
            return resource.images.salami

        case ingredientType.shrimp:
            return resource.images.shrimp

        case ingredientType.squid:
            return resource.images.squid

        case ingredientType.tomato:
            return resource.images.tomato

        default:
            console.error(`imageForIngredientに未定義のtypeが渡されました：${type}`)
            return;
    }
}
