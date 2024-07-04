// 全てのシーンの親クラスとなるクラス
export class Scene {
    constructor(sceneRouter, sharedData) {
        this.sceneRouter = sceneRouter;
        this.sharedData = sharedData;
    }

    init() {
        console.error("init() is not implemented.");
    }

    update(deltaTime) {
        console.error("update(deltaTime) is not implemented.");
    }

    render(ctx) {
        console.error("render(ctx) is not implemented.");
    }

    destroy() {
        console.error("destroy() is not implemented.");
    }

    didTap(x, y) {
        // タップ処理が必要なシーンでオーバーライドする
    }
}
