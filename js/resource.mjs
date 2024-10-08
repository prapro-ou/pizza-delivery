// リソース画像のパス一覧
const imagePaths = {
    // 自機・障害物
    mud:        "resource/image/mud.png",
    rider:      "resource/image/rider.png",
    speedup:    "resource/image/speedup.png",
    lampRight:  "resource/image/lamp_right.png",
    lampLeft:   "resource/image/lamp_left.png",
    ice:        "resource/image/ice.png",
    cactus:     "resource/image/cactus.png",

    //車
    blueCar:    "resource/image/car/car_blue.png",
    redCar:     "resource/image/car/car_red.png",
    sportCar:   "resource/image/car/sport_car.png",
    bigTruck:   "resource/image/car/truck_big.png",
    blueTruck:  "resource/image/car/truck_blue.png",

    // 食材
    bacon:      "resource/image/ingredient/bacon.png",
    basil:      "resource/image/ingredient/basil.png",
    cheese:     "resource/image/ingredient/cheese.png",
    chicken:    "resource/image/ingredient/chicken.png",
    corn:       "resource/image/ingredient/corn.png",
    durian:     "resource/image/ingredient/durian.png",
    mayonnaise: "resource/image/ingredient/mayonnaise.png",
    mysteriousMushroom:
                "resource/image/ingredient/mysterious_mushroom.png",
    natto:      "resource/image/ingredient/natto.png",
    onion:      "resource/image/ingredient/onion.png",
    redPepper:  "resource/image/ingredient/red_pepper.png",
    rottenEgg:  "resource/image/ingredient/rotten_egg.png",
    salami:     "resource/image/ingredient/salami.png",
    shrimp:     "resource/image/ingredient/shrimp.png",
    squid:      "resource/image/ingredient/squid.png",
    tomato:     "resource/image/ingredient/tomato.png",

    // ピザ
    baconPizza:         "resource/image/pizza/bacon.png",
    diabola:            "resource/image/pizza/diabola.png",
    dough:              "resource/image/pizza/dough.png",
    margherita:         "resource/image/pizza/margherita.png",
    marinara:           "resource/image/pizza/marinara.png",
    mayoCorn:           "resource/image/pizza/mayo_corn.png",
    meatPizza:          "resource/image/pizza/meat.png",
    quattroFormaggi:    "resource/image/pizza/quattro_formaggi.png",
    seafood:            "resource/image/pizza/seafood.png",
    shiningMushroomPizza:
                        "resource/image/pizza/shining_mushroom.png",
    spicySeafood:       "resource/image/pizza/spicy_seafood.png",
    strangePizza:       "resource/image/pizza/strange.png",
    teriyakiPizza:      "resource/image/pizza/teriyaki.png",
    unfinishedPizza:    "resource/image/pizza/unfinished.png",
    uniquePizza:        "resource/image/pizza/unique.png",
    unknownPizza:       "resource/image/pizza/unknown.png",
    vegetablePizza:     "resource/image/pizza/vegetable.png",

    //背景
    bg1:    "resource/image/background/1_noon.png",
    bg2:    "resource/image/background/2_night.png",
    bg3:    "resource/image/background/3_highway.png",
    bg4:    "resource/image/background/4_desert.png",
    bg5:    "resource/image/background/5_ice.png",
    maxHeart:           "resource/image/max_heart.png",
    emptyHeart:         "resource/image/empty_heart.png",
    titleBackground:    "resource/image/background/title_background.png",
    woodBackground:     "resource/image/background/wood_backgrond.png",
    brownArrow:         "resource/image/background/brown_arrow.png",
    cooking:            "resource/image/background/cooking.png",
    goldFrame:          "resource/image/background/gold_frame.png",
    itemBackGround:     "resource/image/background/item_background.png",
    itemBackGroundBig:  "resource/image/background/item_background_big.png",
    notebookBackground: "resource/image/background/notebook_background.png",
    bookBackground:     "resource/image/background/book_background.png",

    // UI
    soundButton:    "resource/image/ui/sound_button.png",
    squareButton:   "resource/image/ui/square_button.png",
    roundButton:    "resource/image/ui/round_button.png",
    stageButton:    "resource/image/ui/stage_button.png",
    recipeButton:   "resource/image/ui/recipe_button.png",
    bookButton:     "resource/image/ui/book_button.png",
    topButton:      "resource/image/ui/top_button.png",
    creditButton:   "resource/image/ui/credit_button.png",

    // フォント
    theStrongGamerWhiteFont: "resource/image/font/the_strong_gamer_white_font.png",

    // スクリーンショット
    screenshot01:   "resource/image/screenshot/screenshot01.png",
    screenshot02:   "resource/image/screenshot/screenshot02.png",
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
    crashEffect:    "resource/se/crash.mp3",
    gameOverEffect:    "resource/se/crash.wav",
    mudEffect:      "resource/se/mud.mp3",
    getIngredientEffect:    "resource/se/getIngredient.wav",
    courseOutEffect:    "resource/se/courseOut.wav",
    speedUpEffect:  "resource/se/speedUp.mp3",
    goalEffect:    "resource/se/goal.mp3",
    bikeEngineEffect:    "resource/se/bikeEngine.mp3",
    freezeEffect:   "resource/se/freeze.mp3",
    cactusEffect:      "resource/se/cactus.mp3",
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
