import { CommonConstruct, KeyCode } from "../Construct/CommonConstruct";
import DataManager from "../Manager/DataManager";
import EventManager, { EventName } from "../Manager/EventManager";
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
export default class Scene_PartyPlanningPlace extends Scene_Base {
	private sceneType: SceneType = SceneType.Party;

	private seletedPartyMenber?: ICharacterMenuInfo;

	/**
	 * 初期化処理
	 * @override
	 */
	public init(): void {
		super.init();
		this.sceneType = SceneType.Party;
		this.seletedPartyMenber = undefined;
	}

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

		const PartyBackgroundImageRender = new Sprite_Frame();
		await PartyBackgroundImageRender.init({
			x: 0,
			y: 0,
			width: SIZE.width,
			height: 180,
			path: `menu-background`,
		});
		await PartyBackgroundImageRender.setSprite();
		this.addProcess({
			name: "PartyBackgroundImageRender",
			class: PartyBackgroundImageRender,
			process: async () => {
				PartyBackgroundImageRender.update();
			},
		});

		await this.processPartyCharacterSelection();

		await this.processStoreCharacterSelection();
	}

	private async processPartyCharacterSelection(): Promise<void> {
		const PartyText = new Sprite_Text();
		await PartyText.init({
			x: 10,
			y: 184,
			width: SIZE.width / 2 - 20,
			height: 30,
			fontSize: 36,
			text: "パーティ",
			isBackground: true,
			backgroundImagePath: "menu-background",
		});
		await PartyText.setSprite();
		this.addProcess({
			name: "PartyText",
			class: PartyText,
			process: async () => {
				// PartyText.update();
			},
		});

		const PartyCharacterSelection = new Window_SelectionCharacter();
		await PartyCharacterSelection.init({
			x: 10,
			y: 255,
			width: SIZE.width / 2 - 20,
			height: 200,
			list: GameManager.party.getMenberList().map((actor, index) => {
				return {
					index,
					menuId: index.toString(),
					character: actor,
				};
			}),
			fontSize: 20,
		});
		await PartyCharacterSelection.setSprite();
		this.addProcess({
			name: "PartyCharacterSelection",
			class: PartyCharacterSelection,
			process: async () => {
				PartyCharacterSelection.update();
				if (this.sceneType !== SceneType.Party) {
					return;
				}

				if (GameManager.input.isPushedKey(KeyCode.Up)) {
					PartyCharacterSelection.changeMenu(-1);
				}
				if (GameManager.input.isPushedKey(KeyCode.Down)) {
					PartyCharacterSelection.changeMenu(1);
				}

				// 決定キーの処理
				if (GameManager.input.isPushedKey(KeyCode.Select)) {
					this.seletedPartyMenber = PartyCharacterSelection.getCurrentMenu();

					this.sceneType = SceneType.PartyPlanningPlace;
					return;
				}

				// escキーの処理
				if (GameManager.input.isPushedKey(KeyCode.Escape)) {
					// メニューを閉じる
					const event = EventManager.getEvent(EventName.CloseScene);
					event.execute();
					return;
				}
			},
		});
	}

	/**
	 * 預り所のキャラ表示
	 */
	private async processStoreCharacterSelection(): Promise<void> {
		const StoreText = new Sprite_Text();
		await StoreText.init({
			x: SIZE.width / 2 + 10,
			y: 184,
			width: SIZE.width / 2 - 20,
			height: 30,
			fontSize: 36,
			text: "預り所",
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
		const StoreCharacterSelection = new Window_SelectionCharacter();
		await StoreCharacterSelection.init({
			x: SIZE.width / 2 + 10,
			y: 255,
			width: SIZE.width / 2 - 20,
			height: SIZE.height - 260,
			list: GameManager.partyPlanningPlace.getCharacterList().map((actor, index) => {
				return {
					index,
					menuId: index.toString(),
					character: actor,
					isMask: GameManager.party.hasMenberByStoreId(actor.storeId),
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

				if (this.sceneType !== SceneType.PartyPlanningPlace) {
					return;
				}

				if (GameManager.input.isPushedKey(KeyCode.Up)) {
					StoreCharacterSelection.changeMenu(-1);
				}
				if (GameManager.input.isPushedKey(KeyCode.Down)) {
					StoreCharacterSelection.changeMenu(1);
				}

				// 決定キーの処理
				if (GameManager.input.isPushedKey(KeyCode.Select)) {
					if (this.seletedPartyMenber) {
						const partyMenber = this.seletedPartyMenber;
						GameManager.party.removeMenberByStoreId(partyMenber.character.storeId);

						const addMenber = StoreCharacterSelection.getCurrentMenu();
						GameManager.party.addMenberByStoreId(addMenber.character.storeId);

						await this.reloadScene();
					}
					return;
				}

				// escキーの処理
				if (GameManager.input.isPushedKey(KeyCode.Escape)) {
					this.seletedPartyMenber = undefined;
					this.sceneType = SceneType.Party;
					return;
				}
			},
		});
	}
}
