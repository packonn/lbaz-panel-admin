import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Btn from "../../components/btn/Btn";
import Header from "../../components/Header/Header";
import InputFiles from "../../components/inputFiles/InputFiles";
import InputLargeText from "../../components/inputLargeText/InputLargeText";
import InputSmallText from "../../components/inputSmallText/InputSmallText";
import InputVideo from "../../components/inputVideo/InputVideo";
import IsLoading from "../../components/IsLoading/IsLoading";
import {
  api,
  deleteAndSortDoublon,
  notify,
  optionNotify,
  verifFormatMusic,
} from "../../request/constant";
import "./addspectacle.css";

const AddSpectacle = () => {
  const { state } = useLocation();

  //logique Files
  const [affiche, setAffiche] = useState();
  const [previousAffiche, setPreviousAffiche] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [imgXL, setImgXL] = useState();
  const [previousImgXL, setPreviousImgXL] = useState("");

  const [musiques, setMusiques] = useState([]);
  // const [previousMusiques, setPreviousMusiques] = useState([]);

  const handleFiles = (e, name) => {
    // Ajout des fichiers
    if (name === "affiche") {
      if (
        e.target.files[0].size < 10485760 &&
        e.target.files[0].type.includes("image/")
      ) {
        setAffiche(e.target.files[0]);
        setPreviousAffiche(URL.createObjectURL(e.target.files[0]));
      } else {
        notify(
          "warning",
          "La taille ou le format ne correspond pas",
          optionNotify
        );
      }
    }
    if (name === "imgXL") {
      if (
        e.target.files[0].size < 10485760 &&
        e.target.files[0].type.includes("image/")
      ) {
        setImgXL(e.target.files[0]);
        setPreviousImgXL(URL.createObjectURL(e.target.files[0]));
      } else {
        notify(
          "warning",
          "La taille ou le format ne correspond pas",
          optionNotify
        );
      }
    }
    if (name === "musiques") {
      let numberFiles = e.target.files.length;
      // Vérification du format du fichier reçu
      const verifResult = verifFormatMusic(numberFiles, e.target.files);
      if (verifResult) {
        // Si c'est bien un fichier audio
        const newArray = [...musiques];
        // let arrayPrevious = [...previousMusiques];
        for (let i = 0; i < numberFiles; i++) {
          newArray.push(e.target.files[i]);
          // arrayPrevious.push(URL.createObjectURL(e.target.files[i]));
        }

        setMusiques(deleteAndSortDoublon(newArray));
        // setPreviousMusiques(arrayPrevious);
      } else {
        // Si ce n'est pas un fichier audio
        notify(
          "error",
          "Seuls les fichiers de type audio sont acceptés",
          optionNotify
        );
      }
    }
  };
  // logique video YT
  const [videos, setVideos] = useState("");

  // logique text input
  const [title, setTitle] = useState("");
  const [minDescription, setMinDescription] = useState("");
  const [boxSong, setBoxSong] = useState("");
  const [histoire, setHistoire] = useState("");
  const [mes, setMes] = useState("");
  const [noteAuteur, setNoteAuteur] = useState("");

  // Envoie du formulaire
  const handleSubmit = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    const formData = new FormData();
    formData.append("nom", title);
    formData.append("minDescription", minDescription);
    formData.append("histoire", histoire);
    formData.append("mise_en_scene", mes);
    formData.append("note_des_auteurs", noteAuteur);
    formData.append("achat", boxSong);
    formData.append("affiche", affiche);
    formData.append("imgXL", imgXL);
    formData.append("video", videos);
    formData.append("clef", state.length);

    let i = 0;
    musiques.forEach((file) => {
      i++;
      formData.append("audio" + i, file);
    });

    if (
      title &&
      mes &&
      noteAuteur &&
      // boxSong &&
      videos &&
      minDescription &&
      histoire &&
      previousAffiche &&
      previousImgXL &&
      musiques.length !== 0
    ) {
      const response = await axios.post(
        `${api}spectacle/publication`,
        formData
      );
      if (response.status === 200) {
        setIsLoading(false);
        setAffiche("");
        setImgXL("");
        setTitle("");
        setMinDescription("");
        setBoxSong("");
        setHistoire("");
        setMes("");
        setNoteAuteur("");
        setMusiques([]);
        setPreviousAffiche("");
        setPreviousImgXL("");
        setVideos("");
        notify("success", "Le spectacle a bien été ajouté !", optionNotify);
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
      <Header title={"Ajout d'un spectacle"} />
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
            text={title}
            setText={setTitle}
            type={"text"}
            name={"title"}
            placeholder={"Titre du Spectacle"}
          />
          <InputSmallText
            text={minDescription}
            setText={setMinDescription}
            type={"text"}
            name={"title"}
            placeholder={"Mini description (max 100 charactères)"}
            max={100}
          />
          <label>L'histoire</label>
          <InputLargeText
            name={"histoire"}
            placeholder={"L'histoire"}
            text={histoire}
            setText={setHistoire}
          />
          <label>Intention de mise en scène</label>
          <InputLargeText
            name={"miseEnScene"}
            placeholder={"Intention de mise en scène"}
            text={mes}
            setText={setMes}
          />
          <label>Note des auteurs</label>
          <InputLargeText
            name={"noteAuteur"}
            placeholder={"Note des auteurs"}
            text={noteAuteur}
            setText={setNoteAuteur}
          />
          <InputSmallText
            text={boxSong}
            setText={setBoxSong}
            type={"text"}
            name={"achat"}
            placeholder={"Lien vers BoxSongs"}
            max={100}
          />
          <Btn txt={"Ajouter le spectacle"} color={"gris"} type={"submit"} />
        </div>
        <div className="sideRight">
          <InputFiles
            type="ajout"
            setPreviousAffiche={setPreviousAffiche}
            previousAffiche={previousAffiche}
            handleFiles={handleFiles}
            name={"affiche"}
            label={"Affiche du spectacle"}
            title={"Affiche"}
          />
          <InputFiles
            type="ajout"
            setPreviousImgXL={setPreviousImgXL}
            previousImgXL={previousImgXL}
            handleFiles={handleFiles}
            name={"imgXL"}
            label={"Photo du spectacle"}
            title={"Image"}
          />
          <InputFiles
            type="ajout"
            setMusiques={setMusiques}
            // previousMusiques={previousMusiques}
            musiques={musiques}
            handleFiles={handleFiles}
            name={"musiques"}
            label={"Musique du spectacle"}
            title={"Musiques"}
          />
          <InputVideo setVideos={setVideos} videos={videos} />
        </div>
      </form>
    </div>
  );
};

export default AddSpectacle;
