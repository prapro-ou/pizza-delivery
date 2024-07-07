import { obstacleType } from "../gameObject/obstacleSettings.mjs";

export const stage1 =
{
    roadPoint: [
        {d: -50, x: 50},
        {d: 0, x: 50},
        {d: 150, x: 50},
        {d: 250, x: 64},
        {d: 450, x: 40},
        {d: 550, x: 40},
        {d: 650, x: 52},
        {d: 810, x: 61},
        {d: 920, x: 50},
        {d: 1000, x: 50},
    ],
    obstacles: [
        {type: obstacleType.mud, d: 861, x: 70},
        {type: obstacleType.mud, d: 507, x: 27},
        {type: obstacleType.mud, d: 248, x: 78},
        {type: obstacleType.mud, d: 111, x: 37},
    ],
    roadWidth: 40,
    goalDistance: 1000,
};
