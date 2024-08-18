import { stage1 } from "./stage1.mjs";
import { stage2 } from "./stage2.mjs";
import { stage3 } from "./stage3.mjs";
import { stage4 } from "./stage4.mjs";
import { stage5 } from "./stage5.mjs"; 


export const stages = {
    1: stage1,
    2: stage2,
    3: stage3,
    4: stage4,
    5: stage5,
}

export const stageDescriptions = {
    1: "非常事態！食材を拾い\nつつピザを届けよう！",
    2: "夜間走行！安全運転で\nピザを届けよう！",
    3: "高速道路！隣町まで\nピザを届けよう！",
    4: "砂漠だ！暑さに負けず\nピザを届けよう！",
    5: "氷河だ！スリップ事故に\n注意してピザを届けよう！",
}