// Core
import {
    sum,
    delay,
    getUniqueID,
    getFullApiUrl,
    removeById,
} from './';

jest.setTimeout(10000);

describe('instruments:', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum function should throw, when called with non-number type of first argument', () => {
        expect(() => sum('first argument', 2)).toThrow();
    });

    test('sum function should throw, when called with non-number type of second argument', () => {
        expect(() => sum(2, 'second argument')).toThrow();
    });

    test('sum function should return an addition of two arguments passed', () => {
        expect(sum(2, 3)).toBe(5);
        expect(sum(1, 8)).toMatchSnapshot();
    });

    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined();
    });

    test('getUniqueID function should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueID function should throw, when called with non-number type as an argument', () => {
        expect(() => getUniqueID('argument')).toThrow();
    });

    test('getUniqueID function should produce a string of a desired given length or with length of 15 characters, when called with no arguments', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(13)).toHaveLength(13);
        expect(getUniqueID()).toHaveLength(15);
    });

    test('getFullApiUrl function should be a function', () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });

    test('getFullApiUrl function should throw, when called with non-string type as first or second argument', () => {
        expect(() => getFullApiUrl(1, 'group-id')).toThrow();
        expect(() => getFullApiUrl('protocol://hostname/path', 2)).toThrow();
    });

    test('getFullApiUrl function should return full API URL matching its snapshot counterpart', () => {
        expect(getFullApiUrl('protocol://hostname/path', 'group-id')).toMatchSnapshot();
    });

    test('removeById function should be a function', () => {
        expect(removeById).toBeInstanceOf(Function);
    });

    test('removeById function should throw, when called with non-array or non-string type as first or second argument respectively', () => {
        expect(() => removeById('array', 'id')).toThrow();
        expect(() => removeById([], 1)).toThrow();
    });

    test('removeByIdFunction should return new array', () => {
        const arr = [];

        expect(removeById(arr, 'id')).not.toBe(arr);
    });

    test('removeById function should return filtered array matching its snapshot counterpart', () => {
        expect(removeById([{id: '1'}, {id: '2'}], '2')).toMatchSnapshot();
    });
});
