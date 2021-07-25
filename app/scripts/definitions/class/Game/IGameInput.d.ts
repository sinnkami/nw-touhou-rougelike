export interface IKeyInfoDict {
	[keyCode: string]: IKeyInfo;
}

export interface IKeyInfo {
	keyCode: string;
	frame: number;
}
