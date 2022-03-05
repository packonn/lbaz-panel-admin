import "./optiondots.css";

const OptionDots = () => {
  return (
    <div className='toggleOption'>
      <div className='edit'>
        <button>Éditer</button>
      </div>
      <div className='delete'>
        <button>Supprimer</button>
      </div>
    </div>
  );
};

export default OptionDots;
