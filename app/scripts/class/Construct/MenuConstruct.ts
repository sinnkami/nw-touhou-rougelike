import { IMenuInfo } from "../../definitions/class/Construct/IMenu";

export enum LobbyMenuId {
	ReturnTitle = "returnTitle",
	Dungeon = "Dungeon",
}
export const lobbyMenuList: IMenuInfo[] = [
	{ menuId: LobbyMenuId.Dungeon, name: "ダンジョンへ" },
	{ menuId: LobbyMenuId.ReturnTitle, name: "タイトルへ戻る" },
];
