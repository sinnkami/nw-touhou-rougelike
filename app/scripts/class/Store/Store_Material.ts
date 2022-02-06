import { IStoreMaterial } from "../../definitions/class/Store/IStoreMaterial";
import { Material } from "../Construct/MaterialConstruct";
import Store_Base from "./Store_Base";

/**
 * 現在所持している生成用素材
 */
export default class Store_Material extends Store_Base {
	// 合成用素材: 炎
	private flame: number = 0;

	// 合成用素材: 水
	private water: number = 0;

	// 合成用素材: 草
	private grass: number = 0;

	// 合成用素材: 雷
	private thunder: number = 0;

	// 合成用素材: 光
	private light: number = 0;

	// 合成用素材: 闇
	private darkness: number = 0;

	public async init(): Promise<void> {
		this.flame = 0;
		this.water = 0;
		this.grass = 0;
		this.thunder = 0;
		this.light = 0;
		this.darkness = 0;
	}

	public async load(materials: IStoreMaterial): Promise<void> {
		await super.load(materials);

		this.flame = materials.flame;
		this.water = materials.water;
		this.grass = materials.grass;
		this.thunder = materials.thunder;
		this.light = materials.light;
		this.darkness = materials.darkness;
	}

	public getAll(): IStoreMaterial {
		return {
			flame: this.flame,
			water: this.water,
			grass: this.grass,
			thunder: this.thunder,
			light: this.light,
			darkness: this.darkness,
		};
	}

	public get(type: Material): number {
		switch (type) {
			case Material.Flame:
				return this.getFlame();
			case Material.Water:
				return this.getWater();
			case Material.Grass:
				return this.getGrass();
			case Material.Thunder:
				return this.getThunder();
			case Material.Light:
				return this.getLight();
			case Material.Darkness:
				return this.getDarkness();
			default:
				throw new Error("存在しない素材が指定されました");
		}
	}

	public add(type: Material, value: number): void {
		switch (type) {
			case Material.Flame:
				return this.addFlame(value);
			case Material.Water:
				return this.addWater(value);
			case Material.Grass:
				return this.addGrass(value);
			case Material.Thunder:
				return this.addThunder(value);
			case Material.Light:
				return this.addLight(value);
			case Material.Darkness:
				return this.addDarkness(value);
			default:
				throw new Error("存在しない素材が指定されました");
		}
	}

	private getFlame(): number {
		return this.flame;
	}

	private addFlame(value: number): void {
		this.flame += value;
	}

	private getWater(): number {
		return this.water;
	}

	private addWater(value: number): void {
		this.water += value;
	}

	private getGrass(): number {
		return this.grass;
	}

	private addGrass(value: number): void {
		this.grass += value;
	}

	private getThunder(): number {
		return this.thunder;
	}

	private addThunder(value: number): void {
		this.thunder += value;
	}

	private getLight(): number {
		return this.light;
	}

	private addLight(value: number): void {
		this.light += value;
	}

	private getDarkness(): number {
		return this.darkness;
	}

	private addDarkness(value: number): void {
		this.darkness += value;
	}
}
