import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ToastContainer } from "react-toastify";
import { notify, optionNotify } from "../../request/constant";
import { udpateSpectacle } from "../../request/spectacle";
import { filteredData } from "../ListFiltered/ListFiltered";
import OptionDots from "../optionDots/OptionDots";
import "./list.css";

const List = ({ list, page, search, key1Filtered, key2Filtered }) => {
  const [display, setDisplay] = useState();

  const handleDisplay = (id) => {
    if (id === display || !id) {
      setDisplay("");
    } else {
      setDisplay(id);
    }
  };
  useEffect(() => {}, [display]);
  const [spectacles, setSpectacles] = useState(list);
  const handleOnDragEnd = (result) => {
    if (page === "agenda" || page === "actualite") {
      return;
    }
    // si element lacher hors du champ DND alors rien ne se passe
    if (!result.destination) return;
    // recupération du tableau d'element
    const items = Array.from(spectacles);
    // recupération de l'element déplacé
    const [reorderedItem] = items.splice(result.source.index, 1);
    // Mise en place de l'élément déplacer a la bonne place
    items.splice(result.destination.index, 0, reorderedItem);

    setSpectacles(items);

    modifClefSpectacle(items);
  };

  // Récuperation des spectacle dont la clef change
  const modifClefSpectacle = (array) => {
    const arrayModif = [];
    for (let i = 0; i < array.length; i++) {
      const element = array[i];

      if (element.clef !== i) {
        element.clef = i;
        arrayModif.push(element);
      }
    }
    fetchModifClef(arrayModif);
  };
  // Modification dans la base de donné des clefs qui on changé
  const fetchModifClef = async (spectacleKeyModify) => {
    let status = Number;
    for (let i = 0; i < spectacleKeyModify.length; i++) {
      const formData = new FormData();
      formData.append("clef", spectacleKeyModify[i].clef);
      const result = await udpateSpectacle(spectacleKeyModify[i]._id, formData);
      if (result.status === 200) {
        status = 200;
      } else {
        status = 0;
      }
    }
    if (status === 200) {
      notify(
        "success",
        "L'ordre des spectacles à été mis a jour' !",
        optionNotify
      );
    } else {
      notify("warning", "Erreur lors de la mise a jour' !", optionNotify);
    }
  };

  return (
    <div className='containerSpectacles'>
      <div className='headerTabSpectacles'>
        <p>{page === "agenda" ? "Spectacle" : "Titre"}</p>
        <p>{page === "agenda" ? "Date" : "Mini description"}</p>
        <p>Options</p>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='characters'>
          {(provided) => (
            <div
              className='characters'
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {filteredData(spectacles, search, key1Filtered, key2Filtered).map(
                ({ _id, nom, minDescription, date, spectacle }, index) => {
                  return (
                    <Draggable key={_id} draggableId={_id} index={index}>
                      {(provided) => (
                        <div
                          className='rowTabSpectacles'
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <p>{page === "agenda" ? spectacle.nom : nom}</p>
                          <p>
                            {minDescription ||
                              new Date(date).toLocaleDateString("fr-FR", {
                                weekday: "short",
                                year: "2-digit",
                                month: "long",
                                day: "numeric",
                              })}
                          </p>
                          <span
                            onClick={() => {
                              handleDisplay(_id);
                            }}>
                            ...
                          </span>
                          {display === _id && (
                            <OptionDots
                              spectacles={spectacles}
                              setSpectacles={setSpectacles}
                              page={page}
                              handleDisplay={handleDisplay}
                              id={_id}
                              setDisplay={setDisplay}
                            />
                          )}
                        </div>
                      )}
                    </Draggable>
                  );
                }
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <ToastContainer />
    </div>
  );
};

export default List;
