import { Scene } from './special/Scene.mjs';
import { resource } from '../resource.mjs';
import { dataKeys } from '../dataObject/dataKeysSettings.mjs';
import { buttonStates, ColorButton } from '../component/Button.mjs';

const sliders = {
    bgm: "sliders.bgm",
    se: "sliders.se",
}

// 設定画面
export class ConfigScene extends Scene {
    sceneWillAppear() {
        this.sceneRouter.setBGM(resource.bgm.MusMusBGM103);
        this.bgmSliderArea = null; // { x: 100, y: 200, w: 300, h: 20 };
        this.seSliderArea = null; // { x: 100, y: 300, w: 300, h: 20 };
        this.draggingSlider = null; // 現在ドラッグ中のスライダー
        this.userConfig = this.sceneRouter.load(dataKeys.userConfig);
        this.setUpUI();
    }

    setUpUI() {
        this.closeButton = new ColorButton({
            [buttonStates.normal]: "rgba(179, 9, 33, 0.75)",
            [buttonStates.hovered]: "rgba(179, 9, 33, 1.0)",
            [buttonStates.clicked]: "rgba(127, 6, 22, 1.0)",
        });
        this.closeButton.onClick = this.onClickClose.bind(this);
    }

    updateStates(deltaTime, mouse) {
        this.closeButton.updateStates(mouse)
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
        const maxX = ctx.canvas.width;
        const maxY = ctx.canvas.height;
        const [width, height] = [522, 293];
        const [x, y] = [(maxX - width) / 2, (maxY - height) / 2 + 10];

        ctx.fillStyle = "rgba(30, 30, 102, 0.7)";
        ctx.fillRect(x, y, width, height);

        this.closeButton.draw(ctx, x + width - 71, y, 71, 71);
        ctx.fillStyle = "white";
        ctx.font = "100px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
        ctx.fillText("×", x + width - 65, y + 71);

        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fillRect(x + 14, y + 12, width - 91, 59);
        ctx.fillStyle = "rgba(206, 255, 255, 0.7)";
        ctx.fillRect(x + 14, y + 78, width - 28, 98);
        ctx.fillStyle = "rgba(206, 255, 255, 0.7)";
        ctx.fillRect(x + 14, y + 183, width - 28, 98);
        this.bgmSliderArea = { x: maxX / 2 - 150, y: y + 130, w: 300, h: 20 };
        this.seSliderArea = { x: maxX / 2 - 150, y: y + 235, w: 300, h: 20 };

        ctx.fillStyle = "black";
        ctx.font = "34px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText("音量設定", x + 24, y + 46);

        // 音量スライダー
        this.drawSlider(ctx, this.bgmSliderArea, "BGM Volume", this.userConfig.bgmVolume);
        this.drawSlider(ctx, this.seSliderArea, "SE Volume", this.userConfig.seVolume);
    }

    drawSlider(ctx, area, label, value) {
        ctx.fillStyle = "black";
        ctx.font = "italic 20px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`${label}  ${Math.round(value * 100)}%`, area.x, area.y - 20);

        ctx.fillStyle = "gray";
        ctx.fillRect(area.x, area.y, area.w, area.h);

        const knobX = area.x + value * area.w;
        ctx.fillStyle = "white";
        ctx.fillRect(knobX - 10, area.y - 5, 20, area.h + 10);
    }

    onClickClose(){
        this.sceneRouter.playSE(resource.se.clickEffect);
        this.sceneRouter.dismissModal();
    }

    checkSliderDragStart(x, y) {
        if (this.isWithinSlider(x, y, this.bgmSliderArea)) {
            this.draggingSlider = sliders.bgm;
            this.sharedData.soundOn = true;
            this.sceneRouter.setBGM(resource.bgm.MusMusBGM103);
        } else if (this.isWithinSlider(x, y, this.seSliderArea)) {
            this.draggingSlider = sliders.se;
            this.sharedData.soundOn = true;
            this.sceneRouter.setBGM(resource.bgm.MusMusBGM103);
        }
    }

    updateSlider(x, slider) {
        if (slider === sliders.bgm) {
            let value = (x - this.bgmSliderArea.x) / this.bgmSliderArea.w;
            value = Math.min(Math.max(value, 0.0), 1.0);
            value = Math.round(value * 100) / 100;
            this.userConfig.bgmVolume = value;
            this.sceneRouter.save(dataKeys.userConfig, this.userConfig);

        } else if (slider === sliders.se) {
            let value = (x - this.seSliderArea.x) / this.seSliderArea.w;
            value = Math.min(Math.max(value, 0.0), 1.0);
            value = Math.round(value * 100) / 100;
            this.userConfig.seVolume = value;
            this.sceneRouter.save(dataKeys.userConfig, this.userConfig);
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
