// import './modifactualite.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Btn from "../../../components/btn/Btn";
import Header from "../../../components/Header/Header";
import InputFiles from "../../../components/inputFiles/InputFiles";
import InputLargeText from "../../../components/inputLargeText/InputLargeText";
import InputSmallText from "../../../components/inputSmallText/InputSmallText";
import IsLoading from "../../../components/IsLoading/IsLoading";
import { api, notify, optionNotify } from "../../../request/constant";
const ModifActualite = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // Date d'aujourd'hui
  const today = new Date();
  today.toISOString().slice(0, 10);

  const [isLoading, setLoading] = useState(true);

  // logique text input
  const [nom, setNom] = useState("");
  const [minDescription, setMinDescription] = useState("");
  const [description, setDescription] = useState("");
  const [lien, setLien] = useState("");
  const [date, setDate] = useState("");
  const [actualite, setActualite] = useState();

  //logique Files
  const [img, setImg] = useState("");
  const [previousImg, setPreviousImg] = useState("");

  // Ajout des fichiers
  const handleFiles = (e, name) => {
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

  // Réception du spectacle
  const fetchSpectacle = async () => {
    const { data } = await axios.get(`${api}actualite/${id}`);
    setDate(data.date);
    setNom(data.nom);
    setDescription(data.description);
    setMinDescription(data.minDescription);
    if (data.image) {
      setPreviousImg(data.image.secure_url);
    }
    if (data.lien) {
      setLien(data.lien);
    }
    setActualite(data);
  };

  useEffect(() => {
    fetchSpectacle().then(() => {
      setLoading(false);
    });
  }, []);

  // Envoie du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("minDescription", minDescription);
    formData.append("description", description);
    formData.append("lien", lien);
    formData.append("date", date);
    formData.append("image", img);

    if (
      (nom && minDescription && description && img) ||
      (nom && minDescription && description && previousImg)
    ) {
      await axios
        .post(`${api}actualite/update/${id}`, formData)
        .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            // fetchSpectacle();
            notify("success", "Événement modifié avec succès !", optionNotify);
            navigate("/actualite");
          } else {
            notify("error", "Une erreur est survenue !", optionNotify);
          }
        });
    } else {
      setLoading(false);
      notify(
        "warning",
        "Vous ne pouvez pas laisser des champs vides",
        optionNotify
      );
    }
  };
  return (
    <div className='containerPage'>
      <Header title={"Modifier l'actualité"} />
      <ToastContainer />
      {isLoading && <IsLoading absolute />}

      <form
        onSubmit={(e) => handleSubmit(e)}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}>
        <div className='sideLeft'>
          <InputSmallText
            text={nom}
            setText={setNom}
            type={"text"}
            name={"title"}
            placeholder={"Titre de l'actualité *"}
          />
          <InputSmallText
            text={minDescription}
            setText={setMinDescription}
            type={"text"}
            name={"title"}
            placeholder={"Mini description (max 250 charactères) *"}
            max={100}
          />
          <InputLargeText
            name={"description"}
            placeholder={"Description *"}
            text={description}
            setText={setDescription}
          />
          <Btn
            msg={true}
            txt={"Modifier l'actualité"}
            color={"gris"}
            type={"submit"}
          />
        </div>
        <div className='sideRight'>
          <InputFiles
            accept='.JPEG,.JPG,.PNG,.WEBP'
            setPreviousImg={setPreviousImg}
            previousImg={previousImg}
            handleFiles={handleFiles}
            name={"img"}
            label={"Photo de l'actualité *"}
            title={"Image"}
            id={id}
            spectacle={actualite}
          />
          <InputSmallText
            required={false}
            text={lien}
            setText={setLien}
            type={"text"}
            name={"lien"}
            placeholder={"Lien de l'actualité"}
          />
          <label>Date de l'actualité *</label>
          <input
            type='date'
            name='date'
            id='inputDate'
            defaultValue={date.slice(0, 10)}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default ModifActualite;
