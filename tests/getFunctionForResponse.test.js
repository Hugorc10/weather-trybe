/**
 * @jest-environment jsdom
 */
const getFunctionForResponse = require('../helpers/getFunctionForResponse');

describe('1 - Testa a função "getFunctionForResponse"', () => {
    it('Verifica se "getFunctionForResponse" é uma função', () => {
        expect(typeof getFunctionForResponse).toBe('function');
    });
    it('Verifica se uma função é retornada dentro de "getFunctionForResponse"', () => {
        expect(typeof getFunctionForResponse(1)).toBe('function');
        expect(typeof getFunctionForResponse(2)).toBe('function');
    });
});
