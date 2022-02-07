import { useState } from "react";
import "./inputFiles.css";

const InputFiles = ({ name, label, title }) => {
  const [filesAffiche, setAffiche] = useState([]);
  const [filesImgXL, setImgXL] = useState([]);
  const [previousAffiche, setPreviousAffiche] = useState("");
  const [previousImgXL, setPreviousImgXL] = useState('');
  const handleFiles = (e) => {
    setAffiche(e.target.files[0]);
    setPreviousAffiche(URL.createObjectURL(e.target.files[0]));

  };
  return (
    <div className="containerFiles">
      <div className="title">
      <h3>{title}</h3>
      </div>
      <div className="containerInput">
        <label>{label}</label>
        <div class="button-wrapper">
          <span class="label">
            Selectionné un fichier
          </span>
            <input type="file" name={name} id="upload" class="upload-box"  onChange={(e) => handleFiles(e)}/>
        </div>
      </div>
        <div className="previousImg">
          <img style={{width: "200px",objectFit: "contain"}} src={previousAffiche}/>
        </div>

    </div>
  );
};

export default InputFiles;
