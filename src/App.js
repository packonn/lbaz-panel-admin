import { Route, Routes } from "react-router-dom";
import "./App.css";
import Spectacle from "./pages/Spectacle/Spectacle";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Agenda from "./pages/Agenda/Agenda";
import Actualite from "./pages/Actualite/Actualite";

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/spectacle' element={<Spectacle />} />
        <Route path='/agenda' element={<Agenda />} />
        <Route path='/actualite' element={<Actualite />} />
      </Routes>
    </div>
  );
}

export default App;
