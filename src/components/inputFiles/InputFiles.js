import "./inputFiles.css";

const InputFiles = ({ name, label, title }) => {
  return (
    <div className="containerFile">
      <h3>{title}</h3>
      <div className="containerInput">
        <label>{label}</label>
        <input type="file" name={name} id={name} multiple />
      </div>
    </div>
  );
};

export default InputFiles;
