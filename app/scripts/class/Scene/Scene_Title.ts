import { IGameMapData } from "../../definitions/class/Game/IGameMap";
import { IProcessInfo, IResourceInfo } from "../../definitions/class/Scene/ISceneTitle";
import { CommonConstruct, EventName, KeyCode } from "../Construct/CommonConstruct";
import { EventCode, EventManager } from "../EventManager";
import GameManager from "../GameManager";
import ResourceManager from "../ResourceManager";
import SceneManager from "../SceneManager";
import { Sprite_Background } from "../Sprite/Sprite_Background";
import Sprite_Character from "../Sprite/Sprite_Character";
import Sprite_Map from "../Sprite/Sprite_Map";
import { Sprite_Message } from "../Sprite/Sprite_Message";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Scene_Base from "./Scene_Base";

/** プロセス名 */
export enum ProcessName {
	InputProcess = "InputProcess",
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
	// TODO: この2種Baseに移動したいけど、取得が・・・・
	// プロセス情報
	public readonly processInfo: IProcessInfo = {
		[ProcessName.BackgroundImage]: {
			process: () => Promise.resolve(),
			class: new Sprite_Background(),
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
		await super.startScene();

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

		SceneManager.completeLoading();
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
		// 決定キーの処理
		if (GameManager.input.isPushedKey(KeyCode.Select)) {
			const key = GameManager.input.getKey(KeyCode.Select);

			// ダンジョン突入イベントを取得
			const event = EventManager.getEvent(EventCode.InvasionDungeon);
			event.execute();
		}
	}
}
