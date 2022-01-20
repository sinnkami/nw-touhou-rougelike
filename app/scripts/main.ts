/* eslint-disable @typescript-eslint/no-explicit-any */
import "babel-polyfill";

import path from "./modules/path";

import { DEFAULT_SAVE_FILE_NAME, SAVE_DIR, SAVE_FILE_EXTENSION } from "./class/Construct/CommonConstruct";

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

// MEMO: デバッグ用にdevtoolsを起動
(window as any).nw.Window.get().showDevTools();

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
	])
		.then(() => {
			// セーブデータ読み込み処理
			// TODO: 将来的には複数ファイルから選択できるようにする
			const saveFilePath = path.resolve(SAVE_DIR, DEFAULT_SAVE_FILE_NAME + SAVE_FILE_EXTENSION);
			return StoreManager.loadFile(saveFilePath).catch(() => {
				console.info(`セーブデータが見つからなかった(${saveFilePath})`);
			});
		})
		.then(() => {
			GameManager.loop.gameLoopStart();
		});
};

export {};
