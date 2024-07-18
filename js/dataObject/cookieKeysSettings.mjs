import { Slot } from "./Slot.mjs";
import { UserConfig } from "./UserConfig.mjs";
import { PizzaInfo } from "./PizzaInfo.mjs";
import { EndingInfo } from "./EndingInfo.mjs";

//cookieに保存するデータの項目を列挙した連想配列
export const cookieKeys = {
    slots: "cookieKeys.slots",
    userConfig: "cookieKeys.userConfig",
    pizzaInfo: "cookieKeys.pizzaInfo",
    endingInfo: "cookieKeys.endingInfo",
}

// cookieKeys の文字列を Cookie に保存するキーに変換する
export function convertToKey(cookieKey) {
    return cookieKey.substr(cookieKey.indexOf('.') + 1);
}

// JSONから変換した生のオブジェクトデータを、型のついたオブジェクトに変換する
export function parseJSONData(cookieKey, data) {
    switch (cookieKey) {
        case cookieKeys.slots:
            return data.map(Slot.createFromJSONData);

        case cookieKeys.userConfig:
            return UserConfig.createFromJSONData(data);

        case cookieKeys.pizzaInfo:
            return PizzaInfo.createFromJSONData(data);

        case cookieKeys.endingInfo:
            return EndingInfo.createFromJSONData(data);

        default:
            console.error(`parseDataに未定義のcookieKeyが渡されました：${cookieKey}`);
            return;
    }
}
