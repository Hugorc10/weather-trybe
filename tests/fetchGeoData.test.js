const fetchGeoData = require('../helpers/fetchGeoData.js');

describe('Testa a função "fetchGeoData"', () => {
    it('Testa se é uma função', () => {
        expect(typeof fetchGeoData).toBe('function');
    });
    it('Verifica se o fetch foi feito', async () => {
        const teste = await fetchGeoData({lat: -22.75779503086902, lng: -42.85691472781544});
        expect(fetch).toHaveBeenCalled();
    });
});