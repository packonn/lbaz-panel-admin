import "./btn.css";

const Btn = ({ txt, color, type, handleClick }) => {
  return (
    <div className='btnCustom'>
      <button type={type} className={color} onClick={handleClick}>
        {txt}
      </button>
    </div>
  );
};

export default Btn;
