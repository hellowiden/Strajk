import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Booking from '../src/views/Booking';
import { vi } from 'vitest';

test('Testa en användare med en bana och en sko', () => {
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

  // Lägg till en sko
  const addShoeButton = screen.getByTestId('addShoeButton');
  fireEvent.click(addShoeButton);
  fireEvent.click(addShoeButton);

  // Spelare 1
  const shoeInput1 = screen.getByLabelText('Shoe size / person 1');
  fireEvent.change(shoeInput1, { target: { value: '10' } });
  expect(shoeInput1.value).toBe('10');

  // Spelare 2
  const shoeInput2 = screen.getByLabelText('Shoe size / person 2');
  fireEvent.change(shoeInput2, { target: { value: '15' } });
  expect(shoeInput2.value).toBe('15');

  // Ta bort en sko
  const removeShoeButtons = screen.getAllByTestId('removeShoeButton');
  fireEvent.click(removeShoeButtons[1]);
  expect(screen.queryByLabelText('Shoe size / person 2')).toBeNull();

  fireEvent.change(shoeInput1, { target: { value: '15' } });
  expect(shoeInput1.value).toBe('15');

  //Det ska vara möjligt att välja skostorlek för alla spelare som ingår i bokningen.
  fireEvent.change(shoeInput1, { target: { value: '18' } });
  expect(shoeInput1.value).toBe('18');
});

test('Ta bort ett för mycket fält för skostorlek', () => {
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

  // Lägg till en sko
  const addShoeButton = screen.getByTestId('addShoeButton');
  fireEvent.click(addShoeButton);
  fireEvent.click(addShoeButton);
  fireEvent.click(addShoeButton);
  fireEvent.click(addShoeButton);

  // Ta bort en sko
  const removeShoeButtons = screen.getAllByTestId('removeShoeButton');
  fireEvent.click(removeShoeButtons[1]);
  expect(screen.queryByLabelText('Shoe size / person 1')).not.toBeNull();
  expect(screen.queryByLabelText('Shoe size / person 2')).not.toBeNull();
  expect(screen.queryByLabelText('Shoe size / person 3')).not.toBeNull();
  expect(screen.queryByLabelText('Shoe size / person 4')).toBeNull();
});
