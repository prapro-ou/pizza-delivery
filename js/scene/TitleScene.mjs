import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { resource } from '../resource.mjs';
import { dataKeys } from '../dataObject/dataKeysSettings.mjs';
import { UserConfig } from '../dataObject/UserConfig.mjs';
import { sqbColors, SquareButton } from '../component/SquareButton.mjs';

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
        this.setUpUI();
    }

    setUpUI() {
        this.startFromBeginningButton = new SquareButton(sqbColors.yellow);
        this.startFromBeginningButton.text = "はじめから";
        this.startFromBeginningButton.onClick = this.onClickStartFromBeginning.bind(this);

        this.continueButton = new SquareButton(sqbColors.green);
        this.continueButton.text = "続きから";
        this.continueButton.onClick = this.onClickContinue.bind(this);

        this.configButton = new SquareButton(sqbColors.white);
        this.configButton.text = "音量設定";
        this.configButton.onClick = this.onClickConfig.bind(this);
    }

    updateStates(deltaTime, mouse) {
        this.startFromBeginningButton.updateStates(mouse);
        this.continueButton.updateStates(mouse);
        this.configButton.updateStates(mouse);
    }

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(resource.images.titleBackground, 0, 0, max_x, max_y);

        this.startFromBeginningButton.draw(ctx, 449, 266);
        this.continueButton.draw(ctx, 449, 266 + 110);
        this.configButton.draw(ctx, 449, 266 + 220);

        let r = { x: max_x / 2 - 250, y: max_y / 2 + 225, w: 200, h: 50 };
        this.PizzaCollectionArea = r;

        // ctx.fillStyle = "blue";
        // ctx.fillRect(r.x, r.y, r.w, r.h);
        // ctx.fillStyle = "white";
        // ctx.font = "20px Arial";
        // ctx.textAlign = "center";
        // ctx.textBaseline = "middle";
        // ctx.fillText("ピザコレクション", r.x + r.w / 2, r.y + r.h / 2);

        // if (this.endingUnlocked) {
        //     r = { x: max_x / 2 + 100, y: max_y / 2 + 225, w: 200, h: 50 };
        //     this.endingCollectionButtonArea = r;
        //     ctx.fillStyle = "blue";
        //     ctx.fillRect(r.x, r.y, r.w, r.h);
        //     ctx.fillStyle = "white";
        //     ctx.font = "20px Arial";
        //     ctx.textAlign = "center";
        //     ctx.textBaseline = "middle";
        //     ctx.fillText("エンディング集", r.x + r.w / 2, r.y + r.h / 2);
        // }

        const soundImage = (this.userConfig.bgmVolume == 0 && this.userConfig.seVolume == 0) ? resource.images.soundOff : resource.images.soundOn;
        r = { x: max_x - soundImage.width - 20, y: 20, w: soundImage.width, h: soundImage.height };
        this.switchSoundArea = r;
        ctx.drawImage(soundImage, r.x, r.y, r.w, r.h);
    }

    onClickStartFromBeginning() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sharedData.playFromBeginning = true;
        this.sceneRouter.changeScene(scenes.arasuji);
    }

    onClickContinue() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sharedData.playFromBeginning = false;
        this.sceneRouter.changeScene(scenes.slotSelection);
    }

    onClickConfig() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(scenes.config);
    }

    didTap(x, y) {
        let r = this.PizzaCollectionArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { 
            this.sharedData.previousScene = scenes.title;
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
