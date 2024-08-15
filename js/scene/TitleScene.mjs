import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { resource } from '../resource.mjs';
import { dataKeys } from '../dataObject/dataKeysSettings.mjs';
import { UserConfig } from '../dataObject/UserConfig.mjs';
import { sqbColors, SquareButton } from '../component/SquareButton.mjs';
import { PizzaRecipeButton } from '../component/PizzaRecipeButton.mjs';
import { EndingButton } from '../component/EndingButton.mjs';

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

        this.recipeButton = new PizzaRecipeButton();
        this.recipeButton.onClick = this.onClickRecipe.bind(this);

        this.endingButton = new EndingButton();
        this.endingButton.onClick = this.onClickEnding.bind(this);
    }

    updateStates(deltaTime, mouse) {
        this.startFromBeginningButton.updateStates(mouse);
        this.continueButton.updateStates(mouse);
        this.configButton.updateStates(mouse);
        this.recipeButton.updateStates(mouse);
        this.endingButton.updateStates(mouse);
    }

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(resource.images.titleBackground, 0, 0, max_x, max_y);

        this.startFromBeginningButton.draw(ctx, 450, 265);
        this.continueButton.draw(ctx, 450, 265 + 110);
        this.configButton.draw(ctx, 450, 265 + 220);
        this.recipeButton.draw(ctx, 22, 380);
        this.endingButton.draw(ctx, 130, 320);

        const soundImage = (this.userConfig.bgmVolume == 0 && this.userConfig.seVolume == 0) ? resource.images.soundOff : resource.images.soundOn;
        let r = { x: max_x - 86, y: 16, w: 63, h: 56 };
        this.switchSoundArea = r;
        ctx.drawImage(soundImage, r.x, r.y, r.w, r.h);
    }

    onClickStartFromBeginning() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sharedData.playFromBeginning = true;
        this.sharedData.onSelectSlot = this.onSelectSlot.bind(this);
        this.sceneRouter.presentModal(scenes.slotSelection);
    }

    onClickContinue() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sharedData.playFromBeginning = false;
        this.sharedData.onSelectSlot = this.onSelectSlot.bind(this);
        this.sceneRouter.presentModal(scenes.slotSelection);
    }

    onSelectSlot() {
        this.sharedData.onSelectSlot = null;
        if (this.sharedData.playFromBeginning) {
            this.sceneRouter.changeScene(scenes.arasuji);
        } else {
            this.sceneRouter.changeScene(scenes.stageSelection);
        }
    }

    onClickConfig() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(scenes.config);
    }

    onClickRecipe() {
        this.sharedData.previousScene = scenes.title;
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(scenes.pizzaCollection);
    }

    onClickEnding() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(scenes.endingCollection);
    }

    didTap(x, y) {
        let r = this.switchSoundArea;
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
