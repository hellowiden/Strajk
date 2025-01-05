import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Booking from '../src/views/Booking';

describe('Booking', () => {
  test('Testa en användare med en bana och en sko', () => {
    // Render the Booking component within a MemoryRouter to handle routing
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    // Simulate selecting a date for the booking
    const dateInput = screen.getByTestId('Date');
    fireEvent.change(dateInput, { target: { value: '2024-12-15' } });
    expect(dateInput.value).toBe('2024-12-15');

    // Simulate selecting a time for the booking
    const timeInput = screen.getByTestId('Time');
    fireEvent.change(timeInput, { target: { value: '18:00' } });
    expect(timeInput.value).toBe('18:00');

    // Simulate entering the number of players (at least one player is required)
    const peopleInput = screen.getByTestId('Number of awesome bowlers');
    fireEvent.change(peopleInput, { target: { value: '2' } });
    expect(peopleInput.value).toBe('2');

    // Simulate entering the number of lanes (at least one lane is required)
    const lanesInput = screen.getByTestId('Number of lanes');
    fireEvent.change(lanesInput, { target: { value: '2' } });
    expect(lanesInput.value).toBe('2');

    // Simulate submitting the booking form
    const submitButton = screen.getByTestId('submit-btn');
    fireEvent.click(submitButton);
  });
});
