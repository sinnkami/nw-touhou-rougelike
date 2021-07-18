import { Room } from "rot-js/lib/map/features";
import Uniform from "rot-js/lib/map/uniform";
import { ICharacterPosition } from "../../definitions/class/Game/IGameCharacter";
import { IGameMapData } from "../../definitions/class/Game/IGameMap";
import { IRoomSize, ISize } from "../../definitions/IConstruct";
import Const, { MapChip } from "../Const";
import { Game_Base } from "./Game_Base";

export class Game_Map extends Game_Base {
	private rooms: Room[] = [];
	private mapData: IGameMapData[] = [];

	public constructor() {
		super();
		this.initMapData();
	}

	public initMapData(): void {
		this.mapData = [];
	}

	public getMapData(): IGameMapData[] {
		return this.mapData;
	}

	public getRandomRoom(): Room {
		if (!this.rooms.length) throw new Error("not map");
		return this.rooms[Math.floor(Math.random() * this.rooms.length)];
	}

	public getRandomPosition(): ICharacterPosition {
		const room = this.getRandomRoom();

		const x =
			Math.floor(Math.random() * (room.getLeft() + 1 - room.getRight())) + room.getRight() + this.WALL_ZONE_SIZE;
		const y =
			Math.floor(Math.random() * (room.getTop() + 1 - room.getBottom())) + room.getBottom() + this.WALL_ZONE_SIZE;

		return { x, y };
	}

	public setMapData(mapData: IGameMapData[]): void {
		this.mapData = mapData;
	}

	public createMapData(): IGameMapData[] {
		const map = new Uniform(this.MAP_SIZE.width, this.MAP_SIZE.height, {
			roomWidth: this.ROOM_SIZE.width,
			roomHeight: this.ROOM_SIZE.height,
		});

		const mapData: IGameMapData[] = []; //Array.from({ length: this.WALL_ZONE_SIZE * 2 + this.MAP_SIZE.height }, () =>Array.from({ length: this.WALL_ZONE_SIZE * 2 + this.MAP_SIZE.width }, () => MapChip.Wall));
		for (let y = 0; y <= this.MAP_SIZE.height + this.WALL_ZONE_SIZE * 2; y++) {
			for (let x = 0; x <= this.MAP_SIZE.width + this.WALL_ZONE_SIZE * 2; x++) {
				mapData.push({
					x,
					y,
					chip: MapChip.Wall,
				});
			}
		}

		map.create((x, y, content) => {
			x += this.WALL_ZONE_SIZE;
			y += this.WALL_ZONE_SIZE;
			const map = mapData.find(v => v.x === x && v.y === y);
			if (map) {
				map.chip = content ? MapChip.Wall : MapChip.Road;
			}
		});
		console.log(mapData.length);

		this.rooms = map.getRooms();
		return mapData;
	}

	private get WALL_ZONE_SIZE(): number {
		return Const.wallZoneSize;
	}

	private get MAP_SIZE(): ISize {
		return Const.mapSize;
	}

	private get ROOM_SIZE(): IRoomSize {
		return Const.roomSize;
	}
}
