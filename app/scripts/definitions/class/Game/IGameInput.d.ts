/** キー入力を保持する辞書 */
export interface IKeyInfoDict {
	[keyCode: string]: IKeyInfo;
}

/** キーの情報 */
export interface IKeyInfo {
	keyCode: string;
	frame: number;
}
