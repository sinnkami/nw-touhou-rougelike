/* eslint-disable @typescript-eslint/no-explicit-any */
import "babel-polyfill";
import DataManager from "./class/Manager/DataManager";

import DebugManager from "./class/Manager/DebugManager";
import ErrorManager from "./class/Manager/ErrorManager";
import EventManager from "./class/Manager/EventManager";
import GameManager from "./class/Manager/GameManager";
import LoadManager from "./class/Manager/LoadManager";
import ResourceManager from "./class/Manager/ResourceManager";
import SceneManager from "./class/Manager/SceneManager";
import StoreManager from "./class/Manager/StoreManager";

(window as any).DebugManager = DebugManager;
(window as any).ErrorManager = ErrorManager;
(window as any).EventManager = EventManager;
(window as any).GameManager = GameManager;
(window as any).LoadManager = LoadManager;
(window as any).ResourceManager = ResourceManager;
(window as any).SceneManager = SceneManager;
(window as any).DataManager = DataManager;
(window as any).StoreManager = StoreManager;

/**
 * 初期動作
 * TODO: Scene_Boot 作成予定 <- いらないかも
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
		StoreManager.init(),
	]).then(() => {
		GameManager.loop.gameLoopStart();
	});
};

export {};
