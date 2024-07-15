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
    const image = new Image();

    switch (type) {
        case ingredientType.basil:
            image.src = 'resource/image/ingredient/basil.png';
            break;

        case ingredientType.cheese:
            image.src = 'resource/image/ingredient/cheese.png';
            break;

        case ingredientType.tomato:
            image.src = 'resource/image/ingredient/tomato.png';
            break;

        case ingredientType.onion:
            image.src = 'resource/image/ingredient/onion.png';
            break;

        case ingredientType.octopus:
            image.src = 'resource/image/ingredient/octopus.png';
            break;

        case ingredientType.squid:
            image.src = 'resource/image/ingredient/squid.png';
            break;

        default:
            console.error(`imageForIngredientに未定義のtypeが渡されました：${type}`)
            return;
    }

    return image;
}
