function makeNodes(arrayInfo) {
    const arrayNode = arrayInfo.map(() => document.createElement('il'));
    arrayNode.forEach((element) => element.className = 'item-info');
    arrayNode[0].innerText = `País: ${arrayInfo[0]}`;
    arrayNode[1].innerText = `Região: ${arrayInfo[1]}`;
    arrayNode[2].innerText = `Cidade: ${arrayInfo[2]}`;;
    arrayNode[3].innerText = `Código da Moeda: ${arrayInfo[3]}`;
    arrayNode[4].innerText = `Símbolo da Moeda: ${arrayInfo[4]}`;
    arrayNode[5].innerText = `Nascer do Sol: ${arrayInfo[5]}`;
    arrayNode[6].innerText = `Pôr do Sol: ${arrayInfo[6]}`;
    arrayNode[7].innerText = `Fuso Horário: ${arrayInfo[7]}`;
    return arrayNode;
}

function makeRegionInfos(objInfos) {
    const {country, region, city, currency_code, currency_symbol, sunrise, sunset, time_zone} = objInfos;
    const arrayInfo = [];
    const unorList = document.createElement('ul');
    unorList.id = 'region-info';
    arrayInfo.push(country);
    arrayInfo.push(region);
    arrayInfo.push(city);
    arrayInfo.push(currency_code);
    arrayInfo.push(currency_symbol);
    arrayInfo.push(sunrise);
    arrayInfo.push(sunset);
    arrayInfo.push(time_zone);
    const arrayNode = makeNodes(arrayInfo);
    arrayNode.forEach((element) => unorList.appendChild(element));
    return unorList;
}