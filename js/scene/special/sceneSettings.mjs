import { TitleScene } from "../TitleScene.mjs";
import { ArasujiScene } from "../ArasujiScene.mjs";
import { SlotSelectionScene } from "../SlotSelectionScene.mjs";
import { ConfigScene } from "../ConfigScene.mjs";
import { RuleScene } from "../RuleScene.mjs";
import { StageSelectionScene } from "../StageSelectionScene.mjs";
import { DriveScene } from "../DriveScene.mjs";

// すべてのシーンの列挙した連想配列
export const scenes = {
    title: "scene-title",
    arasuji: "scene-arasuji",
    slotSelection: "scene-slotSelection",
    config: "scene-config",
    rule: "scene-rule",
    stageSelection: "scene-stageSelection",
    drive: "scene-drive",
}

// シーンを生成する方法を記述した関数
export function makeScene(scene, sceneRouter, sharedData) {
    switch (scene) {
        case scenes.title:
            return new TitleScene(sceneRouter, sharedData);

        case scenes.arasuji:
            return new ArasujiScene(sceneRouter, sharedData);

        case scenes.slotSelection:
            return new SlotSelectionScene(sceneRouter, sharedData);

        case scenes.config:
            return new ConfigScene(sceneRouter, sharedData);

        case scenes.rule:
            return new RuleScene(sceneRouter, sharedData);

        case scenes.stageSelection:
            return new StageSelectionScene(sceneRouter, sharedData);

        case scenes.drive:
            return new DriveScene(sceneRouter, sharedData);

        default:
            console.error(`makeSceneに未定義のシーンが渡されました：${scene}`)
    }
}
