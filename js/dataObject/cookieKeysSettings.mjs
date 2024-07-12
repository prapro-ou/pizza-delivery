import { Slot } from "./Slot.mjs";
import { UserConfig } from "./UserConfig.mjs";

//cookieに保存するデータの項目を列挙した連想配列
export const cookieKeys = {
    slots: "cookieKeys.slots",
    userConfig: "cookieKeys.userConfig",
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

        default:
            console.error(`parseDataに未定義のシーンが渡されました：${cookieKey}`);
            return;
    }
}
