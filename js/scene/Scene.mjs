// すべてのシーンの親クラス
export class Scene {
    // シーンの初期化を行う
    init() {
        console.error("init(deltatime) is not implemented.");
    }

    // シーンの内部状態の更新を行う
    update(deltaTime) {
        console.error("update(deltatime) is not implemented.");
    }

    // シーンの描画を行う
    render(renderer) {
        console.error("render(ctx) is not implemented.");
    }

    // シーンの破棄を行う
    destroy() {
        console.error("desctroy() is not implemented.");
    }
}
