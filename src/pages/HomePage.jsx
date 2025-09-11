// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/common/SearchBar';
import MovieGrid from '../components/movies/MovieGrid';
import FilterPanel from '../components/filters/FilterPanel';
import { tmdbApi } from '../services/tmdbApi';
import { useMovieFilters } from '../hooks/useMovieFilters';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { filters, apiParams, hasActiveFilters, updateFilters } = useMovieFilters();

  const popularSearches = [
    'Avengers', 'Batman', 'Spider-Man', 'Star Wars', 'Marvel'
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        let response;
        
        if (hasActiveFilters) {
          // Use discover endpoint when filters are applied
          response = await tmdbApi.discoverMovies(apiParams);
        } else {
          // Use popular movies when no filters
          response = await tmdbApi.getPopularMovies();
        }
        
        setMovies(response.results || []);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [apiParams, hasActiveFilters]);

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 leading-tight mb-6">
            Discover Amazing
            <span className="text-primary-600 block">Movies</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Search through thousands of movies, find ratings, reviews, and discover your next favorite film.
          </p>

          <div className="max-w-2xl mx-auto">
            <SearchBar
              onSearch={handleSearch}
              suggestions={popularSearches}
              placeholder="Search for movies..."
              className="mb-4"
            />
          </div>
        </div>
      </section>

      {/* Main Content with Filters */}
      <section>
        <div className="flex gap-8">
          {/* Filter Panel */}
          <div className="hidden lg:block flex-shrink-0">
            <FilterPanel 
              onFiltersChange={updateFilters}
              initialFilters={filters}
            />
          </div>

          {/* Movies Grid */}
          <div className="flex-1">
            <MovieGrid
              movies={movies}
              isLoading={isLoading}
              error={error}
              title={hasActiveFilters ? "Filtered Movies" : "Popular Movies"}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;