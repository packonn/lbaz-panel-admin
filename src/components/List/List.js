import { useState } from "react";
import { filteredData } from "../ListFiltered/ListFiltered";
import OptionDots from "../optionDots/OptionDots";
import "./list.css";

const List = ({ list, reload, page, search, key1Filtered, key2Filtered }) => {
  console.log("key2Filtered in list", key2Filtered);
  console.log("key1Filtered in list", key1Filtered);

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
        <p>{page === "agenda" ? "Spectacle" : "Titre"}</p>
        <p>{page === "agenda" ? "Date" : "Mini description"}</p>
        <p>Options</p>
      </div>
      {filteredData(list, search, key1Filtered, key2Filtered).map((data) => {
        return (
          <div className='rowTabSpectacles' key={data._id}>
            <p>{data.nom || data.spectacle.nom}</p>
            <p>
              {data.minDescription ||
                new Date(data.date).toLocaleDateString("fr-FR", {
                  weekday: "short",
                  year: "2-digit",
                  month: "long",
                  day: "numeric",
                })}
            </p>
            <span
              onClick={() => {
                handleDisplay(data._id);
              }}>
              ...
            </span>
            {display === data._id && (
              <OptionDots
                page={page}
                handleDisplay={handleDisplay}
                id={data._id}
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
