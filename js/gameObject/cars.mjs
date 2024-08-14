import { resource } from "../resource.mjs";

// 車を列挙した連想配列
export const carType = {
    blueCar:    "carType.blueCar",
    redCar:     "carType.redCar",
    sportCar:   "carType.sportCar",
    bigTruck:   "carType.bigTruck",
    blueTruck:  "carType.blueTruck",

}

// 車の出現重み
export const carWeight = {
    [carType.blueCar]: 5,
    [carType.redCar]: 5,
    [carType.sportCar]: 3,
    [carType.bigTruck]: 1/10,
    [carType.blueTruck]: 1,
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
export function randomCarType() {
    const cars = Object.values(carType);
    const weights = cars.map((car) => carWeight[car]);
    return weightedRandom(cars, weights);
}

export function imageForCar(type) {
    switch (type) {
        case carType.blueCar:
            return resource.images.blueCar

        case carType.redCar:
            return resource.images.redCar

        case carType.sportCar:
            return resource.images.sportCar

        case carType.bigTruck:
            return resource.images.bigTruck

        case carType.blueTruck:
            return resource.images.blueTruck

        default:
            console.error(`imageForCarsに未定義のtypeが渡されました：${type}`)
            return;
    }
}
