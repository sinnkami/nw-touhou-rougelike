import { BattleCommandList, EnemyPosition } from "../Construct/BattleConstruct";
import { CommonConstruct, KeyCode } from "../Construct/CommonConstruct";
import DataManager from "../Manager/DataManager";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import { Sprite_Background } from "../Sprite/Sprite_Background";
import Sprite_Character from "../Sprite/Sprite_Character";
import Sprite_Enemy from "../Sprite/Sprite_Enemy";
import Sprite_Frame from "../Sprite/Sprite_Frame";
import Sprite_Portrait from "../Sprite/Sprite_Portrait";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Window_Menu from "../Window/Window_Menu";
import Scene_Base from "./Scene_Base";

/** 解像度 */
const SIZE = CommonConstruct.size;

export default class Scene_Battle extends Scene_Base {
	/**
	 * シーンを開始する
	 * @override
	 */
	public async startScene(): Promise<void> {
		const executed = await super.startScene();
		if (!executed) return;

		await this.setProcessBackImage();
		await this.setBattleCommandMenu();
		await this.setProcessEnemy();
		await this.setCharacterStatus();
		await this.setProcessMessageWindow();
	}

	/**
	 * 背景画像に関するプロセスの設定
	 */
	private async setProcessBackImage(): Promise<void> {
		// 描画する背景画像を設定
		const BackgroundImageRender = new Sprite_Background();
		BackgroundImageRender.init({
			path: "battle-background",
			x: 0,
			y: 0,
			width: SIZE.width,
			height: SIZE.height,
		});
		await BackgroundImageRender.setSprite();

		this.addProcess({
			name: "battle-background",
			class: BackgroundImageRender,
			process: async () => {
				BackgroundImageRender.update();
			},
		});
	}
	/**
	 * バトルコマンドを選択するメニューの設定
	 */
	private async setBattleCommandMenu(): Promise<void> {
		const BattleMenuRender = new Window_Menu();
		BattleMenuRender.init({
			x: 10,
			y: SIZE.height - 55 * 4,
			width: 200,
			height: 30,
			fontSize: 20,
			list: BattleCommandList,
		});
		await BattleMenuRender.setSprite();

		this.addProcess({
			name: "battle-menu",
			class: BattleMenuRender,
			process: async () => {
				BattleMenuRender.update();

				if (GameManager.input.isPushedKey(KeyCode.Up)) return BattleMenuRender.changeMenu(0, -1);
				if (GameManager.input.isPushedKey(KeyCode.Down)) return BattleMenuRender.changeMenu(0, 1);
			},
		});
	}

	private async setCharacterStatus(): Promise<void> {
		// パーティ周りの描画を設定
		for (const partyInfo of GameManager.party.getMenberList()) {
			const characterData = DataManager.character.get(partyInfo.characterId);
			if (!characterData) throw new Error("データベース内に存在しないキャラがパーティに存在します");

			const characterInfo = StoreManager.character.get(partyInfo.characterId);
			if (!characterInfo) throw new Error("所持していないキャラがパーティに存在します");

			// フレーム
			const FrameRender = new Sprite_Frame();
			FrameRender.init({
				x: 10 + 280 * (partyInfo.order - 1),
				y: 0,
				width: 250,
				height: 120,
				path: "menu-background",
			});
			await FrameRender.setSprite();
			this.addProcess({
				// TODO: プロセス名
				name: `${Sprite_Frame.name} - ${characterData.characterId}`,
				class: FrameRender,
				process: async () => {
					// CharaRender.update();
				},
			});

			// キャラ立ち絵
			const CharaRender = new Sprite_Character();
			CharaRender.init({
				x: 20 + 280 * (partyInfo.order - 1),
				y: 30,
				width: 60,
				height: 60,
				path: `character-charaChip-${characterData.characterId}`,
			});
			await CharaRender.setSprite();
			CharaRender.setZIndex(partyInfo.order);
			this.addProcess({
				// TODO: プロセス名
				name: `${Sprite_Character.name} - ${characterData.characterId}`,
				class: CharaRender,
				process: async () => {
					// CharaRender.update();
				},
			});

			// キャラ名
			const CharacterName = new Sprite_Text();
			CharacterName.init({
				text: `${characterData.name}`,
				x: 90 + 280 * (partyInfo.order - 1),
				y: 20,
				width: 200,
				height: 30,
				fontSize: 20,
			});
			await CharacterName.setSprite();
			CharacterName.setZIndex(partyInfo.order + 1);
			this.addProcess({
				// TODO: プロセス名
				name: "名前",
				class: CharacterName,
				process: async () => {
					// CharacterName.update();
				},
			});

			// キャラの体力
			const CharacterHp = new Sprite_Text();
			CharacterHp.init({
				text: `体力: ${characterInfo.hp} / ${characterData.hp}`,
				x: 90 + 280 * (partyInfo.order - 1),
				y: 50,
				width: 200,
				height: 30,
				fontSize: 20,
			});
			await CharacterHp.setSprite();
			CharacterHp.setZIndex(partyInfo.order + 1);
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
				text: `霊力: ${characterInfo.mp} / ${characterData.mp}`,
				x: 90 + 280 * (partyInfo.order - 1),
				y: 80,
				width: 200,
				height: 30,
				fontSize: 20,
			});
			await CharacterMp.setSprite();
			CharacterMp.setZIndex(partyInfo.order + 1);
			this.addProcess({
				// TODO: プロセス名
				name: "mp",
				class: CharacterMp,
				process: async () => {
					CharacterMp.update();
				},
			});
		}
	}

	private async setProcessEnemy(): Promise<void> {
		const enemyPosition = EnemyPosition[GameManager.battle.getEnemyList().length];
		GameManager.battle.getEnemyList().forEach(async (enemyData, index) => {
			// エネミー立ち絵
			const EnemyRender = new Sprite_Enemy();
			EnemyRender.init({
				x: enemyPosition[index].x,
				y: enemyPosition[index].y,
				width: 270,
				height: 270,
				path: `enemy-portrait-${enemyData.enemyId}`,
			});

			await EnemyRender.setSprite();
			EnemyRender.setZIndex(1);
			this.addProcess({
				// TODO: プロセス名
				name: `${enemyData.name} - ${enemyData.enemyId}`,
				class: EnemyRender,
				process: async () => {
					EnemyRender.update();
				},
			});
		});
	}

	private async setProcessMessageWindow(): Promise<void> {
		const MessageFrameRender = new Sprite_Frame();
		MessageFrameRender.init({
			x: 220,
			y: 410,
			width: 600,
			height: 220,
			path: "menu-background",
		});
		await MessageFrameRender.setSprite();
		this.addProcess({
			// TODO: プロセス名
			name: `messages-window`,
			class: MessageFrameRender,
			process: async () => {
				MessageFrameRender.update();
			},
		});
	}
}
