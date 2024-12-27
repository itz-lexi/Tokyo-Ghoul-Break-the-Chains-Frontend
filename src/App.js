import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Landing from './pages/Landing';
import CharacterList from './pages/CharacterList';
import TierList from './pages/TierList';
import TeamBuilder from './pages/TeamBuilder';
import Equipment from './pages/Equipment';
import Guide from './pages/Guide';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/characters" element={<CharacterList />} />
          <Route path="/tier-list" element={<TierList />} />
          <Route path="/team-builder" element={<TeamBuilder />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
