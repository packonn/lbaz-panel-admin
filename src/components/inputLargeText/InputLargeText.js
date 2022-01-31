import "./inputLargeText.css";

const InputLargeText = ({ name, placeholder }) => {
  return <textarea id={name} name={name} placeholder={placeholder}></textarea>;
};

export default InputLargeText;
