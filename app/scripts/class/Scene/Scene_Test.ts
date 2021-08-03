import { IGameMapData } from "../../definitions/class/Game/IGameMap";
import Const, { EventName, KeyCode } from "../Const";
import GameManager from "../GameManager";
import ResourceManager from "../ResourceManager";
import Sprite_Character from "../Sprite/Sprite_Character";
import Sprite_Map from "../Sprite/Sprite_Map";
import Scene_Base from "./Scene_Base";

export default class Scene_Test extends Scene_Base {
	public renderList: Array<() => void> = [];

	public startScene(): void {
		super.startScene();

		const MAP_PATH = "assets/images/map/chip.png";
		const CHARACTER_PATH = "assets/images/character/ReimuHakurei.png";

		ResourceManager.loadResources([MAP_PATH, CHARACTER_PATH]).then(async () => {
			GameManager.map.createMapData()

			// for (let y = 0; y <= 640 / 32; y++) {
			// 	if (!Array.isArray(mapData[y])) {
			// 		mapData[y] = [];
			// 	}
			// 	for (let x = 0; x <= 832 / 32; x++) {
			// 		mapData[y][x] = 1;
			// 	}
			// }

			const MapRender = new Sprite_Map();
			await MapRender.init(MAP_PATH);

			const GamePlayer = GameManager.player;
			const position = GameManager.map.getRandomPosition();
			GamePlayer.setPosition(position.x, position.y);

			const PlayerRender = new Sprite_Character();
			await PlayerRender.init(CHARACTER_PATH, 0, 0);
			// await PlayerRender.init(CHARACTER_PATH, position.x, position.y);

			// MEMO: キャラを中心に表示する
			// MEMO: 現在地と中心点の差分を見て調節を行う
			const [x, y] = [
				Const.size.width / 32 / 2 - GameManager.player.getPosition().x - 1,
				Const.size.height / 32 / 2 - GameManager.player.getPosition().y,
			];
			PlayerRender.move(Const.size.width / 32 / 2 - 1, Const.size.height / 32 / 2);
			MapRender.move(x, y);

			this.renderList.push(() => {
				const GameInput = GameManager.input;
				const speed = 1;
				if (GameInput.isPushedKey(KeyCode.UP)) {
					const key = GameInput.getKey(KeyCode.UP);
					const flag = GamePlayer.move(0, -speed);
					if (flag) {
						MapRender.update(0, speed);
						PlayerRender.update(0, speed);
					}
				}

				if (GameInput.isPushedKey(KeyCode.DOWN)) {
					const key = GameInput.getKey(KeyCode.DOWN);
					const flag = GamePlayer.move(0, speed);
					if (flag) {
						MapRender.update(0, -speed);
						PlayerRender.update(0, -speed);
					}
				}

				if (GameInput.isPushedKey(KeyCode.RIGHT)) {
					const key = GameInput.getKey(KeyCode.RIGHT);
					const flag = GamePlayer.move(speed, 0);
					if (flag) {
						MapRender.update(-speed, 0);
						PlayerRender.update(-speed, 0);
					}
				}

				if (GameInput.isPushedKey(KeyCode.LEFT)) {
					const key = GameInput.getKey(KeyCode.LEFT);
					const flag = GamePlayer.move(-speed, 0);
					if (flag) {
						MapRender.update(speed, 0);
						PlayerRender.update(speed, 0);
					}
				}

				if (GameInput.isPushedKey(KeyCode.Select)) {
					const key = GameInput.getKey(KeyCode.Select);
					const position = GamePlayer.getPosition();
					const eventChip = GameManager.map.getEventMapChip(position.x, position.y);
					if (eventChip) {
						console.log(eventChip.name, eventChip.event);
					}
				}
			});
			this.renderList.push(() => PlayerRender.animation());
		});
	}

	public updateScene(): void {
		this.renderList.forEach(render => render());
		return;
	}
}
