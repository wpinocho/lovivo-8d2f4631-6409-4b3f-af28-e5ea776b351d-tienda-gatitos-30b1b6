import React, { useState, useMemo } from 'react';
import { CartProvider } from '../contexts/CartContext';
import Header from '../components/Header';
import KittenCard from '../components/KittenCard';
import KittenDetails from '../components/KittenDetails';
import KittenFilters from '../components/KittenFilters';
import Cart from '../components/Cart';
import { kittens } from '../data/kittens';
import { Kitten } from '../types/kitten';

const Index = () => {
  const [selectedKitten, setSelectedKitten] = useState<Kitten | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  console.log('Index component rendered');
  console.log('Current filters:', { searchTerm, selectedBreed, priceRange, showOnlyAvailable });

  const breeds = useMemo(() => {
    const uniqueBreeds = [...new Set(kittens.map(kitten => kitten.breed))];
    return uniqueBreeds.sort();
  }, []);

  const filteredKittens = useMemo(() => {
    return kittens.filter(kitten => {
      const matchesSearch = kitten.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           kitten.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           kitten.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBreed = !selectedBreed || kitten.breed === selectedBreed;
      const matchesPrice = kitten.price >= priceRange[0] && kitten.price <= priceRange[1];
      const matchesAvailability = !showOnlyAvailable || kitten.available;

      return matchesSearch && matchesBreed && matchesPrice && matchesAvailability;
    });
  }, [searchTerm, selectedBreed, priceRange, showOnlyAvailable]);

  const handleViewDetails = (kitten: Kitten) => {
    console.log('Viewing details for:', kitten.name);
    setSelectedKitten(kitten);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    console.log('Closing details modal');
    setIsDetailsOpen(false);
    setSelectedKitten(null);
  };

  const handleCartClick = () => {
    console.log('Opening cart');
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    console.log('Closing cart');
    setIsCartOpen(false);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header
          onCartClick={handleCartClick}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Encuentra tu Compañero Perfecto
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra adorable colección de gatitos esperando un hogar lleno de amor.
              Cada uno ha sido cuidado con cariño y está listo para convertirse en parte de tu familia.
            </p>
          </div>

          <KittenFilters
            breeds={breeds}
            selectedBreed={selectedBreed}
            onBreedChange={setSelectedBreed}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            showOnlyAvailable={showOnlyAvailable}
            onAvailabilityChange={setShowOnlyAvailable}
          />

          {filteredKittens.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🐱</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No se encontraron gatitos
              </h3>
              <p className="text-gray-500">
                Intenta ajustar tus filtros para ver más opciones
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Mostrando {filteredKittens.length} gatito{filteredKittens.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredKittens.map((kitten) => (
                  <KittenCard
                    key={kitten.id}
                    kitten={kitten}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </>
          )}
        </main>

        <KittenDetails
          kitten={selectedKitten}
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
        />

        <Cart
          isOpen={isCartOpen}
          onClose={handleCloseCart}
        />
      </div>
    </CartProvider>
  );
};

export default Index;