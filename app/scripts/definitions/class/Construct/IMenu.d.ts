import { LobbyMenuId } from "../../../class/Construct/MenuConstruct";

export interface IMenuInfo {
	menuId: LobbyMenuId;
	name: string;
	// TODO: 仮
	[key: string]: any;
}
