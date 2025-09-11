import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/common/SearchBar';
import MovieGrid from '../components/movies/MovieGrid';
import { useMovieSearch } from '../hooks/useMovieSearch';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const {
    movies,
    isLoading,
    error,
    searchMovies,
    totalPages,
    currentPage
  } = useMovieSearch();

  useEffect(() => {
    if (query) {
      searchMovies(query);
    }
  }, [query]);

  const handleSearch = (newQuery) => {
    setSearchParams({ q: newQuery });
  };

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search for movies..."
          className="max-w-2xl mx-auto"
        />
      </section>

      {/* Results */}
      {query && (
        <section>
          <MovieGrid
            movies={movies}
            isLoading={isLoading}
            error={error}
            title={`Search Results for "${query}"`}
          />
          
          {/* Pagination would go here */}
        </section>
      )}
    </div>
  );
};

export default SearchPage;