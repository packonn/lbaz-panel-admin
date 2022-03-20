// import './actualite.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { colors } from "../../colors";
import Btn from "../../components/btn/Btn";
import IsLoading from "../../components/IsLoading/IsLoading";
import List from "../../components/List/List";
import SearchBar from "../../components/searchBar/SearchBar";
import { api } from "../../request/constant";
const Actualite = ({ search, setSearch }) => {
  const [allaActus, setAllActus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSpectacles = async () => {
    const result = await axios.get(`${api}actualites`);
    setAllActus(result.data);
  };
  useEffect(() => {
    fetchSpectacles().then(() => {
      setIsLoading(false);
    });
  }, []);
  return isLoading ? (
    <IsLoading />
  ) : (
    <div className='containerPageSpectacles'>
      <div className='headerSpectacles'>
        <div className='inputHeaderSpectacles'>
          <FontAwesomeIcon
            icon='search'
            color={colors.violetClair}
            className='loupe'
          />
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <Link to={"/actualite/ajout"} state={allaActus}>
          <Btn txt={"Ajouter une actualité"} color='gris' />
        </Link>
      </div>

      <List
        key1Filtered={"nom"}
        key2Filtered={""}
        search={search}
        page='actualite'
        list={allaActus}
        setAllActus={setAllActus}
      />
    </div>
  );
};

export default Actualite;
