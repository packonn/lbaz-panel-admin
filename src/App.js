import { library } from "@fortawesome/fontawesome-svg-core";
// import { fab } from "@fortawesome/free-brands-svg-icons";
import { faSearch, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Actualite from "./pages/Actualite/Actualite";
import AddActualite from "./pages/AddActualite/AddActualite";
import AddSpectacle from "./pages/AddSpectacle/AddSpectacle";
import AddEvent from "./pages/Agenda/AddEvent/AddEvent";
import Agenda from "./pages/Agenda/Agenda";
import UpdateEvent from "./pages/Agenda/UpdateEvent/UpdateEvent";
import Home from "./pages/Home/Home";
import ModifActualite from "./pages/ModifActualite/ModifActualite";
import ModifSpectacle from "./pages/ModifSpectacle/ModifSpectacle";
import Spectacles from "./pages/Spectacles/Spectacles";

function App() {
  library.add(faUser, faSearch, faTimes);
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/spectacles"
          element={<Spectacles search={search} setSearch={setSearch} />}
        />
        <Route path="/spectacles/ajout" element={<AddSpectacle />} />
        <Route path="/spectacle/modifier/:id" element={<ModifSpectacle />} />
        <Route
          path="/agenda"
          element={<Agenda search={search} setSearch={setSearch} />}
        />
        <Route path="/agenda/ajout" element={<AddEvent />} />
        <Route path="/agenda/modifier/:id" element={<UpdateEvent />} />
        <Route
          path="/actualite"
          element={<Actualite search={search} setSearch={setSearch} />}
        />
        <Route path="/actualite/ajout" element={<AddActualite />} />
        <Route path="/actualite/modifier/:id" element={<ModifActualite />} />
      </Routes>
    </div>
  );
}

export default App;
