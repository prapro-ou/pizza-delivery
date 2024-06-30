// Canvas内のタップ操作についてのイベントを管理するクラス
export class TapEventListener {
    constructor(canvas) {
        this.canvas = canvas;
    }

    // 新たなイベントを登録
    addListener(listener) {
        this.canvas.addEventListener("click", listener);
    }

    // 登録したイベントの解除
    removeListener(listener) {
        this.canvas.removeEventListener('click', listener);
    }
}
