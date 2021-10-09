import { IStoreCharacter } from "../../definitions/class/Store/IStoreCharacter";
import { CommonConstruct, KeyCode } from "../Construct/CommonConstruct";
import DataManager from "../Manager/DataManager";
import EventManager, { EventCode } from "../Manager/EventManager";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
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
	 * TODO: 初めから・続きから・終了が必要そう
	 * @returns
	 */
	private async setProcessInputSelect(): Promise<void> {
		this.addProcess({
			name: ProcessName.InputSelect,
			process: async (time: number) => {
				if (GameManager.input.isPushedKey(KeyCode.Select)) {
					// TODO: 強制初めから処理
					await this.executeInitStart();
					const key = GameManager.input.getKey(KeyCode.Select);

					// ロビー画面表示イベントを取得
					const event = EventManager.getEvent(EventCode.Lobby);
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
		// TODO: 現在はテスト用の値まみれ
		// とりあえずキャラ追加
		const reimu = DataManager.character.get("0001") as IStoreCharacter;
		const sakuya = DataManager.character.get("0009") as IStoreCharacter;
		const youmu = DataManager.character.get("0017") as IStoreCharacter;
		StoreManager.character.add(reimu, sakuya, youmu);

		console.log(reimu, sakuya, youmu);

		// パーティーを勝手に設定
		StoreManager.party.add(
			{
				characterId: reimu.characterId,
				order: 3,
			},
			{
				characterId: sakuya.characterId,
				order: 2,
			},
			{
				characterId: youmu.characterId,
				order: 1,
			}
		);
	}
}
