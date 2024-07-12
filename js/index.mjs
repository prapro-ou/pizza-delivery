import { SceneRouter } from "./SceneRouter.mjs";
import { scenes } from "./scene/special/sceneSettings.mjs";

const canvas = document.getElementById('screen');
const sceneManager = new SceneRouter(canvas);

function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    sceneManager.updateStates(deltaTime);
    sceneManager.render();

    requestAnimationFrame(gameLoop);
}

let lastTimestamp = 0;

// 遷移元が未実装のため、初期画面をスコアリザルト画面に設定
sceneManager.changeScene(scenes.scoreResult);
requestAnimationFrame(gameLoop);
