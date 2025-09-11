// Application constants
export const IMAGE_BASE_URL =
  import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    xlarge: 'w780',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    xlarge: 'original',
  },
};

export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Movie Search App',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
};
