/**
 * 迭代器
 * @export
 * @interface IEnumerator
 * @template T
 */
 export default interface IEnumerator<T> {
    isEnd: boolean;
    moveNext: () => T | undefined;
    moveBack: (count?: number) => T | undefined;
    reset: () => void;
    current: () => T;
}
