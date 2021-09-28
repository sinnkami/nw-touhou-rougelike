import { IMenuInfo } from "../../definitions/class/Construct/IMenu";

export enum LobbyMenuId {
	ReturnTitle = "returnTitle",
	Dungeon = "Dungeon",
}
export const LobbyMenuList: IMenuInfo[] = [
	{ menuId: LobbyMenuId.Dungeon, name: "ダンジョンへ" },
	{ menuId: LobbyMenuId.ReturnTitle, name: "タイトルへ戻る" },
	{ menuId: LobbyMenuId.Dungeon, name: "test1", dungeonId: "0001" },
	{ menuId: LobbyMenuId.Dungeon, name: "test2", dungeonId: "0002" },
	{ menuId: LobbyMenuId.Dungeon, name: "test3" },
	{ menuId: LobbyMenuId.Dungeon, name: "test4" },
	{ menuId: LobbyMenuId.Dungeon, name: "test5" },
	{ menuId: LobbyMenuId.Dungeon, name: "test6" },
	{ menuId: LobbyMenuId.Dungeon, name: "test7" },
	{ menuId: LobbyMenuId.Dungeon, name: "test8" },
	{ menuId: LobbyMenuId.Dungeon, name: "test9" },
	{ menuId: LobbyMenuId.Dungeon, name: "test10" },
	{ menuId: LobbyMenuId.Dungeon, name: "test11" },
	{ menuId: LobbyMenuId.Dungeon, name: "test12" },
];
