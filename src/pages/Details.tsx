import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Details.css";

export default function Details() {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load Pokémon details");
        setLoading(false);
      });
  }, [name]);

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">{error}</p>;
  if (!pokemon) return null;

  return (
    <div className="details-container">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-image"
      />
      <h2>{pokemon.name.toUpperCase()} #{pokemon.id}</h2>

      <p><strong>Height:</strong> {pokemon.height}</p>
      <p><strong>Weight:</strong> {pokemon.weight}</p>

      <div className="section">
        <strong>Types:</strong>
        {pokemon.types.map((t: any) => (
          <span className="badge" key={t.type.name}>
            {t.type.name}
          </span>
        ))}
      </div>

      <div className="section">
        <strong>Abilities:</strong>
        {pokemon.abilities.map((a: any) => (
          <span className="badge ability" key={a.ability.name}>
            {a.ability.name}
          </span>
        ))}
      </div>

      <div className="section">
        <strong>Stats:</strong>
        {pokemon.stats.slice(0, 3).map((s: any) => (
          <p key={s.stat.name}>
            {s.stat.name.toUpperCase()}: {s.base_stat}
          </p>
        ))}
      </div>

      <button onClick={() => window.history.back()} className="back-btn">
        🔙 Back
      </button>
    </div>
  );
}
