import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Landing from './pages/Landing';
import CharacterList from './pages/CharacterList';
import TierList from './pages/TierList';
import TeamBuilder from './pages/TeamBuilder';
import Equipment from './pages/Equipment';
import Guide from './pages/Guide';
import CharacterDetail from './pages/CharacterDetail';
import './styles/dark-theme.css';
import darkTheme from './styles/dark-theme';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/character-list" element={<CharacterList />} />
            <Route path="/tier-list" element={<TierList />} />
            <Route path="/team-builder" element={<TeamBuilder />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/characters/:type/:characterName" element={<CharacterDetail />} />
          </Routes>
          <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
