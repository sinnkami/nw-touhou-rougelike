import Arena from "rot-js/lib/map/arena";
import { Room } from "rot-js/lib/map/features";
import Uniform from "rot-js/lib/map/uniform";
import { ICharacterPosition } from "../../definitions/class/Game/IGameCharacter";
import { IGameEventMapData, IGameMapData } from "../../definitions/class/Game/IGameMap";
import { IRoomSize, ISize } from "../../definitions/IConstruct";
import Const, { EventName, MapChip } from "../Const";
import { Game_Base } from "./Game_Base";

export class Game_Map extends Game_Base {
	private rooms: Room[] = [];
	private baseMap: IGameMapData[] = [];
	private eventMap: IGameEventMapData[] = [];

	public constructor() {
		super();
		this.initMapData();
	}

	public initMapData(): void {
		this.baseMap = [];
	}

	public getMapData(): IGameMapData[] {
		return this.baseMap;
	}

	public getEventMapData(): IGameEventMapData[] {
		return this.eventMap;
	}

	public getMapChip(x: number, y: number): IGameMapData | undefined {
		const mapDataList = this.getMapData();
		return mapDataList.find(v => v.x === x && v.y === y);
	}

	public getEventMapChip(x: number, y: number): IGameEventMapData | undefined {
		const mapDataList = this.getEventMapData();
		return mapDataList.find(v => v.x === x && v.y === y);
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

		const mapChip = this.getMapChip(x, y);
		if (mapChip && mapChip.chip === MapChip.Road) {
			return { x, y };
		} else {
			return this.getRandomPosition();
		}
	}

	public setMapData(mapData: IGameMapData[]): void {
		this.baseMap = mapData;
	}

	public createMapData(): IGameMapData[] {
		const map = new Uniform(this.MAP_SIZE.width, this.MAP_SIZE.height, {
			roomWidth: this.ROOM_SIZE.width,
			roomHeight: this.ROOM_SIZE.height,
		});

		const mapData: IGameMapData[] = [];
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

		this.rooms = map.getRooms();
		this.setMapData(mapData);

		this.setStairs();
		return mapData;
	}

	public setStairs(): void {
		const { x, y } = this.getRandomPosition();
		const mapChip = this.getMapChip(x, y);
		if (!mapChip || this.getEventMapChip(x, y)) {
			return this.setStairs();
		}

		const eventMapChip: IGameEventMapData = Object.assign({ name: EventName.Stairs }, mapChip);

		eventMapChip.event = "階段";
		eventMapChip.chip = MapChip.Stairs;

		this.getEventMapData().push(eventMapChip);
		return;
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
