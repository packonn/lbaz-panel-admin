import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { api } from "../../request/constant";
import "./inputFiles.css";

const InputFiles = ({
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
}) => {
  const deleteItem = async (e, type) => {
    const formData = new FormData();
    if (type === "musique") {
      formData.append("musique", e.name);
      formData.append("url", e.secure_url);

      const newTab = musiques.filter(
        (musique) => musique.secure_url !== e.secure_url
      );
      await axios
        .post(`${api}spectacle/delete/element/${id}`, formData)
        .then((response) => {
          console.log(response);
          setMusiques(newTab);
        });
    }
    if (type === "affiche") {
      formData.append("image", e.affiche.name);
      formData.append("url", e.affiche.secure_url);
      await axios
        .post(`${api}spectacle/delete/element/${id}`, formData)
        .then((response) => {
          console.log(response);
          setPreviousAffiche("");
        });
    }
    if (type === "imgXL") {
      formData.append("image", e.imgXL.name);
      formData.append("url", e.imgXL.secure_url);
      await axios
        .post(`${api}spectacle/delete/element/${id}`, formData)
        .then((response) => {
          console.log(response);
          setPreviousImgXL("");
        });
    }
  };

  const deleteNewMusic = (index) => {
    const newTab = [...newMusique];
    newTab.splice(index, 1);
    setNewMusique(newTab);
  };

  return (
    <div className='containerFiles'>
      <div className='title'>
        <p>{title}</p>
      </div>
      <div className='containerInput'>
        <label className='label'>{label}</label>
        <div className='button-wrapper'>
          <span
            className={
              previousImgXL || previousAffiche
                ? "labelSpan disabledInput"
                : "labelSpan "
            }>
            ajouter un fichier
          </span>
          <input
            type='file'
            multiple
            disabled={previousImgXL || previousAffiche ? true : false}
            name={name}
            id='upload'
            className='preupload-box'
            onChange={(e) => handleFiles(e, name)}
          />
        </div>
      </div>
      {previousImgXL || previousAffiche ? (
        <div className='previous '>
          <div className='imgPrevious'>
            <div className='deleteImg'>
              <FontAwesomeIcon
                icon='times'
                color='white'
                style={{ cursor: "pointer" }}
                onClick={() => deleteItem(spectacle, name)}
              />
            </div>
            <img
              style={{ width: "200px", height: "auto", objectFit: "contain" }}
              src={name === "affiche" ? previousAffiche : previousImgXL}
              alt='prévisualisation du fichier upload'
            />
          </div>
        </div>
      ) : musiques ? (
        <div className='previous'>
          {musiques.map((e, i) => {
            return (
              <div
                key={i}
                className={
                  musiques.length > 0 || newMusique.length > 0
                    ? "previousMusic dashed line"
                    : "previousMusic line "
                }>
                <p>{e.name}</p>
                <FontAwesomeIcon
                  icon='times'
                  color='black'
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteItem(e, "musique")}
                />
              </div>
            );
          })}
          {/* ajout de nouvelle musique pendant la modification */}
          {newMusique &&
            newMusique.map((e, i) => {
              return (
                <div
                  key={i}
                  className={
                    newMusique.length > 1 || musiques.length > 0
                      ? "previousMusic dashed line"
                      : "previousMusic line "
                  }>
                  <p>{e.name}</p>
                  <FontAwesomeIcon
                    icon='times'
                    color='black'
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
