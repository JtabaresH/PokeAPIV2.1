import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PokemonCard from './PokemonCard';
import bannerPokedex from '../assets/bannerPokedex.svg';

const Pokedex = () => {
  const user = useSelector((state) => state.user);
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=16')
      .then((res) => {
        setPokemons(res.data.results);
      });

    axios
      .get('https://pokeapi.co/api/v2/type')
      .then((res) => setTypes(res.data.results));
  }, []);

  const pokemonsNumbers = 4;
  const lastIndex = pokemonsNumbers * page;
  const firstIndex = lastIndex - pokemonsNumbers;
  const pokemonsPaginated = pokemons.slice(firstIndex, lastIndex);
  const lastPage = Math.ceil(pokemons?.length / pokemonsNumbers);
  const numberPages = [];

  const filterPokemons = () => {
    axios.get(e.target.value).then((res) => setPokemons(res.data.pokemon));
  };

  for (let i = 1; i <= lastPage; i++) {
    if (i < page + 5 && i > page - 5) {
      numberPages.push(i);
    }
  }

  return (
    <div className="text-center">
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
      <p style={{ marginTop: '9%' }}>
        <b>
          <span style={{ color: 'red' }}>Welcome {user},</span>
        </b>{' '}
        here you can find your favorite pokemons
      </p>
      <div className="input-group mb-3">
        <input
          type="text"
          placeholder="Write name of a pokemon"
          className="form-control"
          aria-label="Text input with segmented dropdown button"
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => navigate(`/pokedex/${name}`)}
        >
          Search
        </button>
        <div className="form-floating">
          <select className="form-select" onChange={(e) => filterPokemon}>
            <option value="">Type of pokemon</option>
            {types.map((type) => (
              <option key={type.url} value={type.url}>
                {type.name}
              </option>
            ))}
          </select>
          <label htmlFor="types">Choose option...</label>
        </div>
      </div>

      <div className="row justify-content-center mt-5" style={{ gap: '15px' }}>
        {pokemonsPaginated.map((pokemon) => (
          <PokemonCard pokemonUrl={pokemon.url} key={pokemon.url} />
        ))}
      </div>
      <div className="input-group justify-content-center m-3">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="btn btn-outline-primary"
        >
          First Page
        </button>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="btn btn-outline-primary"
        >
          Prev
        </button>

        {numberPages.map((numbers) => (
          <button
            key={numbers}
            onClick={() => setPage(numbers)}
            className="btn btn-outline-primary"
          >
            {numbers}
          </button>
        ))}

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === lastPage}
          className="btn btn-outline-primary"
        >
          Next
        </button>
        <button
          onClick={() => setPage(lastPage)}
          disabled={page === lastPage}
          className="btn btn-outline-primary"
        >
          Last Page
        </button>
      </div>
    </div>
  );
};

export default Pokedex;
