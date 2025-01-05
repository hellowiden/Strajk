import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Booking from '../src/views/Booking';
import Confirmation from '../src/views/Confirmation';
import Navigation from '../src/components/Navigation/Navigation';

describe('Som användare vill jag kunna skicka iväg min reservation och få tillbaka ett ett bokningsnummer och totalsumma så jag vet hur mycket jag ska betala. (120 kr / person + 100 kr / bana).', () => {
  it('få tillbaka ett ett bokningsnummer och totalsumma ', async () => {
    {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Booking />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </MemoryRouter>
      );

      // Datumval
      const dateInput = screen.getByTestId('Date');
      fireEvent.change(dateInput, { target: { value: '2024-12-15' } });
      expect(dateInput.value).toBe('2024-12-15');

      // Tidval
      const timeInput = screen.getByTestId('Time');
      fireEvent.change(timeInput, { target: { value: '18:00' } });
      expect(timeInput.value).toBe('18:00');

      // Användaren ska kunna ange antal spelare (minst 1 spelare).
      const peopleInput = screen.getByTestId('Number of awesome bowlers');
      fireEvent.change(peopleInput, { target: { value: '2' } });
      expect(peopleInput.value).toBe('2');

      // Användaren ska kunna ange antal bana (minst 1 bana).
      const lanesInput = screen.getByTestId('Number of lanes');
      fireEvent.change(lanesInput, { target: { value: '2' } });
      expect(lanesInput.value).toBe('2');

      // Lägg till en sko
      const addShoeButton = screen.getByTestId('addShoeButton');
      fireEvent.click(addShoeButton);
      fireEvent.click(addShoeButton);

      // Spelare 1
      const shoeInput1 = screen.getByTestId('Shoe size / person 1');
      fireEvent.change(shoeInput1, { target: { value: '10' } });
      expect(shoeInput1.value).toBe('10');

      // Spelare 2
      const shoeInput2 = screen.getByTestId('Shoe size / person 2');
      fireEvent.change(shoeInput2, { target: { value: '15' } });
      expect(shoeInput2.value).toBe('15');

      // complete booking
      const submitButton = screen.getByTestId('submit-btn');
      fireEvent.click(submitButton);
    }

    {
      // Vänta tills konfermatuion
      await waitFor(() => {
        screen.getByText('See you soon!');
      });
      expect(screen.getByTestId('Booking number').value.substr(0, 3)).toBe(
        'STR'
      );

      expect(screen.getByTestId('confirmationPrice').textContent).toBe(
        '440 sek'
      );
    }
  });
});
