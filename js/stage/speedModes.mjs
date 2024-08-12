
// ステージごとの車やバイクの速さに関するモード
export const speedModes = {
    normal: "speedModes.normal",
    fast: "speedModes.fast",
}

export const speedSettings = {
    [speedModes.normal]: {
        playerXControlSpeed: 20,
        playerDControlSpeed: 30,
        playerDSpeed: 50,
        carDSpeed: 20,
    },
    [speedModes.fast]: {
        playerXControlSpeed: 30,
        playerDControlSpeed: 35,
        playerDSpeed: 100,
        carDSpeed: 60,
    },
    [speedModes.slow]: {
        playerXControlSpeed: 5,
        playerDControlSpeed: 20,
        playerDSpeed: 30,
    }
}
