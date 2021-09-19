import { IProcessInfo, IResourceInfo } from "../../definitions/class/Scene/ISceneLobby";
import { CommonConstruct, KeyCode } from "../Construct/CommonConstruct";
import { EventCode, EventManager } from "../manager/EventManager";
import GameManager from "../manager/GameManager";
import { Sprite_Background } from "../Sprite/Sprite_Background";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Scene_Base from "./Scene_Base";

/** プロセス名 */
export enum ProcessName {
	InputProcess = "InputProcess",
	BackgroundImage = "BackgroundImage",
	LobbyText = "LobbyText",
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
export default class Scene_Lobby extends Scene_Base {
	// TODO: この2種Baseに移動したいけど、取得が・・・・
	// プロセス情報
	public readonly processInfo: IProcessInfo = {
		[ProcessName.BackgroundImage]: {
			process: () => Promise.resolve(),
			class: new Sprite_Background(),
		},
		[ProcessName.LobbyText]: {
			process: () => Promise.resolve(),
			class: new Sprite_Text(),
		},
		[ProcessName.InputProcess]: {
			class: undefined,
			process: async (time: number) => this.inputProcess(),
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
	 * @override
	 */
	public async startScene(): Promise<void> {
		const executed = await super.startScene();
		if (!executed) return;

		// 描画する背景画像を設定
		const BackgroundImageRender = this.processInfo[ProcessName.BackgroundImage].class;
		await BackgroundImageRender.init({
			path: this.resourceInfo[ResourceName.BackgroundImage],
			x: 0,
			y: 0,
			width: SIZE.width,
			height: SIZE.height,
		});
		await BackgroundImageRender.setSprite();

		const LobbyText = this.processInfo[ProcessName.LobbyText].class;
		await LobbyText.init({
			text: "ロビー画面",
			x: 10,
			y: 10,
			width: 300,
			height: 30,
			fontSize: 25,
		});
		await LobbyText.setSprite();
	}

	/**
	 * シーンを更新する
	 * @override
	 * @returns
	 */
	public async updateScene(): Promise<void> {
		const executed = await super.updateScene();
		if (!executed) return;

		this.processList.forEach(process => process(GameManager.loop.frameCount));
	}

	/**
	 * シーンを停止する
	 * @override
	 * @returns
	 */
	public async stopScene(): Promise<void> {
		const executed = await super.stopScene();
		if (!executed) return;

		const BackgroundImageRender = this.processInfo[ProcessName.BackgroundImage].class;
		BackgroundImageRender.destroy();
	}

	/**
	 * キー入力の処理を行う
	 * @returns
	 */
	private async inputProcess(): Promise<void> {
		// 決定キーの処理
		if (GameManager.input.isPushedKey(KeyCode.Select)) {
			const key = GameManager.input.getKey(KeyCode.Select);

			// ダンジョン突入イベントを取得
			const event = EventManager.getEvent(EventCode.InvasionDungeon);
			event.execute();
		}
	}
}
