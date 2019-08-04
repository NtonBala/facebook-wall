// Core
import { sum } from './';

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
});
