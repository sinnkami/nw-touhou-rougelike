import { IStoreEnemyParty } from "../../../definitions/class/Store/IStoreEnemyParty";
import { IStoreParty } from "../../../definitions/class/Store/IStoreParty";

// TODO: 名前と位置を変更
export type IActor = IStoreParty | IStoreEnemyParty;

export const attack = async (attaker: IActor, defender: IActor): Promise<void> => {
	// TODO: 通常攻撃のダメージ計算
	const damage = attaker.attack;
	const originalHp = defender.hp;
	defender.hp -= damage;
	console.log("--------------");
	console.log("通常攻撃");
	console.log(`${attaker.name}(${attaker.partyId}) -> ${defender.name}(${defender.partyId})`);
	console.log(`damage: ${damage}`);
	console.log(`hp: ${originalHp} -> ${defender.hp}`);
	return;
};
