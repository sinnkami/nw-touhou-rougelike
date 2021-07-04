import { Game_Base } from "./Game_Base";

export class Game_Map extends Game_Base {
	private mapData: number[][] = [];

	public constructor() {
		super();
		this.initMapData();
	}

	public initMapData(): void {
		this.mapData = [];
	}

	public getMapData(): number[][] {
		return this.mapData;
	}

	public setMapData(mapData: number[][]): void {
		this.mapData = mapData;
	}
}
