// リソース画像のパス一覧
const imagePaths = {
    car_red:    "resource/image/car_red.png",
    mud:        "resource/image/mud.png",
    rider:      "resource/image/rider.png",
    speedup:    "resource/image/speedup.png",

    margherita: "resource/image/pizza/margherita.png",
    marinara:   "resource/image/pizza/marinara.png",
    seafood:    "resource/image/pizza/seafood.png",
    unknownPizza:   "resource/image/pizza/unknown.png",

    basil:      "resource/image/ingredient/basil.png",
    cheese:     "resource/image/ingredient/cheese.png",
    octopus:    "resource/image/ingredient/octopus.png",
    onion:      "resource/image/ingredient/onion.png",
    squid:      "resource/image/ingredient/squid.png",
    tomato:     "resource/image/ingredient/tomato.png",

    soundOn:    "resource/image/soundOn.png",
    soundOff:   "resource/image/soundOff.png",
}

// BGMのパス一覧
const bgmPaths = {
    MusMusBGM095:   "resource/bgm/MusMus-BGM-095.mp3",
    MusMusBGM103:   "resource/bgm/MusMus-BGM-103.mp3",
    MusMusBGM115:   "resource/bgm/MusMus-BGM-115.mp3",
    MusMusBGM122:   "resource/bgm/MusMus-BGM-122.mp3",
    MusMusBGM134:   "resource/bgm/MusMus-BGM-134.mp3",
    MusMusBGM143:   "resource/bgm/MusMus-BGM-143.mp3",
    MusMusBGM144:   "resource/bgm/MusMus-BGM-144.mp3",
    MusMusBGM146:   "resource/bgm/MusMus-BGM-146.mp3",
    MusMusBGM154:   "resource/bgm/MusMus-BGM-154.mp3",
    MusMusBGM155:   "resource/bgm/MusMus-BGM-155.mp3",
    MusMusBGM172:   "resource/bgm/MusMus-BGM-172.mp3",
}

// SEのパス一覧
const sePaths = {
    clickEffect:    "resource/se/click.mp3",
    startEffect:   "resource/se/start.mp3",
    crashEffect:    "resource/se/crash.wav",
    mudEffect:      "resource/se/mud.mp3",
    getIngredientEffect:    "resource/se/getIngredient.wav",
    courseOutEffect:    "resource/se/courseOut.wav",
    speedUpEffect:  "resource/se/speedUp.mp3",
    goalEffect:    "resource/se/goal.mp3",
    bikeEngineEffect:    "resource/se/bikeEngine.mp3",
}

class Resource {
    constructor() {
        this.images = { ...imagePaths }; // キーの補完が出るように {} ではなく左のように初期化
        for (const key in imagePaths) {
            this.images[key] = new Image();
        }
        this.bgm = { ...bgmPaths };
        for (const key in bgmPaths) {
            this.bgm[key] = new Audio(bgmPaths[key]);
        }
        this.se = { ...sePaths };
        for (const key in sePaths) {
            this.se[key] = new Audio(sePaths[key]);
        }
    }

    startLoadingAllImages() {
        for (const key in imagePaths) {
            this.images[key].src = imagePaths[key];
        }
    }
}

export const resource = new Resource();
