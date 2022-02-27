import ResourceManager from "../../Manager/ResourceManager";
import Scene_Dungeon from "../../Scene/Scene_Dungeon";
import SceneManager from "../../Manager/SceneManager";
import { Event_Base } from "../Event_Base";
import GameManager from "../../Manager/GameManager";
import LoadManager from "../../Manager/LoadManager";
import DataManager from "../../Manager/DataManager";
import sleep from "../../../modules/utils/sleep";

/**
 * ダンジョン突入イベント
 */
export class Event_SceneToDungeon extends Event_Base {
	/**
	 * イベントを実行
	 * @override
	 */
	public async execute(dungeonId: string): Promise<boolean> {
		await this.startLoading();

		// TODO: 遅延しないと何故かロード中の画面が後から表示される
		await sleep(100);

		// パーティ内の先頭のキャラを取得
		const firstCharacter = GameManager.party.getFirstMenber();
		const characterData = GameManager.character.getCharacter(firstCharacter.characterId);

		await this.loadResources(
			{
				name: "mapChip",
				path: "assets/images/map/chip.png",
			},
			{
				name: "charaChip",
				path: characterData.charaChipPath,
			}
		);

		// ダンジョン情報を初期化する
		GameManager.dungeon.init(dungeonId);

		await SceneManager.stopScene();

		await SceneManager.addScene(new Scene_Dungeon());

		await SceneManager.startScene();

		return this.endLoading();
	}
}
