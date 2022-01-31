import "./btn.css";

const Btn = ({ txt, color }) => {
  return (
    <button type='submit' className={color}>
      {txt}
    </button>
  );
};

export default Btn;
