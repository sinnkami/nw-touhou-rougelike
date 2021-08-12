import { MapChip } from "../../../class/Const";
import { Event_Base } from "../../../class/Event/Event_Base";

/** マップチップの情報 */
export interface IGameMapData {
	x: number;
	y: number;
	chip: MapChip;
}

/** イベントタイルの情報 */
export interface IGameEventMapData extends IGameMapData {
	name: string;
	event?: Event_Base;
}
