import DataManager from "../../class/Manager/DataManager";
import { IStoreCharacter } from "../../definitions/class/Store/IStoreCharacter";
import Character from "./Character";

export default class Actor extends Character implements IStoreCharacter {
	public get characterId(): string {
		return this.id;
	}

	/**
	 * 次のレベルまでの経験値
	 */
	public get nextLevelExp(): number {
		// TODO: IDの指定
		const expTable = DataManager.expTable.get("0001", this.level);
		if (!expTable) {
			return 0;
		}

		return expTable.exp - this.exp;
	}

	public constructor(option: IStoreCharacter) {
		// キャラクターIDが設定されない場合があるので設定
		if (!option.id) {
			option.id = option.characterId;
		}
		super(option);
	}

	/**
	 * 経験値を増加
	 */
	public addExp(exp: number): void {
		this.exp += exp;
	}

	/**
	 * レベルアップ可能かどうか
	 */
	public canLevelUp(): boolean {
		// 次のレベルまでの経験値が0以下ならレベルアップ可能
		// TODO: レベル最大の場合
		return this.nextLevelExp <= 0;
	}

	/**
	 * レベルを上げる
	 */
	public addLevel(level: number): void {
		this.level += level;
	}
}
