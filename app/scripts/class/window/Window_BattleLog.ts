import { Container } from "pixi.js";
import { IWindowBattleLogOption } from "../../definitions/class/Window/IWindowBattleLog";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import Sprite_Frame from "../Sprite/Sprite_Frame";
import { Sprite_Text } from "../Sprite/Sprite_Text";
import Window_Base from "./Window_Base";

export default class Window_BattleLog extends Window_Base {
	private battleLogList: string[] = [];

	private fontSize: number = 0;

	// 何処まで追加されているか
	private addedIndex: number = 0;

	private battleLogContainer: Container = new Container();

	public init(option: IWindowBattleLogOption): void {
		super.init(option);

		this.battleLogList = option.logList;

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

		this.battleLogContainer = new Container();
		this.battleLogContainer.setTransform(20, 20);
		container.addChild(this.battleLogContainer);
	}

	/**
	 * 更新処理
	 * @override
	 */
	public update(): void {
		this.clearText();
		for (const text of this.battleLogList) {
			this.addText(text);
			this.addedIndex++;
		}
		super.update();
	}

	public async addText(text: string): Promise<void> {
		const sprite = new Sprite_Text();
		sprite.init({
			x: 0,
			y: 25 * this.addedIndex,
			width: this.width,
			height: this.height,
			fontSize: this.fontSize,
			text,
		});
		await sprite.setSprite();

		this.battleLogContainer.addChild(sprite.getContainer());
	}

	public clearText(): void {
		const container = this.battleLogContainer;
		container.removeChildren();
		this.addedIndex = 0;
	}
}
