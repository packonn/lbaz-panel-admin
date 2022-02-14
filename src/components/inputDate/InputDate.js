import Btn from "../btn/Btn";
import "./inputDate.css";

const InputDate = ({ handleClick, allDate, handleDate }) => {
  return (
    <div className='containerFiles'>
      <div className='title'>
        <p>Dates du spectacles</p>
      </div>
      <div className='containerInput'>
        <input
          type='date'
          name='date'
          id='inputDate'
          onChange={(e) => {
            handleDate(e);
          }}
        />
        <Btn
          txt={"ajouter la date"}
          color={"gris"}
          type={"button"}
          handleClick={handleClick}
        />
      </div>
      <div className='previous'>
        {allDate.map((e, i) => {
          e.slice(0, 12);
          return (
            <p
              key={i}
              className={
                allDate.length > 1 ? "previousVideos dashed" : "previousVideos "
              }>
              {e}
            </p>
          );
        })}
        /
      </div>
    </div>
  );
};

export default InputDate;
