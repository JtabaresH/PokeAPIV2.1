import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import UserInput from './components/UserInput';
import Pokedex from './components/Pokedex';
import PokemonDetail from './components/PokemonDetail';
import './style.css';

export default function App() {
  return (
    <div>
      <HashRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<UserInput />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/pokedex" element={<Pokedex />} />
              <Route path="/pokedex/:name" element={<PokemonDetail />} />
            </Route>
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}
