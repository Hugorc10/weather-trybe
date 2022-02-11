const saveInfoItems = (localList) => {
    // seu código aqui
    localStorage.setItem('infoItems', (localList));
  };
  
  if (typeof module !== 'undefined') {
    module.exports = saveInfoItems;
  }