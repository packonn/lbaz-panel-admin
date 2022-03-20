import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link } from "react-router-dom";
import { api, notify, optionNotify } from "../../request/constant";
import "./optiondots.css";

const OptionDots = ({
  handleDisplay,
  id,
  page,
  spectacles,
  setSpectacles,
  setDisplay,
}) => {
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
          const index = spectacles.findIndex((object) => {
            return object._id === id;
          });
          spectacles.splice(index, 1);
          setSpectacles(spectacles);
          setDisplay("");
          const result = await axios.delete(
            `${api}${page}/delete/${page}/${id}`
          );
          if (result.status === 200) {
            notify("success", "Spectacle supprimé !", optionNotify);
          }
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
