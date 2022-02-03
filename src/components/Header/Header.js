import "./header.css";
import { Link } from "react-router-dom";
import logo from "../../asset/logo_boitazik.png";
import burger from "../../asset/burger.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCalendarAlt,
  faCheckSquare,
  faGlasses,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

library.add(fab, faCheckSquare, faGlasses, faNewspaper, faCalendarAlt);

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  window.addEventListener("resize", () => {
    if (window.innerWidth < 940) {
      setToggleMenu(true);
    } else {
      setToggleMenu(false);
    }
  });
  return !toggleMenu ? (
    <div className='menu'>
      <div className='containerLogo'>
        <div className='logo'>
          <img src={logo} alt='Logo de laboitazik' />
        </div>
        <div
          className='burgerToggle'
          style={{ marginLeft: "15px" }}
          onClick={() => setToggleMenu(!toggleMenu)}>
          <img src={burger} alt='Logo pour toggle menu ' />
        </div>
      </div>
      <nav>
        <Link to='/spectacle'>
          <div className='lienNavigation'>
            <div className='logoNav'>
              <FontAwesomeIcon
                icon='glasses'
                color='white'
                style={{ height: "auto", width: "2vw" }}
              />
            </div>
            <div className='lienNav'>
              <span>Spectacle</span>
            </div>
          </div>
        </Link>
        <Link to='/actualite'>
          <div className='lienNavigation'>
            <div className='logoNav'>
              <FontAwesomeIcon
                icon='newspaper'
                color='white'
                style={{ height: "auto", width: "2vw" }}
              />
            </div>
            <div className='lienNav'>
              <span>Actualité</span>
            </div>
          </div>
        </Link>
        <Link to='/agenda'>
          <div className='lienNavigation'>
            <div className='logoNav'>
              <FontAwesomeIcon
                icon='calendar-alt'
                color='white'
                style={{ height: "auto", width: "1.7vw" }}
              />
            </div>
            <div className='lienNav'>
              <span>Agenda</span>
            </div>
          </div>
        </Link>
      </nav>
    </div>
  ) : (
    <div className='menuXs'>
      <div className='burgerToggle' onClick={() => setToggleMenu(!toggleMenu)}>
        <img src={burger} alt='Logo pour toggle menu ' />
      </div>
      <nav>
        <div className='lienNavigation'>
          <div className='containerLien'>
            <Link to='/spectacle'>
              <FontAwesomeIcon
                icon='glasses'
                color='white'
                style={{ height: "auto", width: "2vw" }}
              />
            </Link>
          </div>
        </div>
        <div className='lienNavigation'>
          <div className='containerLien'>
            <Link to='/actualite'>
              <FontAwesomeIcon
                icon='newspaper'
                color='white'
                style={{ height: "auto", width: "2vw" }}
              />
            </Link>
          </div>
        </div>
        <div className='lienNavigation'>
          <div className='containerLien'>
            <Link to='/agenda'>
              <FontAwesomeIcon
                icon='calendar-alt'
                color='white'
                style={{ height: "auto", width: "2vw" }}
              />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
