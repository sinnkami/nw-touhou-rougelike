import { Room } from "rot-js/lib/map/features";
import Uniform from "rot-js/lib/map/uniform";
import { ICharacterPosition } from "../../definitions/class/Game/IGameCharacter";
import { IGameEventMapData, IGameMapData } from "../../definitions/class/Game/IGameMap";
import { CommonConstruct, MapChip } from "../Construct/CommonConstruct";
import EventChipName from "../Construct/EventChipName";
import { EventCode } from "../Manager/EventManager";
import { Game_Base } from "./Game_Base";

/** 画面外を表示しないための壁サイズ */
const WALL_ZONE_SIZE = CommonConstruct.wallZoneSize;
/** マップの最大サイズ */
const MAP_SIZE = CommonConstruct.mapSize;
/** 部屋の最小・最大サイズ */
const ROOM_SIZE = CommonConstruct.roomSize;

/**
 * ゲーム内マップに関する情報を保持するクラス
 */
export class Game_Map extends Game_Base {
	// マップ名
	private name: string = "";
	// ダンジョン内に存在する部屋一覧
	private rooms: Room[] = [];

	// ダンジョンのマップ情報一覧
	private baseMap: IGameMapData[] = [];
	// イベントタイル一覧
	private eventMap: IGameEventMapData[] = [];

	public constructor() {
		super();
		this.initMapData();
	}

	/**
	 * マップ情報の初期化処理
	 */
	public initMapData(): void {
		this.baseMap = [];
		this.eventMap = [];
	}

	/**
	 * ダンジョン名を取得
	 * @returns ダンジョン名
	 */
	public getName(): string {
		return this.name;
	}

	/**
	 * ダンジョン名を設定
	 * @param name
	 */
	public setName(name: string): void {
		this.name = name;
	}

	/**
	 * 現在のマップ情報一覧を取得
	 * @returns マップ情報一覧
	 */
	public getMapData(): IGameMapData[] {
		return this.baseMap;
	}

	/**
	 * イベントタイル一覧を取得
	 * @returns イベントタイル一覧
	 */
	public getEventMapData(): IGameEventMapData[] {
		return this.eventMap;
	}

	/**
	 * 指定された位置のマップ情報を取得
	 * @param x
	 * @param y
	 * @returns マップ情報 | undefined
	 */
	public getMapChip(x: number, y: number): IGameMapData | undefined {
		const mapDataList = this.getMapData();
		return mapDataList.find(v => v.x === x && v.y === y);
	}

	/**
	 * 指定された位置のイベントタイルを取得
	 * @param x
	 * @param y
	 * @returns イベントタイル | undefined
	 */
	public getEventMapChip(x: number, y: number): IGameEventMapData | undefined {
		const mapDataList = this.getEventMapData();
		return mapDataList.find(v => v.x === x && v.y === y);
	}

	/**
	 * ダンジョン内に存在する部屋をランダムに取得
	 * @returns 部屋情報
	 */
	public getRandomRoom(): Room {
		if (!this.rooms.length) throw new Error("not map");
		return this.rooms[Math.floor(Math.random() * this.rooms.length)];
	}

	/**
	 * ダンジョン内のランダムな場所を取得
	 * MEMO: 通路は含まれない
	 * MEMO: 取得できなかった場合はもう一度処理を行う
	 * @returns
	 */
	public getRandomPosition(): ICharacterPosition {
		const room = this.getRandomRoom();

		const x = Math.floor(Math.random() * (room.getLeft() + 1 - room.getRight())) + room.getRight() + WALL_ZONE_SIZE;
		const y =
			Math.floor(Math.random() * (room.getTop() + 1 - room.getBottom())) + room.getBottom() + WALL_ZONE_SIZE;

		const mapChip = this.getMapChip(x, y);
		if (mapChip && mapChip.chip === MapChip.Road) {
			return { x, y };
		} else {
			return this.getRandomPosition();
		}
	}

	/**
	 * マップ情報を設定
	 * @param mapData
	 */
	public setMapData(mapData: IGameMapData[]): void {
		this.baseMap = mapData;
	}

	/**
	 * マップ情報をrot.jsを用いて生成する
	 * @returns
	 */
	public createMapData(): IGameMapData[] {
		const map = new Uniform(MAP_SIZE.width, MAP_SIZE.height, {
			roomWidth: ROOM_SIZE.width,
			roomHeight: ROOM_SIZE.height,
		});

		const mapData: IGameMapData[] = [];
		for (let y = 0; y <= MAP_SIZE.height + WALL_ZONE_SIZE * 2; y++) {
			for (let x = 0; x <= MAP_SIZE.width + WALL_ZONE_SIZE * 2; x++) {
				mapData.push({
					x,
					y,
					chip: MapChip.Wall,
				});
			}
		}

		map.create((x, y, content) => {
			x += WALL_ZONE_SIZE;
			y += WALL_ZONE_SIZE;
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

	/**
	 * 階段を設定する
	 * @returns
	 */
	public setStairs(): void {
		const { x, y } = this.getRandomPosition();
		const mapChip = this.getMapChip(x, y);
		if (!mapChip || this.getEventMapChip(x, y)) {
			return this.setStairs();
		}

		const eventMapChip: IGameEventMapData = Object.assign({}, mapChip, {
			name: EventChipName.Stairs,
			event: EventCode.Stairs,
			chip: MapChip.Stairs,
		});

		this.getEventMapData().push(eventMapChip);
		return;
	}
}
