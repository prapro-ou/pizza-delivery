import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";

//セーブデータ選択画面
export class SlotSelectionScene extends Scene {
    sceneWillAppear(){
        this.slotButtonAreas = [];
    }

    updateStates(deltaTime){}

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.fillStyle = "royalblue";
        ctx.fillRect(0, 0, max_x, max_y);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText("セーブ選択画面", 50, 50);

        let r = { x: max_x/2 -100, y: max_y/2-25, w: 200, h: 50 };
        this.slotButtonAreas.push(r);
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("セーブデータ１", r.x + r.w / 2, r.y + r.h / 2);
    }

    didTap(x, y){
        let r = this.slotButtonAreas[0];
        if (r && x >= r.x && x <= r.x+r.w && y >= r.y && y <= r.y+r.h) {
            this.didTapSlot(1);
        }
    }

    didTapSlot(slot_index) {
        this.sceneRouter.changeScene(scenes.stageSelection);
    }
}
