import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Btn from "../../components/btn/Btn";
import OptionDots from "../../components/optionDots/OptionDots";
import { api } from "../../request/constant";
import "./spectacle.css";

const Spectacles = () => {
  const [allSpectacles, setAllSpectacle] = useState([]);
  const [display, setDisplay] = useState();

  const handleDisplay = (id) => {
    if (id === display || !id) {
      setDisplay("");
    } else {
      setDisplay(id);
    }
  };

  const fetchSpectacles = async () => {
    const result = await axios.get(`${api}spectacles`);
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
        <Link to='/spectacles/ajout'>
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
              <span
                onClick={() => {
                  handleDisplay(spectacle._id);
                }}>
                ...
              </span>
              {display === spectacle._id && <OptionDots />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Spectacles;
