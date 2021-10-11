import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { CommonConstruct } from "../Construct/CommonConstruct";
import { LobbyMenuId, LobbyMenuList } from "../Construct/MenuConstruct";
import EventManager, { EventCode } from "../Manager/EventManager";
import GameManager from "../Manager/GameManager";
import ResourceManager from "../Manager/ResourceManager";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Window_Base from "./Window_Base";

interface IMenuInfo {
	menuId: string;
	x: number;
	y: number;
	name: string;
}

export default class Window_Menu extends Window_Base {
	private menuList: IMenuInfo[] = [];

	private get currentMenu(): IMenuInfo | undefined {
		return this.menuList.find(v => v.menuId === this.menuId);
	}

	private maxX: number = 0;
	private maxY: number = 0;

	private menuId: string = "";

	private selectSprite: Graphics = new Graphics();

	public init(): void {
		return;
	}

	public async setSprite(): Promise<void> {
		super.setContainer();
		const container = this.getContainer();

		this.menuList.push({
			menuId: "test1",
			name: "テスト1",
			x: 0,
			y: 0,
		});
		this.menuList.push({
			menuId: "test2",
			name: "テスト2",
			x: 1,
			y: 0,
		});
		this.menuList.push({
			menuId: "test3",
			name: "テスト3",
			x: 2,
			y: 0,
		});
		this.menuList.push({
			menuId: "test4",
			name: "テスト4",
			x: 3,
			y: 0,
		});
		this.menuList.push({
			menuId: "test5",
			name: "テスト5",
			x: 0,
			y: 1,
		});
		this.menuList.push({
			menuId: "test6",
			name: "テスト6",
			x: 1,
			y: 1,
		});
		this.menuList.push({
			menuId: "test7",
			name: "テスト7",
			x: 2,
			y: 1,
		});
		this.menuList.push({
			menuId: "test8",
			name: "テスト8",
			x: 3,
			y: 1,
		});

		// 初期座標
		container.x = 0;
		container.y = 0;

		this.selectSprite.lineStyle(2, 0xfff, 1);
		this.selectSprite.drawRect(0, 0, CommonConstruct.size.width / 4, 55);
		this.selectSprite.endFill();
		this.selectSprite.zIndex = 10;
		GameManager.getCanvas().addRender(this.selectSprite);

		this.menuId = this.menuList[0].menuId;

		for (const menu of this.menuList) {
			const sprite = new Sprite_Text();
			await sprite.init({
				text: menu.name,
				// x * (サイズ) + margin
				x: menu.x * (CommonConstruct.size.width / 4 + 0),
				y: menu.y * (55 + 0),
				width: 200,
				height: 30,
				fontSize: 25,
				isBackground: true,
				backgroundImagePath: "assets/images/window/menu/red.png",
			});
			await sprite.setSprite();

			this.maxX = Math.max(menu.x, this.maxX);
			this.maxY = Math.max(menu.y, this.maxY);

			const spriteContainer = sprite.getContainer();
			container.addChild(spriteContainer);
		}
	}

	public changeMenu(x: number, y: number): void {
		if (this.isAnimation) return;

		// 移動出来ないようにする時間
		this.nextUpdateFrame = GameManager.loop.frameCount + 10;

		const currentMenu = this.currentMenu;
		if (!currentMenu) return;
		let nextX = currentMenu.x + x;
		let nextY = currentMenu.y + y;

		if (nextX < 0) {
			nextX = this.maxX;
		}
		if (nextY < 0) {
			nextY = this.maxY;
		}
		if (nextX > this.maxX) {
			nextX = 0;
		}
		if (nextY > this.maxY) {
			nextY = 0;
		}

		const nextMenu = this.menuList.find(v => v.x === nextX && v.y === nextY);
		if (!nextMenu) return;

		this.selectSprite.x = nextMenu.x * (CommonConstruct.size.width / 4 + 0);
		this.selectSprite.y = nextMenu.y * (55 + 0);
		console.log(this.selectSprite.x, this.selectSprite.y);
		this.menuId = nextMenu.menuId;
	}

	// public excuteSelectMenu(): void {
	// 	const menuInfo = this.lobbyMenuList[this.menuIndex];
	// 	switch (menuInfo.menuId) {
	// 		// タイトルへ戻る
	// 		case LobbyMenuId.ReturnTitle: {
	// 			const event = EventManager.getEvent(EventCode.Title);
	// 			event.execute();
	// 			return;
	// 		}

	// 		// ダンジョンへ突入
	// 		case LobbyMenuId.Dungeon: {
	// 			const event = EventManager.getEvent(EventCode.InvasionDungeon);
	// 			const dungeonId = menuInfo.dungeonId;
	// 			event.execute(dungeonId);
	// 			return;
	// 		}
	// 	}
	// }
}
