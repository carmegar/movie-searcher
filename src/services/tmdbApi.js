// src/services/tmdbApi.js
import apiClient from './api';

export const tmdbApi = {
  // Search movies
  searchMovies: async (query, page = 1) => {
    const response = await apiClient.get('/search/movie', {
      params: { query, page }
    });
    return response;
  },

  // Get popular movies
  getPopularMovies: async (page = 1) => {
    const response = await apiClient.get('/movie/popular', {
      params: { page }
    });
    return response;
  },

  // Get top rated movies
  getTopRatedMovies: async (page = 1) => {
    const response = await apiClient.get('/movie/top_rated', {
      params: { page }
    });
    return response;
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    const response = await apiClient.get(`/movie/${movieId}`);
    return response;
  },

  // Get movie credits
  getMovieCredits: async (movieId) => {
    const response = await apiClient.get(`/movie/${movieId}/credits`);
    return response;
  },

  // Get movie genres
  getGenres: async () => {
    const response = await apiClient.get('/genre/movie/list');
    return response;
  },

  // Discover movies with filters
  discoverMovies: async (filters = {}, page = 1) => {
    const params = {
      page,
      sort_by: 'popularity.desc',
      ...filters
    };
    
    // Clean up undefined values
    Object.keys(params).forEach(key => {
      if (params[key] === undefined || params[key] === '') {
        delete params[key];
      }
    });

    const response = await apiClient.get('/discover/movie', { params });
    return response;
  }
};
