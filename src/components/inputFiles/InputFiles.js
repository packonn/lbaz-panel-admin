import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  api,
  deleteExtensionFile,
  notify,
  optionNotify,
  sortMusic,
} from "../../request/constant";
import "./inputFiles.css";

const InputFiles = ({
  required,
  accept,
  type,
  name,
  label,
  title,
  handleFiles,
  previousAffiche,
  previousImgXL,
  newMusique,
  musiques,
  id,
  setMusiques,
  spectacle,
  setNewMusique,
  setPreviousImgXL,
  setPreviousAffiche,
  setPreviousImg,
  previousImg,
}) => {
  const deleteItem = async (e, name) => {
    const formData = new FormData();
    if (name === "musique") {
      if (type === "ajout") {
        const newTabMusiqueFiltered = musiques.filter(
          (musique) => musique.name !== e.name
        );
        // Si nous sommes dans l'ajout d'un spectacle, on efface seulement visuellement la musique
        setMusiques(newTabMusiqueFiltered);
        // notify("success", `Musique supprimée`, optionNotify);
      } else {
        const newTabMusicUpdateFiltered = musiques.filter(
          (musique) => musique.secure_url !== e.secure_url
        );

        formData.append("musique", e.name);
        formData.append("url", e.secure_url);

        await axios
          .post(`${api}spectacle/delete/element/${id}`, formData)
          .then((response) => {
            if (response.status === 200) {
              notify("success", `Musique :${e.name} supprimée`, optionNotify);
              setMusiques(newTabMusicUpdateFiltered);
            } else {
              notify("error", `Une erreur est survenue`, optionNotify);
            }
          });
      }
    }
    if (name === "affiche") {
      if (type === "ajout") {
        setPreviousAffiche("");
        // notify("success", `Photo supprimée`, optionNotify);
      } else {
        formData.append("image", e.affiche.name);
        formData.append("url", e.affiche.secure_url);
        await axios
          .post(`${api}spectacle/delete/element/${id}`, formData)
          .then((response) => {
            if (response.status === 200) {
              notify(
                "success",
                `Affiche : ${e.affiche.name} supprimée`,
                optionNotify
              );
              setPreviousAffiche("");
            } else {
              notify("error", `Une erreur est survenue`, optionNotify);
            }
          });
      }
    }
    if (name === "imgXL") {
      if (type === "ajout") {
        setPreviousImgXL("");
        // notify("success", `Photo supprimée`, optionNotify);
      } else {
        formData.append("image", e.imgXL.name);
        formData.append("url", e.imgXL.secure_url);
        await axios
          .post(`${api}spectacle/delete/element/${id}`, formData)
          .then((response) => {
            if (response.status === 200) {
              notify("success", `Photo supprimée`, optionNotify);
              setPreviousImgXL("");
            } else {
              notify("error", `Une erreur est survenue`, optionNotify);
            }
          });
      }
    }
    if (name === "img") {
      if (type === "ajout") {
        setPreviousImg("");
        // notify("success", `Photo supprimée`, optionNotify);
      } else {
        console.log(e);
        formData.append("image", e.image.name);
        formData.append("url", e.image.secure_url);
        await axios
          .post(`${api}actualite/delete/element/${id}`, formData)
          .then((response) => {
            if (response.status === 200) {
              notify("success", `Photo supprimée`, optionNotify);
              setPreviousImg("");
            } else {
              notify("error", `Une erreur est survenue`, optionNotify);
            }
          });
      }
    }
  };

  const deleteNewMusic = (index) => {
    const newTab = [...newMusique];
    newTab.splice(index, 1);
    setNewMusique(newTab);
  };

  return (
    <div className="containerFiles">
      <div className="title">
        <p>{title}</p>
      </div>
      <div className="containerInput">
        <label className="label">{label}</label>
        <div className="button-wrapper">
          <span
            className={
              previousImgXL || previousAffiche || previousImg
                ? "labelSpan disabledInput"
                : "labelSpan "
            }
          >
            ajouter un fichier
          </span>
          <input
            required={required}
            type={"file"}
            accept={accept}
            multiple
            disabled={
              previousImgXL || previousAffiche || previousImg ? true : false
            }
            name={name}
            id="upload"
            className="preupload-box"
            onChange={(e) => handleFiles(e, name)}
          />
        </div>
      </div>
      {previousImgXL || previousAffiche || previousImg ? (
        <div className="previous ">
          <div className="imgPrevious">
            <div className="deleteImg">
              <FontAwesomeIcon
                icon="times"
                color="white"
                style={{ cursor: "pointer" }}
                onClick={() => deleteItem(spectacle, name)}
              />
            </div>
            <img
              style={{ width: "200px", height: "auto", objectFit: "contain" }}
              src={
                name === "affiche"
                  ? previousAffiche
                  : name === "imgXL"
                  ? previousImgXL
                  : previousImg
              }
              alt="prévisualisation du fichier upload"
            />
          </div>
        </div>
      ) : musiques ? (
        <div className="previous">
          {sortMusic(musiques).map((e, i) => {
            return (
              <div
                key={i}
                className={
                  musiques.length > 0 || newMusique.length > 0
                    ? "previousMusic dashed line"
                    : "previousMusic line "
                }
              >
                <p>{deleteExtensionFile(e.name)}</p>
                <FontAwesomeIcon
                  icon="times"
                  color="black"
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteItem(e, "musique")}
                />
              </div>
            );
          })}
          {/* ajout de nouvelle musique pendant la modification */}
          {newMusique && newMusique.length !== 0 && (
            <p
              style={{
                color: "black",
                margin: "20px 0 10px 0",
                fontWeight: 500,
              }}
            >
              Nouvelle musiques
            </p>
          )}
          {newMusique &&
            newMusique.length !== 0 &&
            sortMusic(newMusique).map((e, i) => {
              return (
                <div
                  key={i}
                  className={
                    newMusique.length > 1 || musiques.length > 0
                      ? "previousMusic dashed line"
                      : "previousMusic line "
                  }
                >
                  <p>{deleteExtensionFile(e.name)}</p>
                  <FontAwesomeIcon
                    icon="times"
                    color="black"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteNewMusic(i)}
                  />
                </div>
              );
            })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default InputFiles;
