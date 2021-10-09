import { ICharacterPosition } from "../../definitions/class/Game/IGameCharacter";
import { MapChip } from "../Construct/CommonConstruct";
import GameManager from "../Manager/GameManager";
import { Game_Base } from "./Game_Base";

/**
 * 操作するキャラの座標を操作するクラス
 */
export default class Game_Player extends Game_Base {
	// 座標
	private x: number;
	private y: number;

	public constructor() {
		super();

		this.x = 0;
		this.y = 0;

		return;
	}

	/**
	 * 現在位置を取得
	 * @returns ICharacterPosition
	 */
	public getPosition(): ICharacterPosition {
		return {
			x: this.x,
			y: this.y,
		};
	}

	/**
	 * 現在位置を設定
	 * @param x
	 * @param y
	 */
	public setPosition(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}

	/**
	 * 指定された位置に存在しているか
	 * @param x
	 * @param y
	 * @returns
	 */
	public isPosition(x: number, y: number): boolean {
		return x === this.x && y === this.y;
	}

	/**
	 * 移動を行う
	 * @param x
	 * @param y
	 * @returns boolean (移動できたかどうか)
	 */
	public move(x: number, y: number): boolean {
		let flag = true;

		if (Math.sign(x) > 0 && !this.canMove(x, y)) flag = false;
		if (Math.sign(x) < 0 && !this.canMove(x, y)) flag = false;
		if (Math.sign(y) > 0 && !this.canMove(x, y)) flag = false;
		if (Math.sign(y) < 0 && !this.canMove(x, y)) flag = false;

		if (flag) {
			this.x += x;
			this.y += y;
		}

		return flag;
	}

	/**
	 * 指定された場所に移動できるか
	 * @param x
	 * @param y
	 * @returns boolean
	 */
	public canMove(x: number, y: number): boolean {
		const mapChip = GameManager.map.getMapChip(this.x + x, this.y + y);
		if (!mapChip) return false;

		return mapChip.chip === MapChip.Road;
	}
}
