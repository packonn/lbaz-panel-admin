import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Btn from "../../components/btn/Btn";
import List from "../../components/List/List";
import { api } from "../../request/constant";
import "./spectacle.css";

const Spectacles = () => {
  const [allSpectacles, setAllSpectacle] = useState([]);

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
      <List list={allSpectacles} reload={fetchSpectacles} />
    </div>
  );
};

export default Spectacles;
