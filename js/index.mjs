import { SceneRouter } from "./SceneRouter.mjs";
import { scenes } from "./scene/special/sceneSettings.mjs";

const canvas = document.getElementById('screen');
const sceneRouter = new SceneRouter(canvas);

function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    sceneRouter.updateStates(deltaTime);
    sceneRouter.render();

    requestAnimationFrame(gameLoop);
}

let lastTimestamp = 0;
sceneRouter.changeScene(scenes.title);
requestAnimationFrame(gameLoop);



// import { cookieKeys } from "./dataObject/cookieKeysSettings.mjs";
// import { pizzas } from "./gameObject/pizzas.mjs";
// import { Slot } from "./dataObject/Slot.mjs";
// import { StageResult } from "./dataObject/stageResult.mjs";
// import { UserConfig } from "./dataObject/UserConfig.mjs";

// // Cookie入出力の動作確認用
// function testCookie() {
//     let slot1 = new Slot();
//     slot1.appendStageResult(new StageResult(1, 100, pizzas.margherita))
//     slot1.appendStageResult(new StageResult(2, 300, pizzas.marinara))
//     let slot2 = new Slot();
//     slot2.appendStageResult(new StageResult(1, 50, pizzas.seafood))
//     let slots = [slot1, slot2];


//     sceneRouter.save(cookieKeys.slots, slots);
//     const loadedSlotList = sceneRouter.load(cookieKeys.slots);
//     console.log(loadedSlotList);

//     let userConfig = new UserConfig(50, 60);

//     sceneRouter.save(cookieKeys.userConfig, userConfig);
//     const loadedUserConfig = sceneRouter.load(cookieKeys.userConfig);
//     console.log(loadedUserConfig);
// }

// testCookie();
