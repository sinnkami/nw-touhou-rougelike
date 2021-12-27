import { CalcStatusType, CharacterStatus, MAX_LEVEL, INIT_LEVEL } from "../../class/Construct/CharacterConstruct";
import { ICharacter, IStatus } from "../../definitions/modules/field/ICharacter";

// キャラ情報
export default class Character {
	public id: string;
	/** 名前 */
	public name: string;
	/** レベル */
	public level: number;
	/** 成長タイプ */
	private growthType: CalcStatusType;

	// レベル1時点でのステータス
	private initStatus: IStatus;
	// 最大レベル時点でのステータス
	private maxStatus: IStatus;

	// パラメータ関連
	/** 体力 */
	private currentHp: number = 0;
	public get hp(): number {
		return this.currentHp;
	}
	public set hp(value: number) {
		this.currentHp = value;
	}
	public get maxHp(): number {
		return this.calcStatus(this.level, this.growthType, CharacterStatus.Hp);
	}

	/** 霊力 */
	private currentMp: number = 0;
	public get mp(): number {
		return this.currentMp;
	}
	public set mp(value: number) {
		this.currentMp = value;
	}
	public get maxMp(): number {
		return this.calcStatus(this.level, this.growthType, CharacterStatus.Mp);
	}

	/** 攻撃力 */
	public get attack(): number {
		return this.calcStatus(this.level, this.growthType, CharacterStatus.Attack);
	}
	/** 守備力 */
	public get defense(): number {
		return this.calcStatus(this.level, this.growthType, CharacterStatus.Defense);
	}
	/** 魔力 */
	public get magical(): number {
		return this.calcStatus(this.level, this.growthType, CharacterStatus.Magical);
	}
	/** 素早さ */
	public get agility(): number {
		return this.calcStatus(this.level, this.growthType, CharacterStatus.Agility);
	}
	/** 器用さ */
	public get dexterity(): number {
		return this.calcStatus(this.level, this.growthType, CharacterStatus.Dexterity);
	}

	public constructor(option: ICharacter) {
		this.id = option.id;
		this.name = option.name;

		this.level = option.level;

		this.growthType = option.growthType;

		this.initStatus = option.initStatus;
		this.maxStatus = option.maxStatus;

		// 初期HP、MPを設定
		this.hp = this.maxHp;
		this.mp = this.maxMp;
	}

	public get isDead(): boolean {
		return this.hp <= 0;
	}

	/**
	 * 指定されたレベルでのステータスを計算
	 * @param level
	 * @param calcType
	 * @param statusType
	 * @returns
	 */
	public calcStatus(level: number, calcType: CalcStatusType, statusType: CharacterStatus): number {
		// TODO: 補正値を個別にするか全体にするか
		// 補正値
		const controlValue = 1.5;

		// レベル1時点でのステータス
		let initParam = 0;

		// レベルMAX時点でのステータス
		let maxParam = 0;

		// 指定されたステータスを取得
		switch (statusType) {
			case CharacterStatus.Hp: {
				initParam = this.initStatus.hp;
				maxParam = this.maxStatus.hp;
				break;
			}
			case CharacterStatus.Mp: {
				initParam = this.initStatus.mp;
				maxParam = this.maxStatus.mp;
				break;
			}
			case CharacterStatus.Attack: {
				initParam = this.initStatus.attack;
				maxParam = this.maxStatus.attack;
				break;
			}
			case CharacterStatus.Defense: {
				initParam = this.initStatus.defense;
				maxParam = this.maxStatus.defense;
				break;
			}
			case CharacterStatus.Magical: {
				initParam = this.initStatus.magical;
				maxParam = this.maxStatus.magical;
				break;
			}
			case CharacterStatus.Agility: {
				initParam = this.initStatus.agility;
				maxParam = this.maxStatus.agility;
				break;
			}
			case CharacterStatus.Dexterity: {
				initParam = this.initStatus.dexterity;
				maxParam = this.maxStatus.dexterity;
				break;
			}
			default: {
				throw new Error("存在しないステータス");
			}
		}

		switch (calcType) {
			case CalcStatusType.Late:
				return this.calcStatusByLate(level, initParam, maxParam, controlValue);
			case CalcStatusType.Early:
				return this.calcStatusByEarly(level, initParam, maxParam, controlValue);
			default:
				throw new Error("存在しない計算方法");
		}
	}

	/**
	 * 晩成型のステータスを計算
	 * 小数点以下は四捨五入される
	 * @param level
	 * @param initParam
	 * @param maxParam
	 * @param p
	 * @returns
	 */
	private calcStatusByLate(level: number, initParam: number, maxParam: number, p: number): number {
		return Math.round(
			Math.pow((maxParam - initParam) * ((level - INIT_LEVEL) / (MAX_LEVEL - INIT_LEVEL)), p) + initParam
		);
	}

	/**
	 * 早熟型のステータスを計算
	 * 小数点以下は四捨五入される
	 * @param level
	 * @param initParam
	 * @param maxParam
	 * @param p
	 * @returns
	 */
	private calcStatusByEarly(level: number, initParam: number, maxParam: number, p: number): number {
		return Math.round(
			Math.pow(-(maxParam - initParam) * ((level - MAX_LEVEL) / (INIT_LEVEL - MAX_LEVEL)), p) + maxParam
		);
	}
}
