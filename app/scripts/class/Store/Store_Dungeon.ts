import Store_Base from "./Store_Base";

/**
 * 現在のダンジョン情報
 */
export default class Store_Dungeon extends Store_Base {
	// 現在の階層
	private hierarchy: number = 0;

	public async init(): Promise<void> {
		this.hierarchy = 0;
	}

	public getHierarchy(): number {
		return this.hierarchy;
	}

	public setHierarchy(hierarchy: number): void {
		this.hierarchy = hierarchy;
	}
}
