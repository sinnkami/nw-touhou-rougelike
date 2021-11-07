/**
 * 任意の配列からランダムで値を取得する
 * @param msec
 * @returns
 */
const getRandomValue = <V>(array: V[]): V => array[Math.floor(Math.random() * array.length)];
export default getRandomValue;
