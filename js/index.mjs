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
sceneManager.changeScene(scenes.title);
requestAnimationFrame(gameLoop);
