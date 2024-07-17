import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";

export class WhichSlotToSaveScene extends Scene{
    sceneWillAppear(){
        this.slotToSaveButtonAreas = [];
    }

    updateStates(deltaTime){}

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        //セーブ選択だとSlotSelectionと被るので上書きと仮称
        ctx.fillStyle = "pink"
        ctx.fillRect(0, 0, max_x, max_y);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText("セーブ上書きシーン", 50, 50)

        for( let i = 0; i < 4 ; i++ ){   
            let r = { x: max_x/2 -100, y: max_y/2 -150 + 100*i, w: 200, h: 50 };
            this.slotToSaveButtonAreas.push(r);
            ctx.fillStyle = "blue";
            ctx.fillRect(r.x, r.y, r.w, r.h);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`セーブデータ${i+1}`, r.x + r.w / 2, r.y + r.h / 2);
        }       
    }   

    didTap(x, y){
        for ( let i = 0; i < 4; i++ ){
            let r = this.slotToSaveButtonAreas[i];
            if (r && x >= r.x && x <= r.x+r.w && y >= r.y && y <= r.y+r.h) {
                this.didTapSlot(i);
            }
        }
    }

    didTapSlot(slot_index) {
        this.sceneRouter.changeScene(scenes.stageSelection);
    }
}
