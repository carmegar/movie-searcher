import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders movie search app title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Movie Search App/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('shows technology stack configured message', () => {
    render(<App />);
    const stackElement = screen.getByText(/Stack Tecnológico Configurado/i);
    expect(stackElement).toBeInTheDocument();
  });

  test('displays all configured technologies', () => {
    render(<App />);

    expect(screen.getByText(/React 19 \+ Vite/i)).toBeInTheDocument();
    expect(screen.getByText(/TailwindCSS/i)).toBeInTheDocument();
    expect(screen.getByText(/React Router/i)).toBeInTheDocument();
    expect(screen.getByText(/Axios/i)).toBeInTheDocument();
    expect(screen.getByText(/Jest \+ Testing Library/i)).toBeInTheDocument();
    expect(screen.getByText(/ESLint \+ Prettier/i)).toBeInTheDocument();
    expect(screen.getByText(/GitHub Actions/i)).toBeInTheDocument();
    expect(screen.getByText(/Vercel Ready/i)).toBeInTheDocument();
  });
});
