import sleep from "../../modules/utils/sleep";
import Sprite_Mask from "../Sprite/Sprite_Mask";

export default class LoadManager {
	private static loadingList: string[] = [];

	private static mask: Sprite_Mask = new Sprite_Mask();

	public static get isLoading(): boolean {
		return !!this.loadingList.length;
	}

	public static async init(): Promise<void> {
		// ローディング中に表示する内容
		this.mask.init({
			name: "loading",
			x: 0,
			y: 0,
		});

		await this.mask.setSprite();

		this.mask.setZIndex(9999);

		this.mask.hide();

		return Promise.resolve();
	}

	public static async start(name: string): Promise<boolean> {
		console.log(this.mask);
		this.loadingList.push(name);
		this.mask.show();
		await sleep(1);
		return true;
	}

	public static async complete(name: string): Promise<boolean> {
		this.loadingList = this.loadingList.filter(v => v !== name);
		this.mask.hide();
		await sleep(1);
		return true;
	}
}
