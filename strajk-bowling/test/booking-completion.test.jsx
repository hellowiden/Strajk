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

import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Booking from '../src/views/Booking';

function renderWithRouter(component) {
  return render(<BrowserRouter>{component}</BrowserRouter>);
}

describe('Booking Component', () => {
  test('displays error if required fields are not filled', () => {
    renderWithRouter(<Booking />);

    // Klicka på "strIIIIIike!" utan att fylla i något
    const bookButton = screen.getByText('strIIIIIike!');
    fireEvent.click(bookButton);

    // Kontrollera att felmeddelande visas
    expect(
      screen.getByText('Alla fälten måste vara ifyllda')
    ).toBeInTheDocument();
  });

  test('updates booking details when inputs change', () => {
    renderWithRouter(<Booking />);

    // Fyll i Datum
    const dateInput = screen.getByLabelText(/Datum/i);
    fireEvent.change(dateInput, { target: { value: '2025-01-01' } });

    // Fyll i Tid
    const timeInput = screen.getByLabelText(/Tid/i);
    fireEvent.change(timeInput, { target: { value: '14:00' } });

    // Kontrollera att värden uppdateras
    expect(dateInput.value).toBe('2025-01-01');
    expect(timeInput.value).toBe('14:00');
  });

  test('displays error if players exceed max allowed per lane', () => {
    renderWithRouter(<Booking />);

    // Fyll i nödvändiga fält
    fireEvent.change(screen.getByLabelText(/Antal spelare/i), {
      target: { value: '5' },
    });
    fireEvent.change(screen.getByLabelText(/Datum/i), {
      target: { value: '2025-01-01' },
    });
    fireEvent.change(screen.getByLabelText(/Tid/i), {
      target: { value: '14:00' },
    });
    fireEvent.change(screen.getByLabelText(/Banor/i), {
      target: { value: '1' },
    });

    // Klicka på bokningsknappen
    const bookButton = screen.getByText('strIIIIIike!');
    fireEvent.click(bookButton);

    // Kontrollera att felmeddelande visas
    expect(
      screen.getByText('Det får max vara 4 spelare per bana')
    ).toBeInTheDocument();
  });
});
