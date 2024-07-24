import { resource } from "../resource.mjs";

// 食材の種類の列挙した連想配列
export const ingredientType = {
    tomato: "ingredientType.tomato",
    cheese: "ingredientType.cheese",
    basil: "ingredientType.basil",
    onion: "ingredientType.onion",
    octopus: "ingredientType.octopus",
    squid: "ingredientType.squid",
}

// 食材の表示名
export const ingredientName = {
    [ingredientType.tomato]: "トマト",
    [ingredientType.cheese]: "チーズ",
    [ingredientType.basil]: "バジル",
    [ingredientType.onion]: "玉ねぎ",
    [ingredientType.octopus]: "タコ",
    [ingredientType.squid]: "イカ",
}

// 食材のスコア
export const ingredientScore = {
    [ingredientType.tomato]: 100,
    [ingredientType.cheese]: 50,
    [ingredientType.basil]: 75,
    [ingredientType.onion]: 50,
    [ingredientType.octopus]: 200,
    [ingredientType.squid]: 150,
}


// ランダムなingredientTypeを返す関数
export function randomIngredientType() {
    const ingredientTypes = Object.values(ingredientType);
    const randomIndex = Math.floor(Math.random() * ingredientTypes.length);
    return ingredientTypes[randomIndex];
}

export function imageForIngredient(type) {
    switch (type) {
        case ingredientType.basil:
            return resource.images.basil;

        case ingredientType.cheese:
            return resource.images.cheese;

        case ingredientType.tomato:
            return resource.images.tomato;

        case ingredientType.onion:
            return resource.images.onion;

        case ingredientType.octopus:
            return resource.images.octopus;

        case ingredientType.squid:
            return resource.images.squid;

        default:
            console.error(`imageForIngredientに未定義のtypeが渡されました：${type}`)
            return;
    }
}
