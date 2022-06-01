import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import bannerPokedex from '../assets/bannerPokedex.svg';

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState({});
  const [typesPoke, setTypesPoke] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [moves, setMoves] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {
      setPokemon(res.data);
      setTypesPoke(res.data?.types);
      setAbilities(res.data?.abilities);
      setMoves(res.data?.moves);
    });
  }, []);

  return (
    <div>
      <img
        src={bannerPokedex}
        alt=""
        style={{
          width: '100%',
          position: 'absolute',
          top: '0',
          left: '0',
          preserveAspectRatio: 'none',
        }}
      />
      <div className="card pokeDetail text-center" style={{ marginTop: '9%' }}>
        <img
          /* className="image" */
          src={pokemon.sprites?.other.dream_world.front_default}
          alt=""
          style={{ maxWidth: '250px' }}
        />
        <h6 /* className="number" */>#{pokemon.id}</h6>
        <h1 /* className="name" */>{pokemon?.name}</h1>
        <span>Weight</span>
        <h6>{pokemon.weight}</h6>
        <span>Height</span>
        <h6>{pokemon.height}</h6>
        <h6>Type</h6>
        {typesPoke.map((type) => (
          <span key={type.type?.name}>{type.type.name}</span>
        ))}
        <h6>Abilities</h6>
        {abilities.map((abilitie) => (
          <span key={abilitie.ability?.name}>{abilitie.ability.name}</span>
        ))}
        <h4>Stats</h4>
        <div>
          <p>
            <b>HP: </b>
            {pokemon.stats?.[0].base_stat}/150
          </p>
          <p>
            <b>ATTACK: </b>
            {pokemon.stats?.[1].base_stat}/150
          </p>
          <p>
            <b>DEFENSE: </b>
            {pokemon.stats?.[2].base_stat}/150
          </p>
          <p>
            <b>SPEED: </b>
            {pokemon.stats?.[5].base_stat}/150
          </p>
        </div>
      </div>
      <div className="card mt-3">
        <h4>Movements</h4>
        {moves.map((move) => (
          <span key={move.move?.name}>{move.move.name}</span>
        ))}
      </div>
    </div>
  );
};

export default PokemonDetail;
