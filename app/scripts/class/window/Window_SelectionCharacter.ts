import { Container, Graphics } from "pixi.js";
import {
	ICharacterMenuInfo,
	IWindowPartyPlanningPlaceOption,
} from "../../definitions/class/Window/IWindowPartyPlanningPlace";
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

export default class Window_SelectionCharacter extends Window_Base {
	private characterMenuInfoList: ICharacterMenuInfo[] = [];

	private menuId: string = "";

	private fontSize: number = 0;

	private get maxIndex(): number {
		return this.characterMenuInfoList.reduce(
			(num: number, info: ICharacterMenuInfo) => Math.max(num, info.index),
			0
		);
	}

	private selection: number = 0;
	private get maxSelection(): number {
		return Math.floor((this.height - PADDHING * 2) / MENU_HEIGHT) - 1;
	}

	private selectSprite: Sprite_Selected = new Sprite_Selected();

	private characterContaiter: Container = new Container();

	public init(option: IWindowPartyPlanningPlaceOption): void {
		super.init(option);

		this.characterMenuInfoList = option.list;
		this.menuId = this.characterMenuInfoList[0].menuId;

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

		// キャラ情報
		for (const menuInfo of this.characterMenuInfoList) {
			const characterData = GameManager.character.getCharacter(menuInfo.character.characterId);

			const sprite = new Sprite_PartyPlaningPlaceMenuInfo();

			const x = PADDHING;
			const y = PADDHING + MENU_HEIGHT * menuInfo.index;
			const width = this.width - PADDHING * 2;
			const height = MENU_HEIGHT;

			await sprite.init({
				x,
				y,
				width,
				height,
				characterName: characterData.fullName,
				level: menuInfo.character.level,
				charaChipPath: `character-charaChip-${characterData.characterId}`,
			});
			await sprite.setSprite();

			const spriteContainer = sprite.getContainer();
			this.characterContaiter.addChild(spriteContainer);

			// マスクをかける場合
			if (menuInfo.isMask) {
				const mask = new Sprite_Mask();
				mask.init({
					x: 0,
					y: 0,
					width,
					height,
				});
				mask.setZIndex(10);
				await mask.setSprite();
				spriteContainer.addChild(mask.getContainer());
			}
		}

		// マスクをかけることで範囲外を表示しないように
		const mask = new Graphics();
		this.characterContaiter.addChild(mask);
		mask.beginFill(0)
			.drawRect(PADDHING, PADDHING, this.width - PADDHING * 2, this.height - PADDHING * 2)
			.endFill();
		this.characterContaiter.mask = mask;

		container.addChild(this.characterContaiter);
	}

	/**
	 * 更新処理
	 * @override
	 */
	public update(): void {
		// super.update();
		this.selectSprite.update();
	}

	public getCurrentMenu(): ICharacterMenuInfo {
		const info = this.characterMenuInfoList.find(v => v.menuId === this.menuId);
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

	private getMenu(index: number): ICharacterMenuInfo {
		const info = this.characterMenuInfoList.find(v => v.index === index);
		if (!info) throw new Error("存在しない項目です");
		return info;
	}

	private scrollMenuList(index: number): void {
		const height = MENU_HEIGHT * index;

		const characterContaiter = this.characterContaiter;
		const mask = characterContaiter.mask;
		if (mask && "y" in mask) {
			characterContaiter.y -= height;
			mask.y += height;
		}
	}

	private scrollFirstMenu(): void {
		const characterContaiter = this.characterContaiter;
		const mask = characterContaiter.mask;
		if (mask && "y" in mask) {
			characterContaiter.y = 0;
			mask.y = 0;
		}
	}

	private scrollLastMenu(): void {
		const height = MENU_HEIGHT * (this.maxIndex - this.maxSelection);

		const characterContaiter = this.characterContaiter;
		const mask = characterContaiter.mask;
		if (mask && "y" in mask) {
			characterContaiter.y = -height;
			mask.y = height;
		}
	}
}
