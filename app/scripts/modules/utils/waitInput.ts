import { KeyCode } from "../../class/Construct/CommonConstruct";
import GameManager from "../../class/Manager/GameManager";

/**
 * 指定キー入力まで待機するメソッド
 * @param msec
 * @returns
 */
const waitInput = (keyCode: KeyCode): Promise<void> =>
	new Promise(resolve => {
		const interval = setInterval(function () {
			if (GameManager.input.isPushedKey(keyCode)) {
				clearInterval(interval);
				return resolve();
			}
		});
	});
export default waitInput;
