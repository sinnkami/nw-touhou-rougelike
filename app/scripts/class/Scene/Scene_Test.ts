import GameManager from "../GameManager";
import Sprite_Base from "../Sprite/Sprite_Base";
import Sprite_Map from "../Sprite/Sprite_Map";
import Scene_Base from "./Scene_Base";

export default class Scene_Test extends Scene_Base {
	public renderList: Sprite_Base[] = [];

	public startScene(): void {
		super.startScene();

		const PATH = "assets/images/test.png";

		const mapData: number[][] = [];

		for (let y = 0; y <= 640; y += 32) {
			if (!Array.isArray(mapData[y])) {
				mapData[y] = [];
			}
			for (let x = 0; x <= 832; x += 32) {
				mapData[y][x] = 1;
			}
		}
		const render = new Sprite_Map(PATH, mapData);
		this.renderList.push(render);
	}

	public updateScene(): void {
		this.renderList.forEach(render => {
			render.update();
		});

		return;
	}
}
