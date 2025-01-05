import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Booking from '../src/views/Booking';

test('Testa en användare med en bana och en sko', () => {
  // Render the Booking component inside a MemoryRouter to handle routing
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

  // Add two shoe inputs
  const addShoeButton = screen.getByTestId('addShoeButton');
  fireEvent.click(addShoeButton);
  fireEvent.click(addShoeButton);

  // Enter shoe size for player 1 and verify the value
  const shoeInput1 = screen.getByTestId('Shoe size / person 1');
  fireEvent.change(shoeInput1, { target: { value: '10' } });
  expect(shoeInput1.value).toBe('10');

  // Enter shoe size for player 2 and verify the value
  const shoeInput2 = screen.getByTestId('Shoe size / person 2');
  fireEvent.change(shoeInput2, { target: { value: '15' } });
  expect(shoeInput2.value).toBe('15');

  // Remove one shoe input and verify that player 2's input is removed
  const removeShoeButtons = screen.getAllByTestId('removeShoeButton');
  fireEvent.click(removeShoeButtons[1]);
  expect(screen.queryByLabelText('Shoe size / person 2')).toBeNull();

  // Update shoe size for player 1 and verify the new value
  fireEvent.change(shoeInput1, { target: { value: '15' } });
  expect(shoeInput1.value).toBe('15');

  // Update shoe size for player 1 again and verify the new value
  fireEvent.change(shoeInput1, { target: { value: '18' } });
  expect(shoeInput1.value).toBe('18');
});

test('Ta bort ett för mycket fält för skostorlek', () => {
  // Render the Booking component inside a MemoryRouter to handle routing
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

  // Add four shoe inputs
  const addShoeButton = screen.getByTestId('addShoeButton');
  fireEvent.click(addShoeButton);
  fireEvent.click(addShoeButton);
  fireEvent.click(addShoeButton);
  fireEvent.click(addShoeButton);

  // Remove the second shoe input
  const removeShoeButtons = screen.getAllByTestId('removeShoeButton');
  fireEvent.click(removeShoeButtons[1]);

  // Verify that the first three inputs still exist
  expect(screen.queryByTestId('Shoe size / person 1')).not.toBeNull();
  expect(screen.queryByTestId('Shoe size / person 2')).not.toBeNull();
  expect(screen.queryByTestId('Shoe size / person 3')).not.toBeNull();

  // Verify that the fourth input no longer exists
  expect(screen.queryByTestId('Shoe size / person 4')).toBeNull();
});
