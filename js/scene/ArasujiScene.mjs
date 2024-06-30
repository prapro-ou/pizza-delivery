import { Scene } from './Scene.mjs';
import { scenes } from '../enum/scenes.mjs';

// あらすじ画面
export class ArasujiScene extends Scene {
    constructor() {
        super();
        this.changeScene = null;
    }

    init() {
    }

    update(deltaTime) {
    }

    render(renderer) {
        const { max_x, max_y } = renderer;
        renderer.fillRect("lightblue", 0, 0, max_x, max_y);
        renderer.fillText("あらすじ画面", 50, 50, "black", "left", "50px Arial");
    }

    destroy() {
    }
}
