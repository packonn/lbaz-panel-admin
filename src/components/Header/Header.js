import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ title }) => {
  return (
    <header>
      <h2>{title}</h2>
      <div className='admin'>
        <div>
          <FontAwesomeIcon
            icon='user'
            color='white'
            style={{ height: "auto", width: "1.3vw" }}
          />
        </div>
        <div className='textAdmin'>
          <p>Admin</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
