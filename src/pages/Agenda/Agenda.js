// import './agenda.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { colors } from "../../colors";
import Btn from "../../components/btn/Btn";
import IsLoading from "../../components/IsLoading/IsLoading";
import List from "../../components/List/List";
import SearchBar from "../../components/searchBar/SearchBar";
import { getAllEvents } from "../../request/agenda";

const Agenda = ({ search, setSearch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([]);

  const fetchAllEvents = async () => {
    const allEvents = await getAllEvents();
    setAllEvents(allEvents.data);
  };

  useEffect(() => {
    fetchAllEvents().then(() => {
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
        <Link to='/agenda/ajout'>
          <Btn txt={"Ajouter un événement"} color='gris' />
        </Link>
      </div>
      <List
        list={allEvents}
        reload={fetchAllEvents}
        page='agenda'
        search={search}
        key1Filtered={"spectacle"}
        key2Filtered={"nom"}
      />
    </div>
  );
};

export default Agenda;
