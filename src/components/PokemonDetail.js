import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import bannerPokedex from '../assets/bannerPokedex.svg';
import pokeball from '../assets/pokeball1.svg';

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
            <h5 className="mb-3">Type</h5>
            {typesPoke.map((type) => (
              <span className="me-2 border p-2" key={type.type?.name}>
                {type.type.name}
              </span>
            ))}
          </div>
          <div>
            <h5 className="mb-3">Abilities</h5>
            {abilities.map((abilitie) => (
              <span className="me-2 border p-2" key={abilitie.ability?.name}>
                {abilitie.ability.name}
              </span>
            ))}
          </div>
        </div>

        <div className="d-flex align-items-center">
          <h2 className="ms-3">Stats</h2>
          <div
            className="ms-2 me-2"
            style={{ width: '80%', height: '1px', border: '1px solid #9F9F9F' }}
          ></div>
          <img
            className="w-25 me-1"
            style={{ maxWidth: '100px' }}
            src={pokeball}
            alt=""
          />
        </div>

        <div className="mt-3">
          <p className="grid">
            <div className="d-flex justify-content-between ms-3 me-3">
              <b>HP: </b>
              <b>{pokemon.stats?.[0].base_stat}/150</b>
            </div>
            <div className="progress ms-3 me-3">
              <div
                class="progress-bar progress-bar-striped bg-success"
                role="progressbar"
                style={{ width: `${pokemon.stats?.[0].base_stat}%` }}
                aria-valuemin="0"
                aria-valuemax="150"
              ></div>
            </div>
          </p>
          <p className="grid">
            <div className="d-flex justify-content-between ms-3 me-3">
              <b>ATTACK: </b>
              <b>{pokemon.stats?.[1].base_stat}/150</b>
            </div>
            <div className="progress ms-3 me-3">
              <div
                class="progress-bar progress-bar-striped bg-danger"
                role="progressbar"
                style={{ width: `${pokemon.stats?.[1].base_stat}%` }}
                aria-valuemin="0"
                aria-valuemax="150"
              ></div>
            </div>
          </p>
          <p className="grid">
            <div className="d-flex justify-content-between ms-3 me-3">
              <b>DEFENSE: </b>
              <b>{pokemon.stats?.[2].base_stat}/150</b>
            </div>
            <div className="progress ms-3 me-3">
              <div
                class="progress-bar progress-bar-striped bg-warning"
                role="progressbar"
                style={{ width: `${pokemon.stats?.[2].base_stat}%` }}
                aria-valuemin="0"
                aria-valuemax="150"
              ></div>
            </div>
          </p>
          <p className="grid">
            <div className="d-flex justify-content-between ms-3 me-3">
              <b>SPEED: </b>
              <b>{pokemon.stats?.[5].base_stat}/150</b>
            </div>
            <div className="progress ms-3 me-3">
              <div
                class="progress-bar progress-bar-striped bg-primary"
                role="progressbar"
                style={{ width: `${pokemon.stats?.[5].base_stat}%` }}
                aria-valuemin="0"
                aria-valuemax="150"
              ></div>
            </div>
          </p>
        </div>
      </div>

      <div className="card mt-3 mb-3">
        <div className="grid">
          <div className="d-flex align-items-center">
            <h2 className="ms-3">Movements</h2>
            <div
              className="ms-2 me-2"
              style={{
                width: '80%',
                height: '1px',
                border: '1px solid #9F9F9F',
              }}
            ></div>
            <img
              className="w-25 me-1"
              style={{ maxWidth: '100px' }}
              src={pokeball}
              alt=""
            />
          </div>
        </div>

        <div className="d-flex justify-content-center mt-2">
          <div className="m-3">
            {moves.map((move) => (
              <span className="me-2 border " key={move.move?.name}>
                {move.move.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
