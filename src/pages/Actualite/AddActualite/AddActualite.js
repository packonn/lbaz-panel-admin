// import './addactualite.css'
import axios from "axios";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Btn from "../../../components/btn/Btn";
import Header from "../../../components/Header/Header";
import InputFiles from "../../../components/inputFiles/InputFiles";
import InputLargeText from "../../../components/inputLargeText/InputLargeText";
import InputSmallText from "../../../components/inputSmallText/InputSmallText";
import IsLoading from "../../../components/IsLoading/IsLoading";
import { api, notify, optionNotify } from "../../../request/constant";
const AddActualite = () => {
  //logique Files
  const [isLoading, setIsLoading] = useState(false);

  const [img, setImg] = useState();
  const [previousImg, setPreviousImg] = useState("");

  const handleFiles = (e, name) => {
    // Ajout des fichiers

    if (name === "img") {
      if (
        e.target.files[0].size < 10485760 &&
        e.target.files[0].type.includes("image/")
      ) {
        setImg(e.target.files[0]);
        setPreviousImg(URL.createObjectURL(e.target.files[0]));
      } else {
        notify(
          "warning",
          "La taille ou le format ne correspond pas",
          optionNotify
        );
      }
    }
  };
  // Date d'aujourd'hui
  const today = new Date();
  today.toISOString().slice(0, 10);

  // logique text input
  const [nom, setNom] = useState("");
  const [minDescription, setMinDescription] = useState("");
  const [description, setDescription] = useState("");
  const [lien, setLien] = useState("");
  const [date, setDate] = useState(today.toISOString().slice(0, 10));

  // Envoie du formulaire
  const handleSubmit = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("minDescription", minDescription);
    formData.append("description", description);
    formData.append("lien", lien);
    formData.append("date", date);
    formData.append("image", img);

    if (nom && minDescription && description && previousImg) {
      const response = await axios.post(
        `${api}actualite/publication`,
        formData
      );
      console.log(response);
      if (response.status === 200) {
        setIsLoading(false);
        setImg("");
        setNom("");
        setMinDescription("");
        setDescription("");
        setPreviousImg("");
        setLien("");
        notify("success", "L'actualité à bien été ajouté !", optionNotify);
      } else {
        setIsLoading(false);
        notify("error", "Une erreur est survenue", optionNotify);
      }
    } else {
      setIsLoading(false);
      notify(
        "warning",
        "Vous ne pouvez pas laisser des champs vides",
        optionNotify
      );
    }
  };
  return (
    <div className="containerPage">
      <Header title={"Ajout d'une actualité"} />
      <ToastContainer />
      {isLoading && <IsLoading absolute />}

      <form
        onSubmit={(e) => handleSubmit(e)}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <div className="sideLeft">
          <InputSmallText
            text={nom}
            setText={setNom}
            type={"text"}
            name={"title"}
            required={true}
            placeholder={"Titre de l'actualité *"}
          />
          <InputSmallText
            text={minDescription}
            setText={setMinDescription}
            type={"text"}
            name={"title"}
            placeholder={"Mini description (max 250 charactères) *"}
            max={100}
            required={true}
          />
          <InputLargeText
            name={"description"}
            placeholder={"Description *"}
            text={description}
            setText={setDescription}
            required={true}
          />

          <Btn
            msg={true}
            txt={"Ajouter une actualité"}
            color={"gris"}
            type={"submit"}
          />
        </div>
        <div className="sideRight">
          <InputFiles
            type="ajout"
            accept=".JPEG,.JPG,.PNG,.WEBP"
            setPreviousImg={setPreviousImg}
            previousImg={previousImg}
            handleFiles={handleFiles}
            name={"img"}
            label={"Photo de l'actualité"}
            title={"Image *"}
            required={true}
          />
          <InputSmallText
            text={lien}
            setText={setLien}
            type={"text"}
            name={"lien"}
            placeholder={"Lien de l'actualité"}
            required={false}
          />
          <label>
            Date de l'événement *
            <input
              type="date"
              name="date"
              id="inputDate"
              defaultValue={today.toISOString().slice(0, 10)}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              required
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default AddActualite;
