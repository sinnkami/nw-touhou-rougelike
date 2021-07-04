export default class Scene_Base {
	// フレーム毎に呼び出す関数のID
	protected intervalNumber!: number;

	public get name(): string {
		return this.constructor.name;
	}

	public startScene(): void {
		return;
	}

	public updateScene(): void {
		return;
	}

	public stopScene(): void {
		return;
	}
}
