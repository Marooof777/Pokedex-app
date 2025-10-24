import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => setPokemon(data));
  }, [name]);

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width="150"
      />
      <h1>{pokemon.name.toUpperCase()}</h1>
      <p>ID: {pokemon.id}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>

      <h3>Types:</h3>
      {pokemon.types.map((t: any) => (
        <span key={t.type.name}>{t.type.name} </span>
      ))}

      <h3>Abilities:</h3>
      {pokemon.abilities.map((a: any) => (
        <span key={a.ability.name}>{a.ability.name} </span>
      ))}

      <h3>Stats:</h3>
      {pokemon.stats.slice(0, 3).map((s: any) => (
        <p key={s.stat.name}>
          {s.stat.name}: {s.base_stat}
        </p>
      ))}
    </div>
  );
}
