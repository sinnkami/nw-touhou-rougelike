import SceneManager from "../../Manager/SceneManager";
import { Event_Base } from "../Event_Base";
import LoadManager from "../../Manager/LoadManager";
import GameManager from "../../Manager/GameManager";
import { BattlePhase } from "../../Construct/BattleConstruct";
import sleep from "../../../modules/utils/sleep";
import { Material } from "../../Construct/MaterialConstruct";
import { CharacterStatus } from "../../Construct/CharacterConstruct";
import waitInput from "../../../modules/utils/waitInput";
import { KeyCode } from "../../Construct/CommonConstruct";

/**
 * 戦闘リザルト処理
 */
export class Event_BattleResult extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		if (GameManager.battle.getHasExecutedPhase()) return Promise.resolve(false);
		GameManager.battle.setHasExecutedPhase(true);

		const enemyList = GameManager.enemyParty.getEnemyPartyList();

		// この戦闘で得られた総経験値
		const totalExp = enemyList.reduce((sum, enemy) => sum + enemy.exp, 0);

		GameManager.battle.clearBattleLogList();
		GameManager.battle.addBattleLog(`${totalExp}経験値を獲得！`);
		await sleep(200);

		GameManager.material.addMaterial(
			Material.Flame,
			enemyList.reduce((sum, enemy) => sum + enemy.flame, 0)
		);
		GameManager.material.addMaterial(
			Material.Water,
			enemyList.reduce((sum, enemy) => sum + enemy.water, 0)
		);
		GameManager.material.addMaterial(
			Material.Grass,
			enemyList.reduce((sum, enemy) => sum + enemy.grass, 0)
		);
		GameManager.material.addMaterial(
			Material.Thunder,
			enemyList.reduce((sum, enemy) => sum + enemy.thunder, 0)
		);
		GameManager.material.addMaterial(
			Material.Light,
			enemyList.reduce((sum, enemy) => sum + enemy.light, 0)
		);
		GameManager.material.addMaterial(
			Material.Darkness,
			enemyList.reduce((sum, enemy) => sum + enemy.darkness, 0)
		);
		GameManager.battle.addBattleLog(`時空片を獲得！`);
		await sleep(1000);

		// TODO: レベルアップ判定等
		console.info("レベルリザルト");
		for (const actor of GameManager.party.getMenberList()) {
			const beforeLevel = actor.level;

			// TODO: 人数によって割るかどうかを決める
			actor.addExp(totalExp);

			// レベルアップが出来なくなるまで回す
			while (actor.canLevelUp()) {
				actor.addLevel(1);
			}

			if (beforeLevel !== actor.level) {
				console.info(`${actor.name} レベルアップ`);
				console.info(`Lv. ${beforeLevel} -> ${actor.level}`);
				console.info(
					`HP: ${actor.calcStatus(beforeLevel, actor.growthType, CharacterStatus.Hp)} -> ${actor.maxHp}`
				);
				GameManager.battle.clearBattleLogList();
				GameManager.battle.addBattleLog(`${actor.name}はレベル${actor.level}に上がった！`);
				await sleep(1000);
				GameManager.battle.addBattleLog(
					`hpが${actor.maxHp - actor.calcStatus(beforeLevel, actor.growthType, CharacterStatus.Hp)}増えた！`
				);
				await sleep(100);
				GameManager.battle.addBattleLog(
					`mpが${actor.maxMp - actor.calcStatus(beforeLevel, actor.growthType, CharacterStatus.Mp)}増えた！`
				);
				await sleep(100);
				GameManager.battle.addBattleLog(
					`attackが${
						actor.attack - actor.calcStatus(beforeLevel, actor.growthType, CharacterStatus.Attack)
					}増えた！`
				);
				await sleep(100);
				GameManager.battle.addBattleLog(
					`defenseが${
						actor.defense - actor.calcStatus(beforeLevel, actor.growthType, CharacterStatus.Defense)
					}増えた！`
				);
				await sleep(100);
				GameManager.battle.addBattleLog(
					`magicalが${
						actor.magical - actor.calcStatus(beforeLevel, actor.growthType, CharacterStatus.Magical)
					}増えた！`
				);
				await sleep(100);
				GameManager.battle.addBattleLog(
					`agilityが${
						actor.agility - actor.calcStatus(beforeLevel, actor.growthType, CharacterStatus.Agility)
					}増えた！`
				);
				await sleep(100);
				GameManager.battle.addBattleLog(
					`dexterityが${
						actor.dexterity - actor.calcStatus(beforeLevel, actor.growthType, CharacterStatus.Dexterity)
					}増えた！`
				);
				await sleep(2000);
			}
		}
		console.info("--------------");

		await waitInput(KeyCode.Select);

		console.info("戦闘終了");

		return Promise.resolve(true);
	}
}
