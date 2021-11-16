import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import { Game_Base } from "./Game_Base";

/**
 * 突入中のダンジョンの情報を操作するクラス
 */
export class Game_Dungeon extends Game_Base {
	// 現在の階層
	private get hierarchy(): number {
		return StoreManager.dungeon.getHierarchy();
	}

	/**
	 * ダンジョンに侵入した際の必要な情報を設定する
	 */
	public invadeDungeon(): void {
		this.setCurrentHierarchy(1);

		// ダンジョンを生成
		this.createDungeon();
	}

	/**
	 * ダンジョンを生成する
	 */
	public createDungeon(): void {
		// ダンジョンを生成する
		// TODO: 場所によってサイズとか変えたい
		GameManager.map.createMapData();

		// 操作キャラをダンジョン内に配置
		const position = GameManager.map.getRandomPosition();
		GameManager.player.setPosition(position.x, position.y);
	}

	/**
	 * ダンジョンから戻った際に情報を初期化する
	 * @returns
	 */
	public returnFromDungeon(): void {
		this.setCurrentHierarchy(0);
	}

	/**
	 * 現在の階層を取得
	 * @returns 階層
	 */
	public getCurrentHierarchy(): number {
		return this.hierarchy;
	}

	/**
	 * 現在の階層を設定
	 * @param hierarchy
	 */
	public setCurrentHierarchy(hierarchy: number): void {
		StoreManager.dungeon.setHierarchy(hierarchy);
	}
}
