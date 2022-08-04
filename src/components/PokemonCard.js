import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PokemonCard.css';

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState({});
  const [typesPoke, setTypesPoke] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(pokemonUrl).then((res) => {
      setPokemon(res.data);
      setTypesPoke(res.data?.types);
    });
  });

  return (
    <div
      className={`card ${typesPoke[0]?.type.name}`}
      onClick={() => navigate(`/pokedex/${pokemon.name}`)}
      style={{
        maxWidth: '250px',
        boxShadow: '2px 3px 5px grey',
        cursor: 'pointer',
      }}
    >
      <div className='card-body'>
        <div>
          <img src={pokemon.sprites?.front_default} alt="" />
        </div>
        <h3>{pokemon.name}</h3>
        <ul className="typesList">
          {typesPoke.map((type) => (
            <li key={type.type?.name} className="listComponent">
              {type.type.name}
            </li>
          ))}
        </ul>
        <div className="stats">
          <p className="hp">
            <b>HP</b> <br />
            {pokemon.stats?.[0].base_stat}
          </p>
          <p className="attack">
            <b>ATTACK</b> <br />
            {pokemon.stats?.[1].base_stat}
          </p>
          <p className="defense">
            <b>DEFENSE</b> <br />
            {pokemon.stats?.[2].base_stat}
          </p>
          <p className="speed">
            <b>SPEED</b> <br />
            {pokemon.stats?.[5].base_stat}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
