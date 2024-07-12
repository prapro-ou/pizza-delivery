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


// キャンバスの全画面表示
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
