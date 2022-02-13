import { Material } from "../Construct/MaterialConstruct";
import GameManager from "../Manager/GameManager";
import StoreManager from "../Manager/StoreManager";
import { Game_Base } from "./Game_Base";

export default class Game_Material extends Game_Base {
	public getMaterial(type: Material): number {
		return StoreManager.material.get(type);
	}

	public addMaterial(type: Material, value: number): void {
		return StoreManager.material.add(type, value);
	}

	public subtractMaterial(type: Material, value: number): void {
		// MEMO: マイナスを追加することで減算を行う
		return this.addMaterial(type, -value);
	}

	public canMakeCharacter(characterId: string): boolean {
		const character = GameManager.character.getCharacter(characterId);

		if (this.getMaterial(Material.Darkness) < character.darkness) return false;
		if (this.getMaterial(Material.Flame) < character.flame) return false;
		if (this.getMaterial(Material.Grass) < character.grass) return false;
		if (this.getMaterial(Material.Light) < character.light) return false;
		if (this.getMaterial(Material.Thunder) < character.thunder) return false;
		if (this.getMaterial(Material.Water) < character.water) return false;

		return true;
	}
}
