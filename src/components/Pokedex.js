import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PokemonCard from './PokemonCard';
import bannerPokedex from '../assets/bannerPokedex.svg';

const Pokedex = () => {
  const user = useSelector((state) => state.user);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsTable, setPokemonsTable] = useState([]);
  const [types, setTypes] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126')
      .then((res) => {
        setPokemons(res.data.results);
        setPokemonsTable(res.data.results);
      });

    axios
      .get('https://pokeapi.co/api/v2/type')
      .then((res) => setTypes(res.data.results));
  }, []);

  const filterPokemons = (e) => {
    axios
      .get(e.target.value)
      .then((res) =>
        e.target.value !==
        'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126'
          ? setPokemons(res.data.pokemon)
          : setPokemons(res.data.results)
      );
  };

  const submit = (e) => {
    setPokemons(e.target.value);
    search(e.target.value.toLowerCase());
  };

  const search = (SearchType) => {
    const resultSearch = pokemonsTable.filter((element) => {
      if (element.name.toString().includes(SearchType.toString())) {
        return element;
      }
    });
    setPage(1);
    setPokemons(resultSearch);
  };

  const pokemonsNumbers = 8;
  const lastIndex = pokemonsNumbers * page;
  const firstIndex = lastIndex - pokemonsNumbers;
  const pokemonsPaginated = pokemons.slice(firstIndex, lastIndex);
  const lastPage = Math.ceil(pokemons?.length / pokemonsNumbers);
  const numberPages = [];

  for (let i = 1; i <= lastPage; i++) {
    if (i < page + 5 && i > page - 1) {
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
          placeholder="Search pokemon"
          className="form-control"
          aria-label="Text input with segmented dropdown button"
          onChange={submit}
        />
        <div className="form-floating">
          <select className="form-select" onChange={filterPokemons}>
            <option
              value={'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126'}
            >
              Type of pokemon
            </option>
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
          <PokemonCard
            key={pokemon.url !== undefined ? pokemon.url : pokemon.pokemon.url}
            pokemonUrl={
              pokemon.url !== undefined ? pokemon.url : pokemon.pokemon.url
            }
          />
        ))}
      </div>
      <div className="input-group justify-content-center mt-3 mb-3">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="btn btn-outline-danger p-1"
        >
          {`<<`}
        </button>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="btn btn-outline-danger p-1"
        >
          {`<`}
        </button>

        {numberPages.map((numbers) => (
          <button
            key={numbers}
            onClick={() => setPage(numbers)}
            className="btn btn-outline-danger"
          >
            {numbers}
          </button>
        ))}

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === lastPage}
          className="btn btn-outline-danger p-1"
        >
          {`>`}
        </button>
        <button
          onClick={() => setPage(lastPage)}
          disabled={page === lastPage}
          className="btn btn-outline-danger p-1"
        >
          {`>>`}
        </button>
      </div>
    </div>
  );
};

export default Pokedex;
