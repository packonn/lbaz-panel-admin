import { useState, useEffect } from "react";
import { getOneEvent, updateEvent } from "../../../request/agenda";
import Btn from "../../../components/btn/Btn";
import InputSmallText from "../../../components/inputSmallText/InputSmallText";
import Header from "../../../components/Header/Header";
import IsLoading from "../../../components/IsLoading/IsLoading";
import { getAllSpectacle } from "../../../request/spectacle";
import InputDateTime from "../../../components/inputDateTime/inputDateTime";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { notify, optionNotify } from "../../../request/constant";

const UpdateEvent = () => {
  // logique text input
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [allSpectacle, setAllSpectacle] = useState([]);
  const [spectacleSelected, setSpectacleIdSelected] = useState("");
  const [adresse, setAdresse] = useState("");
  const [billeterie, setBilleterie] = useState("");
  const [date, setDate] = useState("");
  const { id } = useParams();

  const getSpectacleForSelect = async () => {
    // Récupération des infos de l'événement
    const allSpectacle = await getAllSpectacle();
    setAllSpectacle(allSpectacle);
  };

  const getEvent = async () => {
    // Récupération de tous les spectacles, pour les ajouter dans le select
    const event = await getOneEvent(id);
    setEvent(event);
    setBilleterie(event.billeterie);
    setAdresse(event.adresse);
    setDate(event.date);
    setSpectacleIdSelected(event.spectacle._id);
  };

  useEffect(() => {
    getSpectacleForSelect().then(() => {
      getEvent().then(() => {
        setIsLoading(false);
      });
    });
  }, [id]);

  const handleSubmit = async (e) => {
    // Envoie du formulaire
    e.preventDefault();
    const formData = new FormData();
    formData.append("date", date);
    formData.append("adresse", adresse);
    formData.append("billeterie", billeterie);
    formData.append("spectacle_id", spectacleSelected);
    if (spectacleSelected && date && adresse && billeterie) {
      setIsLoading(true);

      const response = await updateEvent(formData, event._id);
      if (response.status === 200) {
        setIsLoading(false);
        notify("success", "Événement modifié avec succès !", optionNotify);
      } else {
        setIsLoading(false);
        notify("error", "Une erreur est survenue !", optionNotify);
      }
    } else {
      notify(
        "warning",
        "Vous ne pouvez pas laisser des champs vides",
        optionNotify
      );
    }
  };

  const handleSelect = (e) => {
    // Selection du spectacle
    setSpectacleIdSelected(e.target.value);
  };
  const onChangeDateTime = (value) => {
    // Selection de la date et l'heure
    setDate(value);
  };

  return (
    <div className="containerPage">
      {isLoading && <IsLoading absolute />}
      <div>
        <ToastContainer />
      </div>
      <Header title={"Ajout d'un événement"} />
      <form
        onSubmit={(e) => handleSubmit(e)}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <div className="sideLeft">
          <div className="inputAdress">
            <InputSmallText
              text={adresse}
              setText={setAdresse}
              type={"text"}
              name={"adresse"}
              placeholder={event.adresse}
            />
          </div>

          <InputSmallText
            text={billeterie}
            setText={setBilleterie}
            type={"text"}
            name={"billeterie"}
            placeholder={event.billeterie}
          />
          <div className="inputMarge">
            <InputDateTime defaultValue={date} onChange={onChangeDateTime} />
          </div>
          <select className="inputMarge" name="select" onChange={handleSelect}>
            {allSpectacle.map((spectacle, index) => {
              return (
                <option
                  key={index}
                  selected={spectacle._id === spectacleSelected ? true : false}
                  value={spectacle._id}
                >
                  {spectacle.nom}
                </option>
              );
            })}
          </select>

          <Btn txt={"Modifier l'événement"} color={"gris"} type={"submit"} />
        </div>
        <div className="sideRight"></div>
      </form>
    </div>
  );
};

export default UpdateEvent;
