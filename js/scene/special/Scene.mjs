/**
 * 全てのシーンの親クラス
 */
export class Scene {
    /**
     * @param {Object} sceneRouter - 画面遷移に使用するオブジェクト。
     * @param {Object} sharedData - 全てのシーンの間で共有されるデータの連想配列。
     */
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
     * @param {Object} [mouse] - マウスの状態
     * @param {number} mouse.x - 現在のマウスのX座標
     * @param {number} mouse.y - 現在のマウスのY座標
     * @param {boolean} mouse.isDown - マウスの左クリックが押されているかどうか
     * @param {number} mouse.startX - マウスの左クリックが押され始めたX座標
     * @param {number} mouse.startY - マウスの左クリックが押され始めたY座標
     * @param {Set} pressedKeys - 現在キーボードで押されているキーの集合（例: {"ArrowRight", "d", " "}）
     */
    updateStates(deltaTime, mouse, pressedKeys) {
        console.error("シーンに updateStates(deltaTime, mouse, pressedKeys) が実装されていません。");
    }

    // モーダル表示中にバックグラウンドで行う状態更新処理
    updateStatesWhileModalPresenting(deltaTime, mouse, pressedKeys) {}

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
}
