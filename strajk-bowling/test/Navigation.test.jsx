import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Navigation from '../src/components/Navigation/Navigation';
import Booking from '../src/views/Booking';
import Confirmation from '../src/views/Confirmation';

describe('Som användare vill jag kunna navigera mellan boknings-och bekräftelsevyn', () => {
  it('vi har bokning ', async () => {
    // Simulate a booking by setting confirmation data in sessionStorage
    sessionStorage.setItem(
      'confirmation',
      '{"when":"3000-10-20T12:33","lanes":"1","people":"1","shoes":["21"],"price":220,"id":"STR9058SRSE","active":true}'
    );

    // Render the application with the Navigation, Booking, and Confirmation components
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Booking />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </MemoryRouter>
    );

    // Click the navigation icon to open the navigation menu
    const navicon = screen.getAllByTestId('navicon')[0];
    fireEvent.click(navicon);

    // Click on the confirmation link in the navigation menu
    const confirmationLink = await waitFor(
      () => screen.getAllByTestId('confirmationlink')[0]
    );
    fireEvent.click(confirmationLink);

    // Wait for the confirmation view to load and verify it displays the booking details
    await waitFor(() => {
      screen.getByTestId('When');
    });
  });

  it('har ej bokning ', async () => {
    // Simulate no booking by removing confirmation data from sessionStorage
    sessionStorage.removeItem('confirmation');

    // Render the application with the Navigation, Booking, and Confirmation components
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Booking />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </MemoryRouter>
    );

    // Click the navigation icon to open the navigation menu
    const navicon = screen.getAllByTestId('navicon')[0];
    fireEvent.click(navicon);

    // Click on the confirmation link in the navigation menu
    const confirmationLink = await waitFor(
      () => screen.getAllByTestId('confirmationlink')[0]
    );
    fireEvent.click(confirmationLink);

    // Wait for the confirmation view to load and verify it shows a "no booking" message
    await waitFor(() => {
      screen.getByText('Inga bokning gjord!');
    });
  });
});
