import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { colors } from "../../colors";
import Btn from "../../components/btn/Btn";
import IsLoading from "../../components/IsLoading/IsLoading";
import List from "../../components/List/List";
import SearchBar from "../../components/searchBar/SearchBar";
import { api } from "../../request/constant";
import "./spectacle.css";

const Spectacles = ({ search, setSearch }) => {
  const [allSpectacles, setAllSpectacles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSpectacles = async () => {
    const result = await axios.get(`${api}spectacles`);
    setAllSpectacles(result.data);
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
      <ToastContainer />

      <div className='headerSpectacles'>
        <div className='inputHeaderSpectacles'>
          <FontAwesomeIcon
            icon='search'
            color={colors.violetClair}
            className='loupe'
          />
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <Link to={"/spectacles/ajout"} state={allSpectacles}>
          <Btn txt={"Ajouter un spectacles"} color='gris' />
        </Link>
      </div>

      <List
        isNotdragable={false}
        key1Filtered={"nom"}
        key2Filtered={""}
        search={search}
        page='spectacle'
        list={allSpectacles}
        setAllSpectacles={setAllSpectacles}
      />
    </div>
  );
};

export default Spectacles;
