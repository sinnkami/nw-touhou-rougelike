import { SkillType } from "../../../class/Construct/SkillConstruct";

export interface IDataSkill {
	// スキルID
	skillId: string;
	// 名称
	name: string;
	// スキルタイプ
	type: SkillType;
	// 数値
	param: number;
}
