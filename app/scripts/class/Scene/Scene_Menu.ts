import { CommonConstruct, KeyCode } from "../Construct/CommonConstruct";
import DataManager from "../Manager/DataManager";
import EventManager, { EventCode } from "../Manager/EventManager";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import { Sprite_Background } from "../Sprite/Sprite_Background";
import Sprite_Mask from "../Sprite/Sprite_Mask";
import Sprite_Portrait from "../Sprite/Sprite_Portrait";
import { Sprite_Text } from "../Sprite/Sprite_Text";
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
			process: async (time: number) => {
				BackgroundImageRender.update();
			},
		});

		// パーティ周りの描画を設定
		for (const partyInfo of GameManager.party.getMenberList()) {
			const characterData = DataManager.character.get(partyInfo.characterId);
			if (!characterData) throw new Error("データベース内に存在しないキャラがパーティに存在します");

			const characterInfo = StoreManager.character.get(partyInfo.characterId);
			if (!characterInfo) throw new Error("所持していないキャラがパーティに存在します");

			// キャラ立ち絵
			const PortraitRender = new Sprite_Portrait();
			PortraitRender.init({
				x: 260 * (partyInfo.order - 1),
				y: 200,
				path: characterData.portraitPath,
			});
			await PortraitRender.setSprite();
			PortraitRender.setZIndex(partyInfo.order);
			this.addProcess({
				// TODO: プロセス名
				name: `${Sprite_Portrait.name} - ${characterData.characterId}`,
				class: PortraitRender,
				process: async (time: number) => {
					PortraitRender.update();
				},
			});

			// キャラ名
			const CharacterName = new Sprite_Text();
			CharacterName.init({
				text: `${characterData.familyName} ${characterData.firstName}`,
				x: 20 * partyInfo.order + 250 * (partyInfo.order - 1),
				y: CommonConstruct.size.height - 210,
				width: 250,
				height: 30,
				fontSize: 25,
				isBackground: true,
				backgroundImagePath: "assets/images/window/menu/red.png",
			});
			await CharacterName.setSprite();
			CharacterName.setZIndex(partyInfo.order + 1);
			this.addProcess({
				// TODO: プロセス名
				name: "名前",
				class: CharacterName,
				process: async (time: number) => {
					CharacterName.update();
				},
			});

			// キャラの体力
			const CharacterHp = new Sprite_Text();
			CharacterHp.init({
				text: `体力: ${characterInfo.hp} / ${characterData.hp}`,
				x: 20 * partyInfo.order + 250 * (partyInfo.order - 1),
				y: CommonConstruct.size.height - 160,
				width: 250,
				height: 30,
				fontSize: 25,
				isBackground: true,
				backgroundImagePath: "assets/images/window/menu/red.png",
			});
			await CharacterHp.setSprite();
			CharacterHp.setZIndex(partyInfo.order + 1);
			this.addProcess({
				// TODO: プロセス名
				name: "hp",
				class: CharacterHp,
				process: async (time: number) => {
					CharacterHp.update();
				},
			});

			// キャラの霊力
			const CharacterMp = new Sprite_Text();
			CharacterMp.init({
				text: `霊力: ${characterInfo.mp} / ${characterData.mp}`,
				x: 20 * partyInfo.order + 250 * (partyInfo.order - 1),
				y: CommonConstruct.size.height - 110,
				width: 250,
				height: 30,
				fontSize: 25,
				isBackground: true,
				backgroundImagePath: "assets/images/window/menu/red.png",
			});
			await CharacterMp.setSprite();
			CharacterMp.setZIndex(partyInfo.order + 1);
			this.addProcess({
				// TODO: プロセス名
				name: "mp",
				class: CharacterMp,
				process: async (time: number) => {
					CharacterMp.update();
				},
			});

			// キャラのレベル
			const CharacterLevel = new Sprite_Text();
			CharacterLevel.init({
				//TODO: 現在レベルの表示
				text: `Lv. null`,
				x: 20 * partyInfo.order + 250 * (partyInfo.order - 1),
				y: CommonConstruct.size.height - 60,
				width: 250,
				height: 30,
				fontSize: 25,
				isBackground: true,
				backgroundImagePath: "assets/images/window/menu/red.png",
			});
			await CharacterLevel.setSprite();
			CharacterLevel.setZIndex(partyInfo.order + 1);
			this.addProcess({
				// TODO: プロセス名
				name: "level",
				class: CharacterLevel,
				process: async (time: number) => {
					CharacterLevel.update();
				},
			});
		}
	}

	/**
	 * キー入力の処理を行う
	 * @returns
	 */
	private inputProcess(): (time: number) => Promise<void> {
		return async (time: number) => {
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
