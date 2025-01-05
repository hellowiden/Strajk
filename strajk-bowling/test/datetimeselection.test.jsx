import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Booking from '../src/views/Booking';

test('Testa en användare med en bana och en sko', () => {
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

  // Datumval
  const dateInput = screen.getByLabelText('Date');
  fireEvent.change(dateInput, { target: { value: '2024-12-15' } });
  expect(dateInput.value).toBe('2024-12-15');

  // Tidval
  const timeInput = screen.getByLabelText('Time');
  fireEvent.change(timeInput, { target: { value: '18:00' } });
  expect(timeInput.value).toBe('18:00');

  // Användaren ska kunna ange antal spelare (minst 1 spelare).
  const peopleInput = screen.getByLabelText('Number of awesome bowlers');
  fireEvent.change(peopleInput, { target: { value: '2' } });
  expect(peopleInput.value).toBe('2');

  // Användaren ska kunna ange antal bana (minst 1 bana).
  const lanesInput = screen.getByLabelText('Number of lanes');
  fireEvent.change(lanesInput, { target: { value: '2' } });
  expect(lanesInput.value).toBe('2');

  // complete booking
  const submitButton = screen.getByTestId('submit-btn');
  fireEvent.click(submitButton);
});
