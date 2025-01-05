// Användaren ska kunna välja ett datum och en tid från ett kalender- och tidvalssystem.

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
