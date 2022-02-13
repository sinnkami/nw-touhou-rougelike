import { IDataCharacter } from "../../definitions/class/Data/IDataCharacter";
import { IStoreCharacter } from "../../definitions/class/Store/IStoreCharacter";
import { Material } from "../Construct/MaterialConstruct";
import DataManager from "../Manager/DataManager";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import { Game_Base } from "./Game_Base";

/**
 * MEMO: PartyPlanningPlace は ドラクエの酒場を英訳した物
 */
export default class Game_PartyPlanningPlace extends Game_Base {
	private get characterList(): IStoreCharacter[] {
		return StoreManager.character.getAll();
	}

	public getCharacter(storeId: string): IStoreCharacter {
		const character = this.characterList.find(v => v.storeId === storeId);
		if (!character) throw new Error("所持していないキャラクターです");
		return character;
	}

	public getCharacterList(): IStoreCharacter[] {
		return this.characterList;
	}

	public addCharacter(character: IStoreCharacter): void {
		StoreManager.character.add(character);
	}

	public addNewCharacter(characterId: string): void {
		const dataCharacter = DataManager.character.get(characterId);
		if (!dataCharacter) throw new Error(`選択されたキャラは存在しない(id: ${characterId})`);

		// 素材を消費する
		GameManager.material.subtractMaterial(Material.Flame, dataCharacter.flame);
		GameManager.material.subtractMaterial(Material.Water, dataCharacter.water);
		GameManager.material.subtractMaterial(Material.Grass, dataCharacter.grass);
		GameManager.material.subtractMaterial(Material.Thunder, dataCharacter.thunder);
		GameManager.material.subtractMaterial(Material.Light, dataCharacter.light);
		GameManager.material.subtractMaterial(Material.Darkness, dataCharacter.darkness);

		const storeCharacter = this.convertDataCharacterByStoreCharater(dataCharacter);
		this.addCharacter(storeCharacter);
	}

	public removeCharacter(storeId: string): void {
		StoreManager.character.remove(storeId);
	}

	private convertDataCharacterByStoreCharater(dataCharacter: IDataCharacter): IStoreCharacter {
		const characterId = dataCharacter.characterId;
		return {
			/** 固有ID */
			storeId: StoreManager.character.createNewStoreId(),
			/** キャラID */
			characterId,
			id: characterId,
			/** 名前 */
			name: dataCharacter.name,
			/** レベル */
			level: 1,
			/** 経験値 */
			exp: 0,

			/** 合成用素材: 炎 */
			flame: dataCharacter.flame,
			/** 合成用素材: 水 */
			water: dataCharacter.water,
			/** 合成用素材: 草 */
			grass: dataCharacter.grass,
			/** 合成用素材: 雷 */
			thunder: dataCharacter.thunder,
			/** 合成用素材: 光 */
			light: dataCharacter.light,
			/** 合成用素材: 闇 */
			darkness: dataCharacter.darkness,

			/** 成長タイプ */
			growthType: dataCharacter.growthType,

			// パラメータ関連
			// レベル1時点でのステータス
			initStatus: dataCharacter.initStatus,
			// 最大レベル時点でのステータス
			maxStatus: dataCharacter.maxStatus,
		};
	}
}
