import getRandomValue from "../../modules/utils/getRandomValue";
import {
	BattleCommandList,
	BattleCommands,
	BattlePhase,
	CharacterType,
	EnemyPosition,
} from "../Construct/BattleConstruct";
import { CommonConstruct, KeyCode } from "../Construct/CommonConstruct";
import DataManager from "../Manager/DataManager";
import EventManager, { EventName } from "../Manager/EventManager";
import GameManager from "../Manager/GameManager";
import SceneManager from "../Manager/SceneManager";
import StoreManager from "../Manager/StoreManager";
import { Sprite_Background } from "../Sprite/Sprite_Background";
import Sprite_Character from "../Sprite/Sprite_Character";
import Sprite_Enemy from "../Sprite/Sprite_Enemy";
import Sprite_Frame from "../Sprite/Sprite_Frame";
import Sprite_Portrait from "../Sprite/Sprite_Portrait";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Window_BattleLog from "../Window/Window_BattleLog";
import Window_Menu from "../Window/Window_Menu";
import Window_SelectionSkill from "../Window/Window_SelectionSkill";
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

				// メニューが既に選択済みの場合は処理しない
				if (GameManager.battle.getCommandType()) {
					return;
				}

				if (GameManager.input.isPushedKey(KeyCode.Up)) return BattleMenuRender.changeMenu(0, -1);
				if (GameManager.input.isPushedKey(KeyCode.Down)) return BattleMenuRender.changeMenu(0, 1);
				if (GameManager.input.isPushedKey(KeyCode.Select)) {
					const menu = BattleMenuRender.getCurrentMenu();
					switch (menu.menuId) {
						case BattleCommands.Attack: {
							GameManager.battle.setCommandType(BattleCommands.Attack);
							this.setProcessTargetEnemy();
							break;
						}
						case BattleCommands.Skill: {
							GameManager.battle.setCommandType(BattleCommands.Skill);
							this.setProcessSelectCommandSkill();
						}
						default: {
							console.info("設定されていないコマンド");
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
					name: `${Sprite_Frame.name} - ${actor.characterId}`,
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
					path: `character-charaChip-${actor.characterId}`,
				});
				await CharaRender.setSprite();
				CharaRender.setZIndex(index);
				this.addProcess({
					// TODO: プロセス名
					name: `${Sprite_Character.name} - ${actor.characterId}`,
					class: CharaRender,
					process: async () => {
						// CharaRender.update();
					},
				});

				// キャラ名
				const CharacterName = new Sprite_Text();
				CharacterName.init({
					text: `${actor.name}`,
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
					name: `name - ${actor.characterId}`,
					class: CharacterName,
					process: async () => {
						// CharacterName.update();
					},
				});

				// キャラの体力
				const CharacterHp = new Sprite_Text();
				CharacterHp.init({
					text: `体力: ${actor.hp} / ${actor.maxHp}`,
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
					name: `hp - ${actor.characterId}`,
					class: CharacterHp,
					process: async () => {
						CharacterHp.update();

						// TODO: もしかしたら負荷かかるかもしれない
						CharacterHp.setText(`体力: ${actor.hp} / ${actor.maxHp}`);
					},
				});

				// キャラの霊力
				const CharacterMp = new Sprite_Text();
				CharacterMp.init({
					text: `霊力: ${actor.mp} / ${actor.maxMp}`,
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
					name: `mp - ${actor.characterId}`,
					class: CharacterMp,
					process: async () => {
						CharacterMp.update();

						// TODO: もしかしたら負荷かかるかもしれない
						CharacterMp.setText(`霊力: ${actor.mp} / ${actor.maxMp}`);
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
				name: `${enemy.name} - ${index}`,
				class: EnemyRender,
				process: async () => {
					if (enemy.isDead) {
						this.removeProcess(`${enemy.name} - ${index}`);
						return;
					}

					EnemyRender.update();
				},
			});
		});
	}

	private async setProcessMessageWindow(): Promise<void> {
		const BattleLogRender = new Window_BattleLog();
		BattleLogRender.init({
			x: 220,
			y: 410,
			width: 600,
			height: 220,
			logList: GameManager.battle.getBattleLogList(),
			fontSize: 25,
		});
		await BattleLogRender.setSprite();
		this.addProcess({
			// TODO: プロセス名
			name: `messages-window`,
			class: BattleLogRender,
			process: async () => {
				BattleLogRender.update();
			},
		});
	}

	private async setProcessBattleLoop(): Promise<void> {
		this.addProcess({
			name: "battle-process",
			process: async () => {
				switch (GameManager.battle.getPhase()) {
					case BattlePhase.Init: {
						await EventManager.getEvent(EventName.BattleInit).execute();
						return;
					}
					case BattlePhase.BattleStart: {
						await EventManager.getEvent(EventName.BattleStart).execute();
						return;
					}
					case BattlePhase.SelectedTrun: {
						await EventManager.getEvent(EventName.BattleSelectedTrun).execute();
						return;
					}
					case BattlePhase.TrunStart: {
						await EventManager.getEvent(EventName.BattleTrunStart)
							.execute()
							.then(() => this.setBattleCommandMenu());
						return;
					}
					case BattlePhase.CommandSelect: {
						await EventManager.getEvent(EventName.BattleCommandSelect).execute();
						return;
					}
					case BattlePhase.CommandExecute: {
						this.removeProcess("battle-menu");
						await EventManager.getEvent(EventName.BattleCommandExecute).execute();
						return;
					}
					case BattlePhase.CommandEnd: {
						await EventManager.getEvent(EventName.BattleCommandEnd).execute();
						return;
					}
					case BattlePhase.TrunEnd: {
						await EventManager.getEvent(EventName.BattleTrunEnd).execute();
						return;
					}
					case BattlePhase.BattleEnd: {
						await EventManager.getEvent(EventName.BattleEnd).execute();
						return;
					}
					case BattlePhase.BattleResult: {
						await EventManager.getEvent(EventName.BattleResult)
							.execute()
							.then(async (reslt: boolean) => {
								if (reslt) await this.stopScene();
							});
						return;
					}
				}
			},
		});
	}

	private async setProcessTargetEnemy(): Promise<void> {
		// キー情報を初期化
		GameManager.input.init();

		const TargetEnemyWindow = new Window_TargetEnemy();
		TargetEnemyWindow.init();

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
					GameManager.battle.setCommandType(null);
				}
				if (GameManager.input.isPushedKey(KeyCode.Select)) {
					this.removeProcess(`target-enemy`);

					const menu = TargetEnemyWindow.getCurrentMenu();
					const target = GameManager.enemyParty.getMenber(menu.menuId);
					GameManager.battle.setTarget(target);
				}
			},
		});
	}

	private async setProcessSelectCommandSkill(): Promise<void> {
		// キー情報を初期化
		GameManager.input.init();

		// TODO: キャラが取得しているスキルを算出する
		const SelectionSkill = new Window_SelectionSkill();
		SelectionSkill.init({
			x: 100,
			y: 100,
			width: 300,
			height: 400,
			fontSize: 26,
			list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(v => {
				return {
					index: v,
					menuId: "test" + v,
					skill: GameManager.skill.getSkill("0001"),
				};
			}),
		});

		await SelectionSkill.setSprite();
		SelectionSkill.setZIndex(10);
		this.addProcess({
			// TODO: プロセス名
			name: `selection-skill`,
			class: SelectionSkill,
			process: async () => {
				SelectionSkill.update();

				if (GameManager.input.isPushedKey(KeyCode.Down)) return SelectionSkill.changeMenu(1);
				if (GameManager.input.isPushedKey(KeyCode.Up)) return SelectionSkill.changeMenu(-1);
				if (GameManager.input.isPushedKey(KeyCode.Escape)) {
					this.removeProcess(`selection-skill`);
					GameManager.battle.setCommandType(null);
				}
				if (GameManager.input.isPushedKey(KeyCode.Select)) {
					this.removeProcess(`selection-skill`);
					// TODO: スキルIDを指定してから対象選択
					const menu = SelectionSkill.getCurrentMenu();
					const skill = menu.skill;

					this.setProcessTargetEnemy();
				}
			},
		});
	}
}
