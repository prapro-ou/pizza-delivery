// ユーザー設定の情報
export class UserConfig {
    constructor(seVolume = 80, bgmVolume = 80) {
        this.seVolume = seVolume;
        this.bgmVolume = bgmVolume;
    }

    static createFromJSONData(data) {
        return new UserConfig(data.seVolume, data.bgmVolume);
    }
}
