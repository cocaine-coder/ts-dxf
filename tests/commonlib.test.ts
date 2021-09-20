import { Dictionary } from '../lib/common'

describe('Commonlib:Dictionary', () => {
    test('construction', () => {
        expect(new Dictionary<number, string>());
        expect(() => new Dictionary<number, string>([{ key: 1, val: "123" }, { key: 2, val: "123" }]));
        expect(() => new Dictionary<number, string>([{ key: 1, val: "123" }, { key: 1, val: "123" }]))
            .toThrowError();
    })

    test('get', () => {
        const dictionary = new Dictionary<number, string>([{ key: 1, val: "123" }, { key: 2, val: "123" }]);
        expect(dictionary.get(1)).toBe("123");
        expect(dictionary.get(3)).toBe(undefined);
    })

    test('add', () => {
        const dictionary = new Dictionary<number, string>();
        dictionary.add(3, "jorden");
        expect(dictionary.get(3)).toBe("jorden");
        expect(() => dictionary.add(3, "foo")).toThrowError();
    })

    test('addRange', () => {
        const dictionary = new Dictionary<number, string>();
        dictionary.addRange([{ key: 1, val: 'tracy' }, { key: 2, val: 'jorden' }]);
        expect(dictionary.get(1)).toBe("tracy");
        expect(() => dictionary.addRange([{ key: 1, val: 'tracy' }, { key: 2, val: 'jorden' }])).toThrowError();
    })

    test('set', () => {
        const dictionary = new Dictionary<number, string>([{ key: 1, val: "123" }, { key: 2, val: "123" }]);
        dictionary.set(1, "wang");
        expect(dictionary.get(1)).toBe("wang");
    })

    test('setRange', () => {
        const dictionary = new Dictionary<number, string>([{ key: 1, val: "123" }, { key: 2, val: "123" }]);
        dictionary.setRange([{ key: 1, val: "wang" }, { key: 2, val: "tracy" }]);
        expect(dictionary.get(1)).toBe("wang");
        expect(dictionary.get(2)).toBe("tracy");
    })

    test('containsKey', () => {
        const dictionary = new Dictionary<number, string>([{ key: 1, val: "123" }, { key: 2, val: "123" }]);
        expect(dictionary.containsKey(1)).toBe(true);
        expect(dictionary.containsKey(100)).toBe(false);
    })

    test('remove', () => {
        const dictionary = new Dictionary<number, string>([{ key: 1, val: "123" }, { key: 2, val: "123" }]);
        dictionary.clear();
        expect(dictionary.containsKey(1)).toBe(false);
        expect(dictionary.containsKey(2)).toBe(false);
    })

    test('getKeys', () => {
        const dictionary = new Dictionary<number, string>([{ key: 1, val: "123" }, { key: 2, val: "123" }]);
        let keys = dictionary.getKeys();
        let checks = ['1', '2']
        expect(keys.every(v => checks.includes(v))).toBe(true);
    })

    test('getValues', () => {
        const dictionary = new Dictionary<number, string>([{ key: 1, val: "123" }, { key: 2, val: "456" }]);
        let values = dictionary.getValues();
        let checks = ['123', '456'];
        expect(values.every(v => checks.includes(v))).toBe(true);
    })

    test('count', () => {
        const dictionary = new Dictionary<number, string>([{ key: 1, val: "123" }, { key: 2, val: "456" }]);
        expect(dictionary.count()).toBe(2);
    })

    test('forEach', () => {
        const dictionary = new Dictionary<number, string>([{ key: 1, val: "123" }, { key: 2, val: "456" }]);
        let keys = new Array<string>();
        dictionary.forEach(v => keys.push(v));
        let checks = ['1', '2']
        expect(keys.every(v => checks.includes(v))).toBe(true);
    })

    test('stringify',()=>{
        const dictionary = new Dictionary<number, string>([{ key: 1, val: "123" }, { key: 2, val: "456" }]);
        expect(JSON.stringify(dictionary)).toBe(`{"1":"123","2":"456"}`);
    })
})