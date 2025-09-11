// src/components/movies/MovieGrid.jsx
import React from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import MovieCard from './MovieCard';

const MovieGrid = ({ 
  movies = [], 
  isLoading = false, 
  error = null,
  title = "Movies",
  showTitle = true 
}) => {
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">
          Error loading movies
        </div>
        <p className="text-gray-600">{error.message}</p>
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No movies found
        </h3>
        <p className="text-gray-600">
          Try searching with different keywords
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {showTitle && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {title}
          </h2>
          <span className="text-gray-600">
            {movies.length} movie{movies.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="animate-fade-in">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieGrid;
