import { ICharacterPosition } from "../../definitions/class/Game/IGameCharacter";
import { MapChip } from "../Const";
import GameManager from "../GameManager";
import { Game_Base } from "./Game_Base";
/**
 * ゲーム内に登場するキャラの現在情報を保持するクラス
 */
export default class Game_Character extends Game_Base {
	private x: number;
	private y: number;

	public constructor() {
		super();

		this.x = 0;
		this.y = 0;

		return;
	}

	public getPosition(): ICharacterPosition {
		return {
			x: this.x,
			y: this.y,
		};
	}

	public setPosition(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}

	public isPosition(x: number, y: number): boolean {
		return x === this.x && y === this.y;
	}

	public move(x: number, y: number): boolean {
		let flag = false;
		if (Math.sign(x) > 0 && this.canMove(x, y)) {
			this.x += x;
			flag = true;
		}
		if (Math.sign(x) < 0 && this.canMove(x, y)) {
			this.x += x;
			flag = true;
		}
		if (Math.sign(y) > 0 && this.canMove(x, y)) {
			this.y += y;
			flag = true;
		}
		if (Math.sign(y) < 0 && this.canMove(x, y)) {
			this.y += y;
			flag = true;
		}

		return flag;
	}

	public canMove(x: number, y: number): boolean {
		const mapChip = GameManager.map.getMapChip(this.x + x, this.y + y);
		if (!mapChip) return false;

		return mapChip.chip === MapChip.Road;
	}
}
