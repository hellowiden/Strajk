import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Booking from '../src/views/Booking';
import Confirmation from '../src/views/Confirmation';
import Navigation from '../src/components/Navigation/Navigation';

describe('Som användare vill jag kunna skicka iväg min reservation och få tillbaka ett ett bokningsnummer och totalsumma så jag vet hur mycket jag ska betala. (120 kr / person + 100 kr / bana).', () => {
  it('få tillbaka ett bokningsnummer och totalsumma ', async () => {
    {
      // Render the application with Navigation, Booking, and Confirmation views
      render(
        <MemoryRouter initialEntries={['/']}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Booking />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </MemoryRouter>
      );

      // Select a date for the reservation
      const dateInput = screen.getByTestId('Date');
      fireEvent.change(dateInput, { target: { value: '2024-12-15' } });
      expect(dateInput.value).toBe('2024-12-15');

      // Select a time for the reservation
      const timeInput = screen.getByTestId('Time');
      fireEvent.change(timeInput, { target: { value: '18:00' } });
      expect(timeInput.value).toBe('18:00');

      // Enter the number of players (at least 1)
      const peopleInput = screen.getByTestId('Number of awesome bowlers');
      fireEvent.change(peopleInput, { target: { value: '2' } });
      expect(peopleInput.value).toBe('2');

      // Enter the number of lanes (at least 1)
      const lanesInput = screen.getByTestId('Number of lanes');
      fireEvent.change(lanesInput, { target: { value: '2' } });
      expect(lanesInput.value).toBe('2');

      // Add two shoe size inputs
      const addShoeButton = screen.getByTestId('addShoeButton');
      fireEvent.click(addShoeButton);
      fireEvent.click(addShoeButton);

      // Enter shoe size for player 1 and validate input
      const shoeInput1 = screen.getByTestId('Shoe size / person 1');
      fireEvent.change(shoeInput1, { target: { value: '10' } });
      expect(shoeInput1.value).toBe('10');

      // Enter shoe size for player 2 and validate input
      const shoeInput2 = screen.getByTestId('Shoe size / person 2');
      fireEvent.change(shoeInput2, { target: { value: '15' } });
      expect(shoeInput2.value).toBe('15');

      // Submit the booking form
      const submitButton = screen.getByTestId('submit-btn');
      fireEvent.click(submitButton);
    }

    {
      // Wait for the confirmation view to load
      await waitFor(() => {
        screen.getByText('See you soon!');
      });

      // Validate that the booking number starts with "STR"
      expect(screen.getByTestId('Booking number').value.substr(0, 3)).toBe(
        'STR'
      );

      // Validate the total price (440 SEK: 2 players × 120 SEK + 2 lanes × 100 SEK)
      expect(screen.getByTestId('confirmationPrice').textContent).toBe(
        '440 sek'
      );
    }
  });
});
