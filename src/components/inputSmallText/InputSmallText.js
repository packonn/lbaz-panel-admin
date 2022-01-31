import "./inputSmallText.css";

const InputSmallText = ({ type, name, placeholder, max }) => {
  return (
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      maxLength={max}
    />
  );
};

export default InputSmallText;
