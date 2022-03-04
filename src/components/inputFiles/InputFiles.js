import "./inputFiles.css";

const InputFiles = ({
  name,
  label,
  title,
  handleFiles,
  previousAffiche,
  previousImgXL,
  previousMusiques,
  musiques,
}) => {
  return (
    <div className='containerFiles'>
      <div className='title'>
        <p>{title}</p>
      </div>
      <div className='containerInput'>
        <label className='label'>{label}</label>
        <div className='button-wrapper'>
          <span className='label'>ajouter un fichier</span>
          <input
            type='file'
            multiple
            name={name}
            id='upload'
            className='upload-box'
            onChange={(e) => handleFiles(e, name)}
          />
        </div>
      </div>
      {previousImgXL || previousAffiche ? (
        <div className='previous '>
          <img
            style={{ width: "100px", height: "auto", objectFit: "contain" }}
            src={name === "affiche" ? previousAffiche : previousImgXL}
            alt='prévisualisation du fichier upload'
          />
        </div>
      ) : previousMusiques ? (
        <div className='previous'>
          {musiques.map((e, i) => {
            return (
              <p
                key={i}
                className={
                  previousMusiques.length > 1
                    ? "previousMusic dashed"
                    : "previousMusic "
                }>
                {e.name}
              </p>
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
