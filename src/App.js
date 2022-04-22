import {React,useState,useEffect} from "react";
import Pokemon from "./pokemon.png";
import PokemonList from "./PokemonList";

function App() {
const [pokemon, setPokemon] = useState(); // input value
const [singlePokemon, setSinglePokemon] = useState([]); // pokemon array
const [type, setType] = useState();
const [moves, setMoves] = useState();
const [img, setImg] = useState();
const [loading, setLoading] = useState(true);

const fetchPokemonList = async () => {
  const poke = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const pokeJ = await poke.json();
    console.log(pokeJ);
    setSinglePokemon(pokeJ);
    setType(pokeJ.types[0].type.name);
    setMoves(pokeJ.moves.length);
    setImg(pokeJ.sprites["front_default"]);
    setLoading(false);
};
useEffect(() => {
  fetchPokemonList();
}, []);

const Search = () => {
 if (pokemon === "") {
      alert("Give me a name to search");
    } else {
      pokemon.toLowerCase();
      fetchPokemonList();
      setPokemon("");
    }
};

const enterName = (e) => {
  setPokemon(e.target.value);
};
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center text-white bg-danger py-3 pb-4">
            <div>
              <img height={'50px'} src={Pokemon} alt="pokemon" className="poke" />
            </div>
            <input
              type="text"
              placeholder="Enter name of Pokemon"
              value={pokemon}
              onChange={enterName}
              className="col-2 py-1 my-3"
            />
            <button className="btn-warning py-1 px-2 mx-2 text-white fw-bold fs-5" onClick={Search}>
              See Stats
            </button>
          </div>
        </div>
      </div>
      {loading ? (
  <div className="col-12 text-center fs-2 fw-bold p-5 mt-5">
    Enter the name of the pokemon in the input field
  </div>
) : (
  <PokemonList
    singlePokemon={singlePokemon}
    moves={moves}
    type={type}
    img={img}
  />
)}
    </>
  );
}

export default App;
