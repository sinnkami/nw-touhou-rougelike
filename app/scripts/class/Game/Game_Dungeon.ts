import { IDataDungeon } from "../../definitions/class/Data/IDataDungeon";
import DataManager from "../Manager/DataManager";
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

	// 現在のダンジョンID
	private get dungeonId(): string {
		return StoreManager.dungeon.getDungeonId();
	}

	// 現在のダンジョン情報
	private get dungeonInfo(): IDataDungeon | undefined {
		return DataManager.dungeon.get(this.dungeonId);
	}

	// ボス前階層かどうか
	// TODO: storeの方が良い？
	public get isBeforeBossHierarchy(): boolean {
		const dungeon = this.dungeonInfo;
		if (dungeon) {
			return dungeon.maxHierarchy - this.hierarchy === 1;
		}
		return false;
	}

	/**
	 * ダンジョンに侵入した際の必要な情報を設定する
	 */
	public init(dungeonId: string): void {
		StoreManager.dungeon.init();
		GameManager.map.initMapData();

		// ダンジョンIDを設定
		StoreManager.dungeon.setDungeonId(dungeonId);

		// 現在の階層を1階に設定
		this.setCurrentHierarchy(1);

		// ダンジョンを生成
		this.createDungeon();
	}

	/**
	 * 突入可能なダンジョン一覧を取得
	 */
	public getDungeonList(): IDataDungeon[] {
		return DataManager.dungeon.getAll();
	}

	/**
	 * 現在のダンジョン情報を返す
	 */
	public getCurrentDungeon(): IDataDungeon {
		const dungeonInfo = this.dungeonInfo;
		if (!dungeonInfo) throw new Error("ダンジョン情報が取得できません");
		return dungeonInfo;
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

	/**
	 * 敵とエンカウントするかどうかのチェックを行う
	 * TODO: 確率と値の設定
	 * @return エンカウントするかどうか
	 */
	public checkEncount(): boolean {
		const value = Math.floor(Math.random() * 100);
		const isEncount = value == Math.floor(Math.random() * 100) ? true : false;
		return isEncount;
	}

	/**
	 * エンカウントする敵パーティIDをランダムで返す
	 * @return enemyPartyId
	 */
	public getRandomEnemyPartyId(): string {
		// TODO: ちゃんと算出する
		return "0001";
	}
}
