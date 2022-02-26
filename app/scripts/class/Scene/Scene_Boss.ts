import { IStoreCharacter } from "../../definitions/class/Store/IStoreCharacter";
import Actor from "../../modules/field/Actor";
import { CommonConstruct, KeyCode } from "../Construct/CommonConstruct";
import DataManager from "../Manager/DataManager";
import EventManager, { EventName } from "../Manager/EventManager";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import { Sprite_Background } from "../Sprite/Sprite_Background";
import Sprite_Frame from "../Sprite/Sprite_Frame";
import { Sprite_Message } from "../Sprite/Sprite_Message";
import Scene_Base from "./Scene_Base";

/** プロセス名 */
export enum ProcessName {
	InputSelect = "InputSelect",
	BackgroundImage = "BackgroundImage",
}

/** 画像パスを取得する際の名前 */
export enum ResourceName {
	BackgroundImage = "BackgroundImage",
}

/** 解像度 */
const SIZE = CommonConstruct.size;

/**
 * ボス戦前に行う会話画面のシーン
 */
export default class Scene_Boss extends Scene_Base {
	private textIndex: number = 0;

	private isBattle: boolean = false;

	/**
	 * シーンを開始する
	 * @override
	 */
	public async startScene(): Promise<void> {
		const executed = await super.startScene();
		if (!executed) return;

		await this.setProcessBackImage();
		await this.setProcessMessageWindow();
		await this.setProcessInputSelect();
	}

	/**
	 * 背景画像に関するプロセスの設定
	 */
	private async setProcessBackImage(): Promise<void> {
		// 描画する背景画像を設定
		const BackgroundImageRender = new Sprite_Background();
		BackgroundImageRender.init({
			path: "boss-background",
			x: 0,
			y: 0,
			width: SIZE.width,
			height: SIZE.height,
		});
		await BackgroundImageRender.setSprite();

		this.addProcess({
			name: ProcessName.BackgroundImage,
			class: BackgroundImageRender,
			process: async () => {
				BackgroundImageRender.update();
			},
		});
	}
	private async setProcessMessageWindow(): Promise<void> {
		const MessageFrameRender = new Sprite_Message();
		const bossMessagesInfo = GameManager.boss.getBossMessages();
		MessageFrameRender.init({
			x: 0,
			y: 410,
			width: SIZE.width,
			height: 220,
			text: bossMessagesInfo.messages[this.textIndex].message,
			fontSize: 24,
			// path: "menu-background",
		});

		MessageFrameRender.setZIndex(10);
		await MessageFrameRender.setSprite();

		this.addProcess({
			// TODO: プロセス名
			name: `messages-window`,
			class: MessageFrameRender,
			process: async () => {
				MessageFrameRender.update();
			},
		});
	}

	/**
	 * 決定キーに関するプロセスを設定
	 * @returns
	 */
	private async setProcessInputSelect(): Promise<void> {
		this.addProcess({
			name: ProcessName.InputSelect,
			process: async () => {
				if (GameManager.input.isPushedKey(KeyCode.Select) && !this.isBattle) {
					const bossMessagesInfo = GameManager.boss.getBossMessages();
					if (bossMessagesInfo.messages.length - 1 !== this.textIndex) {
						console.info("テキスト送り");
						this.textIndex++;
						this.getProcessClass(`messages-window`).destroy();
						this.setProcessMessageWindow();
					} else {
						// TODO: ボスバトル呼び出し
						const event = EventManager.getEvent(EventName.SceneToBattle);
						event.execute(bossMessagesInfo.enemyPartyId);
						this.isBattle = true;
					}
					return;
				}

				if (this.isBattle) {
					// TODO: 戦闘終了後処理
					const event = EventManager.getEvent(EventName.SceneToLobby);
					event.execute();
				}
			},
		});
	}
}
