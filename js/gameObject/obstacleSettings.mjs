import { Mud } from "./Mud.mjs";
import { Car } from "./Car.mjs";
import { SpeedingBoard } from "./SpeedingBoard.mjs";

// 障害物の種類の列挙した連想配列
export const obstacleType = {
    mud: "obstacleType.mud",
    car: "obstacleType.car",
    speedingBoard: "obstacleType.speedingBoard",
}

// 障害物を生成する方法を記述した関数
export function makeObstacle(type, x, d) {
    switch (type) {
        case obstacleType.mud:
            return new Mud(x, d);

        case obstacleType.car:
            console.error(`makeObstacleに${type}が渡されました。このタイプはmakeObstacleで生成できません。`)
            break;

        case obstacleType.speedingBoard:
            return new SpeedingBoard(x, d);

        default:
            console.error(`makeObstacleに未定義のtypeが渡されました：${type}`)
    }
}
