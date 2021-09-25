import { Container } from "@pixi/display";
import { LobbyMenuId, lobbyMenuList } from "../Construct/MenuConstruct";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Window_Base from "./Window_Base";

export default class Window_LobbyMenuSelection extends Window_Base {
	private menuId: LobbyMenuId = LobbyMenuId.Dungeon;
	private container = new Container();

	public async init(): Promise<void> {
		// TODO: 初期化処理
	}

	public async setSprite(): Promise<void> {
		for (const [index, menu] of lobbyMenuList.entries()) {
			const sprite = new Sprite_Text();
			await sprite.init({
				text: `${menu.menuId} - ${menu.name}`,
				x: 10,
				y: 10,
				width: 300,
				height: 30,
				fontSize: 25,
			});
		}
	}
}
