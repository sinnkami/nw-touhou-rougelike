import Const, { KeyCode } from "../Const";
import GameManager from "../GameManager";
import ResourceManager from "../ResourceManager";
import Sprite_Character from "../Sprite/Sprite_Character";
import Sprite_Map from "../Sprite/Sprite_Map";
import Scene_Base from "./Scene_Base";

export default class Scene_Test extends Scene_Base {
	public renderList: Array<() => void> = [];

	public startScene(): void {
		super.startScene();

		const PATH = "assets/images/test.png";

		ResourceManager.loadResources([PATH]).then(() => {
			const mapData: number[][] = [];
			// GameManager.map.createMapData();

			for (let y = 0; y <= 640 / 32; y++) {
				if (!Array.isArray(mapData[y])) {
					mapData[y] = [];
				}
				for (let x = 0; x <= 832 / 32; x++) {
					mapData[y][x] = 1;
				}
			}

			GameManager.map.setMapData(mapData);
			const MapRender = new Sprite_Map(PATH, mapData);

			const GamePlayer = GameManager.player;
			GamePlayer.setPosition(Const.size.width / 32 / 2, Const.size.height / 32 / 2);
			const PlayerRender = new Sprite_Character(
				PATH,
				GameManager.player.getPosition().x,
				GameManager.player.getPosition().y
			);

			this.renderList.push(() => {
				const GameInput = GameManager.input;

				const speed = 1;
				if (GameInput.isPushedKey(KeyCode.UP)) {
					const key = GameInput.getKey(KeyCode.UP);
					const flag = GamePlayer.move(0, -speed);
					console.log(flag);
					if (flag) {
						MapRender.update(0, 32);
					}
				}

				if (GameInput.isPushedKey(KeyCode.DOWN)) {
					const key = GameInput.getKey(KeyCode.DOWN);
					const flag = GamePlayer.move(0, speed);
					console.log(flag);
					if (flag) {
						MapRender.update(0, -32);
					}
				}

				if (GameInput.isPushedKey(KeyCode.RIGHT)) {
					const key = GameInput.getKey(KeyCode.RIGHT);
					const flag = GamePlayer.move(speed, 0);
					console.log(flag);
					if (flag) {
						MapRender.update(-32, 0);
					}
				}

				if (GameInput.isPushedKey(KeyCode.LEFT)) {
					const key = GameInput.getKey(KeyCode.LEFT);
					const flag = GamePlayer.move(-speed, 0);
					console.log(flag);
					if (flag) {
						MapRender.update(32, 0);
					}
				}
			});
		});
	}

	public updateScene(): void {
		this.renderList.forEach(render => render());
		return;
	}
}
