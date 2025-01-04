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
