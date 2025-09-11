import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import PopularPage from './pages/PopularPage';
import SearchPage from './pages/SearchPage';
import TopRatedPage from './pages/TopRatedPage';
import { DarkModeProvider, useDarkModeContext } from './contexts/DarkModeContext';

function AppContent() {
  const { isDarkMode } = useDarkModeContext();
  
  const backgroundStyle = isDarkMode 
    ? { background: 'linear-gradient(to bottom right, #111827, #1f2937)' }
    : { background: 'linear-gradient(to bottom right, #f0fdfa, #ccfbf1)' };
  
  return (
    <div 
      className="min-h-screen transition-colors"
      style={backgroundStyle}
    >
      <Header />
      
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/top-rated" element={<TopRatedPage />} />
        </Routes>
      </main>
      
      <footer className={`py-6 mt-12 border-t transition-colors ${
        isDarkMode 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className={`container mx-auto px-6 max-w-7xl text-center text-sm transition-colors ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <p>
            © 2025 Movie Search - Data provided by{' '}
            <a 
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700"
            >
              TMDB
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <AppContent />
      </Router>
    </DarkModeProvider>
  );
}

export default App;