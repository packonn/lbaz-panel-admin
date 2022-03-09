// import './agenda.css'

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllEvents } from "../../request/agenda";
import List from "../../components/List/List";
import Btn from "../../components/btn/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../../components/searchBar/SearchBar";
import { ListFiltered } from "../../components/ListFiltered/ListFiltered";
import IsLoading from "../../components/IsLoading/IsLoading";
import { colors } from "../../colors";

const Agenda = ({ search, setSearch }) => {
  const [eventSelected, setEventSelected] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([]);
  const handleSelect = (e) => {
    setEventSelected(e.target.value);
  };

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
      {/* <ListFiltered listData={allEvents} inputSearch={search} /> */}
      <List
        list={allEvents}
        reload={fetchAllEvents}
        page='agenda'
        search={search}
        key1Filtered={"spectacle"}
        key2Filtered={"nom"}
      />
    </div>

    // {/* <div style={{ display: "flex", flexDirection: "column" }}>
    //   <Link to='/ajout'>ajouter un événement</Link>
    //   <Link to={`modifier/${eventSelected}`}>
    //     modifier l'événement : {eventSelected}
    //   </Link>
    // </div>
    // <select
    //   className='inputMarge'
    //   name='select'
    //   defaultValue={""}
    //   onChange={handleSelect}>
    //   <option value='' selected disabled>
    //     Sélectionnez un événement
    //   </option>
    //   {allEvents.map((event) => {
    //     return (
    //       <option key={event._id} value={event._id}>
    //         {event.date}
    //         {event.adresse}
    //       </option>
    //     );
    //   })}
    // </select> */}
  );
};

export default Agenda;
