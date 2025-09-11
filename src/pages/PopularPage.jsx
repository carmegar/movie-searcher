import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieGrid from '../components/movies/MovieGrid';
import FilterPanel from '../components/filters/FilterPanel';
import { tmdbApi } from '../services/tmdbApi';
import { useMovieFilters } from '../hooks/useMovieFilters';

const PopularPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { filters, apiParams, hasActiveFilters, updateFilters } = useMovieFilters();

  useEffect(() => {
    const fetchMovies = async (page = 1) => {
      setIsLoading(true);
      setError(null);

      try {
        let response;
        
        if (hasActiveFilters) {
          // Use discover endpoint with popularity sort when filters are applied
          response = await tmdbApi.discoverMovies({
            ...apiParams,
            sort_by: 'popularity.desc'
          }, page);
        } else {
          // Use popular movies when no filters
          response = await tmdbApi.getPopularMovies(page);
        }
        
        setMovies(response.results || []);
        setTotalPages(response.total_pages || 0);
        setCurrentPage(page);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies(currentPage);
  }, [currentPage, apiParams, hasActiveFilters]);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [apiParams]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {hasActiveFilters ? "Filtered Popular Movies" : "Popular Movies"}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the most popular movies currently trending worldwide
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content with Filters */}
      <div className="flex gap-8">
        {/* Filter Panel */}
        <div className="hidden lg:block flex-shrink-0">
          <FilterPanel 
            onFiltersChange={updateFilters}
            initialFilters={filters}
          />
        </div>

        {/* Movies Grid */}
        <div className="flex-1 space-y-8">
          <MovieGrid
            movies={movies}
            isLoading={isLoading}
            error={error}
          />

          {/* Pagination */}
          {!isLoading && !error && totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 py-8">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {/* First Page */}
          {currentPage > 3 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                1
              </button>
              {currentPage > 4 && (
                <span className="px-3 py-2 text-sm font-medium text-gray-700">...</span>
              )}
            </>
          )}

          {/* Page Numbers */}
          {generatePageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                page === currentPage
                  ? 'text-white bg-primary-600 border border-primary-600'
                  : 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Last Page */}
          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && (
                <span className="px-3 py-2 text-sm font-medium text-gray-700">...</span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
          )}

          {/* Page Info */}
          {!isLoading && !error && (
            <div className="text-center text-sm text-gray-600">
              Showing page {currentPage} of {totalPages}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularPage;