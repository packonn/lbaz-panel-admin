import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Btn from "../../components/btn/Btn";
import "./spectacle.css";

const Spectacles = () => {
  const [allSpectacles, setAllSpectacle] = useState([]);
  const [toggleOption, setToggleOption] = useState(false);
  const fetchSpectacles = async () => {
    const result = await axios.get("http://localhost:3100/spectacles");
    setAllSpectacle(result.data);
  };
  useEffect(() => {
    fetchSpectacles();
  }, []);
  return (
    <div className='containerPageSpectacles'>
      <div className='headerSpectacles'>
        <div className='inputHeaderSpectacles'>
          <FontAwesomeIcon icon='search' color='white' className='loupe' />
          <input className='inputSpectacles' />
        </div>
        <Link to='/spectacles/add'>
          <Btn txt={"Ajouter un spectacles"} color='gris' />
        </Link>
      </div>
      <div className='containerSpectacles'>
        <div className='headerTabSpectacles'>
          <p>Titre</p>
          <p>Min-description</p>
          <p>Option</p>
        </div>
        {allSpectacles.map((spectacle) => {
          return (
            <div className='rowTabSpectacles' key={spectacle._id}>
              <p>{spectacle.nom}</p>
              <p>{spectacle.minDescription}</p>
              <span>...</span>
            </div>
          );
        })}
      </div>
      <div className='toggleOption'>
        <div className='edit'>
          <button>Éditer</button>
        </div>
        <div className='delete'>
          <button>Supprimer</button>
        </div>
      </div>
    </div>
  );
};

export default Spectacles;
