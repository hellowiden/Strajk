// Användaren ska kunna välja ett datum och en tid från ett kalender- och tidvalssystem.

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Booking from '../src/views/Booking';

function renderWithRouter(component) {
  return render(<BrowserRouter>{component}</BrowserRouter>);
}

test('renders Booking component', () => {
  renderWithRouter(<Booking />);

  // Kontrollera om titeln "Booking" renderas
  const headingElement = screen.getByText(/Booking/i);
  expect(headingElement).toBeInTheDocument();
});
