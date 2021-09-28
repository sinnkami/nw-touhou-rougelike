import "babel-polyfill";
import DataManager from "./class/manager/DataManager";

import DebugManager from "./class/manager/DebugManager";
import ErrorManager from "./class/manager/ErrorManager";
import EventManager from "./class/manager/EventManager";
import GameManager from "./class/manager/GameManager";
import LoadManager from "./class/manager/LoadManager";
import ResourceManager from "./class/manager/ResourceManager";
import SceneManager from "./class/manager/SceneManager";
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
		LoadManager.init(),
		DataManager.init(),
	]).then(() => {
		GameManager.loop.gameLoopStart();
	});
};

export {};
