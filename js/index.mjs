import { SceneRouter } from "./service/SceneRouter.mjs";
import { scenes } from './enum/scenes.mjs';

const canvas = document.getElementById('screen');
const sceneManager = new SceneRouter(canvas);

function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    sceneManager.update(deltaTime);
    sceneManager.render();

    requestAnimationFrame(gameLoop);
}

let lastTimestamp = 0;
sceneManager.changeScene(scenes.title);
requestAnimationFrame(gameLoop);
