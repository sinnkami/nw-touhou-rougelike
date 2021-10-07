import { CommonConstruct, KeyCode } from "../Construct/CommonConstruct";
import EventManager, { EventCode } from "../manager/EventManager";
import GameManager from "../manager/GameManager";
import { Sprite_Background } from "../Sprite/Sprite_Background";
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

		await this.setProcessBackImage();
		await this.setProcessInputSelect();
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
	 * 決定キーに関するプロセスを設定
	 * TODO: そのうちタイトルに関する処理に代わると思う
	 * @returns
	 */
	private async setProcessInputSelect(): Promise<void> {
		this.addProcess({
			name: ProcessName.InputSelect,
			process: async (time: number) => {
				if (GameManager.input.isPushedKey(KeyCode.Select)) {
					const key = GameManager.input.getKey(KeyCode.Select);

					// ロビー画面表示イベントを取得
					const event = EventManager.getEvent(EventCode.Lobby);
					event.execute();
				}
			},
		});
	}
}
