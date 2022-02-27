import { RenderTextureSystem } from "pixi.js";
import { ILoadResourceInfo } from "../../../definitions/class/Manager/IResourceManager";
import DataManager from "../../Manager/DataManager";
import GameManager from "../../Manager/GameManager";
import LoadManager from "../../Manager/LoadManager";
import ResourceManager from "../../Manager/ResourceManager";
import SceneManager from "../../Manager/SceneManager";
import Scene_Battle from "../../Scene/Scene_Battle";
import { Event_Base } from "../Event_Base";

/**
 * 0007: 通常戦闘開始
 */
export class Event_SceneToBattle extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(enemyPartyId: string): Promise<boolean> {
		const executed = await super.execute();
		if (!executed) return false;

		// ロードするリソース一覧
		const loadResources = [];

		loadResources.push({
			name: "battle-background",
			path: "assets/images/background/battle.png",
		});

		loadResources.push({
			name: "menu-background",
			path: "assets/images/window/menu/test.png",
		});

		for (const partyInfo of GameManager.party.getMenberList()) {
			const characterData = GameManager.character.getCharacter(partyInfo.characterId);
			loadResources.push({
				name: `character-charaChip-${characterData.characterId}`,
				path: characterData.charaChipPath,
			});
		}

		for (const enemy of GameManager.enemyParty.getEnemyPartyList()) {
			const enemyData = GameManager.enemy.getEnemy(enemy.enemyId);
			loadResources.push({
				name: `enemy-portrait-${enemy.enemyId}`,
				path: enemyData.portraitPath,
			});
		}

		await this.loadResources(...loadResources);

		GameManager.battle.init();

		GameManager.enemyParty.init();
		GameManager.turn.init();

		GameManager.enemyParty.setEnemyParty(enemyPartyId);

		GameManager.turn.setCharacterList(
			GameManager.party.getMenberList(),
			GameManager.enemyParty.getEnemyPartyList()
		);

		await SceneManager.addScene(new Scene_Battle());

		await SceneManager.startScene();

		return LoadManager.complete(this.name);
	}
}
