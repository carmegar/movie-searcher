// src/components/movies/MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL, IMAGE_SIZES } from '../../utils/constants';

const MovieCard = ({ movie }) => {
  const {
    id,
    title,
    poster_path,
    release_date,
    vote_average,
    overview
  } = movie;

  const year = release_date ? new Date(release_date).getFullYear() : 'N/A';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';
  
  const posterUrl = poster_path 
    ? `${IMAGE_BASE_URL}/${IMAGE_SIZES.poster.medium}${poster_path}`
    : null;

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'bg-green-500';
    if (rating >= 6) return 'bg-yellow-500';
    if (rating >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <Link to={`/movie/${id}`}>
      <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group overflow-hidden">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden bg-gray-200">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${title} poster`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 01-1-1V5a1 1 0 011-1h3z" />
                </svg>
                <p className="text-sm text-gray-500">No Image</p>
              </div>
            </div>
          )}
          
          {/* Rating Badge */}
          {vote_average > 0 && (
            <div className="absolute top-3 right-3">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white ${getRatingColor(vote_average)}`}>
                ★ {rating}
              </span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-transparent group-hover:bg-black group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <div className="bg-white bg-opacity-90 rounded-full p-3">
                <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>{year}</span>
            {vote_average > 0 && (
              <span className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {rating}
              </span>
            )}
          </div>

          {overview && (
            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
              {overview}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default MovieCard;
