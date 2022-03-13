// import './modifspectacle.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  deleteExtensionFile,
  notify,
  optionNotify,
} from "../../request/constant";

const ModifSpectacle = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);

  const [spectacle, setSpectacle] = useState();
  // logique text input
  const [title, setTitle] = useState("");
  const [minDescription, setMinDescription] = useState("");
  const [boxSong, setBoxSong] = useState("");
  const [histoire, setHistoire] = useState("");
  const [mes, setMes] = useState("");
  const [noteAuteur, setNoteAuteur] = useState("");
  //logique Files
  const [affiche, setAffiche] = useState();
  const [previousAffiche, setPreviousAffiche] = useState("");

  const [imgXL, setImgXL] = useState();
  const [previousImgXL, setPreviousImgXL] = useState("");

  const [musiques, setMusiques] = useState([]);
  const [newMusique, setNewMusique] = useState([]);

  const handleFiles = (e, name) => {
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
      // Ajout des nouvelles musiques dans le tableau NewMusic
      let numberFiles = e.target.files.length;
      const newArray = [...newMusique];
      for (let i = 0; i < numberFiles; i++) {
        newArray.push(e.target.files[i]);
      }
      const newMusiqueWithoutDoublonWidthOldMusic = [];
      for (let i = 0; i <= newArray.length - 1; i++) {
        // Création d'un nouveau tableau avec que les nouvelles musique, en testant si elles sont deja présentes dans les musique de la BDD
        let testIfDoublon = false;
        for (let y = 0; y <= musiques.length - 1; y++) {
          if (deleteExtensionFile(newArray[i].name) === musiques[y].name) {
            testIfDoublon = true;
          }
          if (y === musiques.length - 1 && !testIfDoublon) {
            newMusiqueWithoutDoublonWidthOldMusic.push(newArray[i]);
          }
        }
      }
      setNewMusique(newMusiqueWithoutDoublonWidthOldMusic);
    }
  };
  // logique video YT
  const [videos, setVideos] = useState([]);

  // Réception du spectacle
  const fetchSpectacle = async () => {
    const result = await axios.get(`${api}spectacle/${id}`);
    setSpectacle(result.data);
    const tabMusiques = [...result.data.musique];
    setTitle(result.data.nom);
    setMinDescription(result.data.minDescription);
    setHistoire(result.data.histoire);
    setMes(result.data.mise_en_scene);
    setBoxSong(result.data.achat);
    setNoteAuteur(result.data.note_des_auteurs);
    setVideos(result.data.video);
    setMusiques(tabMusiques);
    if (result.data.affiche) {
      setPreviousAffiche(result.data.affiche.secure_url);
    } else {
      setPreviousAffiche("");
    }
    if (result.data.imgXL) {
      setPreviousImgXL(result.data.imgXL.secure_url);
    } else {
      setPreviousImgXL("");
    }
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
    formData.append("nom", title);
    formData.append("minDescription", minDescription);
    formData.append("histoire", histoire);
    formData.append("mise_en_scene", mes);
    formData.append("note_des_auteurs", noteAuteur);
    formData.append("achat", boxSong);
    formData.append("affiche", affiche);
    formData.append("imgXL", imgXL);
    formData.append("video", videos);
    let i = 0;
    newMusique.forEach((file) => {
      i++;
      formData.append("audio" + i, file);
    });
    if (
      title &&
      minDescription &&
      histoire &&
      previousAffiche &&
      previousImgXL
    ) {
      await axios
        .post(`${api}spectacle/update/${id}`, formData)
        .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            // fetchSpectacle();
            notify("success", "Événement modifié avec succès !", optionNotify);
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
      {isLoading && <IsLoading absolute />}
      <ToastContainer />
      <Header title={"Modification du spectacle"} />
      <form
        onSubmit={(e) => handleSubmit(e)}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}>
        <div className='sideLeft'>
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
          <Btn txt={"Modifier le spectacle"} color={"gris"} type={"submit"} />
        </div>
        <div className='sideRight'>
          <InputFiles
            spectacle={spectacle}
            affiche={affiche}
            previousAffiche={previousAffiche}
            handleFiles={handleFiles}
            name={"affiche"}
            label={"Affiche du spectacle"}
            title={"Affiche"}
            setPreviousAffiche={setPreviousAffiche}
            id={id}
          />
          <InputFiles
            spectacle={spectacle}
            handleFiles={handleFiles}
            previousImgXL={previousImgXL}
            name={"imgXL"}
            label={"Photo du spectacle"}
            title={"Image"}
            setPreviousImgXL={setPreviousImgXL}
            id={id}
          />
          <InputFiles
            setNewMusique={setNewMusique}
            setMusiques={setMusiques}
            id={id}
            newMusique={newMusique}
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

export default ModifSpectacle;
