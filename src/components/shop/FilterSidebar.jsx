import React from 'react';
import { motion } from 'framer-motion';
import * as Slider from '@radix-ui/react-slider';

function CustomCheckbox({ label, checked, onChange }) {
  return (
    <button 
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 w-full group focus:outline-none"
    >
      <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors duration-300 ${checked ? 'bg-[#B8915C] border-[#B8915C]' : 'border-[#B8915C]/30 group-hover:border-[#B8915C]/60 bg-white'}`}>
         {checked && (
           <motion.svg
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             viewBox="0 0 24 24"
             className="w-3.5 h-3.5 text-white"
             fill="none"
             stroke="currentColor"
             strokeWidth="3"
             strokeLinecap="round"
             strokeLinejoin="round"
           >
             <motion.polyline
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 0.3, ease: "easeOut" }}
               points="20 6 9 17 4 12"
             />
           </motion.svg>
         )}
      </div>
      <span className={`text-sm transition-colors duration-300 ${checked ? 'text-[#4B2434] font-medium' : 'text-[#8B7A73] group-hover:text-[#4B2434]'}`}>{label}</span>
    </button>
  );
}

function CustomRadio({ label, checked, onChange }) {
  return (
    <button
      onClick={() => onChange()}
      className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-300 focus:outline-none ${
        checked ? 'bg-[#B8915C]/10 border border-[#B8915C]' : 'border border-transparent hover:bg-[#B8915C]/5'
      }`}
    >
      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${checked ? 'border-[#B8915C]' : 'border-[#B8915C]/30 bg-white'}`}>
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-2 h-2 rounded-full bg-[#B8915C]"
          />
        )}
      </div>
      <span className={`text-sm transition-colors ${checked ? 'text-[#4B2434] font-medium' : 'text-[#8B7A73]'}`}>{label}</span>
    </button>
  );
}

function PriceSlider({ value, onValueChange, max }) {
  return (
    <div className="w-full px-2">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5 py-4"
        value={value}
        max={max}
        step={500}
        onValueChange={onValueChange}
      >
        <Slider.Track className="bg-[#B8915C]/20 relative grow rounded-full h-[2px]">
          <Slider.Range className="absolute bg-[#B8915C] rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-4 h-4 bg-[#B8915C] rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-[#B8915C]/20 transition-shadow cursor-grab active:cursor-grabbing"
          aria-label="Min price"
        />
        <Slider.Thumb
          className="block w-4 h-4 bg-[#B8915C] rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-[#B8915C]/20 transition-shadow cursor-grab active:cursor-grabbing"
          aria-label="Max price"
        />
      </Slider.Root>
      <div className="flex items-center justify-between mt-4 -mx-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-[#8B7A73] mb-1">Min</span>
          <span className="text-sm font-medium text-[#4B2434]">₹{value[0].toLocaleString()}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[10px] uppercase tracking-wider text-[#8B7A73] mb-1">Max</span>
          <span className="text-sm font-medium text-[#4B2434]">₹{value[1].toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default function FilterSidebar({
  categories,
  activeCategory,
  setActiveCategory,
  priceRange,
  setPriceRange,
  activeOffers,
  setActiveOffers,
  onClearAll
}) {
  
  const OFFERS = [
    { id: 'new', label: 'New Arrival' },
    { id: 'bestseller', label: 'Best Seller' },
    { id: 'sale', label: 'Sale' },
    { id: 'limited', label: 'Limited Edition' },
  ];

  const handleOfferToggle = (offerId, checked) => {
    if (checked) {
      setActiveOffers([...activeOffers, offerId]);
    } else {
      setActiveOffers(activeOffers.filter(id => id !== offerId));
    }
  };

  return (
    <aside className="w-[300px] shrink-0" aria-label="Filters">
      <div className="sticky top-24 bg-[#FCFAF8] border border-[#B8915C]/18 rounded-[24px] p-[32px] shadow-[0_4px_30px_rgba(0,0,0,0.03)] flex flex-col gap-[32px]">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif text-[#4B2434]">Filters</h3>
          <button 
            onClick={onClearAll}
            className="text-xs uppercase tracking-widest text-[#8B7A73] hover:text-[#B8915C] transition-colors focus:outline-none"
          >
            Clear All
          </button>
        </div>

        {/* All Products (Categories) */}
        <div className="flex flex-col gap-[18px]">
          <h4 className="text-[10px] uppercase tracking-widest text-[#8B7A73] font-semibold">All Products</h4>
          <div className="flex flex-col gap-1 -mx-3">
            <CustomRadio
              label="All Products"
              checked={activeCategory === "all"}
              onChange={() => setActiveCategory("all")}
            />
            {categories.map(cat => (
              <CustomRadio
                key={cat.id || cat._id}
                label={cat.name}
                checked={activeCategory === (cat.id || cat._id)}
                onChange={() => setActiveCategory(cat.id || cat._id)}
              />
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="flex flex-col gap-[18px]">
          <h4 className="text-[10px] uppercase tracking-widest text-[#8B7A73] font-semibold">Price Range</h4>
          <PriceSlider 
            value={priceRange} 
            max={50000} 
            onValueChange={setPriceRange} 
          />
        </div>

        {/* Offers */}
        <div className="flex flex-col gap-[18px]">
          <h4 className="text-[10px] uppercase tracking-widest text-[#8B7A73] font-semibold">Offers</h4>
          <div className="flex flex-col gap-[18px]">
            {OFFERS.map(offer => (
              <CustomCheckbox
                key={offer.id}
                label={offer.label}
                checked={activeOffers.includes(offer.id)}
                onChange={(checked) => handleOfferToggle(offer.id, checked)}
              />
            ))}
          </div>
        </div>

      </div>
    </aside>
  );
}
