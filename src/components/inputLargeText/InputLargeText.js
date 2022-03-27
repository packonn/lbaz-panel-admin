import "./inputLargeText.css";

const InputLargeText = ({ name, placeholder, text, setText, required }) => {
  return (
    <label>
      {placeholder}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        id={name}
        name={name}
        required={required}
        // placeholder={placeholder}
      ></textarea>{" "}
    </label>
  );
};

export default InputLargeText;
