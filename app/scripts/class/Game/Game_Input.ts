import { IKeyInfo } from "../../definitions/class/Game/IGameInput";
import { Game_Base } from "./Game_Base";

export default class Game_Input extends Game_Base {
	private input: IKeyInfo = {};

	public constructor() {
		super();
		this.setListener();
	}

	public getKey(keyCode: string): number {
		return this.input[keyCode];
	}

	public getKeys(): IKeyInfo {
		return this.input;
	}

	public isPushedKey(keyCode: string): boolean {
		return !!this.input[keyCode];
	}

	private setListener(): void {
		document.addEventListener("keydown", e => {
			console.log(e);
			if (typeof this.input[e.key] !== "number") {
				this.input[e.key] = 0;
			}
			this.input[e.key] += 1;
		});
		document.addEventListener("keyup", e => {
			this.input[e.key] = 0;
		});
	}
}
