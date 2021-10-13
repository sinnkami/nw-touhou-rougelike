import ResourceManager from "../Manager/ResourceManager";
import Scene_Dungeon from "../Scene/Scene_Dungeon";
import SceneManager from "../Manager/SceneManager";
import { Event_Base } from "./Event_Base";
import { ResourceName } from "../Scene/Scene_Dungeon";
import GameManager from "../Manager/GameManager";
import LoadManager from "../Manager/LoadManager";
import DataManager from "../Manager/DataManager";
import sleep from "../../modules/utils/sleep";
import StoreManager from "../Manager/StoreManager";

/**
 * 0002: ダンジョン突入イベント
 */
export class Event_0002 extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(dungeonId: string): Promise<boolean> {
		const executed = await super.execute();
		if (!executed) return false;

		// TODO: またないと何故かロード中の画面が遅延して表示される
		await sleep(100);

		// TODO: いずれ Data_Hoge から取得するように書き換える
		const dataDungeon = DataManager.dungeon.get(dungeonId);
		if (!dataDungeon) throw new Error(`no select dungeon on dungeonId: ${dungeonId}`);

		// パーティ内の先頭のキャラを取得
		const firstCharacter = GameManager.party.getFirstMenber();
		const characterData = DataManager.character.get(firstCharacter.characterId);
		if (!characterData) throw new Error("データベース内に存在しないキャラがパーティに存在します");

		GameManager.map.setName(dataDungeon.name);
		GameManager.dungeon.invadeDungeon();

		await ResourceManager.loadResources(
			{
				name: "mapChip",
				path: "assets/images/map/chip.png",
			},
			{
				name: "charaChip",
				path: characterData.charaChipPath,
			}
		);

		await SceneManager.stopScene();

		await SceneManager.addScene(new Scene_Dungeon());

		await SceneManager.startScene();

		return LoadManager.complete(this.name);
	}
}
