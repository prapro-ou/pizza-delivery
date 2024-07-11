// 食材の種類の列挙した連想配列
export const ingredientType = {
    tomato: "ingredientType.tomato",
    cheese: "ingredientType.cheese",
    basil: "ingredientType.basil",
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

        default:
            console.error(`imageForIngredientに未定義のtypeが渡されました：${type}`)
            return;
    }

    return image;
}
