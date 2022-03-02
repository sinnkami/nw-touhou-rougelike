import { ISaveData } from "../../definitions/class/Manager/IStoreManager";
import { DEFAULT_SAVE_FILE_NAME, SAVE_FILE_EXTENSION } from "../Construct/CommonConstruct";
import Store_Battle from "../Store/Store_Battle";
import Store_Character from "../Store/Store_Character";
import Store_Dungeon from "../Store/Store_Dungeon";
import Store_EnemyParty from "../Store/Store_EnemyParty";
import Store_Party from "../Store/Store_Party";

import fs from "../../modules/fs";
import path from "../../modules/path";
import Store_Material from "../Store/Store_Material";
import Store_BattleTurn from "../Store/Store_BattleTurn";

/**
 * セーブデータの情報を管理するクラス
 */
export default class StoreManager {
	// 各クラス
	public static character: Store_Character = new Store_Character();
	public static party: Store_Party = new Store_Party();
	public static enemyParty: Store_EnemyParty = new Store_EnemyParty();
	public static battle: Store_Battle = new Store_Battle();
	public static dungeon: Store_Dungeon = new Store_Dungeon();
	public static material: Store_Material = new Store_Material();
	public static battleTurn: Store_BattleTurn = new Store_BattleTurn();

	/**
	 * 初期化処理
	 * @returns
	 */
	public static init(): Promise<void> {
		return Promise.all([
			this.character.init(),
			this.party.init(),
			this.enemyParty.init(),
			this.battle.init(),
			this.dungeon.init(),
			this.material.init(),
			this.battleTurn.init(),
		]).then();
	}

	/**
	 * セーブデータファイルを作成し、保存する
	 * @param saveDirPath
	 * @param saveFileName
	 * @returns
	 */
	public static saveFile(saveDirPath: string, saveFileName?: string): Promise<void> {
		// 空文字列を入力した場合
		if (!saveDirPath) {
			return Promise.reject("保存先ディレクトリが指定されていません");
		}

		// ファイル名が指定されていない場合はデフォルト名を使用
		if (!saveFileName) {
			saveFileName = DEFAULT_SAVE_FILE_NAME;
		}

		// セーブデータを保存するディレクトリが存在しない場合、生成する
		if (!fs.existsSync(saveDirPath)) {
			console.info(`セーブデータを保存するディレクトリを作成しました(${saveDirPath})`);
			fs.mkdirSync(saveDirPath);
		}

		// 実際に保存するデータ
		const saveData: ISaveData = {
			character: this.character.getAll(),
			party: this.party.getAll(),
			material: this.material.getAll(),
		};

		console.log(JSON.stringify(this.party.getAll()));

		const saveFilePath = path.resolve(saveDirPath, saveFileName + SAVE_FILE_EXTENSION);

		fs.writeFileSync(saveFilePath, JSON.stringify(saveData));

		console.info(`セーブデータを保存しました(${saveFilePath})`);

		return Promise.resolve();
	}

	/**
	 * セーブデータファイルを読み込み、反映する
	 * @param saveFilePath
	 * @returns
	 */
	public static loadFile(saveFilePath: string): Promise<void> {
		if (!fs.existsSync(saveFilePath)) {
			return Promise.reject("セーブデータ読み込み失敗");
		}
		const saveData: ISaveData = JSON.parse(fs.readFileSync(saveFilePath));
		// TODO: ロード時、読み込まれなかったら個別でログを出力する
		return Promise.all([
			this.character.load(saveData.character),
			this.party.load(saveData.party),
			this.material.load(saveData.material),
		]).then(() => {
			console.info(`セーブデータを読み込みました(${saveFilePath})`);
		});
	}
}
