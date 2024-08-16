// ユーザー設定の情報
export class UserConfig {
    constructor(seVolume = 1.0, bgmVolume = 0.5) {
        this.seVolume = seVolume;
        this.bgmVolume = bgmVolume;
    }

    static createFromJSONData(data) {
        return new UserConfig(data.seVolume, data.bgmVolume);
    }
}
