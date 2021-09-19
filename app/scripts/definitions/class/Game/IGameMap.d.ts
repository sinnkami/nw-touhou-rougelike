import { MapChip } from "../../../class/Construct/CommonConstruct";
import { EventCode } from "../../../class/manager/EventManager";

/** マップチップの情報 */
export interface IGameMapData {
	x: number;
	y: number;
	chip: MapChip;
}

/** イベントタイルの情報 */
export interface IGameEventMapData extends IGameMapData {
	name: string;
	event?: EventCode;
}
