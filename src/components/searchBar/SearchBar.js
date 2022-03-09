const SearchBar = ({ search, setSearch }) => {
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
  };
  return (
    <div className='search'>
      <input
        className='inputSpectacles'
        placeholder='Recherche'
        onChange={inputHandler}
        value={search}
      />
    </div>
  );
};

export default SearchBar;
