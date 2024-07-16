// ピザの解禁状況などの情報
export class PizzaInfo {
    constructor(unlockedPizzas = {}) {
        this.unlockedPizzas = unlockedPizzas;
    }

    // ピザがアンロックされているかを確認
    isUnlocked(pizza) {
        return pizza in this.unlockedPizzas;
    }

    // ピザを解禁した時に呼び出すメソッド
    unlock(pizza) {
        if (pizza in this.unlockedPizzas) {
            this.unlockedPizzas[pizza]++;
        } else {
            this.unlockedPizzas[pizza] = 1;
        }
    }

    static createFromJSONData(data) {
        return new PizzaInfo(data.unlockedPizzas);
    }
}
