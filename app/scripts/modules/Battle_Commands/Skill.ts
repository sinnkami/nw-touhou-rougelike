import { IPartyMenber } from "../../definitions/modules/field/IPartyMenber";
import sleep from "../utils/sleep";
import GameManager from "../../class/Manager/GameManager";
import { SkillType } from "../../class/Construct/SkillConstruct";

export const skill = async (skillId: string, source: IPartyMenber, target: IPartyMenber): Promise<void> => {
	const skill = GameManager.skill.getSkill(skillId);
	// TODO: スキルの種類によって処理分岐
	let damage = 0;
	switch (skill.type) {
		case SkillType.AttackMultiplication: {
			damage = skill.param * source.magical;
		}
	}
	const originalHp = target.hp;
	GameManager.battle.addBattleLog(`${source.name}の${skill.name}！`);
	await sleep(1000);
	target.hp -= damage;
	GameManager.battle.addBattleLog(`${target.name}に${damage}のダメージ！`);
	await sleep(1000);
	console.info("--------------");
	console.info(`スキル: ${skill.name}(${skill.skillId})`);
	console.info(`${source.name}(${source.id}) -> ${target.name}(${target.id})`);
	console.info(`damage: ${damage}`);
	console.info(`hp: ${originalHp} -> ${target.hp}`);
	if (target.isDead) {
		GameManager.battle.clearBattleLogList();
		GameManager.battle.addBattleLog(`${target.name}は倒れた！`);
		await sleep(1000);
	}
	return;
};
