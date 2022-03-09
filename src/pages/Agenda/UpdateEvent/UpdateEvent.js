import { useState, useEffect } from "react";
import { getOneEvent, postEvent, updateEvent } from "../../../request/agenda";
import Btn from "../../../components/btn/Btn";
import InputSmallText from "../../../components/inputSmallText/InputSmallText";
import Header from "../../../components/header/Header";
import IsLoading from "../../../components/IsLoading/IsLoading";
import { getAllSpectacle } from "../../../request/spectacle";
import InputDateTime from "../../../components/inputDateTime/inputDateTime";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const UpdateEvent = () => {
  // logique text input
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [allSpectacle, setAllSpectacle] = useState([]);
  const [spectacleSelected, setSpectacleIdSelected] = useState("");
  const [adresse, setAdresse] = useState("");
  const [date, setDate] = useState("");
  const { id } = useParams();
  const optionNotify = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const getSpectacleForSelect = async () => {
    // Récupération des infos de l'événement
    const allSpectacle = await getAllSpectacle();
    setAllSpectacle(allSpectacle);
  };

  const getEvent = async () => {
    // Récupération de tous les spectacles, pour les ajouter dans le select
    const event = await getOneEvent(id);
    setEvent(event);
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
    if (spectacleSelected && date && adresse) {
      setIsLoading(true);
      const response = await updateEvent(formData, event._id);
      if (response.status === 200) {
        setIsLoading(false);
        notify("success", "Événement modifié avec succès !");
      } else {
        setIsLoading(false);
        notify("error", "Une erreur est survenue !");
      }
    } else {
      notify(
        "warning",
        "Vous devez remplir tous les champs pour ajouter un événement"
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

  const notify = (type, text) => {
    toast[type](text, optionNotify);
  };

  return isLoading ? (
    <IsLoading />
  ) : (
    <div className='containerPage'>
      {isLoading && <IsLoading />}
      <div>
        <ToastContainer />
      </div>
      <Header title={"Ajout d'un événement"} />
      <form
        onSubmit={(e) => handleSubmit(e)}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}>
        <div className='sideLeft'>
          <div className='inputAdress'>
            <InputSmallText
              text={adresse}
              setText={setAdresse}
              type={"text"}
              name={"adresse"}
              placeholder={event.adresse}
            />
          </div>
          <div className='inputMarge'>
            <InputDateTime defaultValue={date} onChange={onChangeDateTime} />
          </div>

          <select className='inputMarge' name='select' onChange={handleSelect}>
            {allSpectacle.map((spectacle) => {
              return (
                <option
                  key={spectacle._id}
                  selected={
                    spectacle._id === event.spectacle._id ? true : false
                  }
                  value={spectacle._id}>
                  {spectacle.nom}
                </option>
              );
            })}
          </select>

          <Btn txt={"Modifier l'événement"} color={"gris"} type={"submit"} />
        </div>
        <div className='sideRight'></div>
      </form>
    </div>
  );
};

export default UpdateEvent;