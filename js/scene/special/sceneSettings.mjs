import { TitleScene } from "../TitleScene.mjs";
import { ArasujiRuleScene } from "../ArasujiRuleScene.mjs";
import { SlotSelectionScene } from "../SlotSelectionScene.mjs";
import { ConfigScene } from "../ConfigScene.mjs";
import { PizzaCollectionScene } from "../PizzaCollectionScene.mjs";
import { EndingCollectionScene} from "../EndingCollectionScene.mjs";
import { StageSelectionScene } from "../StageSelectionScene.mjs";
import { DriveScene } from "../DriveScene.mjs";
import { ResultScene } from "../ResultScene.mjs";
import { CookingScene } from "../CookingScene.mjs";
import { EndingScene } from "../EndingScene.mjs";

// すべてのシーンの列挙した連想配列
export const scenes = {
    title: "scene-title",
    arasujiRule: "scene-arasujiRule",
    slotSelection: "scene-slotSelection",
    config: "scene-config",
    pizzaCollection: "scene-pizzaCollection",
    endingCollection: "scene-endingCollection",
    stageSelection: "scene-stageSelection",
    drive: "scene-drive",
    result: "scene-result",
    cooking: "scene-cooking",
    ending: "scene-ending"
}

// シーンを生成する方法を記述した関数
export function makeScene(scene, sceneRouter, sharedData) {
    switch (scene) {
        case scenes.title:
            return new TitleScene(sceneRouter, sharedData);

        case scenes.arasujiRule:
            return new ArasujiRuleScene(sceneRouter, sharedData);

        case scenes.slotSelection:
            return new SlotSelectionScene(sceneRouter, sharedData);

        case scenes.config:
            return new ConfigScene(sceneRouter, sharedData);

        case scenes.endingCollection:
            return new EndingCollectionScene(sceneRouter, sharedData);

        case scenes.stageSelection:
            return new StageSelectionScene(sceneRouter, sharedData);

        case scenes.drive:
            return new DriveScene(sceneRouter, sharedData);

        case scenes.cooking:
            return new CookingScene(sceneRouter, sharedData);

        case scenes.pizzaCollection:
            return new PizzaCollectionScene(sceneRouter, sharedData);
        
        case scenes.result:
            return new ResultScene(sceneRouter, sharedData);
        
        case scenes.ending:
            return new EndingScene(sceneRouter, sharedData);

        default:
            console.error(`makeSceneに未定義のシーンが渡されました：${scene}`)
    }
}
