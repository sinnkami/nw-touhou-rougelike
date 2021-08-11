import { IGameMapData } from "../../definitions/class/Game/IGameMap";
import Const, { EventName, KeyCode } from "../Const";
import GameManager from "../GameManager";
import ResourceManager from "../ResourceManager";
import Sprite_Character from "../Sprite/Sprite_Character";
import Sprite_Map from "../Sprite/Sprite_Map";
import Scene_Base from "./Scene_Base";

/**
 * TODO: ダンジョン内のシーンへ命名を変更
 */
export default class Scene_Test extends Scene_Base {
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
			const MapRender = new Sprite_Map();
			// MEMO: 現在地と中心点の差分を見て調節を行う
			// TODO: この意味わからん数値を良い感じにわかりやすくしたい
			await MapRender.init(
				MAP_PATH,
				Const.size.width / 32 / 2 - GameManager.player.getPosition().x - 1,
				Const.size.height / 32 / 2 - GameManager.player.getPosition().y
			);
			this.renderList.push(() => MapRender.update());

			// 描画する操作キャラを設定
			const PlayerRender = new Sprite_Character();
			// MEMO: キャラを中心に表示する
			await PlayerRender.init(CHARACTER_PATH, Const.size.width / 32 / 2 - 1, Const.size.height / 32 / 2);
			this.renderList.push(() => PlayerRender.update());

			// 通常時のキー入力の処理
			this.renderList.push(() => {
				// 移動アニメーション中は移動不可
				if (PlayerRender.isAnimation || MapRender.isAnimation) {
					return;
				}

				// 移動速度
				const speed = 1;
				let x = 0;
				let y = 0;

				// TODO: ローグライクで斜め移動ってだめでは・・・？
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
					}
				}
			});
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
}
