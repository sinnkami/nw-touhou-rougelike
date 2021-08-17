import { IGameMapData } from "../../definitions/class/Game/IGameMap";
import Const, { EventName, KeyCode } from "../Const";
import GameManager from "../GameManager";
import ResourceManager from "../ResourceManager";
import SceneManager from "../SceneManager";
import Sprite_Character from "../Sprite/Sprite_Character";
import Sprite_Map from "../Sprite/Sprite_Map";
import { Sprite_Message } from "../Sprite/Sprite_Message";
import Scene_Base from "./Scene_Base";

/**
 * ダンジョン内シーン
 */
export default class Scene_Dungeon extends Scene_Base {
	//TODO: 適切な名前へ変更して、親クラスへもっていく
	public renderList: Array<() => void> = [];

	/**
	 * シーンを開始する
	 * TODO: いい感じに切り分けたい
	 * @override
	 */
	public startScene(): void {
		super.startScene();

		// TODO: いずれ Data_Hoge から取得するように書き換える
		const MAP_PATH = "assets/images/map/chip.png";
		const CHARACTER_PATH = "assets/images/character/ReimuHakurei.png";

		// TODO: 読み込み処理ってこのタイミングで良いのか・・・？
		ResourceManager.loadResources([MAP_PATH, CHARACTER_PATH]).then(async () => {
			// ダンジョンを生成する
			// TODO: 場所によってサイズとか変えたい
			GameManager.map.createMapData();

			// 操作キャラをダンジョン内に配置
			const position = GameManager.map.getRandomPosition();
			GameManager.player.setPosition(position.x, position.y);

			// 描画するマップを設定
			// MEMO: 現在地と中心点の差分を見て調節を行う
			// TODO: この意味わからん数値を良い感じにわかりやすくしたい
			const MapRender = new Sprite_Map({
				path: MAP_PATH,
				x: Const.size.width / 32 / 2 - GameManager.player.getPosition().x - 1,
				y: Const.size.height / 32 / 2 - GameManager.player.getPosition().y,
			});
			await MapRender.init();
			this.renderList.push(() => MapRender.update());

			// 描画する操作キャラを設定
			// MEMO: キャラを画面中心に表示する
			const PlayerRender = new Sprite_Character({
				path: CHARACTER_PATH,
				x: Const.size.width / 32 / 2 - 1,
				y: Const.size.height / 32 / 2,
			});
			await PlayerRender.init();
			this.renderList.push(() => PlayerRender.update());

			const TestText = new Sprite_Message({
				text:
					"滲み出す混濁の紋章\n不遜なる狂気の器\n湧き上がり・否定し・痺れ・瞬き・眠りを妨げる爬行する鉄の王女\n絶えず自壊する泥の人形\n結合せよ\n反発せよ\n地に満ち\n己の無力を知れ\n破道の九十・黒棺",
				x: 100,
				y: 100,
				width: 300,
				height: 900,
				fontSize: 25,
			});
			await TestText.init();
			this.renderList.push(() => TestText.update());

			// 通常時のキー入力の処理
			this.renderList.push(() => {
				// 移動アニメーション中は移動不可
				if (MapRender.isAnimation) return;

				// 移動マス
				const speed = 1;
				let x = 0;
				let y = 0;

				// TODO: ローグライクで斜め移動ってだめでは・・・？
				// TODO: 通路に入り込む際に上手く斜め移動を行うと、描画が1マスずれる
				// 方向キーの処理
				if (GameManager.input.isPushedKey(KeyCode.Up)) y -= speed;
				if (GameManager.input.isPushedKey(KeyCode.Down)) y += speed;
				if (GameManager.input.isPushedKey(KeyCode.Right)) x += speed;
				if (GameManager.input.isPushedKey(KeyCode.Left)) x -= speed;

				// 移動量に合わせてキャラを移動
				const flag = GameManager.player.move(x, y);
				if (flag) {
					// 移動できたならマップをずらす
					MapRender.move(x, y);
				}

				// 決定キーの処理
				if (GameManager.input.isPushedKey(KeyCode.Select)) {
					const key = GameManager.input.getKey(KeyCode.Select);

					// 現在地にあるイベントタイルを取得
					const position = GameManager.player.getPosition();
					const eventChip = GameManager.map.getEventMapChip(position.x, position.y);
					if (eventChip) {
						// 存在した場合は処理を行う
						// TODO: イベントタイルの処理
						console.log(eventChip.name, eventChip.event);
						if (eventChip.event) {
							//TODO: イベントクラス内で行う
							PlayerRender.destroy();
							MapRender.destroy();

							eventChip.event.execute();
						}
					}
				}
			});
			SceneManager.completeLoading();
		});
	}

	/**
	 * シーンを更新する
	 * @override
	 * @returns
	 */
	public updateScene(): void {
		super.updateScene();
		this.renderList.forEach(render => render());
		return;
	}

	/**
	 * シーンを停止する
	 * @override
	 * @returns
	 */
	public stopScene(): void {
		this.renderList = [];
	}
}
