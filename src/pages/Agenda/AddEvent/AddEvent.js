import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { postEvent } from "../../../request/agenda";
import Btn from "../../../components/btn/Btn";
import "./addEvent.css";
import InputSmallText from "../../../components/inputSmallText/InputSmallText";
import Header from "../../../components/header/Header";
import IsLoading from "../../../components/IsLoading/IsLoading";
import { getAllSpectacle } from "../../../request/spectacle";
import InputDateTime from "../../../components/inputDateTime/inputDateTime";
import axios from "axios";
import { api } from "../../../request/constant";

const AddEvent = () => {
  // logique text input
  const [isLoading, setIsLoading] = useState(true);
  const [allSpectacle, setAllSpectacle] = useState([]);
  const [spectacleSelected, setSpectacleIdSelected] = useState("");
  const [adresse, setAdresse] = useState("");
  const [date, setDate] = useState("");

  const getSpectacleForSelect = async () => {
    const allSpectacle = await getAllSpectacle();
    console.log("allSpectacle", allSpectacle);
    setAllSpectacle(allSpectacle);
  };

  useEffect(() => {
    getSpectacleForSelect().then(() => {
      setIsLoading(false);
    });
  }, []);

  // Envoie du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("spectacleSelected", spectacleSelected);
    const formData = new FormData();
    // formData.append("spectacle_id", spectacleSelected);
    formData.append("date", date);
    formData.append("adresse", adresse);
    console.log("'formData avant'", formData);

    // const response = await postEvent(formData, spectacleSelected);
    const response = await axios.post(
      `${api}evenement/publication/${spectacleSelected}`,
      formData
    );
    // } else {
    //    message erreur
    // }
  };

  const handleSelect = (e) => {
    setSpectacleIdSelected(e.target.value);
    console.log("Value selected", e.target.value);
  };
  const onChangeDateTime = (value) => {
    console.log("Value datetime", value);
    setDate(value);
  };

  return isLoading ? (
    <IsLoading />
  ) : (
    <div className='containerPage'>
      <Header title={"Ajout d'un événement"} />

      <form
        onSubmit={(e) => handleSubmit(e)}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}>
        <div className='sideLeft'>
          <div className='inputAdress'>
            {/* <FontAwesomeIcon
              icon='user'
              color='white'
              style={{ height: "auto", width: "1.3vw" }}
            /> */}
            <InputSmallText
              text={adresse}
              setText={setAdresse}
              type={"text"}
              name={"adresse"}
              placeholder={"Adresse de l'événement"}
            />
          </div>
          <InputDateTime onChange={onChangeDateTime} />

          <select name='select' onChange={handleSelect}>
            {allSpectacle.map((spectacle) => {
              return <option value={spectacle._id}>{spectacle.nom}</option>;
            })}
          </select>
          <Btn txt={"Ajouter l'événement"} color={"gris"} type={"submit"} />
        </div>
        <div className='sideRight'></div>
      </form>
    </div>
  );
};

export default AddEvent;
