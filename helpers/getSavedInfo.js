const getSavedInfo = () => {
    // seu código aqui
    const previous = localStorage.getItem('infoItems');
    return previous;
  };
  
  if (typeof module !== 'undefined') {
    module.exports = getSavedInfo;
  }
  