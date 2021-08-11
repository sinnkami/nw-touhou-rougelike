/**
 * エラーを出力するマネージャークラス
 */
export default class ErrorManager {
	/**
	 * 初期化処理
	 * @returns Promise<void>
	 */
	public static init(): Promise<void> {
		return Promise.all([]).then();
	}

	/**
	 * 指定されたエラーを取得
	 * TODO: 設定されいている箇所が少ないので設定
	 * @param code
	 * @param messages
	 * @returns Error
	 */
	public static getError(code: number, ...messages: any[]): Error {
		const error = new Error();
		switch (code) {
			case ErrorCode.CanvasNotFound: {
				error.name = "ReferenceError";
				error.message = "canvas not found";
			}
			case ErrorCode.CollectionNotFound: {
				error.name = "ReferenceError";
				error.message = `${messages[0]} is not found in collection name`;
			}
			case ErrorCode.NotLoadScene: {
				error.name = "ReferenceError";
				error.message = "not loading scene";
			}
		}
		return error;
	}
}

// エラーコード
export enum ErrorCode {
	NotLoadScene = 1,
	CanvasNotFound = 400,
	CollectionNotFound = 500,
}
