import { useState } from "react";
import "./inputFiles.css";

const InputFiles = ({ name, label, title }) => {
  const [Affiche, setAffiche] = useState();
  const [previousAffiche, setPreviousAffiche] = useState("");

  const [ImgXL, setImgXL] = useState();
  const [previousImgXL, setPreviousImgXL] = useState("");

  const [musiques, setMusiques] = useState([]);
  const [previousMusiques, setPreviousMusiques] = useState([]);

  const handleFiles = (e) => {
    if (name === "affiche") {
      setAffiche(e.target.files[0]);
      setPreviousAffiche(URL.createObjectURL(e.target.files[0]));
    }
    if (name === "imgXL") {
      setImgXL(e.target.files[0]);
      setPreviousImgXL(URL.createObjectURL(e.target.files[0]));
    }
    if (name === "musiques") {
      const newArray = [...musiques];
      newArray.push(e.target.files[0]);
      setMusiques(newArray);

      let arrayPrevious = [...previousMusiques];
      arrayPrevious.push(URL.createObjectURL(e.target.files[0]));
      setPreviousMusiques(arrayPrevious);
    }
  };

  return (
    <div className='containerFiles'>
      <div className='title'>
        <p>{title}</p>
      </div>
      <div className='containerInput'>
        <label>{label}</label>
        <div className='button-wrapper'>
          <span className='label'>ajouté un fichier</span>
          <input
            type='file'
            name={name}
            id='upload'
            className='upload-box'
            onChange={(e) => handleFiles(e)}
          />
        </div>
      </div>
      {previousImgXL || previousAffiche ? (
        <div className='previousImg'>
          <img
            style={{ width: "100px", height: "auto", objectFit: "contain" }}
            src={name === "affiche" ? previousAffiche : previousImgXL}
            alt='prévisualisation du fichier upload'
          />
        </div>
      ) : previousMusiques.length > 0 ? (
        <div className='previousImg'>
          {musiques.map((e, i) => {
            return (
              <p style={{ color: "black", paddingTop: "10px" }}>{e.name}</p>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default InputFiles;
