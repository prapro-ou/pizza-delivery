// 全てのシーンの親クラスとなるクラス
export class Scene {
    constructor(sceneRouter, sharedData) {
        this.sceneRouter = sceneRouter;
        this.sharedData = sharedData;
    }

    // シーンの状態を更新する
    updateStates(deltaTime) {
        console.error("シーンに updateStates(deltaTime) が実装されていません。");
    }

    // シーンをキャンバスに描画する
    // ctx は canvas.getContext('2d')で得られたオブジェクト
    render(ctx) {
        console.error("シーンに render(ctx) が実装されていません。");
    }

    // シーン出現時に行いたい処理がある場合は、このメソッドをオーバーライドする
    sceneWillAppear() {}

    // シーンが閉じる時に行いたい処理がある場合は、このメソッドをオーバーライドする
    sceneWillDisappear() {}

    // キャンバス内がタップされた時の処理を書く場合は、このメソッドをオーバーライドする
    // x, y は タップされた場所のCanvas内の座標
    didTap(x, y) {}
}
