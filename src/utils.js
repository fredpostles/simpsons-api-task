export const addIndex = (apiData) => {
  apiData.forEach((element, index) => {
    element.id = index;
  });
};

export const sortDataAlphabetically = (apiData) => {
  return apiData.sort((characterOne, characterTwo) => {
    if (characterOne.character > characterTwo.character) return 1;
    if (characterOne.character < characterTwo.character) return -1;

    return 0;
  });
};

export const sortDataReverseAlphabetically = (apiData) => {
  return apiData.sort((characterOne, characterTwo) => {
    if (characterOne.character < characterTwo.character) return 1;
    if (characterOne.character > characterTwo.character) return -1;

    return 0;
  });
};

export const removeDuplicates = (apiData) => {
  const newArray = [];
  apiData.data.forEach((item) => {
    const currentItem = newArray.findIndex(
      (nItem) => nItem.quote === item.quote
    );
    if (currentItem === -1) {
      newArray.push(item);
    }
  });
  return newArray;
};
