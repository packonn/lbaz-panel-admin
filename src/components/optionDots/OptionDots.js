import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link } from "react-router-dom";
import { api } from "../../request/constant";
import "./optiondots.css";

const OptionDots = ({ handleDisplay, id, reload, page }) => {
  return (
    <div className='toggleOption'>
      <Link to={`/${page}/modifier/${id}`}>
        <div className='edit'>
          <button>Éditer</button>
        </div>
      </Link>
      <div
        className='delete'
        onClick={async () => {
          await axios.delete(`${api}${page}/delete/${page}/${id}`);
          reload();
        }}>
        <button>Supprimer</button>
      </div>
      <div className='close' onClick={() => handleDisplay()}>
        <FontAwesomeIcon icon='times' color='white' />
      </div>
    </div>
  );
};

export default OptionDots;
