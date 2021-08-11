import { MapChip } from "../../../class/Const";

/** マップチップの情報 */
export interface IGameMapData {
	x: number;
	y: number;
	chip: MapChip;
}

/** イベントタイルの情報 */
export interface IGameEventMapData extends IGameMapData {
	name: string;
	//TODO: クラスを指定
	event?: any;
}
