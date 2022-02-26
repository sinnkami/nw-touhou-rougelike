import { CommonConstruct, KeyCode } from "../Construct/CommonConstruct";
import EventChipName from "../Construct/EventChipName";
import EventManager, { EventName } from "../Manager/EventManager";
import GameManager from "../Manager/GameManager";
import Sprite_Character from "../Sprite/Sprite_Character";
import Sprite_Map from "../Sprite/Sprite_Map";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Scene_Base from "./Scene_Base";

/** プロセス名 */
export enum ProcessName {
	MapRender = "MapRender",
	PlayerRender = "PlayerRender",
	StairsText = "StairsText",
	TestProcess = "TestProcess",
	Select = "Select",
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
	/**
	 * シーンを開始する
	 * @override
	 */
	public async startScene(): Promise<void> {
		const executed = await super.startScene();
		if (!executed) return;

		await this.setProcessMap();
		await this.setProcessPlayer();
		await this.setProcessStairs();

		// TODO: テスト用コード
		this.addProcess({
			name: "テスト",
			process: async () => {
				// スペースキーの処理
				if (GameManager.input.isPushedKey(KeyCode.Space)) {
					const event = EventManager.getEvent(EventName.OpenDungeonMenu);
					event.execute();
				}
			},
		});

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
	 * マップ関連のプロセスを設定
	 * @param mapRender
	 * @returns
	 */
	private async setProcessMap(): Promise<void> {
		// 描画するマップを設定
		// MEMO: 現在地と中心点の差分を見て調節を行う
		// TODO: この意味わからん数値を良い感じにわかりやすくしたい
		const MapRender = new Sprite_Map();
		await MapRender.init({
			path: "mapChip",
			x: SIZE.width / 32 / 2 - GameManager.player.getPosition().x - 1,
			y: SIZE.height / 32 / 2 - GameManager.player.getPosition().y,
		});
		await MapRender.setSprite();

		this.addProcess({
			name: ProcessName.MapRender,
			class: MapRender,
			process: async () => {
				MapRender.update();

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

				// 一マスも動く気が無かったら何もしない
				if (x === 0 && y === 0) return;

				// エンカウント判定
				if (GameManager.dungeon.checkEncount()) {
					// 戦闘開始
					const event = EventManager.getEvent(EventName.SceneToBattle);
					const enemyPartyId = GameManager.dungeon.getRandomEnemyPartyId();
					console.info(`エンカウント(partyId: ${enemyPartyId})`);
					await event.execute(enemyPartyId);
					return;
				}

				// 実際に移動できるか
				const flag = GameManager.player.canMove(x, y);
				if (flag) {
					// 移動量に合わせてキャラを移動
					GameManager.player.move(x, y);
					MapRender.move(x, y);
				}
			},
		});
	}

	/**
	 * 操作プレイヤーに関するプロセスを設定
	 */
	private async setProcessPlayer(): Promise<void> {
		// 描画する操作キャラを設定
		// MEMO: キャラを画面中心に表示する
		const PlayerRender = new Sprite_Character();
		await PlayerRender.init({
			path: "charaChip",
			x: (SIZE.width / 32 / 2 - 1) * 32,
			y: (SIZE.height / 32 / 2) * 32,
		});
		await PlayerRender.setSprite();
		this.addProcess({
			name: ProcessName.PlayerRender,
			class: PlayerRender,
			process: async () => {
				PlayerRender.update();
			},
		});
	}

	/**
	 * 階段関連のプロセスを設定
	 * @returns
	 */
	private async setProcessStairs(): Promise<void> {
		const StairsText = new Sprite_Text();

		// ダンジョン情報を取得
		const dungeonInfo = GameManager.dungeon.getCurrentDungeon();

		await StairsText.init({
			text: `${dungeonInfo.name}: ${GameManager.dungeon.getCurrentHierarchy()}F`,
			x: 10,
			y: 10,
			width: 300,
			height: 30,
			fontSize: 25,
		});
		await StairsText.setSprite();

		this.addProcess({
			name: ProcessName.StairsText,
			class: StairsText,
			process: async () => {
				StairsText.update();

				// 決定キーの処理
				if (GameManager.input.isPushedKey(KeyCode.Select)) {
					// 現在地にあるイベントタイルを取得
					const position = GameManager.player.getPosition();
					const eventChip = GameManager.map.getEventMapChip(position.x, position.y);
					if (eventChip && eventChip.name === EventChipName.Stairs) {
						// 階段の場合は処理を行う

						// ボス階層かどうか
						if (GameManager.dungeon.isBeforeBossHierarchy) {
							// ボス部屋イベント呼び出し
							const event = EventManager.getEvent(EventName.BossRoom);
							await event.execute();
						} else {
							// 通常階層
							const event = EventManager.getEvent(eventChip.event);
							await event.execute();
						}
					}
				}
			},
		});
	}
}
