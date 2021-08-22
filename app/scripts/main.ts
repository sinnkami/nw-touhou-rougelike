import "babel-polyfill";

import DebugManager from "./class/DebugManager";
import ErrorManager from "./class/ErrorManager";
import { EventManager } from "./class/EventManager";
import GameManager from "./class/GameManager";
import ResourceManager from "./class/ResourceManager";
import SceneManager from "./class/SceneManager";
/**
 * 初期動作
 * TODO: Scene_Boot 作成予定
 */
window.onload = () => {
	Promise.all([
		DebugManager.init(),
		SceneManager.init(),
		GameManager.init(),
		ResourceManager.init(),
		ErrorManager.init(),
		EventManager.init(),
	]).then(() => {
		GameManager.loop.gameLoopStart();
	});
};

export {};
