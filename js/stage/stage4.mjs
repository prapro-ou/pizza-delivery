import { obstacleType } from "../gameObject/obstacleSettings.mjs";
import { speedModes } from "./speedModes.mjs";
import { resource } from "../resource.mjs";

export const stage4 =
{
    stageNumber: 4,
    roadPoint: [
        {d: -50, x: 50},
        {d: 0, x: 50},
        {d: 88, x: 58},
        {d: 158, x: 23},
        {d: 253, x: 59},
        {d: 354, x: 36},
        {d: 498, x: 21},
        {d: 619, x: 43},
        {d: 719, x: 56},
        {d: 839, x: 71},
        {d: 915, x: 77},
        {d: 1010, x: 42},
        {d: 1127, x: 56},
        {d: 1262, x: 74},
        {d: 1400, x: 44},
        {d: 1544, x: 39},
        {d: 1623, x: 82},
        {d: 1731, x: 37},
        {d: 1817, x: 61},
        {d: 1991, x: 47},
        {d: 2117, x: 61},
        {d: 2176, x: 37},
        {d: 2257, x: 49},
        {d: 2300, x: 50},
    ],
    obstacles: [
        {type: obstacleType.mud, d: 2241, x: 42},
        {type: obstacleType.mud, d: 2136, x: 62},
        {type: obstacleType.mud, d: 2055, x: 48},
        {type: obstacleType.mud, d: 1950, x: 57},
        {type: obstacleType.mud, d: 1892, x: 49},
        {type: obstacleType.mud, d: 1767, x: 44},
        {type: obstacleType.mud, d: 1835, x: 64},
        {type: obstacleType.mud, d: 1692, x: 54},
        {type: obstacleType.mud, d: 1611, x: 68},
        {type: obstacleType.mud, d: 1517, x: 47},
        {type: obstacleType.mud, d: 1456, x: 48},
        {type: obstacleType.mud, d: 1343, x: 64},
        {type: obstacleType.mud, d: 1236, x: 66},
        {type: obstacleType.mud, d: 1150, x: 67},
        {type: obstacleType.mud, d: 1053, x: 42},
        {type: obstacleType.mud, d: 965, x: 64},
        {type: obstacleType.mud, d: 934, x: 62},
        {type: obstacleType.mud, d: 849, x: 80},
        {type: obstacleType.mud, d: 792, x: 61},
        {type: obstacleType.mud, d: 685, x: 56},
        {type: obstacleType.mud, d: 636, x: 38},
        {type: obstacleType.mud, d: 571, x: 39},
        {type: obstacleType.mud, d: 469, x: 15},
        {type: obstacleType.mud, d: 412, x: 38},
        {type: obstacleType.mud, d: 55, x: 48},
        {type: obstacleType.mud, d: 321, x: 50},
        {type: obstacleType.mud, d: 233, x: 56},
        {type: obstacleType.mud, d: 185, x: 28},
        {type: obstacleType.mud, d: 120, x: 47},
    ],
    ingredients: [
        {d: 2257, x: 42},
        {d: 2114, x: 52},
        {d: 2006, x: 42},
        {d: 1787, x: 58},
        {d: 1581, x: 52},
        {d: 1490, x: 39},
        {d: 1373, x: 52},
        {d: 1272, x: 80},
        {d: 1118, x: 55},
        {d: 999, x: 51},
        {d: 861, x: 63},
        {d: 757, x: 53},
        {d: 684, x: 62},
        {d: 548, x: 25},
        {d: 437, x: 35},
        {d: 319, x: 37},
        {d: 219, x: 39},
        {d: 72, x: 66},
        {d: 96, x: 46},
    ],
    roadWidth: 25,
    goalDistance: 2300,
    targetTime: 70,
    inertia: false,
    nightMode: false,
    background: resource.images.bg4,
    speedMode: speedModes.slow,
    nCars: 0,
    bgm: resource.bgm.MusMusBGM172,
};