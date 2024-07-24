// ユーザー設定の情報
export class UserConfig {
    constructor(seVolume = 0, bgmVolume = 0) {
        this.seVolume = seVolume;
        this.bgmVolume = bgmVolume;
    }

    static createFromJSONData(data) {
        return new UserConfig(data.seVolume, data.bgmVolume);
    }
}
