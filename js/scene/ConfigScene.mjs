import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { resource } from '../resource.mjs';
import { dataKeys } from '../dataObject/dataKeysSettings.mjs';

const sliders = {
    bgm: "sliders.bgm",
    se: "sliders.se",
}

// 設定画面
export class ConfigScene extends Scene {
    sceneWillAppear() {
        this.sceneRouter.setBGM(resource.bgm.MusMusBGM103);
        this.backButtonArea = null;
        this.volumeButtonArea = null;
        this.seButtonArea = null;
        this.bgmSliderArea = null; // { x: 100, y: 200, w: 300, h: 20 };
        this.seSliderArea = null; // { x: 100, y: 300, w: 300, h: 20 };
        this.draggingSlider = null; // 現在ドラッグ中のスライダー
        this.userConfig = this.sceneRouter.load(dataKeys.userConfig);
    }

    updateStates(deltaTime, mouse) {
        if (mouse.isDown && this.bgmSliderArea && this.seSliderArea) {
            if (this.draggingSlider) {
                this.updateSlider(mouse.x, this.draggingSlider);
            } else {
                this.checkSliderDragStart(mouse.x, mouse.y);
            }
        } else {
            this.draggingSlider = null;
        }
    }

    render(ctx) {
        const max_x = ctx.canvas.width;
        const max_y = ctx.canvas.height;

        ctx.fillStyle = "lightblue";
        ctx.fillRect(0, 0, max_x, max_y);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "left";
        ctx.fillText("設定画面", 50, 50);

        // 音量スライダー
        this.bgmSliderArea = {
            x: max_x / 2 - 150,
            y: max_y / 2 - 70,
            w: 300,
            h: 20
        };
        this.drawSlider(ctx, this.bgmSliderArea, "BGM Volume", this.userConfig.bgmVolume);
        this.seSliderArea = {
            x: max_x / 2 - 150,
            y: max_y / 2 + 50,
            w: 300,
            h: 20
        };
        this.drawSlider(ctx, this.seSliderArea, "SE Volume", this.userConfig.seVolume);

        // タイトルに戻るボタン
        let r = {
            x: max_x / 2 - 100,
            y: max_y - 100,
            w: 200,
            h: 50
        };
        this.backButtonArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("タイトルに戻る", r.x + r.w / 2, r.y + r.h / 2);
    }

    drawSlider(ctx, area, label, value) {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`${label}  ${Math.round(value * 100)}%`, area.x, area.y - 20);

        ctx.fillStyle = "gray";
        ctx.fillRect(area.x, area.y, area.w, area.h);

        const knobX = area.x + value * area.w;
        ctx.fillStyle = "white";
        ctx.fillRect(knobX - 10, area.y - 5, 20, area.h + 10);
    }

    didTap(x, y) {
        let r = this.backButtonArea;
        if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            this.didTapBack();
        }
    }

    didTapBack() {
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.changeScene(scenes.title);
    }

    checkSliderDragStart(x, y) {
        if (this.isWithinSlider(x, y, this.bgmSliderArea)) {
            this.draggingSlider = sliders.bgm;
        } else if (this.isWithinSlider(x, y, this.seSliderArea)) {
            this.draggingSlider = sliders.se;
        }
    }

    updateSlider(x, slider) {
        if(this.userConfig.bgmVolume == 0 && this.userConfig.seVolume == 0){
            this.sharedData.storedBgmVolume = 0;
            this.sharedData.storedSeVolume = 0;
            this.sharedData.soundOn = true;
        }
        if (slider === sliders.bgm) {
            let value = (x - this.bgmSliderArea.x) / this.bgmSliderArea.w;
            value = Math.min(Math.max(value, 0.0), 1.0);
            value = Math.round(value * 100) / 100;
            this.sharedData.storedBgmVolume = value;
            if(this.sharedData.soundOn){
                this.userConfig.bgmVolume = value;
                this.sceneRouter.save(dataKeys.userConfig, this.userConfig);
            }

        } else if (slider === sliders.se) {
            let value = (x - this.seSliderArea.x) / this.seSliderArea.w;
            value = Math.min(Math.max(value, 0.0), 1.0);
            value = Math.round(value * 100) / 100;
            this.sharedData.storedSeVolume = value;
            if(this.sharedData.soundOn){
                this.userConfig.seVolume = value;
                this.sceneRouter.save(dataKeys.userConfig, this.userConfig);
            }
        }
    }

    checkSliderTap(x, y, slider, callback) {
        if (this.isWithinSlider(x, y, slider)) {
            const value = ((x - slider.x) / slider.w) * 100;
            callback(Math.min(Math.max(value, 0), 100));
        }
    }

    isWithinSlider(x, y, slider) {
        return x >= slider.x && x <= slider.x + slider.w && y >= slider.y - 10 && y <= slider.y + slider.h + 10;
    }
}
