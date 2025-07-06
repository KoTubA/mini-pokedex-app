import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonList from "src/pages/PokemonList";
import PokemonDetail from "src/pages/PokemonDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
