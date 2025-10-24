import React from "react";
import { Link } from "react-router-dom";

interface PokemonCardProps {
  name: string;
  image: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image }) => {
  return (
    <Link
      to={`/pokemon/${name}`}
      className="pokemon-card border rounded-xl p-3 text-center hover:shadow-lg transition"
    >
      <img
        src={image}
        alt={name}
        className="mx-auto w-24 h-24 object-contain"
        loading="lazy"
      />
      <h2 className="capitalize font-semibold mt-2">{name}</h2>
    </Link>
  );
};

export default PokemonCard;
