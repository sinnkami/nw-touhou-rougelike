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
			GameManager.map.createMapData();

			// for (let y = 0; y <= 640 / 32; y++) {
			// 	if (!Array.isArray(mapData[y])) {
			// 		mapData[y] = [];
			// 	}
			// 	for (let x = 0; x <= 832 / 32; x++) {
			// 		mapData[y][x] = 1;
			// 	}
			// }

			const GamePlayer = GameManager.player;
			const position = GameManager.map.getRandomPosition();
			GamePlayer.setPosition(position.x, position.y);

			// MEMO: キャラを中心に表示する
			// MEMO: 現在地と中心点の差分を見て調節を行う
			const [x, y] = [
				Const.size.width / 32 / 2 - GameManager.player.getPosition().x - 1,
				Const.size.height / 32 / 2 - GameManager.player.getPosition().y,
			];
			const MapRender = new Sprite_Map();
			await MapRender.init(MAP_PATH, x, y);
			this.renderList.push(() => MapRender.update());

			const PlayerRender = new Sprite_Character();
			await PlayerRender.init(CHARACTER_PATH, Const.size.width / 32 / 2 - 1, Const.size.height / 32 / 2);
			this.renderList.push(() => PlayerRender.update());

			this.renderList.push(() => {
				const GameInput = GameManager.input;
				const speed = 1;

				let x = 0;
				let y = 0;

				console.log(PlayerRender.isAnimation, MapRender.isAnimation);
				if (PlayerRender.isAnimation || MapRender.isAnimation) {
					return;
				}

				// TODO: ローグライクで斜め移動ってだめでは・・・？
				if (GameInput.isPushedKey(KeyCode.Up)) {
					y -= speed;
				}

				if (GameInput.isPushedKey(KeyCode.Down)) {
					y += speed;
				}

				if (GameInput.isPushedKey(KeyCode.Right)) {
					x += speed;
				}

				if (GameInput.isPushedKey(KeyCode.Left)) {
					x -= speed;
				}

				const flag = GamePlayer.move(x, y);
				if (flag) {
					MapRender.move(x, y);
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
		});
	}

	public updateScene(): void {
		super.updateScene();
		this.renderList.forEach(render => render());
		return;
	}
}
