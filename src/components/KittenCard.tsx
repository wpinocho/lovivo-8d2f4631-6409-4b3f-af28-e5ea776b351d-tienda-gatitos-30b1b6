import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Kitten } from '../types/kitten';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

interface KittenCardProps {
  kitten: Kitten;
  onViewDetails: (kitten: Kitten) => void;
}

const KittenCard: React.FC<KittenCardProps> = ({ kitten, onViewDetails }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(kitten);
    toast.success(`${kitten.name} agregado al carrito! 🐱`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={kitten.image}
          alt={kitten.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>
        {!kitten.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">No Disponible</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{kitten.name}</h3>
          <span className="text-xl font-bold text-green-600">${kitten.price}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{kitten.breed}</p>
        
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <span>{kitten.age} meses</span>
          <span className="capitalize">{kitten.gender === 'male' ? 'Macho' : 'Hembra'}</span>
          <span>{kitten.color}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          {kitten.vaccinated && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Vacunado
            </span>
          )}
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{kitten.description}</p>
        
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(kitten)}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Ver Detalles
          </button>
          <button
            onClick={handleAddToCart}
            disabled={!kitten.available}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Adoptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default KittenCard;