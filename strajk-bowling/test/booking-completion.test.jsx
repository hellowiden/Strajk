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

/*


import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import Booking from '../src/views/Booking';

function renderWithRouter(component) {
  return render(<BrowserRouter>{component}</BrowserRouter>);
}

test('renders Booking component', () => {
  renderWithRouter(<Booking />);

  const dateInput = screen.getAllByLabelText('Date');

  expect(dateInput).tobe;
});


*/

import { render, screen, fireEvent } from '@testing-library/react';
import BookingInfo from '../src/components/BookingInfo/BookingInfo';

test('User selects a date and time', () => {
  render(<BookingInfo />);

  fireEvent.change(screen.getByLabelText(/Select Date/i), {
    target: { value: '2024-12-15' },
  });
  fireEvent.change(screen.getByLabelText(/Select Time/i), {
    target: { value: '18:00' },
  });

  expect(screen.getByDisplayValue('2024-12-15')).toBeInTheDocument();
  expect(screen.getByDisplayValue('18:00')).toBeInTheDocument();
});
