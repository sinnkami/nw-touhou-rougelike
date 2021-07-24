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

	public isPushedKey(keyCode: string): boolean {
		return !!this.input[keyCode];
	}

	private setListener(): void {
		document.addEventListener("keydown", ev => {
			const key = this.getKey(ev.key) || {
				keyCode: ev.key,
				frame: 0,
			};
			if (!key.interval) {
				key.interval = setInterval(this.frameCount.bind(this), 1000 / Const.fps, ev.key);
				this.setKey(key);
			}
			ev.preventDefault();
			// console.log(e.timeStamp);
			// if (typeof this.input[e.key] !== "number") {
			// 	this.input[e.key] = 0;
			// }
			// this.input[e.key] += 1;
		});
		document.addEventListener("keyup", ev => {
			const key = this.getKey(ev.key);
			if (key && key.interval) {
				clearInterval(key.interval);
				delete this.input[key.keyCode];
			}
		});
	}

	private frameCount(keyCode: string): void {
		console.log("count: ", keyCode);
		const key = this.getKey(keyCode);
		if (key) {
			key.frame += 1;
		}
	}
}
