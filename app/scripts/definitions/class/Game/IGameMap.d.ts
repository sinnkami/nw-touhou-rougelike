import { MapChip } from "../../../class/Const";

export interface IGameMapData {
	x: number;
	y: number;
	chip: MapChip;
}

export interface IGameEventMapData extends IGameMapData {
	name: string;
	//TODO: クラスを指定
	event?: any;
}
