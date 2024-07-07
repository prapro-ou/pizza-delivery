import { Mud } from "./Mud.mjs";

// 障害物の種類の列挙した連想配列
export const obstacleType = {
    mud: "obstacleType.mud"
}

// 障害物を生成する方法を記述した関数
export function makeObstacle(type, x, d) {
    switch (type) {
        case obstacleType.mud:
            return new Mud(x, d);
        default:
            console.error(`makeObstacleに未定義のtypeが渡されました：${type}`)
    }
}
