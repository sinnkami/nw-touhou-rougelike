import { IGameMapData } from "../../definitions/class/Game/IGameMap";
import { IProcessInfo, IResourceInfo } from "../../definitions/class/Scene/ISceneDungeon";
import { CommonConstruct, EventName, KeyCode } from "../Construct/CommonConstruct";
import { EventCode, EventManager } from "../EventManager";
import GameManager from "../GameManager";
import ResourceManager from "../ResourceManager";
import SceneManager from "../SceneManager";
import Sprite_Character from "../Sprite/Sprite_Character";
import Sprite_Map from "../Sprite/Sprite_Map";
import { Sprite_Message } from "../Sprite/Sprite_Message";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Scene_Base from "./Scene_Base";

/** プロセス名 */
export enum ProcessName {
	MapRender = "MapRender",
	PlayerRender = "PlayerRender",
	InputProcess = "InputProcess",
	StairsText = "StairsText",
	TestProcess = "TestProcess",
}

/** 画像パスを取得する際の名前 */
export enum ResourceName {
	Map = "Map",
	Character = "Character",
}

/** 解像度 */
const SIZE = CommonConstruct.size;

/**
 * ダンジョン内シーン
 */
export default class Scene_Dungeon extends Scene_Base {
	// TODO: この2種Baseに移動したいけど、取得が・・・・
	// プロセス情報
	public readonly processInfo: IProcessInfo = {
		[ProcessName.MapRender]: {
			class: new Sprite_Map(),
			process: async (time: number) => this.processInfo[ProcessName.MapRender].class.update(),
		},
		[ProcessName.PlayerRender]: {
			class: new Sprite_Character(),
			process: async (time: number) => this.processInfo[ProcessName.PlayerRender].class.update(),
		},
		[ProcessName.InputProcess]: {
			class: undefined,
			process: async (time: number) => this.inputProcess(),
		},
		[ProcessName.StairsText]: {
			class: new Sprite_Text(),
			process: async (time: number) => this.processInfo[ProcessName.StairsText].class.update(),
		},
	};
	private get processList(): ((time: number) => Promise<void>)[] {
		return Object.values(this.processInfo).map((info: { process: (time: number) => Promise<void> }) => {
			return info.process;
		});
	}

	// リソース情報
	public readonly resourceInfo: IResourceInfo;

	public constructor(resourceInfo: IResourceInfo) {
		super();
		this.resourceInfo = resourceInfo;
	}

	/**
	 * シーンを開始する
	 * TODO: いい感じに切り分けたい
	 * @override
	 */
	public async startScene(): Promise<void> {
		await super.startScene();
		// ダンジョンを生成する
		// TODO: 場所によってサイズとか変えたい
		GameManager.map.createMapData();

		// 操作キャラをダンジョン内に配置
		const position = GameManager.map.getRandomPosition();
		GameManager.player.setPosition(position.x, position.y);

		// 描画するマップを設定
		// MEMO: 現在地と中心点の差分を見て調節を行う
		// TODO: この意味わからん数値を良い感じにわかりやすくしたい
		const MapRender = this.processInfo[ProcessName.MapRender].class;
		console.log(this.resourceInfo);
		await MapRender.init({
			path: this.resourceInfo[ResourceName.Map],
			x: SIZE.width / 32 / 2 - GameManager.player.getPosition().x - 1,
			y: SIZE.height / 32 / 2 - GameManager.player.getPosition().y,
		});
		await MapRender.setSprite();

		// 描画する操作キャラを設定
		// MEMO: キャラを画面中心に表示する
		const PlayerRender = this.processInfo[ProcessName.PlayerRender].class;
		await PlayerRender.init({
			path: this.resourceInfo[ResourceName.Character],
			x: SIZE.width / 32 / 2 - 1,
			y: SIZE.height / 32 / 2,
		});
		await PlayerRender.setSprite();

		const StairsText = this.processInfo[ProcessName.StairsText].class;
		await StairsText.init({
			text: `${GameManager.map.getName()}: ${GameManager.dungeon.getCurrentHierarchy()}F`,
			x: 10,
			y: 10,
			width: 300,
			height: 30,
			fontSize: 25,
		});
		await StairsText.setSprite();

		// const TestText = this.processInfo[ProcessName.TestProcess].class;
		// await TestText.init({
		// 	text:
		// 		"滲み出す混濁の紋章\n不遜なる狂気の器\n湧き上がり・否定し・痺れ・瞬き・眠りを妨げる爬行する鉄の王女\n絶えず自壊する泥の人形\n結合せよ\n反発せよ\n地に満ち\n己の無力を知れ\n破道の九十・黒棺",
		// 	x: 100,
		// 	y: 100,
		// 	width: 300,
		// 	height: 900,
		// 	fontSize: 25,
		// });
		// await TestText.setSprite();
	}

	/**
	 * シーンを更新する
	 * @override
	 * @returns
	 */
	public async updateScene(): Promise<void> {
		await super.updateScene();
		this.processList.forEach(process => process(GameManager.loop.frameCount));
	}

	/**
	 * シーンを停止する
	 * @override
	 * @returns
	 */
	public async stopScene(): Promise<void> {
		return;
	}

	/**
	 * キー入力の処理を行う
	 * @returns
	 */
	private async inputProcess(): Promise<void> {
		const MapRender = this.processInfo[ProcessName.MapRender].class;
		const PlayerRender = this.processInfo[ProcessName.PlayerRender].class;

		// 移動アニメーション中は移動不可
		if (MapRender.isAnimation) return;

		// 移動マス
		const speed = 1;
		let x = 0;
		let y = 0;

		// TODO: ローグライクで斜め移動ってだめでは・・・？
		// 方向キーの処理
		if (GameManager.input.isPushedKey(KeyCode.Up)) y -= speed;
		if (GameManager.input.isPushedKey(KeyCode.Down)) y += speed;
		if (GameManager.input.isPushedKey(KeyCode.Right)) x += speed;
		if (GameManager.input.isPushedKey(KeyCode.Left)) x -= speed;

		// 移動量に合わせてキャラを移動
		const flag = GameManager.player.move(x, y);
		if (flag) {
			// 移動できたならマップをずらす
			MapRender.move(x, y);
		}

		// 決定キーの処理
		if (GameManager.input.isPushedKey(KeyCode.Select)) {
			const key = GameManager.input.getKey(KeyCode.Select);

			// 現在地にあるイベントタイルを取得
			const position = GameManager.player.getPosition();
			const eventChip = GameManager.map.getEventMapChip(position.x, position.y);
			if (eventChip) {
				// 存在した場合は処理を行う
				const event = EventManager.getEvent(eventChip.event);
				event.execute();
			}
		}
	}
}
