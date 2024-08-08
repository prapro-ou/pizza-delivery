import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { resource } from '../resource.mjs';
import { dataKeys } from '../dataObject/dataKeysSettings.mjs';
import { UserConfig } from '../dataObject/UserConfig.mjs';

let appearsFirstTime = true;

export class TitleScene extends Scene {
    sceneWillAppear() {
        const endingInfo = this.sceneRouter.load(dataKeys.endingInfo);
        this.endingUnlocked = endingInfo.getEndingCount() >= 1;

        if (appearsFirstTime) {
            this.userConfig = new UserConfig(0, 0);
            this.sceneRouter.save(dataKeys.userConfig, this.userConfig);
        } else {
            this.userConfig = this.sceneRouter.load(dataKeys.userConfig);
            this.sceneRouter.setBGM(resource.bgm.MusMusBGM103);
        }
        appearsFirstTime = false;
    }

    updateStates(deltaTime) {}

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.fillStyle = "silver";
        ctx.fillRect(0, 0, max_x, max_y);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText("タイトル画面", 50, 50);

        let r = { x: max_x / 2 - 100, y: max_y / 2 - 75, w: 200, h: 50 };
        this.startFromBeginningButtonArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("最初から始める", r.x + r.w / 2, r.y + r.h / 2);

        r = { x: max_x / 2 - 100, y: max_y / 2 + 25, w: 200, h: 50 };
        this.continueButtonArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("続きから始める", r.x + r.w / 2, r.y + r.h / 2);

        r = { x: max_x / 2 - 100, y: max_y / 2 + 125, w: 200, h: 50 };
        this.configButtonArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("設定画面", r.x + r.w / 2, r.y + r.h / 2);

        r = { x: max_x / 2 - 250, y: max_y / 2 + 225, w: 200, h: 50 };
        this.PizzaCollectionArea = r;

        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("ピザコレクション", r.x + r.w / 2, r.y + r.h / 2);

        if (this.endingUnlocked) {
            r = { x: max_x / 2 + 100, y: max_y / 2 + 225, w: 200, h: 50 };
            this.endingCollectionButtonArea = r;
            ctx.fillStyle = "blue";
            ctx.fillRect(r.x, r.y, r.w, r.h);
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("エンディング集", r.x + r.w / 2, r.y + r.h / 2);
        }

        const soundImage = (this.userConfig.bgmVolume == 0 && this.userConfig.seVolume == 0) ? resource.images.soundOff : resource.images.soundOn;
        r = { x: max_x - soundImage.width - 20, y: 20, w: soundImage.width, h: soundImage.height };
        this.switchSoundArea = r;
        ctx.drawImage(soundImage, r.x, r.y, r.w, r.h);
    }

    didTap(x, y) {
        let r = this.startFromBeginningButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { 
            this.sceneRouter.playSE(resource.se.clickEffect);
            this.sceneRouter.changeScene(scenes.arasuji);
        }
        r = this.continueButtonArea;
        if (r && x >= r.x && x <= r.x+r.w && y >= r.y && y <= r.y + r.h) { 
            this.sceneRouter.playSE(resource.se.clickEffect);
            this.sceneRouter.changeScene(scenes.slotSelection);
        }
        r = this.configButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.sceneRouter.playSE(resource.se.clickEffect);
            this.sceneRouter.changeScene(scenes.config);
        }
        r = this.PizzaCollectionArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { 
            this.sceneRouter.playSE(resource.se.clickEffect);
            this.sceneRouter.changeScene(scenes.pizzaCollection);
        }

        r = this.endingCollectionButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { 
            this.sceneRouter.playSE(resource.se.clickEffect);
            this.sceneRouter.changeScene(scenes.endingCollection);
        }

        r = this.switchSoundArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapSoundIcon()
        }
    }

    didTapSoundIcon() {
        const volume = (this.userConfig.bgmVolume == 0) ? 1.0 : 0.0;
        this.userConfig.bgmVolume = volume;
        this.userConfig.seVolume = volume;
        this.sceneRouter.save(dataKeys.userConfig, this.userConfig);
        if (!this.sceneRouter.currentBGM) {
            this.sceneRouter.setBGM(resource.bgm.MusMusBGM103);
        }
        this.sceneRouter.currentBGM.currentTime = 0;
    }
}
