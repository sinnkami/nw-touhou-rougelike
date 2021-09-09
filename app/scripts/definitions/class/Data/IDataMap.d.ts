import { IGameEventMapData, IGameMapData } from "../Game/IGameMap";

export interface IDataMap {
	mapId: string;
	name: string;
	baseMap: IGameMapData[];
	eventMap: IGameEventMapData[];
	mapChipPath: string;
}
