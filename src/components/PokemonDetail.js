import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import bannerPokedex from '../assets/bannerPokedex.svg';

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState({});
  const [typesPoke, setTypesPoke] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [moves, setMoves] = useState([]);
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {
      setPokemon(res.data);
      setTypesPoke(res.data?.types);
      setAbilities(res.data?.abilities);
      setMoves(res.data?.moves);
    });
  }, []);

  const Home = () => {
    navigate('/pokedex');
  };

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
          cursor: 'pointer',
        }}
        onClick={Home}
      />
      <div className="card pokeDetail text-center" style={{ marginTop: '9%' }}>
        <div>
          <img
            src={pokemon.sprites?.other.dream_world.front_default}
            alt=""
            style={{ maxWidth: '180px' }}
          />
        </div>
        <div className="d-flex justify-content-center mt-2">
          <h6 className="border border-3 rounded w-25 p-2">#{pokemon.id}</h6>
        </div>
        <div className="d-flex align-items-center">
          <div
            className="ms-2 me-2"
            style={{ width: '80%', height: '1px', border: '1px solid #9F9F9F' }}
          ></div>
          <h1 /* className="name" */>{pokemon?.name}</h1>
          <div
            className="ms-2 me-2"
            style={{ width: '80%', height: '1px', border: '1px solid #9F9F9F' }}
          ></div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="me-5">
            <span>Weight</span>
            <h4>
              <b>{pokemon.weight}</b>
            </h4>
          </div>
          <div>
            <span>Tallness</span>
            <h4>
              <b>{pokemon.height}</b>
            </h4>
          </div>
        </div>
        <div className="d-flex justify-content-center mb-5 mt-2">
          <div>
            <h6>Type</h6>
            {typesPoke.map((type) => (
              <span className="me-2 border p-2" key={type.type?.name}>
                {type.type.name}
              </span>
            ))}
          </div>
          <div>
            <h6>Abilities</h6>
            {abilities.map((abilitie) => (
              <span className="me-2 border p-2" key={abilitie.ability?.name}>
                {abilitie.ability.name}
              </span>
            ))}
          </div>
        </div>
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
          <span className="" key={move.move?.name}>
            {move.move.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonDetail;
