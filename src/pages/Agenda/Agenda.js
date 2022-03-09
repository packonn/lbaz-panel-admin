// import './agenda.css'

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllEvents } from "../../request/agenda";

const Agenda = () => {
  const [eventSelected, setEventSelected] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const handleSelect = (e) => {
    setEventSelected(e.target.value);
  };

  const getAllEventsForSelect = async () => {
    const allEvents = await getAllEvents();
    setAllEvents(allEvents.data);
  };

  useEffect(() => {
    getAllEventsForSelect().then(() => {});
  }, []);

  return (
    <div>
      AGENDA
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to='/ajout'>ajouter un événement</Link>
        <Link to={`modifier/${eventSelected}`}>
          modifier l'événement : {eventSelected}
        </Link>
      </div>
      <select
        className='inputMarge'
        name='select'
        defaultValue={""}
        onChange={handleSelect}>
        <option value='' selected disabled>
          Sélectionnez un événement
        </option>
        {allEvents.map((event) => {
          return (
            <option key={event._id} value={event._id}>
              {event.date}
              {event.adresse}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Agenda;
