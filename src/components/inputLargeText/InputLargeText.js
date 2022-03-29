import "./inputLargeText.css";

const InputLargeText = ({ name, placeholder, text, setText, required }) => {
  return (
    <label>
      {placeholder}
      <textarea
        rows='5'
        cols='33'
        value={text}
        onChange={(e) => setText(e.target.value)}
        id={name}
        name={name}
        Wrap
        required={required}
        // placeholder={placeholder}
      ></textarea>
    </label>
  );
};

export default InputLargeText;
