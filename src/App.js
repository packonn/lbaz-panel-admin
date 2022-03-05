import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Actualite from "./pages/Actualite/Actualite";
import AddSpectacle from "./pages/AddSpectacle/AddSpectacle";
import AddEvent from "./pages/Agenda/AddEvent/AddEvent";
import Agenda from "./pages/Agenda/Agenda";
import Home from "./pages/Home/Home";
import Spectacles from "./pages/Spectacles/Spectacles";

function App() {
  library.add(fab, faUser, faSearch);

  return (
    <div className='App'>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/spectacles' element={<Spectacles />} />
        <Route path='/spectacles/ajout' element={<AddSpectacle />} />
        <Route path='/agenda' element={<Agenda />} />
        <Route path='/agenda/ajout' element={<AddEvent />} />
        <Route path='/actualite' element={<Actualite />} />
      </Routes>
    </div>
  );
}

export default App;
