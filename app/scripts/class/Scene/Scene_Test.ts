import GameManager from "../GameManager";
import Sprite_Base from "../Sprite/Sprite_Base";
import Sprite_Test from "../Sprite/Sprite_Test";
import Scene_Base from "./Scene_Base";

export default class Scene_Test extends Scene_Base {
	public renderList: Sprite_Base[] = [];

	public startScene(): Promise<void> {
		return super.startScene().then(() => {
			const canvas = GameManager.getCanvas();
			for (let x = 0; x <= 832; x += 32) {
				for (let y = 0; y <= 640; y += 32) {
					const render = new Sprite_Test(x, y);
					canvas.addRender(render.getSprite());
					this.renderList.push(render);
				}
			}
		});
	}

	public updateScene(): Promise<void> {
		if (GameManager.frameCount % 120 !== 0) return Promise.resolve();

		const promiseList = this.renderList.map(render => {
			console.log("aaa");
			return render.update.bind(render);
		});
		return Promise.all(promiseList.map(v => v())).then();
	}

	public stopScene(): Promise<void> {
		return Promise.resolve()
			.then(() => {
				this.clearInterval();
			})
			.then(super.stopScene);
	}
}
