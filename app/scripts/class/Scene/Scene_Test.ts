import { CanvasLayer } from "../Const";
import DebugManager from "../DebugManager";
import GameManager from "../GameManager";
import Sprite_Test from "../Sprite/Sprite_Test";
import Scene_Base from "./Scene_Base";

export default class Scene_Test extends Scene_Base {
	public startScene(): Promise<void> {
		return super.startScene().then(() => {
			const canvas = GameManager.getCanvas(CanvasLayer.Background);
			for (let x = 0; x <= 832; x += 32) {
				for (let y = 0; y <= 640; y += 32) {
					const render = new Sprite_Test(x, y);
					canvas.addRender(render);
				}
			}
			this.setInterval(this.updateScene);
		});
	}

	public updateScene(): Promise<void> {
		return super.updateScene().then(() => {
			const canvas = GameManager.getCanvas(CanvasLayer.Background);
			canvas.clearAllRender();
			canvas.update();

			DebugManager.updateStats();
		});
	}

	public stopScene(): Promise<void> {
		return Promise.resolve()
			.then(() => {
				this.clearInterval();
			})
			.then(super.stopScene);
	}
}
