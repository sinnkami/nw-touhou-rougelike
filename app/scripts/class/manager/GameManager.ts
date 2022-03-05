import Canvas from "../../modules/Canvas/Canvas";
import fs from "../../modules/fs";
import path from "../../modules/path";
import { CommonConstruct, SAVE_SCREEN_SHOT_DIR } from "../Construct/CommonConstruct";
import Game_Battle from "../Game/Game_Battle";
import Game_Boss from "../Game/Game_Boss";
import Game_Character from "../Game/Game_Character";
import { Game_Dungeon } from "../Game/Game_Dungeon";
import Game_Enemy from "../Game/Game_Enemy";
import Game_EnemyParty from "../Game/Game_EnemyParty";
import Game_Input from "../Game/Game_Input";
import { Game_Loop } from "../Game/Game_Loop";
import { Game_Map } from "../Game/Game_Map";
import Game_Material from "../Game/Game_Material";
import Game_Party from "../Game/Game_Party";
import Game_PartyPlanningPlace from "../Game/Game_PartyPlanningPlace";
import Game_Player from "../Game/Game_Player";
import Game_Skill from "../Game/Game_Skill";
import Game_Turn from "../Game/Game_Turn";

// 解像度
const SIZE = CommonConstruct.size;

/**
 * ゲーム内情報を管理するクラス
 */
export default class GameManager {
	// pixi.jsラッパークラス
	private static canvas: Canvas;

	// 各ゲームクラス
	public static map: Game_Map = new Game_Map();
	public static loop: Game_Loop = new Game_Loop();
	public static input: Game_Input = new Game_Input();
	public static player: Game_Player = new Game_Player();
	public static dungeon: Game_Dungeon = new Game_Dungeon();
	public static character: Game_Character = new Game_Character();
	public static party: Game_Party = new Game_Party();
	public static battle: Game_Battle = new Game_Battle();
	public static enemy: Game_Enemy = new Game_Enemy();
	public static enemyParty: Game_EnemyParty = new Game_EnemyParty();
	public static turn: Game_Turn = new Game_Turn();
	public static boss: Game_Boss = new Game_Boss();
	public static partyPlanningPlace: Game_PartyPlanningPlace = new Game_PartyPlanningPlace();
	public static material: Game_Material = new Game_Material();
	public static skill: Game_Skill = new Game_Skill();

	/**
	 * 初期化処理
	 * @returns
	 */
	public static init(): Promise<void> {
		return Promise.all([this.setCanvas()]).then();
	}

	/**
	 * pixi.jsラッパークラスを取得
	 * @returns Canvas
	 */
	public static getCanvas(): Canvas {
		return this.canvas;
	}

	public static screenShot(): void {
		const imgUrl = this.getCanvas().screenShot();

		// data:image/png;base64,が邪魔なので排除
		const base64String = imgUrl.split(",")[1];

		// TODO: スクリーンショットした際のファイル名
		const saveFilePath = path.resolve(SAVE_SCREEN_SHOT_DIR, Date.now() + ".png");

		fs.writeFile(saveFilePath, base64String, "base64", (err: Error) => {
			console.log(err);
			if (err) throw err;
			console.info(`スクリーンショットを保存しました (${saveFilePath})`);
		});
	}

	/**
	 * pixi.jsラッパークラスを設定
	 * @returns Promise<void>
	 */
	private static setCanvas(): Promise<void> {
		this.canvas = new Canvas(SIZE.width, SIZE.height);
		return Promise.resolve();
	}
}
