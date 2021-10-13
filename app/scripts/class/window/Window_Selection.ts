import { Container } from "@pixi/display";
import { ISelectionInfo } from "../../definitions/class/Window/IWindowSelection";
import { LobbyMenuId } from "../Construct/MenuConstruct";
import EventManager, { EventCode } from "../Manager/EventManager";
import GameManager from "../Manager/GameManager";
import ResourceManager from "../Manager/ResourceManager";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Window_Base from "./Window_Base";

export default class Window_Selection extends Window_Base {
	private selectionList: ISelectionInfo[] = [];

	private get maxIndex(): number {
		return this.selectionList.reduce((num: number, info: ISelectionInfo) => Math.max(num, info.index), 0);
	}

	private selectionId: string = "";

	// public init(option: { backgroundImagePath: string }): void {
	// 	super.init({});
	// 	this.backgroundImagePath = option.backgroundImagePath;
	// }

	public async setSprite(): Promise<void> {
		super.setContainer();
		const container = this.getContainer();

		// TODO: indexがずれると内容がずれる

		this.selectionList.push({
			selectionId: LobbyMenuId.Dungeon + 1,
			index: 0,
			text: "テストダンジョン",
		});
		this.selectionList.push({
			selectionId: LobbyMenuId.Dungeon + 2,
			index: 1,
			text: "ほげ～ダンジョン",
		});
		this.selectionList.push({
			selectionId: LobbyMenuId.ReturnTitle,
			index: 2,
			text: "タイトルへ戻る",
		});

		// 初期座標
		container.setTransform(this.x, this.y);

		this.selectionId = this.selectionList[0].selectionId;

		for (const selection of this.selectionList) {
			const sprite = new Sprite_Text();
			await sprite.init({
				text: selection.text,
				x: this.x,
				y: (this.y + 25) * selection.index,
				width: this.width,
				height: this.height,
				fontSize: 25,
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

		console.log(nextIndex, this.maxIndex);
		if (nextIndex < 0) {
			nextIndex = this.maxIndex;
		} else if (nextIndex > this.maxIndex) {
			nextIndex = 0;
		}

		const nextSelection = this.getSelection(nextIndex);

		const container = this.getContainer();
		container.children.forEach((sprite, index) => {
			// x軸
			sprite.x = this.x;
			// (y軸 + fontSize) * (index - 次のindex)
			sprite.y = (this.y + 25) * (index - nextIndex);
		});

		this.selectionId = nextSelection.selectionId;
	}

	private getSelection(index: number): ISelectionInfo {
		const info = this.selectionList.find(v => v.index === index);
		if (!info) throw new Error("存在しない項目です");
		return info;
	}
}
