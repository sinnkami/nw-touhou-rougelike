import { IPartyMenber } from "../../../definitions/modules/field/IPartyMenber";
import sleep from "../../../modules/utils/sleep";
import GameManager from "../../Manager/GameManager";

export const attack = async (attaker: IPartyMenber, defender: IPartyMenber): Promise<void> => {
	// TODO: 通常攻撃のダメージ計算
	const damage = attaker.attack + 9999999;
	const originalHp = defender.hp;
	GameManager.battle.addBattleLog(`${attaker.name}の攻撃！`);
	await sleep(1000);
	defender.hp -= damage;
	GameManager.battle.addBattleLog(`${defender.name}に${damage}のダメージ！`);
	await sleep(1000);
	console.info("--------------");
	console.info("通常攻撃");
	console.info(`${attaker.name}(${attaker.id}) -> ${defender.name}(${defender.id})`);
	console.info(`damage: ${damage}`);
	console.info(`hp: ${originalHp} -> ${defender.hp}`);
	if (defender.isDead) {
		GameManager.battle.clearBattleLogList();
		GameManager.battle.addBattleLog(`${defender.name}は倒れた！`);
		await sleep(1000);
	}
	return;
};
