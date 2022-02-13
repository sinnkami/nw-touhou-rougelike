/**
 * ディープコピーメソッド
 * @param msec
 * @returns
 */
const clone = <V>(obj: V): V => JSON.parse(JSON.stringify(obj));
export default clone;
