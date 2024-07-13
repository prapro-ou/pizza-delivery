// ピザの種類の列挙した連想配列
export const pizzaType = {
    margherita: "pizzaType.margherita",
    marinara: "pizzaType.marinara",
    seafood: "pizzaType.seafood",
}

export function imageForPizza(type) {
    const image = new Image();

    switch (type) {
        case pizzaType.margherita:
            image.src = 'resource/image/pizza/margherita.png';
            break;

        case pizzaType.marinara:
            image.src = 'resource/image/pizza/marinara.png';
            break;

        case pizzaType.seafood:
            image.src = 'resource/image/pizza/seafood.png';
            break;

        default:
            console.error(`imageForPizzaに未定義のtypeが渡されました：${type}`)
            return;
    }

    return image;
}