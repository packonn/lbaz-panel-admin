export const filteredData = (
  listData,
  inputSearch,
  key1Filtered,
  key2Filtered
) => {
  const listFiltered = listData.filter((el) => {
    //if no input the return the original
    if (inputSearch === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return key2Filtered
        ? el[key1Filtered][key2Filtered].toLowerCase().includes(inputSearch)
        : el[key1Filtered].toLowerCase().includes(inputSearch);
    }
  });
  return listFiltered;
};
