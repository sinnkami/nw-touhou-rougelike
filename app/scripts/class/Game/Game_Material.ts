import { Material } from "../Construct/MaterialConstruct";
import StoreManager from "../Manager/StoreManager";
import { Game_Base } from "./Game_Base";

export default class Game_Material extends Game_Base {
	public getMaterial(type: Material): number {
		return StoreManager.material.get(type);
	}

	public addMaterial(type: Material, value: number): void {
		return StoreManager.material.add(type, value);
	}
}
