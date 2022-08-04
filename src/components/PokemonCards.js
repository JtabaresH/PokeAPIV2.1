import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PokemonCards = ({ pokemonUrl }) => {
  const [infoPokemon, setInfoPokemon] = useState([]);
  const [typesPokemon, setTypesPokemon] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(pokemonUrl).then((res) => setInfoPokemon(res.data));
  }, []);

  useEffect(() => {
    axios.get(pokemonUrl).then((res) => setTypesPokemon(res.data.types));
  }, []);

  return (
    <div>
      <li onClick={() => navigate(`/pokedex/${infoPokemon.id}`)}>
        <div className={`cardinfo ${typesPokemon[0]?.type.name}`}>
          <div className="card-top">
            <img
              src={infoPokemon.sprites?.other['official-artwork'].front_default}
              alt=""
            />
          </div>
          <div className="card-middle">
            <span className="pokemonname">{infoPokemon.name}</span>

            <ul className="typokemonlist">
              {typesPokemon.map((typespok) => (
                <li className="typepokemon" key={typespok.type?.name}>
                  {typespok.type?.name}
                </li>
              ))}
            </ul>
            <span className="typetitle">Type</span>
            <hr className="separator" />

            <div className="stats">
              <div>
                HP
                <div className={`stat-pokemon ${typesPokemon[0]?.type.name}`}>
                  {infoPokemon.stats?.[0].base_stat}
                </div>
              </div>
              <div>
                {' '}
                ATTACK
                <div className={`stat-pokemon ${typesPokemon[0]?.type.name}`}>
                  {infoPokemon.stats?.[1].base_stat}
                </div>
              </div>
              <div>
                {' '}
                DEFENSE
                <div className={`stat-pokemon ${typesPokemon[0]?.type.name}`}>
                  {infoPokemon.stats?.[2].base_stat}
                </div>
              </div>
              <div>
                {' '}
                SPEED
                <div className={`stat-pokemon ${typesPokemon[0]?.type.name}`}>
                  {infoPokemon.stats?.[5].base_stat}
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default PokemonCards;
