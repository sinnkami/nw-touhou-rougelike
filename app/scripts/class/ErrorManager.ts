export default class ErrorManager {
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
		}
		return error;
	}
}

export enum ErrorCode {
	CanvasNotFound = 400,
	CollectionNotFound = 500,
}
