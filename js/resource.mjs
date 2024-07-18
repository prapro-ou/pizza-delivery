// リソース画像のパス一覧
const imagePaths = {
    car_red:    "resource/image/car_red.png",
    mud:        "resource/image/mud.png",
    rider:      "resource/image/rider.png",
    speedup:    "resource/image/speedup.png",

    margherita: "resource/image/pizza/margherita.png",
    marinara:   "resource/image/pizza/marinara.png",
    seafood:    "resource/image/pizza/seafood.png",

    basil:      "resource/image/ingredient/basil.png",
    cheese:     "resource/image/ingredient/cheese.png",
    octopus:    "resource/image/ingredient/octopus.png",
    onion:      "resource/image/ingredient/onion.png",
    squid:      "resource/image/ingredient/squid.png",
    tomato:     "resource/image/ingredient/tomato.png",
}

class Resource {
    constructor() {
        this.images = { ...imagePaths }; // キーの補完が出るように {} ではなく左のように初期化
        for (const key in imagePaths) {
            this.images[key] = new Image();
        }
    }s

    startLoadingAllImages() {
        for (const key in imagePaths) {
            this.images[key].src = imagePaths[key];
        }
    }
}

export const resource = new Resource();
