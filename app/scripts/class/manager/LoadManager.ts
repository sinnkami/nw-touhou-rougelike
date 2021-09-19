import { Graphics } from "@pixi/graphics";
import sleep from "../../modules/utils/sleep";
import { CommonConstruct } from "../Construct/CommonConstruct";
import GameManager from "./GameManager";

export default class LoadManager {
	private static loadingList: string[] = [];

	private static loadingSprite: Graphics = new Graphics();

	public static get isLoading(): boolean {
		return !!this.loadingList.length;
	}

	public static init(): Promise<void> {
		// ローディング中に表示する内容
		this.loadingSprite.name = "loading";
		this.loadingSprite.zIndex = 9999;
		this.loadingSprite.beginFill(0x000000);
		this.loadingSprite.drawRect(0, 0, CommonConstruct.size.width, CommonConstruct.size.height);
		this.loadingSprite.endFill();
		this.loadingSprite.alpha = 0.8;
		this.loadingSprite.visible = false;

		GameManager.getCanvas().addRender(this.loadingSprite);

		return Promise.resolve();
	}

	public static async start(name: string): Promise<boolean> {
		this.loadingList.push(name);
		this.loadingSprite.visible = true;
		await sleep(1);
		return true;
	}

	public static async complete(name: string): Promise<boolean> {
		this.loadingList = this.loadingList.filter(v => v !== name);
		this.loadingSprite.visible = false;
		await sleep(1);
		return true;
	}
}
