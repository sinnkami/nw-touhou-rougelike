import { CommonConstruct, KeyCode } from "../Construct/CommonConstruct";
import GameManager from "../manager/GameManager";
import { Sprite_Background } from "../Sprite/Sprite_Background";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Window_LobbyMenuSelection from "../window/Window_LobbyMenuSelection";
import Scene_Base from "./Scene_Base";

/** プロセス名 */
export enum ProcessName {
	InputProcess = "InputProcess",
	BackgroundImage = "BackgroundImage",
	LobbyText = "LobbyText",
	LobbyMenuSelection = "LobbyMenuSelection",
}

/** 画像パスを取得する際の名前 */
export enum ResourceName {
	BackgroundImage = "BackgroundImage",
	MessageBackgroundImage = "MessageBackgroundImage",
}

/** 解像度 */
const SIZE = CommonConstruct.size;

/**
 * タイトル画面のシーン
 */
export default class Scene_Lobby extends Scene_Base {
	/**
	 * シーンを開始する
	 * @override
	 */
	public async startScene(): Promise<void> {
		const executed = await super.startScene();
		if (!executed) return;

		await this.setProcessBackImage();
		await this.setProcessLobbyText();
		await this.setProcessLobbyMenu();
	}

	/**
	 * 背景画像に関するプロセスの設定
	 */
	private async setProcessBackImage(): Promise<void> {
		// 描画する背景画像を設定
		const BackgroundImageRender = new Sprite_Background();
		BackgroundImageRender.init({
			path: this.getResourcePath(ResourceName.BackgroundImage),
			x: 0,
			y: 0,
			width: SIZE.width,
			height: SIZE.height,
		});
		await BackgroundImageRender.setSprite();

		this.addProcess({
			name: ProcessName.BackgroundImage,
			class: BackgroundImageRender,
			process: async (time: number) => {
				BackgroundImageRender.update();
			},
		});
	}

	/**
	 * 左上のテキストに関するプロセスを設定
	 */
	private async setProcessLobbyText(): Promise<void> {
		const LobbyText = new Sprite_Text();
		LobbyText.init({
			text: "ロビー画面",
			x: 10,
			y: 10,
			width: 300,
			height: 30,
			fontSize: 25,
			isBackground: true,
			backgroundImagePath: this.getResourcePath(ResourceName.MessageBackgroundImage),
		});
		await LobbyText.setSprite();

		this.addProcess({
			name: ProcessName.LobbyText,
			class: LobbyText,
			process: async (time: number) => {
				LobbyText.update();
			},
		});
	}

	/**
	 * ロビーメニュー関連のプロセスを設定
	 * @returns
	 */
	private async setProcessLobbyMenu(): Promise<void> {
		const LobbyMenuSelection = new Window_LobbyMenuSelection();
		LobbyMenuSelection.init({
			backgroundImagePath: this.getResourcePath(ResourceName.MessageBackgroundImage),
		});
		await LobbyMenuSelection.setSprite();

		this.addProcess({
			name: ProcessName.LobbyMenuSelection,
			class: LobbyMenuSelection,
			process: async (time: number) => {
				if (GameManager.input.isPushedKey(KeyCode.Up)) {
					LobbyMenuSelection.backMenu();
				}
				if (GameManager.input.isPushedKey(KeyCode.Down)) {
					LobbyMenuSelection.nextMenu();
				}

				// 決定キーの処理
				if (GameManager.input.isPushedKey(KeyCode.Select)) {
					LobbyMenuSelection.excuteSelectMenu();
				}
			},
		});
	}
}
