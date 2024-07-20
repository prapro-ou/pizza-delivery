import { Scene } from './special/Scene.mjs';
import { scenes } from "./special/sceneSettings.mjs";
import { resource } from '../resource.mjs';
import { cookieKeys } from '../dataObject/cookieKeysSettings.mjs';

// 設定画面
export class ConfigScene extends Scene {
    sceneWillAppear() {
        this.sceneRouter.setBGM(resource.bgm.MusMusBGM103);
        this.backButtonArea = null;
        this.volumeButtonArea = null;
        this.seButtonArea = null;
        this.bgmSlider = { x: 100, y: 200, w: 300, h: 20 };
        this.seSlider = { x: 100, y: 300, w: 300, h: 20 };
        this.draggingSlider = null; // 現在ドラッグ中のスライダー
        this.userConfig = this.sceneRouter.load(cookieKeys.userConfig);
    }

    updateStates(deltaTime, mouse) {
        if (mouse.isDown) {
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

        // タイトルに戻るボタン
        let r = { x: max_x - 200, y: max_y - 100, w: 200, h: 50 };
        this.backButtonArea = r;
        ctx.fillStyle = "blue";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("タイトルに戻る", r.x + r.w / 2, r.y + r.h / 2);

        // 音量スライダー
        this.drawSlider(ctx, this.bgmSlider, "BGM Volume", this.userConfig.bgmVolume);
        this.drawSlider(ctx, this.seSlider, "SE Volume", this.userConfig.seVolume);
    }

    drawSlider(ctx, slider, label, value) {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.fillText(label, slider.x, slider.y - 10);

        ctx.fillStyle = "gray";
        ctx.fillRect(slider.x, slider.y, slider.w, slider.h);

        const knobX = slider.x + value * slider.w;
        ctx.fillStyle = "white";
        ctx.fillRect(knobX - 10, slider.y - 5, 20, slider.h + 10);
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
        if (this.isWithinSlider(x, y, this.bgmSlider)) {
            this.draggingSlider = this.bgmSlider;
        } else if (this.isWithinSlider(x, y, this.seSlider)) {
            this.draggingSlider = this.seSlider;
        }
    }

    updateSlider(x, slider) {
        let value = (x - slider.x) / slider.w;
        value = Math.min(Math.max(value, 0.0), 1.0);
        value = Math.round(value * 100) / 100;

        if (slider === this.bgmSlider) {
            this.userConfig.bgmVolume = value;
            this.sceneRouter.save(cookieKeys.userConfig, this.userConfig);
        } else if (slider === this.seSlider) {
            this.userConfig.seVolume = value;
            this.sceneRouter.save(cookieKeys.userConfig, this.userConfig);
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
