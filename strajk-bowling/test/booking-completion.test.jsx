/*

import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Booking from '../src/views/Booking';

//import { setupServer } from 'msw/node';
//import { handlers } from '../mocks/handlers';

//const server = setupServer(...handlers);

//beforeAll(() => server.listen());
//afterEach(() => server.resetHandlers());
//afterAll(() => server.close());

test('User completes booking and receives a booking number', () => {
  render(<Booking />);
});

*/

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
