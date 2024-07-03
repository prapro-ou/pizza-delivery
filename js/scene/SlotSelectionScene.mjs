import { Scene } from './Scene.mjs';
import { scenes } from '../enum/scenes.mjs';

//セーブデータ選択画面
export class SlotSelectionScene extends Scene {
    constructor(tapEventListener) {
        super();
        this.changeScene = null;
        this.tapEventListener = tapEventListener;
    }
    
    init(){
        this.tapEventListener.addListener(this.onTap.bind(this));
        this.slotButtonAreas = [];
    }

    update(deltaTime){

    }

    render(renderer){
        const { max_x,max_y } = renderer;
        renderer.fillRect("royalblue", 0, 0, max_x, max_y);
        renderer.fillText("セーブ選択画面", 50, 50, "black", "left", "50px Arial");
        this.slotButtonAreas = [];
        const r1 = { x: max_x/2 -100, y: max_y/2-25, w: 200, h: 50 };
        renderer.drawButton("セーブ1", r1.x, r1.y, r1.w, r1.h, "white", "blue","20px Arial")
        this.slotButtonAreas.push(r1);
    }

    destroy() {
        this.tapEventListener.clearListeners();
    }

    onTap(event){
        const x = event.offsetX;
        const y = event.offsetY;
        const r = this.slotButtonAreas[0];
        if (r && x >= r.x && x <= r.x+r.w && y >= r.y && y <= r.y+r.h) {
            this.didTapStartFromBeginning();
        }
    }

    didTapStartFromBeginning() {
        console.log("save1");
    }
}

