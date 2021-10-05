import { Container } from "@pixi/display";
import { IMenuInfo } from "../../definitions/class/Construct/IMenu";
import { LobbyMenuId, LobbyMenuList } from "../Construct/MenuConstruct";
import EventManager, { EventCode } from "../manager/EventManager";
import GameManager from "../manager/GameManager";
import ResourceManager from "../manager/ResourceManager";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Window_Base from "./Window_Base";

export default class Window_LobbyMenuSelection extends Window_Base {
	private readonly lobbyMenuList: IMenuInfo[] = LobbyMenuList;

	private menuIndex: number = 0;

	private backgroundImagePath: string = "";

	public init(option: { backgroundImagePath: string }): void {
		this.backgroundImagePath = option.backgroundImagePath;
	}

	public async setSprite(): Promise<void> {
		super.setContainer();
		const container = this.getContainer();

		// 初期座標
		container.x = 0;
		container.y = 40;

		this.menuIndex = 0;

		for (const [index, menu] of this.lobbyMenuList.entries()) {
			const sprite = new Sprite_Text();
			await sprite.init({
				text: `${menu.menuId} - ${menu.name}`,
				x: 10 * (index + 1),
				y: (index + 1) * 55,
				width: 300,
				height: 30,
				fontSize: 25,
				isBackground: true,
				backgroundImagePath: this.backgroundImagePath,
			});
			await sprite.setSprite();

			const spriteContainer = sprite.getContainer();
			container.addChild(spriteContainer);
		}
	}

	public nextMenu(): void {
		this.changeMenu(1);
	}

	public backMenu(): void {
		this.changeMenu(-1);
	}

	public changeMenu(index: number): void {
		if (this.isAnimation) return;

		// 移動出来ないようにする時間
		this.nextUpdateFrame = GameManager.loop.frameCount + 10;

		if (this.menuIndex + index < 0) {
			this.menuIndex = this.lobbyMenuList.length - 1;
		} else if (this.menuIndex + index > this.lobbyMenuList.length - 1) {
			this.menuIndex = 0;
		} else {
			this.menuIndex += index;
		}

		const container = this.getContainer();
		// 初期値 - x軸 * index
		container.x = 0 - 10 * this.menuIndex;
		// 初期値 - y軸 * index
		container.y = 40 - 55 * this.menuIndex;
	}

	public excuteSelectMenu(): void {
		const menuInfo = this.lobbyMenuList[this.menuIndex];
		switch (menuInfo.menuId) {
			// タイトルへ戻る
			case LobbyMenuId.ReturnTitle: {
				const event = EventManager.getEvent(EventCode.Title);
				event.execute();
				return;
			}

			// ダンジョンへ突入
			case LobbyMenuId.Dungeon: {
				const event = EventManager.getEvent(EventCode.InvasionDungeon);
				const dungeonId = menuInfo.dungeonId;
				event.execute(dungeonId);
				return;
			}
		}
	}
}
