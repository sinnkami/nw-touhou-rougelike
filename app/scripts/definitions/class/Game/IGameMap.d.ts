import { MapChip } from "../../../class/Construct/CommonConstruct";
import { EventName } from "../../../class/Manager/EventManager";

/** マップチップの情報 */
export interface IGameMapData {
	x: number;
	y: number;
	chip: MapChip;
}

/** イベントタイルの情報 */
export interface IGameEventMapData extends IGameMapData {
	name: string;
	event: EventName;
}
