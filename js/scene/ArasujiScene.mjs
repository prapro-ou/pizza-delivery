import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { resource } from '../resource.mjs';

export class ArasujiScene extends Scene {
    sceneWillAppear() {
        this.sceneRouter.setBGM(resource.bgm.MusMusBGM103);
        this.deliveryButtonArea = null;
    }

    updateStates(deltaTime) {
        // 更新処理が必要な場合に実装
    }

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.fillStyle = "lightblue";
        ctx.fillRect(0, 0, max_x, max_y);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText("あらすじ画面", 50, 50);

        const arasujiText = [
            "ピザ配達でアルバイトをすることになった主人公。",
            "",
            "いつものようにピザ配達に行こうとしていたある日、食材が何者かに",
            "よってすべて盗まれしまい、あるのは焼けたピザ生地のみ。",
            "",
            "スーパーに食材を買いに行こうとするが、それでは熱々の",
            "ピザ生地が台無しであり、顧客からの信頼も下がってしまう。",
            "",
            "その時主人公が道路に目をやるとそこには一枚のベーコンが。",
            "これしかないと思った主人公は道中で食材を集めることに。",
            "",
            "たくさんの食材を集めて顧客を満足させろ。",
            "",
            "「食材は拾った。」",
        ];

        ctx.fillStyle = "royalblue";
        ctx.fillRect(0, 0, max_x, max_y);

        for (let i = 0; i < arasujiText.length; i++) {
            ctx.fillStyle = "black";
            ctx.font = "20px Arial";
            ctx.textAlign = "left";
            ctx.fillText(`${arasujiText[i]}`, 50, 50+30*i);
        }

        let r = { x: max_x - 250, y: max_y / 2 + 150, w: 200, h: 50 };
        this.deliveryButtonArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("配達に行く", r.x + r.w / 2, r.y + r.h / 2);
    }

    didTap(x, y) {
        let r = this.deliveryButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapDelivery();
        }
    }

    didTapDelivery() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(scenes.rule);
    }

}
