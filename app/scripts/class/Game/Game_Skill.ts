import { IDataSkill } from "../../definitions/class/Data/IDataSkill";
import Actor from "../../modules/field/Actor";
import DataManager from "../Manager/DataManager";
import GameManager from "../Manager/GameManager";
import { Game_Base } from "./Game_Base";

export default class Game_Skill extends Game_Base {
	public getSkill(skillId: string): IDataSkill {
		const skill = DataManager.skill.get(skillId);
		if (!skill) throw new Error("指定されたスキルは存在しません");
		return skill;
	}

	public getSkillListByPartyMenber(menber: Actor): IDataSkill[] {
		// TODO: スキルリストから取得
		const skillIdList = ["0001"];
		return skillIdList.map(id => this.getSkill(id));
	}
}
