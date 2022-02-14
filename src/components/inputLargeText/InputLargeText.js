import "./inputLargeText.css";

const InputLargeText = ({ name, placeholder, text, setText }) => {
  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      id={name}
      name={name}
      placeholder={placeholder}></textarea>
  );
};

export default InputLargeText;
