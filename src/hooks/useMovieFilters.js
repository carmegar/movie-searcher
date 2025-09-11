import { useState, useCallback, useMemo } from 'react';

export const useMovieFilters = (initialFilters = {}) => {
  const [filters, setFilters] = useState({
    with_genres: '',
    primary_release_year: '',
    'vote_average.gte': '',
    'vote_average.lte': '',
    ...initialFilters
  });

  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      with_genres: '',
      primary_release_year: '',
      'vote_average.gte': '',
      'vote_average.lte': ''
    });
  }, []);

  // Convert filters to API params, removing empty values
  const apiParams = useMemo(() => {
    const params = { ...filters };
    Object.keys(params).forEach(key => {
      if (params[key] === '' || params[key] === undefined) {
        delete params[key];
      }
    });
    return params;
  }, [filters]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(value => value !== '' && value !== undefined);
  }, [filters]);

  return {
    filters,
    apiParams,
    hasActiveFilters,
    updateFilters,
    clearFilters
  };
};