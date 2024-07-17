import { ingredientType } from "./ingredients.mjs"

// ピザの種類の列挙した連想配列
export const pizzas = {
    margherita: "pizza.margherita",
    marinara: "pizza.marinara",
    seafood: "pizza.seafood",
}

// ピザの表示名
export const pizzaName = {
    [pizzas.margherita]: "マルゲリータ",
    [pizzas.marinara]: "マリナーラ",
    [pizzas.seafood]: "シーフードピザ",
}

// ピザのスコア
export const pizzaScore = {
    [pizzas.margherita]: 1000,
    [pizzas.marinara]: 2000,
    [pizzas.seafood]: 3000,

}

// ピザを作るのに必要な素材の表
export const recipe = {
    [pizzas.marinara]: [ingredientType.tomato, ingredientType.onion, ingredientType.basil],
    [pizzas.margherita]: [ingredientType.tomato, ingredientType.cheese, ingredientType.basil],
    [pizzas.seafood]: [ingredientType.squid, ingredientType.octopus]
}

// 素材の配列から、どんなピザができるかを返す
export function getPizza(ingredients) {
    for (const [pizza, requiredIngredients] of Object.entries(recipe)) {
        const hasAllIngredients = requiredIngredients.every(ingredient => ingredients.includes(ingredient));
        if (hasAllIngredients) {
            return pizza
        }
    }
    // どのピザも作れない場合は一旦シーフードを返す
    return pizzas.seafood;
}

export function imageForPizza(type) {
    const image = new Image();

    switch (type) {
        case pizzas.margherita:
            image.src = 'resource/image/pizza/margherita.png';
            break;

        case pizzas.marinara:
            image.src = 'resource/image/pizza/marinara.png';
            break;

        case pizzas.seafood:
            image.src = 'resource/image/pizza/seafood.png';
            break;

        default:
            console.error(`imageForPizzaに未定義のtypeが渡されました：${type}`)
            return;
    }

    return image;
}
