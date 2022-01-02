import { CommonConstruct, KeyCode } from "../Construct/CommonConstruct";
import DataManager from "../Manager/DataManager";
import EventManager, { EventCode } from "../Manager/EventManager";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import Sprite_Mask from "../Sprite/Sprite_Mask";
import Sprite_Portrait from "../Sprite/Sprite_Portrait";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Window_Menu from "../Window/Window_Menu";
import Scene_Base from "./Scene_Base";

/** プロセス名 */
export enum ProcessName {
	InputProcess = "InputProcess",
	BackgroundMask = "BackgroundMask",
}

/** 画像パスを取得する際の名前 */
export enum ResourceName {
	BackgroundImage = "BackgroundImage",
}

/** 解像度 */
const SIZE = CommonConstruct.size;

/**
 * 通常メニューのシーン
 */
export default class Scene_Menu extends Scene_Base {
	/**
	 * シーンを開始する
	 * @override
	 */
	public async startScene(): Promise<void> {
		const executed = await super.startScene();
		if (!executed) return;

		//TODO: 処理内容を他の物に合わせる

		// キー入力の処理を追加
		this.addProcess({
			name: "input",
			process: this.inputProcess(),
		});

		// 描画する背景画像を設定
		// MEMO: 画像ではなくマスクを掛ける
		const BackgroundImageRender = new Sprite_Mask();
		await BackgroundImageRender.init({
			x: 0,
			y: 0,
			width: SIZE.width,
			height: SIZE.height,
		});
		await BackgroundImageRender.setSprite();
		this.addProcess({
			name: "background",
			class: BackgroundImageRender,
			process: async () => {
				BackgroundImageRender.update();
			},
		});

		// TODO: テスト
		const MenuWindow = new Window_Menu();
		MenuWindow.init({
			x: 0,
			y: 0,
			width: CommonConstruct.size.width / 4,
			height: 30,
			fontSize: 25,
			list: [
				{
					menuId: "test1",
					text: "テスト1",
					x: 0,
					y: 0,
				},
				{
					menuId: "test2",
					text: "テスト2",
					x: 1,
					y: 0,
				},
				{
					menuId: "test3",
					text: "テスト3",
					x: 2,
					y: 0,
				},
				{
					menuId: "test4",
					text: "テスト4",
					x: 3,
					y: 0,
				},
				{
					menuId: "test5",
					text: "テスト5",
					x: 0,
					y: 1,
				},
				{
					menuId: "test6",
					text: "テスト6",
					x: 1,
					y: 1,
				},
				{
					menuId: "test7",
					text: "テスト7",
					x: 2,
					y: 1,
				},
				{
					menuId: "test8",
					text: "テスト8",
					x: 3,
					y: 1,
				},
			],
		});
		await MenuWindow.setSprite();
		this.addProcess({
			name: "menu",
			class: MenuWindow,
			process: async () => {
				MenuWindow.update();

				if (GameManager.input.isPushedKey(KeyCode.Up)) return MenuWindow.changeMenu(0, -1);
				if (GameManager.input.isPushedKey(KeyCode.Down)) return MenuWindow.changeMenu(0, 1);
				if (GameManager.input.isPushedKey(KeyCode.Right)) return MenuWindow.changeMenu(1, 0);
				if (GameManager.input.isPushedKey(KeyCode.Left)) return MenuWindow.changeMenu(-1, 0);
			},
		});

		// パーティ周りの描画を設定
		await Promise.all(
			GameManager.party.getMenberList().map(async (actor, index) => {
				// キャラ立ち絵
				const PortraitRender = new Sprite_Portrait();
				PortraitRender.init({
					x: 260 * index,
					y: 200,
					path: `character-portrait-${actor.characterId}`,
				});
				await PortraitRender.setSprite();
				PortraitRender.setZIndex(index);
				this.addProcess({
					// TODO: プロセス名
					name: `${Sprite_Portrait.name} - ${actor.characterId}`,
					class: PortraitRender,
					process: async () => {
						PortraitRender.update();
					},
				});

				// キャラ名
				const CharacterName = new Sprite_Text();
				CharacterName.init({
					text: `${actor.name}`,
					x: 20 * index + 250 * index,
					y: CommonConstruct.size.height - 210,
					width: 250,
					height: 30,
					fontSize: 25,
					isBackground: true,
					backgroundImagePath: "menu-background",
				});
				await CharacterName.setSprite();
				CharacterName.setZIndex(index + 1);
				this.addProcess({
					// TODO: プロセス名
					name: "名前",
					class: CharacterName,
					process: async () => {
						CharacterName.update();
					},
				});

				// キャラの体力
				const CharacterHp = new Sprite_Text();
				CharacterHp.init({
					text: `体力: ${actor.hp} / ${actor.maxHp}`,
					x: 20 * index + 250 * index,
					y: CommonConstruct.size.height - 160,
					width: 250,
					height: 30,
					fontSize: 25,
					isBackground: true,
					backgroundImagePath: "menu-background",
				});
				await CharacterHp.setSprite();
				CharacterHp.setZIndex(index + 1);
				this.addProcess({
					// TODO: プロセス名
					name: "hp",
					class: CharacterHp,
					process: async () => {
						CharacterHp.update();
					},
				});

				// キャラの霊力
				const CharacterMp = new Sprite_Text();
				CharacterMp.init({
					text: `霊力: ${actor.mp} / ${actor.maxMp}`,
					x: 20 * index + 250 * index,
					y: CommonConstruct.size.height - 110,
					width: 250,
					height: 30,
					fontSize: 25,
					isBackground: true,
					backgroundImagePath: "menu-background",
				});
				await CharacterMp.setSprite();
				CharacterMp.setZIndex(index + 1);
				this.addProcess({
					// TODO: プロセス名
					name: "mp",
					class: CharacterMp,
					process: async () => {
						CharacterMp.update();
					},
				});

				// キャラのレベル
				const CharacterLevel = new Sprite_Text();
				CharacterLevel.init({
					//TODO: 現在レベルの表示
					text: `Lv. ${actor.level}`,
					x: 20 * index + 250 * index,
					y: CommonConstruct.size.height - 60,
					width: 250,
					height: 30,
					fontSize: 25,
					isBackground: true,
					backgroundImagePath: "menu-background",
				});
				await CharacterLevel.setSprite();
				CharacterLevel.setZIndex(index + 1);
				this.addProcess({
					// TODO: プロセス名
					name: "level",
					class: CharacterLevel,
					process: async () => {
						CharacterLevel.update();
					},
				});
			})
		);
	}

	/**
	 * キー入力の処理を行う
	 * @returns
	 */
	private inputProcess(): () => Promise<void> {
		return async () => {
			// escキーの処理
			if (GameManager.input.isPushedKey(KeyCode.Escape)) {
				// メニューを閉じる
				const event = EventManager.getEvent(EventCode.CloseMenu);
				event.execute();
				return;
			}
		};
	}
}
