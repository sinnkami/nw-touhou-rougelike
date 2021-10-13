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
	public static getError(code: number, ...messages: unknown[]): Error {
		const error = new Error();
		console.log(code);
		switch (code) {
			case ErrorCode.CanvasNotFound: {
				error.name = "ReferenceError";
				error.message = "canvas not found";
				return error;
			}
			case ErrorCode.CollectionNotFound: {
				error.name = "ReferenceError";
				error.message = `${messages[0]} is not found in collection name`;
				return error;
			}
			case ErrorCode.NotLoadScene: {
				error.name = "ReferenceError";
				error.message = "not loading scene";
				return error;
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
