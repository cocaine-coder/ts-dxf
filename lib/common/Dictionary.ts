export default class Dictionary<TKey, TVal>{

    private dictionary: any = {};

    /**
     * Creates an instance of Dictionary.
     * @param {Array<{ key: TKey, val: TVal }>} [range]
     * @memberof Dictionary
     */
    constructor(range?: Array<{ key: TKey, val: TVal }>) {
        this.addRange(range);
    }

    /**
     * 设置键值对，如果key已经存在则替换值
     *
     * @param {TKey} key
     * @param {TVal} val
     * @memberof Dictionary
     */
    set(key: TKey, val: TVal) {
        this.dictionary[key] = val;
    }

    /**
   * 设置一组键值对，如果其中含有key已经存在，则替换值
   *
   * @param {Array<{ key: TKey, val: TVal }>} [range]
   * @memberof Dictionary
   */
    setRange(range?: Array<{ key: TKey, val: TVal }>) {
        if (range)
            range.forEach(kv => this.set(kv.key, kv.val));
    }

    /**
     * 添加键值对，如果key已经存在，抛出异常
     * if dictionary already had this key, will throw error !!! 
     * 
     * @param {TKey} key
     * @param {TVal} val
     * @memberof Dictionary
     */
    add(key: TKey, val: TVal) {
        if (this.containsKey(key))
            throw new Error(`dictionary has already this key : ${key}`);
        this.dictionary[key] = val;
    }

    /**
     * 添加一组键值对，如果其中含有key已经存在，抛出异常
     *
     * @param {Array<{ key: TKey, val: TVal }>} [range]
     * @memberof Dictionary
     */
    addRange(range?: Array<{ key: TKey, val: TVal }>) {
        if (range)
            range.forEach(kv => this.add(kv.key, kv.val));
    }

    /**
     * 通过key获取val，如果不存在key，返回undefined
     *
     * @param {TKey} key
     * @return {*}  {(TVal | undefined)}
     * @memberof Dictionary
     */
    get(key: TKey): TVal | undefined {
        return this.containsKey(key) ? this.dictionary[key] as TVal : undefined;;
    }

    /**
     * 通过key删除键值对，返回true
     * 如果key不存在 返回 false
     *
     * @param {TKey} key
     * @return {*}  {boolean}
     * @memberof Dictionary
     */
    remove(key: TKey): boolean {
        if (this.containsKey(key)) {
            delete this.dictionary[key];
            return true;
        }

        return false;
    }

    /**
     * 判断key是否存在
     *
     * @param {TKey} key
     * @return {*}  {boolean}
     * @memberof Dictionary
     */
    containsKey(key: TKey): boolean {
        return key in this.dictionary;
    }


    /**
     * 返回所有的key
     *
     * @return {*}  {Array<string>}
     * @memberof Dictionary
     */
    getKeys(): Array<string> {
        return Object.keys(this.dictionary);
    }

    /**
     * 获取所有的val
     *
     * @return {*}  {Array<TVal>}
     * @memberof Dictionary
     */
    getValues(): Array<TVal> {
        return Object.keys(this.dictionary).map(key => this.dictionary[key] as TVal);
    }

    /**
     * 获取长度
     *
     * @return {*}  {number}
     * @memberof Dictionary
     */
    count(): number {
        return Object.keys(this.dictionary).length;
    }

    /**
     * 清空字典
     *
     * @memberof Dictionary
     */
    clear(): void {
        this.dictionary = {};
    }

    /**
     * 遍历
     *
     * @param {(value: string, index: number, dictionary: Dictionary<TKey, TVal>) => void} callbackfn
     * @memberof Dictionary
     */
    forEach(callbackfn: (key: string, index: number, dictionary: Dictionary<TKey, TVal>) => void): void {
        Object.keys(this.dictionary).forEach((k, i) => {
            callbackfn(k, i, this);
        });
    }

    /**
     * 获取原始值
     *
     * @return {*} 
     * @memberof Dictionary
     */
    getOrigin(): any {
        return this.dictionary;
    }

    toJSON() {
        return this.dictionary;
    }
}