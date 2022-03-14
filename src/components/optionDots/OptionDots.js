import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link } from "react-router-dom";
import { api, notify, optionNotify } from "../../request/constant";
import "./optiondots.css";

const OptionDots = ({ handleDisplay, id, reload, page }) => {
  const deleteItem = async () => {
    // await axios.delete(`${api}${page}/delete/${page}/${id}`);
    //       reload();

    try {
      const response = await axios.delete(`${api}${page}/delete/${page}/${id}`);
      if (response.status === 200) {
        reload();
        notify("success", "Suppression réussie", optionNotify);
      } else notify("error", "Une erreur est survenue", optionNotify);
      return null;
    } catch (error) {
      return null;
    }
  };

  return (
    <div className='toggleOption'>
      <Link to={`/${page}/modifier/${id}`}>
        <div className='edit'>
          <button>Éditer</button>
        </div>
      </Link>
      <div className='delete' onClick={deleteItem}>
        <button>Supprimer</button>
      </div>
      <div className='close' onClick={() => handleDisplay()}>
        <FontAwesomeIcon icon='times' color='white' />
      </div>
    </div>
  );
};

export default OptionDots;
