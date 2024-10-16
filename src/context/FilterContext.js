// src/context/FilterContext.js
import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState('');  // Filter: unread, read, favourite
  const [favorites, setFavorites] = useState([]); // Store favorite emails

  const toggleFavorite = (emailId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(emailId)
        ? prevFavorites.filter((id) => id !== emailId)
        : [...prevFavorites, emailId]
    );
  };

  return (
    <FilterContext.Provider value={{ filter, setFilter, favorites, toggleFavorite }}>
      {children}
    </FilterContext.Provider>
  );
};
