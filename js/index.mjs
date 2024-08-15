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

import { ingredientType } from "./gameObject/ingredients.mjs";
import { stages } from "./stage/stages.mjs";
sceneRouter.sharedData = {
    "onSelectSlot": null,
    "playingSlotIndex": 4,
    "gameOverCount": 0,
    "goalTime": 38.06660000000077,
    "collectedIngredients": [
        ingredientType.chicken,
        ingredientType.chicken,
        ingredientType.onion,
        ingredientType.squid,
        ingredientType.shrimp,
        ingredientType.corn,
        ingredientType.shrimp,
        ingredientType.mayonnaise,
    ],
    "collisionCount": 0,
    "stage": stages[3],
}
sceneRouter.changeScene(scenes.cooking);
requestAnimationFrame(gameLoop);



function resizeCanvas() {
    const aspectRatio = canvas.width / canvas.height;
    const windowHeight = window.innerHeight - document.body.getBoundingClientRect().top;
    const windowAspectRatio = window.innerWidth / windowHeight;

    if (windowAspectRatio > aspectRatio) {
        // ウィンドウの幅が広い場合
        const newHeight = windowHeight;
        const newWidth = newHeight * aspectRatio;
        canvas.style.width = `calc(100dvh * ${aspectRatio})`;
        canvas.style.height = "100dvh";
        canvas.style.margin = `0 ${(window.innerWidth - newWidth) / 2}px`;
    } else {
        // ウィンドウの高さが高い場合
        const newWidth = window.innerWidth;
        const newHeight = newWidth / aspectRatio;
        canvas.style.width = `${newWidth}px`;
        canvas.style.height = `${newHeight}px`;
        canvas.style.margin = `${(windowHeight - newHeight) / 2}px 0`;
    }
}

// 初回ロード時 と 画面のサイズ変更時 に resizeCanvas を実行する
document.addEventListener("DOMContentLoaded", resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// ピンチズーム無効化
document.addEventListener('touchstart', (event) => {
    if (event.touches.length > 1) { event.preventDefault(); }
}, {
    passive: false
});




// import { dataKeys } from "./dataObject/dataKeysSettings.mjs";
// import { pizzas } from "./gameObject/pizzas.mjs";
// import { endings } from "./gameObject/endings.mjs";
// import { Slot } from "./dataObject/Slot.mjs";
// import { StageResult } from "./dataObject/stageResult.mjs";
// import { UserConfig } from "./dataObject/UserConfig.mjs";
// import { PizzaInfo } from "./dataObject/PizzaInfo.mjs";
// import { EndingInfo } from "./dataObject/endingInfo.mjs";

// // LocalStorage入出力の動作確認用
// function testLocalStorage() {
//     let slot1 = new Slot();
//     slot1.appendStageResult(new StageResult(1, 100, pizzas.margherita))
//     slot1.appendStageResult(new StageResult(2, 300, pizzas.marinara))
//     let slot2 = new Slot();
//     slot2.appendStageResult(new StageResult(1, 50, pizzas.seafood))
//     let slots = [slot1, slot2];

//     sceneRouter.save(dataKeys.slots, slots);
//     const loadedSlotList = sceneRouter.load(dataKeys.slots);
//     console.log(loadedSlotList);


//     let userConfig = new UserConfig(50, 60);

//     sceneRouter.save(dataKeys.userConfig, userConfig);
//     const loadedUserConfig = sceneRouter.load(dataKeys.userConfig);
//     console.log(loadedUserConfig);


//     let pizzaInfo = new PizzaInfo();
//     pizzaInfo.unlock(pizzas.margherita);
//     pizzaInfo.unlock(pizzas.margherita);
//     pizzaInfo.unlock(pizzas.seafood);

//     sceneRouter.save(dataKeys.pizzaInfo, pizzaInfo);
//     const loadedPizzaInfo = sceneRouter.load(dataKeys.pizzaInfo);
//     console.log(loadedPizzaInfo);


//     let endingInfo = new EndingInfo();
//     endingInfo.unlock(endings.イタリア人ぶち切れエンド);
//     endingInfo.unlock(endings.ピザ生地職人エンド)
//     endingInfo.unlock(endings.入院エンド);
//     endingInfo.unlock(endings.入院エンド);

//     sceneRouter.save(dataKeys.endingInfo, endingInfo);
//     const loadedEndingInfo = sceneRouter.load(dataKeys.endingInfo);
//     console.log(loadedEndingInfo);
// }

// testLocalStorage();
// キャンバスの全画面表示
