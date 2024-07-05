/**
 * 全てのシーンの親クラス
 */
export class Scene {
    constructor(sceneRouter, sharedData) {
        /**
         * 画面遷移に使用する。 \
         * 例: this.sceneRouter.changeScene(scenes.arasuji); \
         * 引数はsceneSettings.mjsで定義している連想配列(列挙型の代用)scenes
         */
        this.sceneRouter = sceneRouter;

        /**
         * 全てのシーンの間で共有されるデータの連想配列。 \
         * 例: this.sharedData.name = "太郎";
         */
        this.sharedData = sharedData;
    }

    /**
     * シーンの状態を更新する。
     * @param {number} deltaTime - 前のフレームからの経過時間[ms]
     * @param {Object} mouse - マウスの状態 (使用しない場合は引数定義省略可)
     */
    updateStates(deltaTime, mouse) {
        // mouse.x      いまマウスがあるX座標
        // mouse.y      いまマウスがあるY座標
        // mouse.isDown マウスの左クリックが押されているか
        // mouse.startX マウスの左クリックが押され始めたX座標
        // mouse.startY マウスの左クリックが押され始めたY座標
        console.error("シーンに updateStates(deltaTime) が実装されていません。");
    }

    /**
     * シーンをキャンバスに描画する。
     * @param {CanvasRenderingContext2D} ctx - canvas.getContext('2d')で得られたオブジェクト
     */
    render(ctx) {
        console.error("シーンに render(ctx) が実装されていません。");
    }

    /**
     * シーン出現時に行いたい処理がある場合、このメソッドをオーバーライドする。
     */
    sceneWillAppear() {}

    /**
     * シーンが閉じる時に行いたい処理がある場合、このメソッドをオーバーライドする。
     */
    sceneWillDisappear() {}

    /**
     * キャンバス内がタップされた時の処理を書く場合、このメソッドをオーバーライドする。
     * @param {number} x - タップされた場所のCanvas内のx座標
     * @param {number} y - タップされた場所のCanvas内のy座標
     */
    didTap(x, y) {}
}
