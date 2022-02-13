import { ISelectionInfo } from "../../definitions/class/Window/IWindowSelection";
import { CommonConstruct, KeyCode } from "../Construct/CommonConstruct";
import { LobbyMenuId } from "../Construct/MenuConstruct";
import EventManager, { EventCode } from "../Manager/EventManager";
import GameManager from "../Manager/GameManager";
import { Sprite_Background } from "../Sprite/Sprite_Background";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Window_Selection from "../Window/Window_Selection";
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
			path: "title-background",
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
			backgroundImagePath: "message-background",
		});
		await LobbyText.setSprite();

		this.addProcess({
			name: ProcessName.LobbyText,
			class: LobbyText,
			process: async () => {
				LobbyText.update();
			},
		});
	}

	/**
	 * ロビーメニュー関連のプロセスを設定
	 * @returns
	 */
	private async setProcessLobbyMenu(): Promise<void> {
		const LobbyMenuSelection = new Window_Selection();
		LobbyMenuSelection.init({
			x: 10,
			y: 40,
			width: 300,
			height: 30,
			fontSize: 25,
			list: [
				{
					selectionId: LobbyMenuId.Dungeon,
					index: 0,
					text: "ダンジョン選択",
				},
				{
					selectionId: LobbyMenuId.CreateCharacter,
					index: 1,
					text: "キャラクター呼び出し",
				},
				{
					selectionId: LobbyMenuId.SelectParty,
					index: 2,
					text: "パーティ編成",
				},
				{
					selectionId: LobbyMenuId.ReturnTitle,
					index: 3,
					text: "タイトルへ戻る",
				},
			],
		});
		await LobbyMenuSelection.setSprite();

		this.addProcess({
			name: ProcessName.LobbyMenuSelection,
			class: LobbyMenuSelection,
			process: async () => {
				if (GameManager.input.isPushedKey(KeyCode.Up)) {
					LobbyMenuSelection.changeMenu(-1);
				}
				if (GameManager.input.isPushedKey(KeyCode.Down)) {
					LobbyMenuSelection.changeMenu(1);
				}

				// 決定キーの処理
				if (GameManager.input.isPushedKey(KeyCode.Select)) {
					this.excuteSelectMenu(LobbyMenuSelection.getCurrentSelection());
					return;
				}
			},
		});
	}

	private async excuteSelectMenu(info: ISelectionInfo): Promise<void> {
		switch (info.selectionId) {
			// タイトルへ戻る
			case LobbyMenuId.ReturnTitle: {
				const event = EventManager.getEvent(EventCode.Title);
				await event.execute();
				return;
			}

			// ダンジョン選択
			case LobbyMenuId.Dungeon: {
				const event = EventManager.getEvent(EventCode.SelectDungeon);
				await event.execute();
				return;
			}

			// パーティ編集画面
			case LobbyMenuId.SelectParty: {
				const event = EventManager.getEvent(EventCode.OpenPartyPlanningPlace);
				await event.execute();
				return;
			}

			// キャラクター呼び出し画面
			case LobbyMenuId.CreateCharacter: {
				const event = EventManager.getEvent(EventCode.OpenCreateCharacter);
				await event.execute();
				return;
			}
		}
	}
}
