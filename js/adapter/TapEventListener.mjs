// Canvas内のタップ操作についてのイベントを管理するクラス
export class TapEventListener {
    constructor(canvas) {
        this.canvas = canvas;
        this.listeners = new Set();
    }

    // 新たなイベントを登録
    addListener(listener) {
        this.listeners.add(listener);
        this.canvas.addEventListener("click", listener);
    }

    // 登録したイベントを全て解除
    clearListeners() {
        this.listeners.forEach((listener) => this.canvas.removeEventListener("click", listener));
        this.listeners.clear();
    }
}
