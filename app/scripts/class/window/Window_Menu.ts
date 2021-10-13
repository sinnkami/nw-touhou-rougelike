import { IIWindowMenuOption, IMenuInfo } from "../../definitions/class/Window/IWindowMenu";
import GameManager from "../Manager/GameManager";
import Sprite_Selected from "../Sprite/Sprite_Selected";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Window_Base from "./Window_Base";

export default class Window_Menu extends Window_Base {
	private menuList: IMenuInfo[] = [];

	private maxX: number = 0;
	private maxY: number = 0;

	private menuId: string = "";

	private fontSize: number = 0;

	private selectSprite: Sprite_Selected = new Sprite_Selected();

	public init(option: IIWindowMenuOption): void {
		super.init(option);

		this.menuList = option.list;
		this.menuId = this.menuList[0].menuId;

		this.fontSize = option.fontSize;
		return;
	}

	public async setSprite(): Promise<void> {
		super.setContainer();
		const container = this.getContainer();

		// 初期座標
		container.setTransform(this.x, this.y);

		this.selectSprite.init({
			x: 0,
			y: 0,
			width: this.width,
			height: this.height + this.fontSize,
		});
		await this.selectSprite.setSprite();
		this.selectSprite.setZIndex(10);
		container.addChild(this.selectSprite.getContainer());

		for (const menu of this.menuList) {
			const sprite = new Sprite_Text();
			await sprite.init({
				text: menu.text,
				// x * (サイズ) + margin
				x: menu.x * (this.width + 0),
				y: menu.y * (this.height + this.fontSize + 0),
				width: this.width,
				height: this.height,
				fontSize: this.fontSize,
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

		selectSprite.x = nextMenu.x * (this.width + 0);
		selectSprite.y = nextMenu.y * (this.height + this.fontSize + 0);
		this.menuId = nextMenu.menuId;
	}

	private getMenu(x: number, y: number): IMenuInfo {
		const info = this.menuList.find(v => v.x === x && v.y === y);
		if (!info) throw new Error("存在しない項目です");
		return info;
	}
}
