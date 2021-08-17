import { Game_Base } from "./Game_Base";

/**
 * 突入中のダンジョンの情報を保持するクラス
 */
export class Game_Dungeon extends Game_Base {
	// ダンジョン名
	private name: string;

	// 現在の階層
	private currentHierarchy: number;

	public constructor() {
		super();

		this.currentHierarchy = 0;
		this.name = "";
	}

	/**
	 * ダンジョンに侵入した際の必要な情報を設定する
	 */
	public invadeDungeon(name: string): void {
		this.setName(name);
		this.setCurrentHierarchy(1);
	}

	/**
	 * ダンジョンから戻った際に情報を初期化する
	 * @returns
	 */
	public returnFromDungeon(): void {
		this.setName("");
		this.setCurrentHierarchy(0);
	}

	/**
	 * ダンジョン名を取得
	 * @returns ダンジョン名
	 */
	public getName(): string {
		return this.name;
	}

	/**
	 * ダンジョン名を設定
	 * @param name
	 */
	public setName(name: string): void {
		this.name = name;
	}

	/**
	 * 現在の階層を取得
	 * @returns 階層
	 */
	public getCurrentHierarchy(): number {
		return this.currentHierarchy;
	}

	/**
	 * 現在の階層を設定
	 * @param hierarchy
	 */
	public setCurrentHierarchy(hierarchy: number): void {
		this.currentHierarchy = hierarchy;
	}
}
