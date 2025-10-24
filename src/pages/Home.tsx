import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0")
      .then((res) => res.json())
      .then((data) => {
        const list = data.results.map((p: any) => ({
          name: p.name,
          image: `https://img.pokemondb.net/sprites/home/normal/${p.name}.png`,
        }));
        setPokemon(list);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load Pokémon");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <div className="grid">
      {pokemon.map((p) => (
        <Link className="card" key={p.name} to={`/pokemon/${p.name}`}>
          <img src={p.image} alt={p.name} />
          <p>{p.name.toUpperCase()}</p>
        </Link>
      ))}
    </div>
  );
}
