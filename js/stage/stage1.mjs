import { obstacleType } from "../gameObject/obstacleSettings.mjs";
import { speedModes } from "./speedModes.mjs";
import { resource } from "../resource.mjs";

export const stage1 =
{
    stageNumber: 1,
    roadPoint: [
        {d: -50, x: 50},
        {d: 0, x: 50},
        {d: 150, x: 50},
        {d: 251, x: 59},
        {d: 450, x: 40},
        {d: 550, x: 40},
        {d: 650, x: 52},
        {d: 810, x: 61},
        {d: 920, x: 50},
        {d: 1002, x: 40},
        {d: 1079, x: 66},
        {d: 1191, x: 52},
        {d: 1317, x: 40},
        {d: 1485, x: 46},
        {d: 1516, x: 65},
        {d: 1675, x: 50},
        {d: 1800, x: 50},
    ],
    obstacles: [
        {type: obstacleType.speedingBoard, d: 955, x: 57},
        {type: obstacleType.speedingBoard, d: 1036, x: 52},
        {type: obstacleType.speedingBoard, d: 1116, x: 54},
        {type: obstacleType.speedingBoard, d: 1206, x: 52},
        {type: obstacleType.speedingBoard, d: 1271, x: 33},
        {type: obstacleType.speedingBoard, d: 1370, x: 47},
        {type: obstacleType.speedingBoard, d: 1470, x: 48},
        {type: obstacleType.speedingBoard, d: 1562, x: 68},
        {type: obstacleType.speedingBoard, d: 1700, x: 38},
        {type: obstacleType.mud, d: 1744, x: 44},
        {type: obstacleType.mud, d: 1633, x: 60},
        {type: obstacleType.mud, d: 1499, x: 48},
        {type: obstacleType.mud, d: 1458, x: 56},
        {type: obstacleType.mud, d: 1289, x: 49},
        {type: obstacleType.mud, d: 1334, x: 54},
        {type: obstacleType.mud, d: 1176, x: 42},
        {type: obstacleType.mud, d: 1135, x: 73},
        {type: obstacleType.mud, d: 1037, x: 62},
        {type: obstacleType.mud, d: 861, x: 70},
        {type: obstacleType.mud, d: 507, x: 27},
        {type: obstacleType.mud, d: 251, x: 72},
        {type: obstacleType.mud, d: 111, x: 37},
        {type: obstacleType.speedingBoard, d: 100, x: 58},
        {type: obstacleType.speedingBoard, d: 392, x: 61},
        {type: obstacleType.speedingBoard, d: 587, x: 51},
        {type: obstacleType.speedingBoard, d: 744, x: 56},
    ],
    ingredients: [
        {d: 1717, x: 61},
        {d: 1588, x: 51},
        {d: 1492, x: 61},
        {d: 1406, x: 46},
        {d: 1251, x: 59},
        {d: 1156, x: 51},
        {d: 1101, x: 68},
        {d: 1023, x: 62},
        {d: 86, x: 52},
        {d: 181, x: 48},
        {d: 229, x: 67},
        {d: 353, x: 43},
        {d: 486, x: 41},
        {d: 671, x: 41},
        {d: 807, x: 65},
        {d: 940, x: 36},
    ],
    roadWidth: 35,
    goalDistance: 1800,
    targetTime: 26,
    inertia: false,
    nightMode: false,
    speedMode: speedModes.normal,
    nCars: 2,
    background: resource.images.bg1,
    bgm: resource.bgm.MusMusBGM154,
};
