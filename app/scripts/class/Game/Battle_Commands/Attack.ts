import { IPartyMenber } from "../../../definitions/modules/field/IPartyMenber";

export const attack = async (attaker: IPartyMenber, defender: IPartyMenber): Promise<void> => {
	// TODO: 通常攻撃のダメージ計算
	const damage = attaker.attack;
	const originalHp = defender.hp;
	defender.hp -= damage;
	console.log("--------------");
	console.log("通常攻撃");
	console.log(`${attaker.name}(${attaker.id}) -> ${defender.name}(${defender.id})`);
	console.log(`damage: ${damage}`);
	console.log(`hp: ${originalHp} -> ${defender.hp}`);
	return;
};
