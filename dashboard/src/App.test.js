import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App with watchlist items', () => {
  render(<App />);
  const stockElement = screen.getByText(/INFY/i);
  expect(stockElement).toBeInTheDocument();
});
