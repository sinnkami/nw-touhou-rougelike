export default class Scene_Base {
	// フレーム毎に呼び出す関数のID
	protected intervalNumber!: number;

	public get name(): string {
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
}
