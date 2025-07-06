import React from "react";
import Card from "src/components/atoms/Card";

interface PokemonCardProps {
  name: string;
  imageUrl: string;
  onClick: () => void;
  className?: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, imageUrl, onClick, className = "" }) => {
  return (
    <Card onClick={onClick} className={className} aria-label={`View details for ${name}`}>
      <div className="p-4">
        <div className="w-full h-32 flex items-center justify-center mb-3">
          <img src={imageUrl} alt={`${name} sprite`} className="w-24 h-24 object-contain" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 text-center capitalize">{name}</h3>
      </div>
    </Card>
  );
};

export default PokemonCard;
