import Window_DialogBase from "../Window/Window_DialogBase";

/**
 * ダイアログを管理するクラス
 * TODO: 優先度は低いがいずれ作る
 */
export default class DialogManager {
	private static dialogList: Window_DialogBase[] = [];

	/**
	 * 初期化処理
	 * @returns Promise<void>
	 */
	public static init(): Promise<void> {
		return Promise.all([]).then();
	}

	public static addDialog(dialog: Window_DialogBase): void {
		this.dialogList.push(dialog);
	}
}
