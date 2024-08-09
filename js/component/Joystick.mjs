// DriveSceneで自機を操作するためのUI
export class Joystick {
    constructor() {
        console.log(111, this)
        // キーボードの方向キーへの変換
        this.leftPressed = false;
        this.rightPressed = false;
        this.upPressed = false;
        this.downPressed = false;

        /**
         * @type {{ x: number, y: number sr: number, st: number }}
         * x, y - Joystickの中心座標
         * sr, st - スティックの中心が (x, y) から角度 st (rad)の方向に長さ sr だけずれている
         */
        this.position = null;

        this.radius = 40
        this.stickRadius = 25
        this.alpha = 0.4
        this.stickAlpha = 0.8
        this.maxSr = 25 // スティックの可動域
        this.deadZoneSr = 15 // この半径以上動かさないと反応しない
    }

    /**
     * @param {Object} [mouse] - マウスの状態
     * @param {number} mouse.x - 現在のマウスのX座標
     * @param {number} mouse.y - 現在のマウスのY座標
     * @param {boolean} mouse.isDown - マウスの左クリックが押されているかどうか
     * @param {number} mouse.startX - マウスの左クリックが押され始めたX座標
     * @param {number} mouse.startY - マウスの左クリックが押され始めたY座標
     */
    updateStates(mouse) {
        if (!mouse.isDown) {
            this.clearPosition()
        } else {
            const [x, y] = [mouse.startX, mouse.startY];
            const [dx, dy] = [(mouse.x - x), (mouse.y - y)];
            let r = Math.sqrt(dx**2 + dy**2);
            r = Math.min(this.maxSr, Math.max(-this.maxSr, r));
            const theta = Math.atan2(dy, dx);
            this.setPosition(x, y, r, theta);
        }
    }

    draw(ctx, nightMode = false) {
        if (!this.position) return;
        const color = nightMode ? 160 : 0;
        const { x, y, sr, st } = this.position;
        ctx.fillStyle = "rgba(" + [color, color, color, this.alpha] + ")";
        this.drawCircle(ctx, x, y, this.radius);
        ctx.fillStyle = "rgba(" + [255, 255, 255, this.stickAlpha] + ")";
        this.drawCircle(ctx, x + sr * Math.cos(st), y + sr * Math.sin(st), this.stickRadius);
    }

    drawCircle(ctx, x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }

    clearPosition() {
        this.position = null;
        this.leftPressed = false;
        this.rightPressed = false;
        this.upPressed = false;
        this.downPressed = false;
    }

    setPosition(x, y, sr, st) {
        this.position = { x: x, y: y, sr: sr, st: st };
        if (sr < this.deadZoneSr) {
            this.leftPressed = false;
            this.rightPressed = false;
            this.upPressed = false;
            this.downPressed = false;
        } else {
            this.leftPressed = Math.abs(st) > 5/8 * Math.PI;
            this.rightPressed = Math.abs(st) < 3/8 * Math.PI;
            this.upPressed = st > -7/8 * Math.PI && st < -1/8 * Math.PI;
            this.downPressed = st > 1/8 * Math.PI && st < 7/8 * Math.PI;
        }
    }
}
