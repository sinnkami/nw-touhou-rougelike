/**
 * 指定時間待機するメソッド
 * @param msec
 * @returns
 */
const sleep = (msec: number): Promise<void> => new Promise(resolve => setTimeout(resolve, msec));
export default sleep;
