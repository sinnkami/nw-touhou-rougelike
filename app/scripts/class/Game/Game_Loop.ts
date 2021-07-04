import DebugManager from "../DebugManager";
import GameManager from "../GameManager";
import SceneManager from "../SceneManager";
import { Game_Base } from "./Game_Base";

export class Game_Loop extends Game_Base {
	private isLoop = false;

	public frameCount = 0;

	public init(): void {
		this.gameStart();
	}

	public gameStart(): void {
		this.isLoop = true;
		SceneManager.startScene();
		requestAnimationFrame(this.gameLoop.bind(this));
	}

	public gameStop(): void {
		this.isLoop = false;
	}

	private gameLoop(): void {
		if (!this.isLoop) return;

		this.incrementFrame();
		DebugManager.updateStats();
		GameManager.getCanvas().update();
		Promise.all([SceneManager.updateScene()]).then(() => {
			requestAnimationFrame(this.gameLoop.bind(this));
		});
	}

	private incrementFrame(): void {
		this.frameCount++;
	}
}
