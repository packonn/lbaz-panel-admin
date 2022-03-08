import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./alertCustom.css";

const AlertCustom = ({ closeAlert, alert }) => {
  return (
    <div className='alertContainer' onClick={closeAlert}>
      <div className={`${alert.type} alert`}>
        <button onClick={closeAlert}>
          <FontAwesomeIcon
            icon='times'
            color='white'
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </button>

        <p className='textBtnAlert'>{alert.msg}</p>
      </div>
    </div>
  );
};

export default AlertCustom;
