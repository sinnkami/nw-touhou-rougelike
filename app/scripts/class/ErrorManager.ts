export default class ErrorManager {
	public static init(): Promise<void> {
		return Promise.all([]).then();
	}

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

export enum ErrorCode {
	NotLoadScene = 1,
	CanvasNotFound = 400,
	CollectionNotFound = 500,
}
