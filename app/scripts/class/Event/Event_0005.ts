import { ILoadResourceInfo } from "../../definitions/class/Manager/IResourceManager";
import DataManager from "../Manager/DataManager";
import GameManager from "../Manager/GameManager";
import LoadManager from "../Manager/LoadManager";
import ResourceManager from "../Manager/ResourceManager";
import SceneManager from "../Manager/SceneManager";
import Scene_Menu from "../Scene/Scene_Menu";
import { Event_Base } from "./Event_Base";

/**
 * 0005: 通常メニュー表示
 */
export class Event_0005 extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		const executed = await super.execute();
		if (!executed) return false;

		// ロードするリソース一覧
		const loadResources: ILoadResourceInfo[] = [];

		loadResources.push({
			name: "menu-background",
			path: "assets/images/window/menu/normal.png",
		});

		for (const partyInfo of GameManager.party.getMenberList()) {
			const characterData = DataManager.character.get(partyInfo.characterId);
			if (!characterData) throw new Error("データベース内に存在しないキャラがパーティに存在します");
			loadResources.push({
				name: `character-portrait-${characterData.characterId}`,
				path: characterData.portraitPath,
			});
		}

		await ResourceManager.loadResources(...loadResources);

		await SceneManager.addScene(new Scene_Menu());

		await SceneManager.startScene();

		return LoadManager.complete(this.name);
	}
}