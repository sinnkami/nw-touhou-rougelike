import getRandomValue from "../../modules/utils/getRandomValue";
import { BattleCommandList, BattlePhase, CharacterType, EnemyPosition } from "../Construct/BattleConstruct";
import { CommonConstruct, KeyCode } from "../Construct/CommonConstruct";
import DataManager from "../Manager/DataManager";
import GameManager from "../Manager/GameManager";
import SceneManager from "../Manager/SceneManager";
import StoreManager from "../Manager/StoreManager";
import { Sprite_Background } from "../Sprite/Sprite_Background";
import Sprite_Character from "../Sprite/Sprite_Character";
import Sprite_Enemy from "../Sprite/Sprite_Enemy";
import Sprite_Frame from "../Sprite/Sprite_Frame";
import Sprite_Portrait from "../Sprite/Sprite_Portrait";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Window_Menu from "../Window/Window_Menu";
import Window_TargetEnemy from "../Window/Window_TargetEnemy";
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

		await this.setProcessBattleLoop();
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
				BattleMenuRender.hide();

				// TODO: 表示する段階の指定（多分これで大丈夫だとは思うけど一応）
				// ターン開始フェイズ以外は動作させない
				if (GameManager.battle.getPhase() !== BattlePhase.TrunStart) {
					return;
				}

				// 敵ターンの場合、メニューを操作させない
				const turn = GameManager.turn.getCurrentTrunCharacter();
				if (turn.type === CharacterType.Enemy) {
					return;
				}

				// このタイミングでメニューを表示
				BattleMenuRender.show();

				// メニューが既に選択済みの場合は処理しない
				if (GameManager.battle.getSelectedCommand()) {
					return;
				}

				if (GameManager.input.isPushedKey(KeyCode.Up)) return BattleMenuRender.changeMenu(0, -1);
				if (GameManager.input.isPushedKey(KeyCode.Down)) return BattleMenuRender.changeMenu(0, 1);
				if (GameManager.input.isPushedKey(KeyCode.Select)) {
					const menu = BattleMenuRender.getCurrentMenu();
					switch (menu.menuId) {
						case "attack": {
							GameManager.battle.selectCommand("attack");
							this.setProcessSelectCommandAtack();
							break;
						}
						default: {
							console.log("設定されていないコマンド");
							break;
						}
					}
				}
			},
		});
	}

	private async setCharacterStatus(): Promise<void> {
		// パーティ周りの描画を設定
		await Promise.all(
			GameManager.party.getMenberList().map(async (actor, index) => {
				const characterData = DataManager.character.get(actor.characterId);
				if (!characterData) throw new Error("データベース内に存在しないキャラがパーティに存在します");

				// フレーム
				const FrameRender = new Sprite_Frame();
				FrameRender.init({
					x: 10 + 280 * index,
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
					x: 20 + 280 * index,
					y: 30,
					width: 60,
					height: 60,
					path: `character-charaChip-${characterData.characterId}`,
				});
				await CharaRender.setSprite();
				CharaRender.setZIndex(index);
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
					x: 90 + 280 * index,
					y: 20,
					width: 200,
					height: 30,
					fontSize: 20,
				});
				await CharacterName.setSprite();
				CharacterName.setZIndex(index + 1);
				this.addProcess({
					// TODO: プロセス名
					name: `name - ${characterData.characterId}`,
					class: CharacterName,
					process: async () => {
						// CharacterName.update();
					},
				});

				// キャラの体力
				const CharacterHp = new Sprite_Text();
				CharacterHp.init({
					text: `体力: ${actor.hp} / ${characterData.hp}`,
					x: 90 + 280 * index,
					y: 50,
					width: 200,
					height: 30,
					fontSize: 20,
				});
				await CharacterHp.setSprite();
				CharacterHp.setZIndex(index + 1);
				this.addProcess({
					// TODO: プロセス名
					name: `hp - ${characterData.characterId}`,
					class: CharacterHp,
					process: async () => {
						CharacterHp.update();

						// TODO: もしかしたら負荷かかるかもしれない
						CharacterHp.setText(`体力: ${actor.hp} / ${characterData.hp}`);
					},
				});

				// キャラの霊力
				const CharacterMp = new Sprite_Text();
				CharacterMp.init({
					text: `霊力: ${actor.mp} / ${characterData.mp}`,
					x: 90 + 280 * index,
					y: 80,
					width: 200,
					height: 30,
					fontSize: 20,
				});
				await CharacterMp.setSprite();
				CharacterMp.setZIndex(index + 1);
				this.addProcess({
					// TODO: プロセス名
					name: `mp - ${characterData.characterId}`,
					class: CharacterMp,
					process: async () => {
						CharacterMp.update();

						// TODO: もしかしたら負荷かかるかもしれない
						CharacterMp.setText(`霊力: ${actor.mp} / ${characterData.mp}`);
					},
				});
			})
		);
	}

	private async setProcessEnemy(): Promise<void> {
		const enemyList = GameManager.enemyParty.getEnemyPartyList();
		const enemyPosition = EnemyPosition[enemyList.length];
		enemyList.forEach(async (enemy, index) => {
			// エネミー立ち絵
			const EnemyRender = new Sprite_Enemy();
			EnemyRender.init({
				x: enemyPosition[index].x,
				y: enemyPosition[index].y,
				width: 270,
				height: 270,
				path: `enemy-portrait-${enemy.enemyId}`,
			});

			await EnemyRender.setSprite();
			EnemyRender.setZIndex(1);
			this.addProcess({
				// TODO: プロセス名
				name: `${enemy.name} - ${enemy.partyId}`,
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

	private async setProcessBattleLoop(): Promise<void> {
		this.addProcess({
			name: "battle-process",
			process: async () => {
				switch (GameManager.battle.getPhase()) {
					case BattlePhase.Init: {
						// MEMO: 処理は既にイベントにて呼び出し済み
						GameManager.battle.changePhase(BattlePhase.BattleStart);
						break;
					}
					case BattlePhase.BattleStart: {
						await GameManager.battle.executeBattleStart();

						break;
					}
					case BattlePhase.SelectedTrun: {
						await GameManager.battle.executeSelectedTurn();
						break;
					}
					case BattlePhase.TrunStart: {
						await GameManager.battle.executeTurnStart();
						break;
					}
					case BattlePhase.CommandSelect: {
						// MEMO: プレイヤー側コマンド選択は対象選択時に実行
						// TODO: 敵側のターン処理
						const turn = GameManager.turn.getCurrentTrunCharacter();

						// TODO: turnの要領？
						if (turn.type === CharacterType.Enemy) {
							const menberList = GameManager.party.getMenberList();

							// TODO: とりあえず通常攻撃をさせる
							GameManager.battle.selectCommand("attack");
							GameManager.battle.executeCommandSelect(getRandomValue(menberList));
						}
						break;
					}
					case BattlePhase.CommandExecute: {
						await GameManager.battle.executeCommandExecute();
						break;
					}
					case BattlePhase.CommandEnd: {
						await GameManager.battle.executeCommandEnd();
						break;
					}
					case BattlePhase.TrunEnd: {
						await GameManager.battle.executeTurnEnd();
						break;
					}
					case BattlePhase.BattleEnd: {
						await GameManager.battle.executeBattleEnd();
						break;
					}
					case BattlePhase.BattleResult: {
						await GameManager.battle.executeBattleResult();
						SceneManager.stopScene();
						break;
					}
				}
			},
		});
	}

	private async setProcessSelectCommandAtack(): Promise<void> {
		// キー情報を初期化
		GameManager.input.init();

		const enemyList = GameManager.enemyParty.getEnemyPartyList();
		const enemyPosition = EnemyPosition[enemyList.length];
		const list = enemyList.map((v, index) => {
			return {
				menuId: v.partyId,
				order: index,
			};
		});

		const TargetEnemyWindow = new Window_TargetEnemy();
		TargetEnemyWindow.init({
			x: enemyPosition[0].x,
			y: enemyPosition[0].y,
			width: 270,
			height: 270,
			list,
		});

		await TargetEnemyWindow.setSprite();
		TargetEnemyWindow.setZIndex(10);
		this.addProcess({
			// TODO: プロセス名
			name: `target-enemy`,
			class: TargetEnemyWindow,
			process: async () => {
				TargetEnemyWindow.update();

				if (GameManager.input.isPushedKey(KeyCode.Right)) return TargetEnemyWindow.changeMenu(1);
				if (GameManager.input.isPushedKey(KeyCode.Left)) return TargetEnemyWindow.changeMenu(-1);
				if (GameManager.input.isPushedKey(KeyCode.Escape)) {
					this.removeProcess(`target-enemy`);
					GameManager.battle.selectCommand("");
				}
				if (GameManager.input.isPushedKey(KeyCode.Select)) {
					this.removeProcess(`target-enemy`);
					const menu = TargetEnemyWindow.getCurrentMenu();
					const target = GameManager.enemyParty.getMenber(menu.menuId);

					// コマンド選択処理実行
					GameManager.battle.changePhase(BattlePhase.CommandSelect);
					await GameManager.battle.executeCommandSelect(target);
				}
			},
		});
	}
}
