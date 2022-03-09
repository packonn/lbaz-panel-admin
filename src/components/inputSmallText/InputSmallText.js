import "./inputSmallText.css";

const InputSmallText = ({ type, name, placeholder, max, text, setText }) => {
  return (
    <input
      className='inputSmall'
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      maxLength={max}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};

export default InputSmallText;
