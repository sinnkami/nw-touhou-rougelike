import { Container, Graphics } from "pixi.js";
import { ISelectionSkillInfo, IWindowSelectionSkillOption } from "../../definitions/class/Window/IWindowSelectionSkill";
import clamp from "../../modules/utils/clamp";
import GameManager from "../Manager/GameManager";
import Sprite_Frame from "../Sprite/Sprite_Frame";
import Sprite_Mask from "../Sprite/Sprite_Mask";
import Sprite_PartyPlaningPlaceMenuInfo from "../Sprite/Sprite_PartyPlaningPlaceMenuInfo";
import Sprite_Selected from "../Sprite/Sprite_Selected";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Window_Base from "./Window_Base";

// 項目1つの高さ
const MENU_HEIGHT = 60;

// ウィンドウに引っ掛からないようにするための余白
const PADDHING = 10;

export default class Window_SelectionSkill extends Window_Base {
	private skillMenuInfoList: ISelectionSkillInfo[] = [];

	private menuId: string = "";

	private fontSize: number = 0;

	private get maxIndex(): number {
		return this.skillMenuInfoList.reduce((num: number, info: ISelectionSkillInfo) => Math.max(num, info.index), 0);
	}

	private selection: number = 0;
	private get maxSelection(): number {
		return Math.floor((this.height - PADDHING * 2) / MENU_HEIGHT) - 1;
	}

	private selectSprite: Sprite_Selected = new Sprite_Selected();

	private skillContaiter: Container = new Container();

	public init(option: IWindowSelectionSkillOption): void {
		super.init(option);

		this.skillMenuInfoList = option.list;
		this.menuId = this.skillMenuInfoList[0].menuId;

		this.fontSize = option.fontSize;
		return;
	}

	public async setSprite(): Promise<void> {
		super.setContainer();
		const container = this.getContainer();

		// 初期座標
		container.setTransform(this.x, this.y);

		container.width = this.width;
		container.height = this.height;

		// 背景
		const PartyBackgroundImageRender = new Sprite_Frame();
		await PartyBackgroundImageRender.init({
			x: 0,
			y: 0,
			width: this.width,
			height: this.height,
			path: `menu-background`,
		});
		await PartyBackgroundImageRender.setSprite();
		container.addChild(PartyBackgroundImageRender.getContainer());

		// 選択窓
		this.selectSprite.init({
			x: PADDHING,
			y: PADDHING,
			width: this.width - PADDHING * 2,
			height: MENU_HEIGHT,
		});
		await this.selectSprite.setSprite();
		this.selectSprite.setZIndex(100);
		container.addChild(this.selectSprite.getContainer());

		// スキル情報
		for (const menuInfo of this.skillMenuInfoList) {
			const sprite = new Sprite_Text();

			const x = PADDHING;
			const y = PADDHING + MENU_HEIGHT * menuInfo.index;
			const width = this.width - PADDHING * 2;
			const height = MENU_HEIGHT;

			await sprite.init({
				x,
				y,
				width,
				height,
				text: menuInfo.skill.name,
				fontSize: this.fontSize,
			});
			await sprite.setSprite();

			const spriteContainer = sprite.getContainer();
			this.skillContaiter.addChild(spriteContainer);
		}

		// マスクをかけることで範囲外を表示しないように
		const mask = new Graphics();
		this.skillContaiter.addChild(mask);
		mask.beginFill(0)
			.drawRect(PADDHING, PADDHING, this.width - PADDHING * 2, this.height - PADDHING * 2)
			.endFill();
		this.skillContaiter.mask = mask;

		container.addChild(this.skillContaiter);
	}

	/**
	 * 更新処理
	 * @override
	 */
	public update(): void {
		// super.update();
		this.selectSprite.update();
	}

	public getCurrentMenu(): ISelectionSkillInfo {
		const info = this.skillMenuInfoList.find(v => v.menuId === this.menuId);
		if (!info) throw new Error("存在しない項目です");
		return info;
	}

	public changeMenu(index: number): void {
		if (this.isAnimation) return;

		// 移動出来ないようにする時間
		this.nextUpdateFrame = GameManager.loop.frameCount + 10;

		const currentMenu = this.getCurrentMenu();

		// 選択窓を移動
		const beforeSelection = this.selection;
		this.selection = clamp(this.selection + index, 0, this.maxSelection);
		if (beforeSelection === this.selection) {
			this.scrollMenuList(index);
		}

		// 現在選択されている項目を変更
		let next = currentMenu.index + index;
		if (next < 0) {
			// 最初の項目で上を入力した際に最後へ移動
			next = this.maxIndex;
			this.selection = this.maxSelection;
			this.scrollLastMenu();
		}
		if (next > this.maxIndex) {
			// 最後の項目で下を入力した際に最初へ移動
			next = 0;
			this.selection = 0;
			this.scrollFirstMenu();
		}

		const selectSprite = this.selectSprite.getContainer();
		selectSprite.y = PADDHING + MENU_HEIGHT * this.selection;

		const nextMenu = this.getMenu(next);
		this.menuId = nextMenu.menuId;
	}

	private getMenu(index: number): ISelectionSkillInfo {
		const info = this.skillMenuInfoList.find(v => v.index === index);
		if (!info) throw new Error("存在しない項目です");
		return info;
	}

	private scrollMenuList(index: number): void {
		const height = MENU_HEIGHT * index;

		const skillContaiter = this.skillContaiter;
		const mask = skillContaiter.mask;
		if (mask && "y" in mask) {
			skillContaiter.y -= height;
			mask.y += height;
		}
	}

	private scrollFirstMenu(): void {
		const skillContaiter = this.skillContaiter;
		const mask = skillContaiter.mask;
		if (mask && "y" in mask) {
			skillContaiter.y = 0;
			mask.y = 0;
		}
	}

	private scrollLastMenu(): void {
		const height = MENU_HEIGHT * (this.maxIndex - this.maxSelection);

		const skillContaiter = this.skillContaiter;
		const mask = skillContaiter.mask;
		if (mask && "y" in mask) {
			skillContaiter.y = -height;
			mask.y = height;
		}
	}
}
