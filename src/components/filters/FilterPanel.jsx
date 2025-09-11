import React, { useState, useEffect } from 'react';
import { useDarkModeContext } from '../../contexts/DarkModeContext';
import { tmdbApi } from '../../services/tmdbApi';

const FilterPanel = ({ onFiltersChange, initialFilters = {} }) => {
  const { isDarkMode } = useDarkModeContext();
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    with_genres: '',
    primary_release_year: '',
    'vote_average.gte': '',
    'vote_average.lte': '',
    ...initialFilters
  });

  // Get genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await tmdbApi.getGenres();
        setGenres(response.genres || []);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters = {
      with_genres: '',
      primary_release_year: '',
      'vote_average.gte': '',
      'vote_average.lte': ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  // Generate year options (last 30 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= currentYear - 30; year--) {
    yearOptions.push(year);
  }

  return (
    <div className={`w-80 h-fit sticky top-20 p-6 rounded-lg border transition-colors ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Filters
        </h3>
        <button
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        {/* Genre Filter */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Genre
          </label>
          <select
            value={filters.with_genres}
            onChange={(e) => handleFilterChange('with_genres', e.target.value)}
            className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="">All genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Release Year
          </label>
          <select
            value={filters.primary_release_year}
            onChange={(e) => handleFilterChange('primary_release_year', e.target.value)}
            className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="">All years</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Rating Range
          </label>
          
          <div className="space-y-3">
            <div>
              <label className={`block text-xs mb-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Minimum Rating
              </label>
              <select
                value={filters['vote_average.gte']}
                onChange={(e) => handleFilterChange('vote_average.gte', e.target.value)}
                className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">No minimum</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}+ stars
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-xs mb-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Maximum Rating
              </label>
              <select
                value={filters['vote_average.lte']}
                onChange={(e) => handleFilterChange('vote_average.lte', e.target.value)}
                className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">No maximum</option>
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} stars max
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Active Filters
          </label>
          <div className="space-y-1">
            {filters.with_genres && (
              <span className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full">
                {genres.find(g => g.id.toString() === filters.with_genres)?.name}
              </span>
            )}
            {filters.primary_release_year && (
              <span className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full ml-1">
                {filters.primary_release_year}
              </span>
            )}
            {filters['vote_average.gte'] && (
              <span className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full ml-1">
                {filters['vote_average.gte']}+ rating
              </span>
            )}
            {filters['vote_average.lte'] && (
              <span className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full ml-1">
                Max {filters['vote_average.lte']} rating
              </span>
            )}
            {!filters.with_genres && !filters.primary_release_year && !filters['vote_average.gte'] && !filters['vote_average.lte'] && (
              <span className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                No filters applied
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;