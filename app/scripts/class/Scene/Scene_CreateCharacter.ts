import { CommonConstruct, KeyCode } from "../Construct/CommonConstruct";
import DataManager from "../Manager/DataManager";
import EventManager, { EventCode } from "../Manager/EventManager";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import Sprite_Mask from "../Sprite/Sprite_Mask";
import Sprite_Portrait from "../Sprite/Sprite_Portrait";
import Sprite_Frame from "../Sprite/Sprite_Frame";
import Window_Menu from "../Window/Window_Menu";
import Window_SelectionCharacter from "../Window/Window_SelectionCharacter";
import Scene_Base from "./Scene_Base";
import Actor from "../../modules/field/Actor";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import { ICharacterMenuInfo } from "../../definitions/class/Window/IWindowPartyPlanningPlace";
import sleep from "../../modules/utils/sleep";
import Window_SelectionCreateCharacter from "../Window/Window_SelectionCreateCharacter";

/** プロセス名 */
export enum ProcessName {
	InputProcess = "InputProcess",
	BackgroundMask = "BackgroundMask",
}

/** 画像パスを取得する際の名前 */
export enum ResourceName {
	BackgroundImage = "BackgroundImage",
}

enum SceneType {
	Party = "party",
	PartyPlanningPlace = "PartyPlanningPlace",
}

/** 解像度 */
const SIZE = CommonConstruct.size;

/**
 * パーティ編集画面のシーン
 */
export default class Scene_CreateCharacter extends Scene_Base {
	/**
	 * シーンを開始する
	 * @override
	 */
	public async startScene(): Promise<void> {
		const executed = await super.startScene();
		if (!executed) return;

		//TODO: 処理内容を他の物に合わせる

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

		await this.processStoreCharacterSelection();
	}

	/**
	 * 預り所のキャラ表示
	 */
	private async processStoreCharacterSelection(): Promise<void> {
		const StoreText = new Sprite_Text();
		await StoreText.init({
			x: 10,
			y: 10,
			width: SIZE.width * 0.6,
			height: 30,
			fontSize: 36,
			text: "キャラクター呼び出し",
			isBackground: true,
			backgroundImagePath: "menu-background",
		});
		await StoreText.setSprite();
		this.addProcess({
			name: "StoreText",
			class: StoreText,
			process: async () => {
				// StoreText.update();
			},
		});
		const StoreCharacterSelection = new Window_SelectionCreateCharacter();
		await StoreCharacterSelection.init({
			x: 10,
			y: 85,
			width: SIZE.width * 0.6,
			height: SIZE.height - 95,
			list: GameManager.character.getCharacterList().map((character, index) => {
				return {
					index,
					menuId: index.toString(),
					character,
					// TODO: 必要素材判定
					isMask: !GameManager.material.canMakeCharacter(character.characterId),
				};
			}),
			fontSize: 20,
		});
		await StoreCharacterSelection.setSprite();
		this.addProcess({
			name: "StoreCharacterSelection",
			class: StoreCharacterSelection,
			process: async () => {
				StoreCharacterSelection.update();

				if (GameManager.input.isPushedKey(KeyCode.Up)) {
					StoreCharacterSelection.changeMenu(-1);
				}
				if (GameManager.input.isPushedKey(KeyCode.Down)) {
					StoreCharacterSelection.changeMenu(1);
				}

				if (GameManager.input.isPushedKey(KeyCode.Select)) {
					const addCharacter = StoreCharacterSelection.getCurrentMenu();
					if (GameManager.material.canMakeCharacter(addCharacter.character.characterId)) {
						GameManager.partyPlanningPlace.addNewCharacter(addCharacter.character.characterId);
						console.info(`${addCharacter.character.fullName}(${addCharacter.character.characterId}) 追加`);

						await this.reloadScene();
					}
					return;
				}

				// escキーの処理
				if (GameManager.input.isPushedKey(KeyCode.Escape)) {
					// メニューを閉じる
					const event = EventManager.getEvent(EventCode.CloseCreateCharacter);
					event.execute();
					return;
				}
			},
		});
	}
}
