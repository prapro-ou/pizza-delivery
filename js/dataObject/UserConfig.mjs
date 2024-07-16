// ユーザー設定の情報
export class UserConfig {
    constructor(seVolume, bgmVolume) {
        this.seVolume = seVolume;
        this.bgmVolume = bgmVolume;
    }

    static createFromJSONData(data) {
        return new UserConfig(data.seVolume, data.bgmVolume);
    }
}
