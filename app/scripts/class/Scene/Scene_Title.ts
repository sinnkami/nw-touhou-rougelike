import { IStoreCharacter } from "../../definitions/class/Store/IStoreCharacter";
import Actor from "../../modules/field/Actor";
import { CommonConstruct, KeyCode } from "../Construct/CommonConstruct";
import DataManager from "../Manager/DataManager";
import EventManager, { EventName } from "../Manager/EventManager";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import { Sprite_Background } from "../Sprite/Sprite_Background";
import Sprite_Logo from "../Sprite/Sprite_Logo";
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
 * タイトル画面のシーン
 */
export default class Scene_Title extends Scene_Base {
	/**
	 * シーンを開始する
	 * @override
	 */
	public async startScene(): Promise<void> {
		const executed = await super.startScene();
		if (!executed) return;

		StoreManager.init();

		await this.setProcessBackImage();
		await this.setProcessInputSelect();

		const TitleLogoRender = new Sprite_Logo();
		TitleLogoRender.init({
			path: "title-logo",
			x: 40,
			y: 100,
			width: 760,
			height: 200,
		});
		await TitleLogoRender.setSprite();
		this.addProcess({
			name: "title-logo",
			class: TitleLogoRender,
			process: async () => {
				TitleLogoRender.update();
			},
		});
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
	 * 決定キーに関するプロセスを設定
	 * TODO: そのうちタイトルに関する処理に代わると思う
	 * TODO: 初めから・続きから・終了が必要そう
	 * @returns
	 */
	private async setProcessInputSelect(): Promise<void> {
		this.addProcess({
			name: ProcessName.InputSelect,
			process: async () => {
				if (GameManager.input.isPushedKey(KeyCode.Select)) {
					// TODO: 強制初めから処理
					await this.executeInitStart();

					// ロビー画面表示イベントを取得
					const event = EventManager.getEvent(EventName.SceneToLobby);
					event.execute();
				}
			},
		});
	}

	/**
	 * 初めから処理
	 * TODO: メソッドの箇所
	 */
	private async executeInitStart(): Promise<void> {
		return;
	}
}
