import DebugManager from "./class/DebugManager";
import ErrorManager from "./class/ErrorManager";
import GameManager from "./class/GameManager";
import ResourceManager from "./class/ResourceManager";
import SceneManager from "./class/SceneManager";

window.onload = () => {
	Promise.all([
		DebugManager.init(),
		SceneManager.init(),
		GameManager.init(),
		ResourceManager.init(),
		ErrorManager.init(),
	]).then(() => {
		GameManager.loop.gameStart();
	});
};

export {};
