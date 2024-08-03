import { obstacleType } from "../gameObject/obstacleSettings.mjs";
import { speedModes } from "./speedModes.mjs";
import { resource } from "../resource.mjs";

export const stage5 =
{
    roadPoint: [
        {d: 0, x: 50},
        {d: 167, x: 46},
        {d: 236, x: 35},
        {d: 281, x: 58},
        {d: 363, x: 33},
        {d: 435, x: 48},
        {d: 511, x: 50},
        {d: 556, x: 74},
        {d: 686, x: 55},
        {d: 770, x: 72},
        {d: 887, x: 41},
        {d: 1000, x: 50},
        {d: 1072, x: 75},
        {d: 1212, x: 26},
        {d: 1368, x: 23},
        {d: 1450, x: 51},
        {d: 1561, x: 67},
        {d: 1672, x: 35},
        {d: 1792, x: 51},
        {d: 1830, x: 58},
        {d: 1866, x: 50},
        {d: 2000, x: 50},
    ],
    obstacles: [
        {type: obstacleType.mud, d: 596, x: 77},
        {type: obstacleType.speedingBoard, d: 824, x: 68},
        {type: obstacleType.mud, d: 935, x: 51},
        {type: obstacleType.mud, d: 1024, x: 67},
        {type: obstacleType.speedingBoard, d: 1034, x: 75},
        {type: obstacleType.mud, d: 1044, x: 56},
        {type: obstacleType.mud, d: 1097, x: 56},
        {type: obstacleType.mud, d: 1135, x: 61},
        {type: obstacleType.speedingBoard, d: 1146, x: 44},
        {type: obstacleType.mud, d: 1184, x: 30},
        {type: obstacleType.mud, d: 1247, x: 35},
        {type: obstacleType.speedingBoard, d: 1254, x: 15},
        {type: obstacleType.mud, d: 1298, x: 11},
        {type: obstacleType.mud, d: 1341, x: 30},
        {type: obstacleType.speedingBoard, d: 1385, x: 41},
        {type: obstacleType.mud, d: 1390, x: 23},
        {type: obstacleType.mud, d: 1417, x: 51},
        {type: obstacleType.mud, d: 1464, x: 63},
        {type: obstacleType.speedingBoard, d: 1479, x: 52},
        {type: obstacleType.mud, d: 1506, x: 46},
        {type: obstacleType.mud, d: 1572, x: 72},
        {type: obstacleType.speedingBoard, d: 1596, x: 68},
        {type: obstacleType.mud, d: 1624, x: 40},
        {type: obstacleType.mud, d: 1690, x: 49},
        {type: obstacleType.speedingBoard, d: 1737, x: 34},
        {type: obstacleType.mud, d: 1757, x: 36},
        {type: obstacleType.speedingBoard, d: 1802, x: 65},
        {type: obstacleType.mud, d: 1832, x: 61},
        {type: obstacleType.mud, d: 1873, x: 56},
        {type: obstacleType.speedingBoard, d: 1913, x: 47},
        {type: obstacleType.mud, d: 1945, x: 64},
        {type: obstacleType.mud, d: 1967, x: 42},
        {type: obstacleType.speedingBoard, d: 132, x: 32},
        {type: obstacleType.speedingBoard, d: 190, x: 55},
        {type: obstacleType.speedingBoard, d: 337, x: 46},
        {type: obstacleType.speedingBoard, d: 399, x: 48},
        {type: obstacleType.speedingBoard, d: 708, x: 57},
        {type: obstacleType.speedingBoard, d: 911, x: 39},
        {type: obstacleType.mud, d: 973, x: 60},
        {type: obstacleType.mud, d: 852, x: 38},
        {type: obstacleType.mud, d: 727, x: 73},
        {type: obstacleType.mud, d: 639, x: 48},
        {type: obstacleType.mud, d: 515, x: 65},
        {type: obstacleType.mud, d: 481, x: 36},
        {type: obstacleType.mud, d: 376, x: 46},
        {type: obstacleType.mud, d: 324, x: 38},
        {type: obstacleType.mud, d: 266, x: 65},
        {type: obstacleType.mud, d: 197, x: 27},
        {type: obstacleType.mud, d: 124, x: 54},
        {type: obstacleType.mud, d: 65, x: 44},
    ],
    ingredients: [
        {d: 1073, x: 79},
        {d: 1173, x: 46},
        {d: 1291, x: 31},
        {d: 1439, x: 38},
        {d: 1532, x: 57},
        {d: 1644, x: 50},
        {d: 1728, x: 49},
        {d: 1817, x: 44},
        {d: 1923, x: 57},
        {d: 108, x: 38},
        {d: 161, x: 34},
        {d: 258, x: 44},
        {d: 305, x: 63},
        {d: 349, x: 37},
        {d: 432, x: 39},
        {d: 615, x: 61},
        {d: 668, x: 66},
        {d: 791, x: 78},
        {d: 896, x: 54},
        {d: 948, x: 36},
    ],
    roadWidth: 35,
    goalDistance: 2000,
    targetTime: 32,
    inertia: true,
    nightMode: false,
    speedMode: speedModes.normal,
    nCars: 0,
    bgm: resource.bgm.MusMusBGM095,
}