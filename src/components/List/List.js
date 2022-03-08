import { useState } from "react";
import OptionDots from "../optionDots/OptionDots";
import "./list.css";

const List = ({ list, reload }) => {
  const [display, setDisplay] = useState();

  const handleDisplay = (id) => {
    if (id === display || !id) {
      setDisplay("");
    } else {
      setDisplay(id);
    }
  };
  return (
    <div className='containerSpectacles'>
      <div className='headerTabSpectacles'>
        <p>Titre</p>
        <p>Min-description</p>
        <p>Option</p>
      </div>
      {list.map((spectacle) => {
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
            {display === spectacle._id && (
              <OptionDots
                handleDisplay={handleDisplay}
                id={spectacle._id}
                reload={reload}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default List;
