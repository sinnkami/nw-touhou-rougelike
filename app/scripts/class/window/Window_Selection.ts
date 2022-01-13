import { IWindowSelectionOption, ISelectionInfo } from "../../definitions/class/Window/IWindowSelection";
import GameManager from "../Manager/GameManager";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Window_Base from "./Window_Base";

export default class Window_Selection extends Window_Base {
	private selectionList: ISelectionInfo[] = [];

	private fontSize: number = 0;

	private get maxIndex(): number {
		return this.selectionList.reduce((num: number, info: ISelectionInfo) => Math.max(num, info.index), 0);
	}

	private selectionId: string = "";

	public init(option: IWindowSelectionOption): void {
		super.init(option);

		this.fontSize = option.fontSize;

		this.selectionList = option.list;
		this.selectionId = this.selectionList[0].selectionId;
	}

	public async setSprite(): Promise<void> {
		super.setContainer();
		const container = this.getContainer();

		// 初期座標
		container.setTransform(this.x, this.y);

		for (const selection of this.selectionList) {
			const sprite = new Sprite_Text();
			await sprite.init({
				text: selection.text,
				x: 0,
				y: (this.height + this.fontSize) * selection.index,
				width: this.width,
				height: this.height,
				fontSize: this.fontSize,
				isBackground: true,
				backgroundImagePath: "message-background",
			});
			await sprite.setSprite();

			const spriteContainer = sprite.getContainer();
			container.addChild(spriteContainer);
		}
	}

	public getCurrentSelection(): ISelectionInfo {
		const info = this.selectionList.find(v => v.selectionId === this.selectionId);
		if (!info) throw new Error("存在しない項目です");
		return info;
	}

	public changeMenu(index: number): void {
		if (this.isAnimation) return;

		// 移動出来ないようにする時間
		this.nextUpdateFrame = GameManager.loop.frameCount + 10;

		const currentSelection = this.getCurrentSelection();

		let nextIndex = currentSelection.index + index;
		if (nextIndex < 0) {
			nextIndex = this.maxIndex;
		} else if (nextIndex > this.maxIndex) {
			nextIndex = 0;
		}

		const nextSelection = this.getSelection(nextIndex);

		const container = this.getContainer();
		container.children.forEach((sprite, index) => {
			// x軸
			sprite.x = 0;
			// (y軸 + fontSize) * (index - 次のindex)
			sprite.y = (this.height + this.fontSize) * (index - nextIndex);
		});

		this.selectionId = nextSelection.selectionId;
	}

	private getSelection(index: number): ISelectionInfo {
		const info = this.selectionList.find(v => v.index === index);
		if (!info) throw new Error("存在しない項目です");
		return info;
	}
}
