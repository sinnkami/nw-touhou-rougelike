import { ILoadResourceInfo } from "../../definitions/class/Manager/IResourceManager";
import DataManager from "../Manager/DataManager";
import GameManager from "../Manager/GameManager";
import LoadManager from "../Manager/LoadManager";
import ResourceManager from "../Manager/ResourceManager";
import SceneManager from "../Manager/SceneManager";
import Scene_Menu from "../Scene/Scene_Menu";
import Scene_PartyPlanningPlace from "../Scene/Scene_PartyPlanningPlace";
import { Event_Base } from "./Event_Base";

/**
 * 0009: パーティ編集画面表示
 */
export class Event_OpenEditParty extends Event_Base {
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
			path: "assets/images/window/menu/test.png",
		});

		for (const storeCharacter of GameManager.partyPlanningPlace.getCharacterList()) {
			const characterData = GameManager.character.getCharacter(storeCharacter.characterId);
			loadResources.push({
				name: `character-charaChip-${characterData.characterId}`,
				path: characterData.charaChipPath,
			});
		}

		await ResourceManager.loadResources(...loadResources);

		await SceneManager.addScene(new Scene_PartyPlanningPlace());

		await SceneManager.startScene();

		return LoadManager.complete(this.name);
	}
}
