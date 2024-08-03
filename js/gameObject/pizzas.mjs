import { ingredientType } from "./ingredients.mjs"
import { resource } from "../resource.mjs"

// ピザの種類の列挙した連想配列
export const pizzas = {
    baconPizza: "pizza.baconPizza",
    diabola: "pizza.diabola",
    dough: "pizza.dough",
    margherita: "pizza.margherita",
    marinara: "pizza.marinara",
    mayoCorn: "pizza.mayoCorn",
    meatPizza: "pizza.meatPizza",
    quattroFormaggi: "pizza.quattroFormaggi",
    seafood: "pizza.seafood",
    shiningMushroomPizza: "pizza.shiningMushroomPizza",
    spicySeafood: "pizza.spicySeafood",
    strangePizza: "pizza.strangePizza",
    teriyakiPizza: "pizza.teriyakiPizza",
    unfinishedPizza: "pizza.unfinishedPizza",
    uniquePizza: "pizza.uniquePizza",
    unknownPizza: "pizza.unknownPizza",
    vegetablePizza: "pizza.vegetablePizza",
}

// ピザの表示名
export const pizzaName = {
    [pizzas.baconPizza]: "ベーコンピザ",
    [pizzas.diabola]: "ディアボラ",
    [pizzas.dough]: "ただのピザ生地",
    [pizzas.margherita]: "マルゲリータ",
    [pizzas.marinara]: "マリナーラ",
    [pizzas.mayoCorn]: "マヨコーン",
    [pizzas.meatPizza]: "肉ピザ",
    [pizzas.quattroFormaggi]: "クアトロフォルマッジ",
    [pizzas.seafood]: "シーフードピザ",
    [pizzas.shiningMushroomPizza]: "光り輝くきのこピザ",
    [pizzas.spicySeafood]: "スパイシーシーフードピザ",
    [pizzas.strangePizza]: "ゲテモノピザ",
    [pizzas.teriyakiPizza]: "照り焼きチキン",
    [pizzas.unfinishedPizza]: "未完のピザ",
    [pizzas.uniquePizza]: "ユニークなピザ",
    [pizzas.unknownPizza]: "未解禁のピザ",
    [pizzas.vegetablePizza]: "ベジタブルピザ",
}

// ピザのスコア
export const pizzaScore = {
    [pizzas.baconPizza]: 3000,
    [pizzas.diabola]: 4500,
    [pizzas.dough]: 0,
    [pizzas.margherita]: 4000,
    [pizzas.marinara]: 4000,
    [pizzas.mayoCorn]: 4700,
    [pizzas.meatPizza]: 4500,
    [pizzas.quattroFormaggi]: 5555,
    [pizzas.seafood]: 3500,
    [pizzas.shiningMushroomPizza]: 7777,
    [pizzas.spicySeafood]: 5200,
    [pizzas.strangePizza]: 666,
    [pizzas.teriyakiPizza]: 4000,
    [pizzas.unfinishedPizza]: 200,
    [pizzas.uniquePizza]: 1500,
    [pizzas.vegetablePizza]: 4000,
}

// ピザを作るのに必要な素材の表
export const recipe = {
    [pizzas.baconPizza]: [ingredientType.bacon],
    [pizzas.diabola]: [ingredientType.salami, ingredientType.chicken, ingredientType.redPepper],
    [pizzas.dough]: [], // TODO: 特殊レシピ
    [pizzas.margherita]: [ingredientType.tomato, ingredientType.cheese, ingredientType.basil],
    [pizzas.marinara]: [ingredientType.tomato, ingredientType.onion, ingredientType.basil],
    [pizzas.mayoCorn]: [ingredientType.cheese, ingredientType.corn, ingredientType.mayonnaise],
    [pizzas.meatPizza]: [ingredientType.bacon, ingredientType.salami, ingredientType.chicken],
    [pizzas.quattroFormaggi]: [ingredientType.cheese, ingredientType.cheese, ingredientType.cheese, ingredientType.cheese], // TODO: 個数対応
    [pizzas.seafood]: [ingredientType.squid, ingredientType.shrimp],
    [pizzas.shiningMushroomPizza]: [ingredientType.mysteriousMushroom],
    [pizzas.spicySeafood]: [ingredientType.squid, ingredientType.shrimp, ingredientType.redPepper],
    [pizzas.strangePizza]: [ingredientType.durian, ingredientType.natto, ingredientType.rottenEgg], // TODO: 特殊レシピ
    [pizzas.teriyakiPizza]: [ingredientType.chicken, ingredientType.onion, ingredientType.mayonnaise],
    [pizzas.unfinishedPizza]: [], // TODO: 特殊レシピ
    [pizzas.uniquePizza]: [], // TODO: 特殊レシピ
    [pizzas.vegetablePizza]: [ingredientType.tomato, ingredientType.onion, ingredientType.corn],
}

// ピザの順序
export const pizzaOrder = [
    pizzas.baconPizza,
    pizzas.diabola,
    pizzas.margherita,
    pizzas.marinara,
    pizzas.mayoCorn,
    pizzas.meatPizza,
    pizzas.quattroFormaggi,
    pizzas.seafood,
    pizzas.shiningMushroomPizza,
    pizzas.spicySeafood,
    pizzas.teriyakiPizza,
    pizzas.vegetablePizza,
    pizzas.dough,
    pizzas.unfinishedPizza,
    pizzas.uniquePizza,
    pizzas.strangePizza,
]

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
    switch (type) {
        case pizzas.baconPizza:
            return resource.images.baconPizza

        case pizzas.diabola:
            return resource.images.diabola

        case pizzas.dough:
            return resource.images.dough

        case pizzas.margherita:
            return resource.images.margherita

        case pizzas.marinara:
            return resource.images.marinara

        case pizzas.mayoCorn:
            return resource.images.mayoCorn

        case pizzas.meatPizza:
            return resource.images.meatPizza

        case pizzas.quattroFormaggi:
            return resource.images.quattroFormaggi

        case pizzas.seafood:
            return resource.images.seafood

        case pizzas.shiningMushroomPizza:
            return resource.images.shiningMushroomPizza

        case pizzas.spicySeafood:
            return resource.images.spicySeafood

        case pizzas.strangePizza:
            return resource.images.strangePizza

        case pizzas.teriyakiPizza:
            return resource.images.teriyakiPizza

        case pizzas.unfinishedPizza:
            return resource.images.unfinishedPizza

        case pizzas.uniquePizza:
            return resource.images.uniquePizza

        case pizzas.vegetablePizza:
            return resource.images.vegetablePizza

        default:
            console.error(`imageForPizzaに未定義のtypeが渡されました：${type}`)
            return;
    }
}
