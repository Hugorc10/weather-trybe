const { fetchGeoData } = require('../helpers/fetchGeoData.js');
const geoDataSearch = require('../mocks/search');

describe('Testa a função fetchGeoData.', () => {
  it('1. Testa se é uma função', () => {
    expect(typeof fetchGeoData).toBe('function');
  });

  // it('2. Verifica se o fetch foi chamado.', async () => {
  //   await fetchGeoData({ lat: -22.75779503086902, lng: -42.85691472781544 });
  //   expect(fetch).toBeCalled();
  // });

  it('3.Teste se, ao chamar a função fetchGeoData sem argumento, retorna um erro com a mensagem: You must provide an argument.', async () => {
    const expectedError = new Error('You must provide an argument');
    const result = await fetchGeoData();
    expect(result).toEqual(expectedError);
  })

  // it('Teste se o retorno da função fetchGeodata com o argumento "latLng" é uma estrutura de dados igual ao objeto geoDataSearch, que já está importado no arquivo.',
  //   async () => {
  //     const result = await fetchGeoData({
  //       lat: -13.5834184,
  //       lng: -41.8109229
  //     });
  //     console.log(geoDataSearch);
  //     expect(result).toEqual(geoDataSearch)
  //   });
});