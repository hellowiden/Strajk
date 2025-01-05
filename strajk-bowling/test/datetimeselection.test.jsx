// Användaren ska kunna välja ett datum och en tid från ett kalender- och tidvalssystem.

import { render, screen, fireEvent } from '@testing-library/react';
import BookingInfo from '../src/components/BookingInfo/BookingInfo';

test('Användaren ska kunna välja ett datum och en tid från ett kalender- och tidvalssystem', () => {
  render(<BookingInfo updateBookingDetails={jest.fn()} />);

  // Datumval
  const dateInput = screen.getByLabelText(/Date/i);
  fireEvent.change(dateInput, { target: { value: '2024-12-15' } });
  expect(screen.getByDisplayValue('2024-12-15')).toBeInTheDocument();

  // Tidval
  const timeInput = screen.getByLabelText(/Time/i);
  fireEvent.change(timeInput, { target: { value: '18:00' } });
  expect(screen.getByDisplayValue('18:00')).toBeInTheDocument();
});
