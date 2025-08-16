import React from 'react';
import { X, Heart, ShoppingCart, Calendar, Palette, User } from 'lucide-react';
import { Kitten } from '../types/kitten';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

interface KittenDetailsProps {
  kitten: Kitten | null;
  isOpen: boolean;
  onClose: () => void;
}

const KittenDetails: React.FC<KittenDetailsProps> = ({ kitten, isOpen, onClose }) => {
  const { addToCart } = useCart();

  if (!isOpen || !kitten) return null;

  const handleAddToCart = () => {
    addToCart(kitten);
    toast.success(`${kitten.name} agregado al carrito! 🐱`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={kitten.image}
            alt={kitten.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
          >
            <X className="w-5 h-5" />
          </button>
          {!kitten.available && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
              <span className="text-white font-semibold text-xl">No Disponible</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{kitten.name}</h2>
              <p className="text-lg text-gray-600">{kitten.breed}</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-green-600">${kitten.price}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{kitten.age} meses</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 capitalize">
                {kitten.gender === 'male' ? 'Macho' : 'Hembra'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{kitten.color}</span>
            </div>
            <div className="flex items-center gap-2">
              {kitten.vaccinated ? (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  ✓ Vacunado
                </span>
              ) : (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                  Pendiente vacunación
                </span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
            <p className="text-gray-700 leading-relaxed">{kitten.description}</p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Heart className="w-5 h-5" />
              Favorito
            </button>
            <button
              onClick={handleAddToCart}
              disabled={!kitten.available}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Adoptar a {kitten.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KittenDetails;