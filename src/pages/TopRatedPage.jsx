import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieGrid from '../components/movies/MovieGrid';
import { tmdbApi } from '../services/tmdbApi';

const TopRatedPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTopRatedMovies = async (page = 1) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await tmdbApi.getTopRatedMovies(page);
        setMovies(response.results);
        setTotalPages(response.total_pages);
        setCurrentPage(page);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopRatedMovies(currentPage);
  }, [currentPage]);

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
          Top Rated Movies
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the highest rated movies of all time according to user reviews
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

      {/* Movies Grid */}
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
  );
};

export default TopRatedPage;