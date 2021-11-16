import { ILoadResourceInfo } from "../../definitions/class/Manager/IResourceManager";
import DataManager from "../Manager/DataManager";
import GameManager from "../Manager/GameManager";
import LoadManager from "../Manager/LoadManager";
import ResourceManager from "../Manager/ResourceManager";
import SceneManager from "../Manager/SceneManager";
import Scene_Battle from "../Scene/Scene_Battle";
import { Event_Base } from "./Event_Base";

/**
 * 0007: 通常戦闘開始
 */
export class Event_0007 extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(enemyPartyId: string): Promise<boolean> {
		const executed = await super.execute();
		if (!executed) return false;

		// ロードするリソース一覧
		const loadResources: ILoadResourceInfo[] = [];

		loadResources.push({
			name: "battle-background",
			path: "assets/images/background/battle.png",
		});

		loadResources.push({
			name: "menu-background",
			path: "assets/images/window/menu/normal.png",
		});

		for (const partyInfo of GameManager.party.getMenberList()) {
			const characterData = DataManager.character.get(partyInfo.characterId);
			if (!characterData) throw new Error("データベース内に存在しないキャラがパーティに存在します");
			loadResources.push({
				name: `character-charaChip-${characterData.characterId}`,
				path: characterData.charaChipPath,
			});
		}

		// const enemyPartyId = "0001";
		GameManager.battle.init(enemyPartyId);
		const enemyParty = DataManager.enemyParty.get(enemyPartyId);
		if (!enemyParty) throw new Error("存在しない敵パーティ");
		for (const enemyId of enemyParty.enemyList) {
			const enemyData = DataManager.enemy.get(enemyId);
			if (!enemyData) throw new Error("存在しないエネミー情報です");
			loadResources.push({
				name: `enemy-portrait-${enemyId}`,
				path: enemyData.portraitPath,
			});
		}

		await ResourceManager.loadResources(...loadResources);

		await SceneManager.addScene(new Scene_Battle());

		await SceneManager.startScene();

		return LoadManager.complete(this.name);
	}
}
