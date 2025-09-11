// src/hooks/useMovieSearch.js
import { useState } from 'react';
import { tmdbApi } from '../services/tmdbApi';

export const useMovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const searchMovies = async (searchQuery, page = 1) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setQuery(searchQuery);
    setCurrentPage(page);

    try {
      const response = await tmdbApi.searchMovies(searchQuery, page);
      setMovies(response.results);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError(err);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setMovies([]);
    setQuery('');
    setError(null);
    setCurrentPage(1);
    setTotalPages(0);
  };

  return {
    movies,
    isLoading,
    error,
    query,
    totalPages,
    currentPage,
    searchMovies,
    clearSearch
  };
};