import { Room } from "rot-js/lib/map/features";
import Uniform from "rot-js/lib/map/uniform";
import { ICharacterPosition } from "../../definitions/class/Game/IGameCharacter";
import { Game_Base } from "./Game_Base";

export class Game_Map extends Game_Base {
	private rooms: Room[] = [];
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

	public getRandomRoom(): Room {
		if (!this.rooms.length) throw new Error("not map");
		return this.rooms[Math.floor(Math.random() * this.rooms.length)];
	}

	public getRandomPosition(): ICharacterPosition {
		const room = this.getRandomRoom();

		const x = Math.floor(Math.random() * (room.getLeft() + 1 - room.getRight())) + room.getRight();
		const y = Math.floor(Math.random() * (room.getTop() + 1 - room.getBottom())) + room.getBottom();

		return { x, y };
	}

	public setMapData(mapData: number[][]): void {
		this.mapData = mapData;
	}

	public createMapData(): number[][] {
		const map = new Uniform(200, 200, {
			roomWidth: [5, 26],
			roomHeight: [5, 20],
		});
		this.rooms = map.getRooms();

		const mapData: number[][] = [];
		map.create((x, y, content) => {
			if (!mapData[y]) {
				mapData[y] = [];
			}
			mapData[y][x] = content ? 0 : 1;
		});
		return mapData;
	}
}
