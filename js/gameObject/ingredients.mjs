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
    octopus: "ingredientType.octopus",
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
    [ingredientType.octopus]: "タコ",
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
    [ingredientType.bacon]: 125,
    [ingredientType.basil]: 75,
    [ingredientType.cheese]: 50,
    [ingredientType.chicken]: 150,
    [ingredientType.corn]: 100,
    [ingredientType.durian]: 10,
    [ingredientType.mayonnaise]: 50,
    [ingredientType.mysteriousMushroom]: 800,
    [ingredientType.natto]: 10,
    [ingredientType.octopus]: 200,
    [ingredientType.onion]: 50,
    [ingredientType.redPepper]: 100,
    [ingredientType.rottenEgg]: 10,
    [ingredientType.salami]: 150,
    [ingredientType.shrimp]: 150,
    [ingredientType.squid]: 200,
    [ingredientType.tomato]: 100,
}


// ランダムなingredientTypeを返す関数
export function randomIngredientType() {
    const ingredientTypes = Object.values(ingredientType);
    const randomIndex = Math.floor(Math.random() * ingredientTypes.length);
    return ingredientTypes[randomIndex];
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

        case ingredientType.octopus:
            return resource.images.octopus

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
