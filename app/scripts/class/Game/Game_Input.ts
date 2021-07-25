import { IKeyInfo, IKeyInfoDict } from "../../definitions/class/Game/IGameInput";
import Const from "../Const";
import { Game_Base } from "./Game_Base";

export default class Game_Input extends Game_Base {
	private input: IKeyInfoDict = {};

	public constructor() {
		super();
		this.setListener();
	}

	public getKey(keyCode: string): IKeyInfo | undefined {
		return this.input[keyCode];
	}

	public getKeys(): IKeyInfoDict {
		return this.input;
	}

	public setKey(keyInfo: IKeyInfo): void {
		this.input[keyInfo.keyCode] = keyInfo;
	}

	public deleteKey(keyCode: string): void {
		delete this.input[keyCode];
	}

	public hasKey(keyCode: string): boolean {
		const key = this.getKey(keyCode);
		return !!key;
	}

	public isPushedKey(keyCode: string): boolean {
		return this.hasKey(keyCode);
	}

	public update(): void {
		const keyList = Object.values(this.getKeys());
		keyList.forEach(v => (v.frame += 1));
	}

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
