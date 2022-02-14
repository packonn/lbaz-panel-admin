import "./spectacle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import InputSmallText from "../../components/inputSmallText/InputSmallText";
import InputLargeText from "../../components/inputLargeText/InputLargeText";
import Btn from "../../components/btn/Btn";
import InputFiles from "../../components/inputFiles/InputFiles";
import InputVideo from "../../components/inputVideo/InputVideo";
import { useState } from "react";
import axios from "axios";
import InputDate from "../../components/inputDate/InputDate";

library.add(fab, faUser);

const Spectacle = () => {
  //logique Files
  const [affiche, setAffiche] = useState();
  const [previousAffiche, setPreviousAffiche] = useState("");

  const [imgXL, setImgXL] = useState();
  const [previousImgXL, setPreviousImgXL] = useState("");

  const [musiques, setMusiques] = useState([]);
  const [previousMusiques, setPreviousMusiques] = useState([]);

  const handleFiles = (e, name) => {
    if (name === "affiche") {
      if (e.target.files[0].size < 10485760) {
        setAffiche(e.target.files[0]);
        setPreviousAffiche(URL.createObjectURL(e.target.files[0]));
      } else {
        console.log("trop grand");
      }
    }
    if (name === "imgXL") {
      if (e.target.files[0].size < 10485760) {
        setImgXL(e.target.files[0]);
        setPreviousImgXL(URL.createObjectURL(e.target.files[0]));
      } else {
        console.log("trop grand");
      }
    }
    if (name === "musiques") {
      let numberFiles = e.target.files.length;

      const newArray = [...musiques];
      let arrayPrevious = [...previousMusiques];
      for (let i = 0; i < numberFiles; i++) {
        newArray.push(e.target.files[i]);
        arrayPrevious.push(URL.createObjectURL(e.target.files[i]));
      }
      setMusiques(newArray);
      setPreviousMusiques(arrayPrevious);
    }
  };
  // logique video YT
  const [url, setUrl] = useState("");
  const [videos, setVideos] = useState([]);

  const handleVideo = () => {
    const newArray = [...videos];
    newArray.push(url);
    setVideos(newArray);
    setUrl("");
  };
  // logique text input
  const [title, setTitle] = useState("");
  const [minDescription, setMinDescription] = useState("");
  const [boxSong, setBoxSong] = useState("");
  const [histoire, setHistoire] = useState("");
  const [mes, setMes] = useState("");
  const [noteAuteur, setNoteAuteur] = useState("");
  // Logique date
  const [date, setDate] = useState("");
  const [allDate, setAllDate] = useState([]);
  const handleClick = () => {
    if (date !== "") {
      const newArray = [...allDate];
      newArray.push(date);
      setAllDate(newArray);
    }
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  // Envoie du formulaire
  const handleSubmit = async (e) => {
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
    formData.append("date", allDate);

    let i = 0;
    musiques.forEach((file) => {
      i++;
      formData.append("audio" + i, file);
    });

    const response = await axios.post(
      "http://localhost:3100/spectacle/publication",
      formData
    );
    console.log(response);
  };

  return (
    <div className='containerPage'>
      <header>
        <h2>Ajout d'un spectacle</h2>
        <div className='admin'>
          <div>
            <FontAwesomeIcon
              icon='user'
              color='white'
              style={{ height: "auto", width: "1.3vw" }}
            />
          </div>
          <div className='textAdmin'>
            <p>Admin</p>
          </div>
        </div>
      </header>
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
          <Btn txt={"Ajouter le spectacle"} color={"gris"} type={"submit"} />
        </div>
        <div className='sideRight'>
          <InputFiles
            previousAffiche={previousAffiche}
            handleFiles={handleFiles}
            name={"affiche"}
            label={"Affiche du spectacle"}
            title={"Affiche"}
          />
          <InputFiles
            previousImgXL={previousImgXL}
            handleFiles={handleFiles}
            name={"imgXL"}
            label={"Photo du spectacle"}
            title={"Image"}
          />
          <InputFiles
            previousMusiques={previousMusiques}
            musiques={musiques}
            handleFiles={handleFiles}
            name={"musiques"}
            label={"Musique du spectacle"}
            title={"Musiques"}
          />
          <InputVideo
            handleVideo={handleVideo}
            url={url}
            setUrl={setUrl}
            videos={videos}
          />
          <InputDate
            allDate={allDate}
            handleClick={handleClick}
            handleDate={handleDate}
          />
        </div>
      </form>
    </div>
  );
};

export default Spectacle;
