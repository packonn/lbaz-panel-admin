import "./btn.css";

const Btn = ({ txt, color, type, handleClick, msg }) => {
  return (
    <div className="btnCustom">
      {msg && <p className="required">Tous les champs * sont obligatoires</p>}
      <button type={type} className={color} onClick={handleClick}>
        {txt}
      </button>
    </div>
  );
};

export default Btn;
