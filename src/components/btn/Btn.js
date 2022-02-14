import "./btn.css";

const Btn = ({ txt, color, type, handleClick }) => {
  return (
    <button type={type} className={color} onClick={handleClick}>
      {txt}
    </button>
  );
};

export default Btn;
