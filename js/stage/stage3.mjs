import { obstacleType } from "../gameObject/obstacleSettings.mjs";
import { speedModes } from "./speedModes.mjs";
import { resource } from "../resource.mjs";

export const stage3 =
{
    roadPoint: [
        {d: -50, x: 50},
        {d: 0, x: 50},
        {d: 96, x: 69},
        {d: 162, x: 29},
        {d: 290, x: 52},
        {d: 453, x: 29},
        {d: 642, x: 64},
        {d: 722, x: 62},
        {d: 803, x: 37},
        {d: 981, x: 49},
        {d: 1210, x: 74},
        {d: 1312, x: 37},
        {d: 1556, x: 69},
        {d: 1774, x: 36},
        {d: 2045, x: 28},
        {d: 2250, x: 68},
        {d: 2557, x: 71},
        {d: 2768, x: 52},
        {d: 3000, x: 50},
    ],
    obstacles: [
        {type: obstacleType.speedingBoard, d: 34, x: 80},
        {type: obstacleType.speedingBoard, d: 35, x: 72},
        {type: obstacleType.speedingBoard, d: 36, x: 65},
        {type: obstacleType.speedingBoard, d: 37, x: 52},
        {type: obstacleType.speedingBoard, d: 38, x: 46},
        {type: obstacleType.speedingBoard, d: 39, x: 39},
        {type: obstacleType.speedingBoard, d: 124, x: 64},
        {type: obstacleType.speedingBoard, d: 189, x: 37},
        {type: obstacleType.speedingBoard, d: 253, x: 64},
        {type: obstacleType.speedingBoard, d: 328, x: 32},
        {type: obstacleType.speedingBoard, d: 362, x: 20},
        {type: obstacleType.speedingBoard, d: 363, x: 43},
        {type: obstacleType.speedingBoard, d: 364, x: 61},
        {type: obstacleType.speedingBoard, d: 449, x: 10},
        {type: obstacleType.speedingBoard, d: 490, x: 45},
        {type: obstacleType.speedingBoard, d: 571, x: 50},
        {type: obstacleType.speedingBoard, d: 607, x: 44},
        {type: obstacleType.speedingBoard, d: 693, x: 44},
        {type: obstacleType.speedingBoard, d: 768, x: 35},
        {type: obstacleType.speedingBoard, d: 861, x: 49},
        {type: obstacleType.speedingBoard, d: 882, x: 22},
        {type: obstacleType.speedingBoard, d: 970, x: 56},
        {type: obstacleType.speedingBoard, d: 1058, x: 76},
        {type: obstacleType.speedingBoard, d: 1059, x: 70},
        {type: obstacleType.speedingBoard, d: 1060, x: 64},
        {type: obstacleType.speedingBoard, d: 1061, x: 58},
        {type: obstacleType.speedingBoard, d: 1062, x: 53},
        {type: obstacleType.speedingBoard, d: 1063, x: 38},
        {type: obstacleType.speedingBoard, d: 1064, x: 45},
        {type: obstacleType.speedingBoard, d: 1130, x: 56},
        {type: obstacleType.speedingBoard, d: 1182, x: 68},
        {type: obstacleType.speedingBoard, d: 1251, x: 63},
        {type: obstacleType.speedingBoard, d: 1398, x: 40},
        {type: obstacleType.speedingBoard, d: 1424, x: 61},
        {type: obstacleType.speedingBoard, d: 1475, x: 47},
        {type: obstacleType.speedingBoard, d: 1582, x: 67},
        {type: obstacleType.speedingBoard, d: 1583, x: 45},
        {type: obstacleType.speedingBoard, d: 1584, x: 80},
        {type: obstacleType.speedingBoard, d: 1611, x: 63},
        {type: obstacleType.speedingBoard, d: 1707, x: 59},
        {type: obstacleType.speedingBoard, d: 1802, x: 27},
        {type: obstacleType.speedingBoard, d: 1805, x: 43},
        {type: obstacleType.speedingBoard, d: 1830, x: 17},
        {type: obstacleType.speedingBoard, d: 1902, x: 39},
        {type: obstacleType.speedingBoard, d: 1953, x: 21},
        {type: obstacleType.speedingBoard, d: 1995, x: 40},
        {type: obstacleType.speedingBoard, d: 2087, x: 25},
        {type: obstacleType.speedingBoard, d: 2166, x: 38},
        {type: obstacleType.speedingBoard, d: 2360, x: 77},
        {type: obstacleType.speedingBoard, d: 2523, x: 61},
        {type: obstacleType.speedingBoard, d: 2733, x: 40},
        {type: obstacleType.speedingBoard, d: 2960, x: 45},
        {type: obstacleType.speedingBoard, d: 2873, x: 44},
        {type: obstacleType.speedingBoard, d: 2791, x: 57},
        {type: obstacleType.speedingBoard, d: 2699, x: 71},
        {type: obstacleType.speedingBoard, d: 2617, x: 54},
        {type: obstacleType.speedingBoard, d: 2475, x: 80},
        {type: obstacleType.speedingBoard, d: 2400, x: 53},
        {type: obstacleType.speedingBoard, d: 2317, x: 63},
        {type: obstacleType.speedingBoard, d: 2218, x: 70},
        {type: obstacleType.speedingBoard, d: 2127, x: 48},
        {type: obstacleType.speedingBoard, d: 2009, x: 20},
        {type: obstacleType.speedingBoard, d: 1842, x: 45},
        {type: obstacleType.speedingBoard, d: 1731, x: 36},
        {type: obstacleType.speedingBoard, d: 1661, x: 43},
        {type: obstacleType.speedingBoard, d: 1522, x: 72},
        {type: obstacleType.speedingBoard, d: 1447, x: 48},
        {type: obstacleType.speedingBoard, d: 1359, x: 48},
        {type: obstacleType.speedingBoard, d: 1288, x: 30},
        {type: obstacleType.speedingBoard, d: 1201, x: 60},
        {type: obstacleType.speedingBoard, d: 1024, x: 57},
        {type: obstacleType.speedingBoard, d: 930, x: 39},
        {type: obstacleType.speedingBoard, d: 826, x: 35},
        {type: obstacleType.speedingBoard, d: 745, x: 62},
        {type: obstacleType.speedingBoard, d: 657, x: 55},
        {type: obstacleType.speedingBoard, d: 513, x: 23},
        {type: obstacleType.speedingBoard, d: 391, x: 40},
        {type: obstacleType.speedingBoard, d: 333, x: 64},
        {type: obstacleType.speedingBoard, d: 240, x: 37},
        {type: obstacleType.speedingBoard, d: 140, x: 32},
        {type: obstacleType.speedingBoard, d: 37, x: 58},
    ],
    ingredients: [
        {d: 1002, x: 42},
        {d: 1103, x: 70},
        {d: 1350, x: 23},
        {d: 2973, x: 71},
        {d: 2935, x: 55},
        {d: 2814, x: 42},
        {d: 2618, x: 79},
        {d: 2466, x: 69},
        {d: 2230, x: 55},
        {d: 2067, x: 41},
        {d: 1918, x: 25},
        {d: 1749, x: 56},
        {d: 1624, x: 61},
        {d: 1522, x: 50},
        {d: 1385, x: 66},
        {d: 1268, x: 50},
        {d: 1161, x: 57},
        {d: 890, x: 50},
        {d: 760, x: 41},
        {d: 607, x: 65},
        {d: 540, x: 43},
        {d: 444, x: 48},
        {d: 333, x: 28},
        {d: 232, x: 60},
        {d: 130, x: 45},
    ],
    roadWidth: 50,
    goalDistance: 3000,
    targetTime: 30,
    inertia: false,
    nightMode: false,
    speedMode: speedModes.fast,
    nCars: 3,
    bgm: resource.bgm.MusMusBGM122,
}