import { TitleScene } from "../TitleScene.mjs";
import { ArasujiScene } from "../ArasujiScene.mjs";
import { SlotSelectionScene } from "../SlotSelectionScene.mjs";
import { ConfigScene } from "../ConfigScene.mjs";
import { EndingCollectionScene} from "../EndingCollectionScene.mjs";

// すべてのシーンの列挙した連想配列
export const scenes = {
    title: "scene-title",
    arasuji: "scene-arasuji",
    slotSelection: "scene-slotSelection",
    config: "scene-config",
    endingCollection: "secen-endingCollection"
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
        
        case scenes.endingCollection:
            return new EndingCollectionScene(sceneRouter, sharedData);

        default:
            console.error(`makeSceneに未定義のシーンが渡されました：${scene}`)
    }
}
