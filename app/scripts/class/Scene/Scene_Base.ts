import { IProcessDict, IProcessInfo, IResourceInfo } from "../../definitions/class/Scene/ISceneBase";

/**
 * シーン汎用クラス
 */
export default class Scene_Base {
	// シーン内で更新する関数のリスト
	protected processDict: IProcessDict = {};
	protected get processInfoList(): IProcessInfo[] {
		return Object.values(this.processDict);
	}
	protected get processList(): ((time: number) => Promise<void>)[] {
		return this.processInfoList.map(v => v.process);
	}

	/** シーンのクラス名 */
	public get name(): string {
		return this.constructor.name;
	}

	public resourceInfo: IResourceInfo;

	public constructor(resourceInfo: IResourceInfo) {
		this.resourceInfo = resourceInfo;
	}

	/**
	 * シーンを開始する際の処理
	 * @returns
	 */
	public async startScene(): Promise<void> {
		return Promise.resolve();
	}

	/**
	 * シーンを更新する際の処理
	 * @returns
	 */
	public async updateScene(): Promise<void> {
		return Promise.resolve();
	}

	/**
	 * シーンを停止する際の処理
	 * @returns
	 */
	public async stopScene(): Promise<void> {
		return Promise.resolve();
	}

	/**
	 * 処理するプロセスを初期化する
	 */
	protected initProcess(): void {
		this.processDict = {};
	}

	/**
	 * 処理するプロセスを追加
	 * @param processInfo
	 */
	protected addProcess(processInfo: IProcessInfo): void {
		if (!this.processDict[processInfo.name]) {
			this.processDict[processInfo.name] = processInfo;
		} else {
			console.info("既に設定されているプロセスです");
		}
	}

	/**
	 * 処理するプロセスを削除
	 * @param name
	 */
	protected deleteProcess(name: string): void {
		delete this.processDict[name];
	}

	/**
	 * Resourceパスを取得
	 */
	protected getResourcePath(name: string): string {
		return this.resourceInfo[name];
	}
}
