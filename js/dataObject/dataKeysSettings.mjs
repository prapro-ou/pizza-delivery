import { Slot } from "./Slot.mjs";
import { UserConfig } from "./UserConfig.mjs";
import { PizzaInfo } from "./PizzaInfo.mjs";
import { EndingInfo } from "./EndingInfo.mjs";

//LocalStorageに保存するデータの項目を列挙した連想配列
export const dataKeys = {
    slots: "dataKeys.slots",
    userConfig: "dataKeys.userConfig",
    pizzaInfo: "dataKeys.pizzaInfo",
    endingInfo: "dataKeys.endingInfo",
}

// dataKeys の文字列を LocalStorage に保存するキーに変換する
export function convertToKey(dataKey) {
    return dataKey.substr(dataKey.indexOf('.') + 1);
}

// JSONから変換した生のオブジェクトデータを、型のついたオブジェクトに変換する
export function parseJSONData(dataKey, data) {
    switch (dataKey) {
        case dataKeys.slots:
            return Object.fromEntries(
                Object.entries(data).map(([key, value]) => [key, Slot.createFromJSONData(value)])
            );

        case dataKeys.userConfig:
            return UserConfig.createFromJSONData(data);

        case dataKeys.pizzaInfo:
            return PizzaInfo.createFromJSONData(data);

        case dataKeys.endingInfo:
            return EndingInfo.createFromJSONData(data);

        default:
            console.error(`parseDataに未定義のdataKeyが渡されました：${dataKey}`);
            return;
    }
}

// キーに対応するデフォルトの値を返す
export function defaultValueFor(dataKey) {
    switch (dataKey) {
        case dataKeys.slots:
            return {};

        case dataKeys.userConfig:
            return new UserConfig();

        case dataKeys.pizzaInfo:
            return new PizzaInfo();

        case dataKeys.endingInfo:
            return new EndingInfo();

        default:
            console.error(`defaultValueForに未定義のdataKeyが渡されました：${dataKey}`);
            return;
    }
}
