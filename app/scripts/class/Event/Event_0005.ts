import DataManager from "../Manager/DataManager";
import GameManager from "../Manager/GameManager";
import LoadManager from "../Manager/LoadManager";
import ResourceManager from "../Manager/ResourceManager";
import SceneManager from "../Manager/SceneManager";
import Scene_Menu, { ResourceName } from "../Scene/Scene_Menu";
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
		const loadResources: string[] = [];

		const BACKGROUND_IMAGE = "assets/images/background/title.jpg";
		loadResources.push(BACKGROUND_IMAGE);

		loadResources.push("assets/images/window/menu/red.png");

		for (const partyInfo of GameManager.party.getMenberList()) {
			const characterData = DataManager.character.get(partyInfo.characterId);
			if (!characterData) throw new Error("データベース内に存在しないキャラがパーティに存在します");
			loadResources.push(characterData.portraitPath);
		}

		await ResourceManager.loadResources(loadResources);

		await SceneManager.addScene(
			new Scene_Menu({
				[ResourceName.BackgroundImage]: BACKGROUND_IMAGE,
			})
		);

		await SceneManager.startScene();

		return LoadManager.complete(this.name);
	}
}
