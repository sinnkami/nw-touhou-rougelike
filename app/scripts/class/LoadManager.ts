import { Graphics } from "@pixi/graphics";
import { Sprite } from "@pixi/sprite";
import { CommonConstruct } from "./Construct/CommonConstruct";
import GameManager from "./GameManager";

const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

export default class LoadManager {
	private static loadingList: string[] = [];

	private static loadingSprite: Graphics = new Graphics();

	public static get isLoading(): boolean {
		return !!this.loadingList.length;
	}

	public static init(): Promise<void> {
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

	public static async start(name: string): Promise<void> {
		this.loadingList.push(name);
		this.loadingSprite.visible = true;
		await sleep(1);
	}

	public static async complete(name: string): Promise<void> {
		this.loadingList = this.loadingList.filter(v => v !== name);
		this.loadingSprite.visible = false;
		await sleep(1);
	}
}
