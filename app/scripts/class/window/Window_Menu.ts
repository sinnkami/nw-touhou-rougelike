import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { IMenuInfo } from "../../definitions/class/Window/IWindowMenu";
import { CommonConstruct } from "../Construct/CommonConstruct";
import { LobbyMenuId } from "../Construct/MenuConstruct";
import EventManager, { EventCode } from "../Manager/EventManager";
import GameManager from "../Manager/GameManager";
import ResourceManager from "../Manager/ResourceManager";
import Sprite_Selected from "../Sprite/Sprite_Selected";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Window_Base from "./Window_Base";

export default class Window_Menu extends Window_Base {
	private menuList: IMenuInfo[] = [];

	private maxX: number = 0;
	private maxY: number = 0;

	private menuId: string = "";

	private selectSprite: Sprite_Selected = new Sprite_Selected();

	public init(): void {
		return;
	}

	public async setSprite(): Promise<void> {
		super.setContainer();
		const container = this.getContainer();

		this.menuList.push({
			menuId: "test1",
			text: "テスト1",
			x: 0,
			y: 0,
		});
		this.menuList.push({
			menuId: "test2",
			text: "テスト2",
			x: 1,
			y: 0,
		});
		this.menuList.push({
			menuId: "test3",
			text: "テスト3",
			x: 2,
			y: 0,
		});
		this.menuList.push({
			menuId: "test4",
			text: "テスト4",
			x: 3,
			y: 0,
		});
		this.menuList.push({
			menuId: "test5",
			text: "テスト5",
			x: 0,
			y: 1,
		});
		this.menuList.push({
			menuId: "test6",
			text: "テスト6",
			x: 1,
			y: 1,
		});
		this.menuList.push({
			menuId: "test7",
			text: "テスト7",
			x: 2,
			y: 1,
		});
		this.menuList.push({
			menuId: "test8",
			text: "テスト8",
			x: 3,
			y: 1,
		});

		// 初期座標
		container.setTransform(0, 0);

		this.selectSprite.init({
			x: 0,
			y: 0,
			width: CommonConstruct.size.width / 4,
			height: 30 + 25,
		});
		await this.selectSprite.setSprite();
		this.selectSprite.setZIndex(10);
		container.addChild(this.selectSprite.getContainer());

		this.menuId = this.menuList[0].menuId;

		for (const menu of this.menuList) {
			const sprite = new Sprite_Text();
			await sprite.init({
				text: menu.text,
				// x * (サイズ) + margin
				x: menu.x * (CommonConstruct.size.width / 4 + 0),
				y: menu.y * (55 + 0),
				width: CommonConstruct.size.width / 4,
				height: 30,
				fontSize: 25,
				isBackground: true,
				backgroundImagePath: "menu-background",
			});
			await sprite.setSprite();

			this.maxX = Math.max(menu.x, this.maxX);
			this.maxY = Math.max(menu.y, this.maxY);

			const spriteContainer = sprite.getContainer();
			container.addChild(spriteContainer);
		}
	}

	/**
	 * 更新処理
	 * @override
	 */
	public update(): void {
		// super.update();
		this.selectSprite.update();
	}

	public getCurrentMenu(): IMenuInfo {
		const info = this.menuList.find(v => v.menuId === this.menuId);
		if (!info) throw new Error("存在しない項目です");
		return info;
	}

	public changeMenu(x: number, y: number): void {
		if (this.isAnimation) return;

		// 移動出来ないようにする時間
		this.nextUpdateFrame = GameManager.loop.frameCount + 10;

		const currentMenu = this.getCurrentMenu();

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

		const nextMenu = this.getMenu(nextX, nextY);

		const selectSprite = this.selectSprite.getContainer();

		selectSprite.x = nextMenu.x * (CommonConstruct.size.width / 4 + 0);
		selectSprite.y = nextMenu.y * (55 + 0);
		this.menuId = nextMenu.menuId;
	}

	private getMenu(x: number, y: number): IMenuInfo {
		const info = this.menuList.find(v => v.x === x && v.y === y);
		if (!info) throw new Error("存在しない項目です");
		return info;
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
