import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./optiondots.css";

const OptionDots = ({ handleDisplay, id }) => {
  return (
    <div className='toggleOption'>
      <Link to={`/modif/spectacle/${id}`}>
        <div className='edit'>
          <button>Éditer</button>
        </div>
      </Link>
      <div className='delete'>
        <button>Supprimer</button>
      </div>
      <div className='close' onClick={() => handleDisplay()}>
        <FontAwesomeIcon icon='times' color='white' />
      </div>
    </div>
  );
};

export default OptionDots;
