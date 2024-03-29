import { IMenuInfo } from "../../definitions/class/Window/IWindowTargetEnemy";
import { EnemyPosition } from "../Construct/BattleConstruct";
import GameManager from "../Manager/GameManager";
import Sprite_Selected from "../Sprite/Sprite_Selected";
import Window_Base from "./Window_Base";

export default class Window_TargetEnemy extends Window_Base {
	private menuList: IMenuInfo[] = [];

	private maxOrder: number = 0;

	private menuId: string = "";

	private selectSprite: Sprite_Selected = new Sprite_Selected();

	public init(): void {
		const enemyList = GameManager.enemyParty.getEnemyPartyList();

		// 倒されていない敵をフォーカス
		const index = enemyList.findIndex(v => !v.isDead);
		const enemyPosition = EnemyPosition[enemyList.length];
		super.init({
			x: enemyPosition[index].x,
			y: enemyPosition[index].y,
			width: 270,
			height: 270,
		});

		const list = enemyList.map((enemy, index) => ({
			menuId: index.toString(),
			order: index,
			skip: enemy.isDead,
		}));
		this.menuList = list;
		this.menuId = list[index].menuId;

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
			height: this.height,
		});
		await this.selectSprite.setSprite();
		container.addChild(this.selectSprite.getContainer());

		this.menuList.forEach(menu => {
			this.maxOrder = Math.max(menu.order, this.maxOrder);
		});
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

	public changeMenu(index: number): void {
		if (this.isAnimation) return;
		const currentMenu = this.getCurrentMenu();

		let next = currentMenu.order + index;
		if (next < 0) {
			next = this.maxOrder;
		}
		if (next > this.maxOrder) {
			next = 0;
		}

		const nextMenu = this.getMenu(next);

		// 対象をスキップするか
		if (nextMenu.skip) {
			this.menuId = nextMenu.menuId;
			return this.changeMenu(index);
		}

		const enemyList = GameManager.enemyParty.getEnemyPartyList();
		const enemyPosition = EnemyPosition[enemyList.length];

		const sprite = this.getContainer();
		sprite.x = enemyPosition[nextMenu.order].x;
		sprite.y = enemyPosition[nextMenu.order].y;
		this.menuId = nextMenu.menuId;

		// 移動出来ないようにする時間
		this.nextUpdateFrame = GameManager.loop.frameCount + 10;
	}

	private getMenu(order: number): IMenuInfo {
		const info = this.menuList.find(v => v.order === order);
		if (!info) throw new Error("存在しない項目です");
		return info;
	}
}
