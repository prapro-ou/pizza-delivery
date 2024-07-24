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
sceneRouter.sharedData.playingSlotIndex = 4;
sceneRouter.changeScene(scenes.ending);
requestAnimationFrame(gameLoop);


function resizeCanvas() {
    const aspectRatio = canvas.width / canvas.height;
    const windowAspectRatio = window.innerWidth / window.innerHeight;

    if (windowAspectRatio > aspectRatio) {
        // ウィンドウの幅が広い場合
        const newHeight = window.innerHeight;
        const newWidth = newHeight * aspectRatio;
        canvas.style.width = `${newWidth}px`;
        canvas.style.height = `${newHeight}px`;
        canvas.style.margin = `0 ${(window.innerWidth - newWidth) / 2}px`;
    } else {
        // ウィンドウの高さが高い場合
        const newWidth = window.innerWidth;
        const newHeight = newWidth / aspectRatio;
        canvas.style.width = `${newWidth}px`;
        canvas.style.height = `${newHeight}px`;
        canvas.style.margin = `${(window.innerHeight - newHeight) / 2}px 0`;
    }
}
// 初回ロード時 と 画面のサイズ変更時 に resizeCanvas を実行する
document.addEventListener("DOMContentLoaded", resizeCanvas);
window.addEventListener('resize', resizeCanvas);





// import { cookieKeys } from "./dataObject/cookieKeysSettings.mjs";
// import { pizzas } from "./gameObject/pizzas.mjs";
// import { endings } from "./gameObject/endings.mjs";
// import { Slot } from "./dataObject/Slot.mjs";
// import { StageResult } from "./dataObject/stageResult.mjs";
// import { UserConfig } from "./dataObject/UserConfig.mjs";
// import { PizzaInfo } from "./dataObject/PizzaInfo.mjs";
// import { EndingInfo } from "./dataObject/endingInfo.mjs";

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


//     let pizzaInfo = new PizzaInfo();
//     pizzaInfo.unlock(pizzas.margherita);
//     pizzaInfo.unlock(pizzas.margherita);
//     pizzaInfo.unlock(pizzas.seafood);

//     sceneRouter.save(cookieKeys.pizzaInfo, pizzaInfo);
//     const loadedPizzaInfo = sceneRouter.load(cookieKeys.pizzaInfo);
//     console.log(loadedPizzaInfo);


//     let endingInfo = new EndingInfo();
//     endingInfo.unlock(endings.イタリア人ぶち切れエンド);
//     endingInfo.unlock(endings.ピザ生地職人エンド)
//     endingInfo.unlock(endings.入院エンド);
//     endingInfo.unlock(endings.入院エンド);

//     sceneRouter.save(cookieKeys.endingInfo, endingInfo);
//     const loadedEndingInfo = sceneRouter.load(cookieKeys.endingInfo);
//     console.log(loadedEndingInfo);
// }

// testCookie();
// キャンバスの全画面表示
