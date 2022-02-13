import { IProcessInfo } from "../../definitions/class/Scene/ISceneBase";
import GameManager from "../Manager/GameManager";
import LoadManager from "../Manager/LoadManager";
import SceneManager from "../Manager/SceneManager";
import Sprite_Base from "../Sprite/Sprite_Base";
import Window_Base from "../Window/Window_Base";

/**
 * シーン汎用クラス
 */
export default class Scene_Base {
	// プロセス情報リスト
	private processInfoList: IProcessInfo[] = [];
	protected get processList(): ((time: number) => Promise<void>)[] {
		return this.processInfoList.map(info => info.process);
	}

	/** シーンのクラス名 */
	public get name(): string {
		return this.constructor.name;
	}

	/**
	 * 初期化する
	 * MEMO: シーンを再利用する際に実行する
	 */
	public init(): void {
		this.processInfoList.forEach(processInfo => this.removeProcess(processInfo.name));
	}

	/**
	 * シーンを開始する際の処理
	 * @returns
	 */
	public async startScene(): Promise<unknown> {
		// キー情報を初期化
		GameManager.input.init();
		return true;
	}

	/**
	 * シーンを更新する際の処理
	 * @returns
	 */
	public async updateScene(): Promise<unknown> {
		if (LoadManager.isLoading) return false;
		this.processList.forEach(process => process(GameManager.loop.frameCount));
		return true;
	}

	/**
	 * シーンを再表示する際の処理
	 * @returns
	 */
	public async reloadScene(): Promise<unknown> {
		this.init();
		return this.startScene();
	}

	/**
	 * シーンを停止する際の処理
	 * @returns
	 */
	public async stopScene(): Promise<unknown> {
		this.init();
		await SceneManager.removeScene(this.name);
		return true;
	}

	public addProcess(processInfo: IProcessInfo): void {
		this.processInfoList.push(processInfo);
	}

	public removeProcess(processName: string): void {
		// MEMO: プロセスが設定されていない場合があるのでエラーを無視する
		try {
			const process = this.getProcessClass(processName);
			process.destroy();
		} catch {
			// MEMO: エラーを無視
		} finally {
			this.processInfoList = this.processInfoList.filter(v => v.name !== processName);
		}
	}

	/**
	 * プロセスクラスを習得
	 * @param name
	 * @returns Sprite_Base | Window_Base
	 */
	protected getProcessClass(name: string): Sprite_Base | Window_Base {
		const process = this.processInfoList.find(v => v.name === name);
		if (!process) throw new Error("存在しないプロセス");
		if (!process.class) throw new Error("クラスが設定されてないプロセス");
		return process.class;
	}
}
