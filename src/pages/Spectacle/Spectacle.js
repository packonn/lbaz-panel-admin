import "./spectacle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import InputSmallText from "../../components/inputSmallText/InputSmallText";
import InputLargeText from "../../components/inputLargeText/InputLargeText";
import Btn from "../../components/btn/Btn";
import InputFiles from "../../components/inputFiles/InputFiles";

library.add(fab, faUser);

const Spectacle = () => {
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
      <form>
        <div className='sideLeft'>
          <InputSmallText
            type={"text"}
            name={"title"}
            placeholder={"Titre du Spectacle"}
          />
          <InputSmallText
            type={"text"}
            name={"title"}
            placeholder={"Mini description (max 100 charactères)"}
            max={100}
          />
          <label>L'histoire</label>
          <InputLargeText name={"histoire"} placeholder={"L'histoire"} />
          <label>Intention de mise en scène</label>
          <InputLargeText
            name={"miseEnScene"}
            placeholder={"Intention de mise en scène"}
          />
          <label>Note des auteurs</label>
          <InputLargeText
            name={"noteAuteur"}
            placeholder={"Note des auteurs"}
          />
          <InputSmallText
            type={"text"}
            name={"achat"}
            placeholder={"Lien vers BoxSongs"}
            max={100}
          />
          <Btn txt={"Ajouter le spectacle"} color={"gris"} />
        </div>
        <div className='sideRight'>
          <InputFiles
            name={"affiche"}
            label={"Affiche du spectacle"}
            title={"Affiche"}
          />
          <InputFiles
            name={"imgXL"}
            label={"Photo du spectacle"}
            title={"Image"}
          />
          <InputFiles
            name={"musiques"}
            label={"Musique du spectacle"}
            title={"Musiques"}
          />
        </div>
      </form>
    </div>
  );
};

export default Spectacle;
