import { useState, useEffect } from "react";
import { postEvent } from "../../../request/agenda";
import Btn from "../../../components/btn/Btn";
import Header from "../../../components/Header/Header";
import InputDateTime from "../../../components/inputDateTime/inputDateTime";
import InputSmallText from "../../../components/inputSmallText/InputSmallText";
import IsLoading from "../../../components/IsLoading/IsLoading";
import { getAllSpectacle } from "../../../request/spectacle";
import "./addEvent.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify, optionNotify } from "../../../request/constant";

const AddEvent = () => {
  // logique text input
  const [isLoading, setIsLoading] = useState(true);
  const [allSpectacle, setAllSpectacle] = useState([]);
  const [spectacleSelected, setSpectacleIdSelected] = useState("");
  const [adresse, setAdresse] = useState("");
  const [date, setDate] = useState("");

  const getSpectacleForSelect = async () => {
    // Récupération de tous les spectacles, pour les ajouter dans le select
    const allSpectacle = await getAllSpectacle();
    setAllSpectacle(allSpectacle);
  };

  useEffect(() => {
    getSpectacleForSelect().then(() => {
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    // Envoie du formulaire
    e.preventDefault();
    const formData = new FormData();
    formData.append("date", date);
    formData.append("adresse", adresse);
    if (spectacleSelected && date && adresse) {
      setIsLoading(true);
      const response = await postEvent(formData, spectacleSelected);
      if (response.status === 200) {
        setIsLoading(false);
        notify("success", "Événement ajouté avec succès !", optionNotify);
      } else {
        setIsLoading(false);
        notify("error", "Une erreur est survenue !", optionNotify);
      }
    } else {
      notify(
        "warning",
        "Vous devez remplir tous les champs pour ajouter un événement",
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
              placeholder={"Adresse de l'événement"}
            />
          </div>
          <div className='inputMarge'>
            <InputDateTime onChange={onChangeDateTime} />
          </div>

          <select
            className='inputMarge'
            name='select'
            defaultValue={""}
            onChange={handleSelect}>
            <option value='' selected disabled>
              Sélectionnez un spectacle
            </option>
            {allSpectacle.map((spectacle) => {
              return (
                <option key={spectacle._id} value={spectacle._id}>
                  {spectacle.nom}
                </option>
              );
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
