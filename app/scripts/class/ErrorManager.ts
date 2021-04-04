export default class ErrorManager {
	public static getError(code: number): Error {
		const error = new Error();
		switch (code) {
			case ErrorCode.CanvasNotFound: {
				error.name = "ReferenceError";
				error.message = "canvas not found";
			}
		}
		return error;
	}
}

export enum ErrorCode {
	CanvasNotFound = 400,
}