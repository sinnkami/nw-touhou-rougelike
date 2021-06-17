import Const from "../Const";

export default class Scene_Base {
	// フレーム毎に呼び出す関数のID
	protected intervalNumber!: number;

	public getName(): string {
		return this.constructor.name;
	}

	public startScene(): Promise<any> {
		return Promise.resolve();
	}

	public updateScene(): Promise<any> {
		return Promise.resolve();
	}

	public stopScene(): Promise<any> {
		return Promise.resolve();
	}

	protected setInterval(func: () => Promise<any>): Promise<any> {
		this.intervalNumber = window.setInterval(func, 1000 / this.getFps());
		return Promise.resolve();
	}

	protected clearInterval(): Promise<any> {
		window.clearInterval(this.intervalNumber);
		return Promise.resolve();
	}

	private getFps(): number {
		return Const.fps;
	}
}
