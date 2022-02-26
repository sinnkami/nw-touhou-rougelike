import { ILoadResourceInfo } from "../../definitions/class/Manager/IResourceManager";
import DataManager from "../Manager/DataManager";
import GameManager from "../Manager/GameManager";
import LoadManager from "../Manager/LoadManager";
import ResourceManager from "../Manager/ResourceManager";
import SceneManager from "../Manager/SceneManager";
import Scene_CreateCharacter from "../Scene/Scene_CreateCharacter";
import Scene_Menu from "../Scene/Scene_Menu";
import Scene_PartyPlanningPlace from "../Scene/Scene_PartyPlanningPlace";
import { Event_Base } from "./Event_Base";

/**
 * 0011: キャラクター呼び出し画面
 */
export class Event_OpenCreateCharacter extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(): Promise<boolean> {
		const executed = await super.execute();
		if (!executed) return false;

		// ロードするリソース一覧
		const loadResources = [];

		loadResources.push({
			name: "menu-background",
			path: "assets/images/window/menu/test.png",
		});

		for (const storeCharacter of GameManager.partyPlanningPlace.getCharacterList()) {
			const characterData = GameManager.character.getCharacter(storeCharacter.characterId);
			loadResources.push({
				name: `character-charaChip-${characterData.characterId}`,
				path: characterData.charaChipPath,
			});
		}

		await this.loadResources(...loadResources);

		await SceneManager.addScene(new Scene_CreateCharacter());

		await SceneManager.startScene();

		return LoadManager.complete(this.name);
	}
}
