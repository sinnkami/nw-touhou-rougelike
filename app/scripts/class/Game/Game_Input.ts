import { IKeyInfo, IKeyInfoDict } from "../../definitions/class/Game/IGameInput";
import Const from "../Const";
import { Game_Base } from "./Game_Base";

/**
 * ゲーム内での入力値を保持するクラス
 */
export default class Game_Input extends Game_Base {
	// キー操作の辞書
	private input: IKeyInfoDict = {};

	public constructor() {
		super();

		// キー操作を監視するイベントリスナーを設定
		this.setListener();
	}

	/**
	 * 指定されたキーを取得
	 * @param keyCode
	 * @returns IKeyInfo
	 */
	public getKey(keyCode: string): IKeyInfo | undefined {
		return this.input[keyCode];
	}

	/**
	 * 入力されているキーの辞書を取得
	 * @param keyCode
	 * @returns IKeyInfoDict
	 */
	public getKeys(): IKeyInfoDict {
		return this.input;
	}

	/**
	 * 指定されたキーの設定
	 * @param keyInfo
	 */
	public setKey(keyInfo: IKeyInfo): void {
		this.input[keyInfo.keyCode] = keyInfo;
	}

	/**
	 * 指定されたキーを削除
	 * @param keyCode
	 */
	public deleteKey(keyCode: string): void {
		delete this.input[keyCode];
	}

	/**
	 * 指定されたキーが存在するか
	 * @param keyCode
	 * @returns boolean
	 */
	public hasKey(keyCode: string): boolean {
		const key = this.getKey(keyCode);
		return !!key;
	}

	/**
	 * 指定されたキーが入力されているか
	 * @param keyCode
	 * @returns boolean
	 */
	public isPushedKey(keyCode: string): boolean {
		// MEMO: キーが存在するかで入力判定を行う
		return this.hasKey(keyCode);
	}

	/**
	 * 指定されたキーリストの中で、一番入力時間が少ない物を取得
	 * @param keyList
	 * @returns IKeyInfo | undefied
	 */
	public getKeyOfLowestFrame(keyList?: (IKeyInfo | undefined)[]): IKeyInfo | undefined {
		if (!keyList) {
			keyList = Object.values(this.getKeys());
		}

		const key = keyList.reduce((a, b) => {
			if (a === undefined && b) return b;
			if (a && b === undefined) return a;
			if (a && b) {
				return a.frame < b.frame ? a : b;
			}
			return undefined;
		});

		return key;
	}

	/**
	 * キー入力の更新
	 * MEMO: これを呼び出すことでキーフレームを進める
	 */
	public update(): void {
		const keyList = Object.values(this.getKeys());
		keyList.forEach(v => (v.frame += 1));
	}

	/**
	 * イベントリスナーを設定する
	 */
	private setListener(): void {
		document.addEventListener("keydown", ev => {
			if (!this.hasKey(ev.key)) {
				this.setKey({
					keyCode: ev.key,
					frame: 0,
				});
			}
			ev.preventDefault();
		});
		document.addEventListener("keyup", ev => {
			if (this.hasKey(ev.key)) {
				this.deleteKey(ev.key);
			}
			ev.preventDefault();
		});
	}
}