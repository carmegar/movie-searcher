import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { tmdbApi } from '../services/tmdbApi';
import { IMAGE_BASE_URL, IMAGE_SIZES } from '../utils/constants';
import LoadingSpinner from '../components/common/LoadingSpinner';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [movieData, creditsData] = await Promise.all([
          tmdbApi.getMovieDetails(id),
          tmdbApi.getMovieCredits(id)
        ]);
        
        setMovie(movieData);
        setCredits(creditsData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
        <p className="text-gray-600 mb-6">Failed to load movie details</p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  if (!movie) return null;

  const {
    title,
    poster_path,
    backdrop_path,
    release_date,
    runtime,
    vote_average,
    vote_count,
    overview,
    genres,
    production_companies,
    production_countries,
    budget,
    revenue
  } = movie;

  const year = release_date ? new Date(release_date).getFullYear() : 'N/A';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';
  const hours = runtime ? Math.floor(runtime / 60) : 0;
  const minutes = runtime ? runtime % 60 : 0;

  const backdropUrl = backdrop_path 
    ? `${IMAGE_BASE_URL}/${IMAGE_SIZES.backdrop.large}${backdrop_path}`
    : null;

  const posterUrl = poster_path 
    ? `${IMAGE_BASE_URL}/${IMAGE_SIZES.poster.large}${poster_path}`
    : null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const director = credits?.crew?.find(person => person.job === 'Director');
  const mainCast = credits?.cast?.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Backdrop */}
      <div className="relative">
        {backdropUrl && (
          <div className="absolute inset-0">
            <img
              src={backdropUrl}
              alt={`${title} backdrop`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
        )}
        
        <div className="relative z-10 container mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Poster */}
            <div className="flex-shrink-0">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={`${title} poster`}
                  className="w-64 lg:w-80 rounded-lg shadow-2xl"
                />
              ) : (
                <div className="w-64 lg:w-80 h-96 bg-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>

            {/* Movie Info */}
            <div className="flex-1 text-white">
              <h1 className="text-3xl lg:text-5xl font-bold mb-2">{title}</h1>
              <p className="text-xl text-gray-300 mb-4">{year}</p>
              
              {/* Ratings and Runtime */}
              <div className="flex items-center gap-6 mb-6">
                {vote_average > 0 && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold">{rating}</span>
                    <span className="text-gray-300 ml-1">({vote_count} votes)</span>
                  </div>
                )}
                
                {runtime > 0 && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>{hours}h {minutes}m</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {genres && genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-primary-600 bg-opacity-80 rounded-full text-sm font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              {overview && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Overview</h3>
                  <p className="text-lg leading-relaxed text-gray-200">{overview}</p>
                </div>
              )}

              {/* Director */}
              {director && (
                <div className="mb-4">
                  <span className="font-semibold">Director: </span>
                  <span className="text-gray-200">{director.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {mainCast.length > 0 && (
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mainCast.map((actor) => (
              <div key={actor.id} className="text-center">
                <div className="w-full aspect-[2/3] mb-2 rounded-lg overflow-hidden bg-gray-200">
                  {actor.profile_path ? (
                    <img
                      src={`${IMAGE_BASE_URL}/${IMAGE_SIZES.poster.small}${actor.profile_path}`}
                      alt={actor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <h4 className="font-semibold text-sm text-gray-900">{actor.name}</h4>
                <p className="text-xs text-gray-600">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Production Info */}
      <div className="container mx-auto px-6 py-12 bg-white">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Production Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {budget > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Budget</h3>
              <p className="text-gray-600">{formatCurrency(budget)}</p>
            </div>
          )}
          
          {revenue > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Revenue</h3>
              <p className="text-gray-600">{formatCurrency(revenue)}</p>
            </div>
          )}

          {production_countries && production_countries.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Countries</h3>
              <p className="text-gray-600">
                {production_countries.map(country => country.name).join(', ')}
              </p>
            </div>
          )}

          {production_companies && production_companies.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Production Companies</h3>
              <p className="text-gray-600">
                {production_companies.slice(0, 3).map(company => company.name).join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Back Button */}
      <div className="container mx-auto px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default MovieDetailPage;