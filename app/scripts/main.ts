import DebugManager from "./class/DebugManager";
import GameManager from "./class/GameManager";
import SceneManager from "./class/SceneManager";

window.onload = () => {
	DebugManager.init();
	SceneManager.init();
	GameManager.init();
	GameManager.loop.gameStart();
};

export {};
