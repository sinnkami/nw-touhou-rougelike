import Store_Base from "./Store_Base";

/**
 * 現在のダンジョン情報
 */
export default class Store_Dungeon extends Store_Base {
	// 現在の階層
	private hierarchy: number = 0;
	// 現在のダンジョンID
	private dungeonId: string = "";

	public async init(): Promise<void> {
		this.hierarchy = 0;
		this.dungeonId = "";
	}

	public getHierarchy(): number {
		return this.hierarchy;
	}

	public setHierarchy(hierarchy: number): void {
		this.hierarchy = hierarchy;
	}

	public getDungeonId(): string {
		return this.dungeonId;
	}

	public setDungeonId(dungeonId: string): void {
		this.dungeonId = dungeonId;
	}
}
