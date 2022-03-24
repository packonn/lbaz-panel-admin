import "./inputSmallText.css";

const InputSmallText = ({
  type,
  name,
  placeholder,
  max,
  text,
  setText,
  required,
}) => {
  return (
    <input
      className="inputSmall"
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      maxLength={250}
      value={text}
      onChange={(e) => setText(e.target.value)}
      required={required}
    />
  );
};

export default InputSmallText;
