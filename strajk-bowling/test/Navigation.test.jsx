import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Navigation from '../src/components/Navigation/Navigation';
import Booking from '../src/views/Booking';
import Confirmation from '../src/views/Confirmation';

describe('Som användare vill jag kunna navigera mellan boknings-och bekräftelsevyn', () => {
  it('vi har bokning ', async () => {
    {
      sessionStorage.setItem(
        'confirmation',
        '{"when":"3000-10-20T12:33","lanes":"1","people":"1","shoes":["21"],"price":220,"id":"STR9058SRSE","active":true}'
      );

      render(
        <MemoryRouter initialEntries={['/']}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Booking />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </MemoryRouter>
      );

      const navicon = screen.getAllByTestId('navicon')[0];
      fireEvent.click(navicon);

      const confirmationLink = await waitFor(
        () => screen.getAllByTestId('confirmationlink')[0]
      );
      fireEvent.click(confirmationLink);

      await waitFor(() => {
        screen.getByTestId('When');
      });
    }
  });

  it('har ej bokning ', async () => {
    sessionStorage.removeItem('confirmation');

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

      const navicon = screen.getAllByTestId('navicon')[0];
      fireEvent.click(navicon);

      const confirmationLink = await waitFor(
        () => screen.getAllByTestId('confirmationlink')[0]
      );
      fireEvent.click(confirmationLink);

      await waitFor(() => {
        screen.getByText('Inga bokning gjord!');
      });
    }
  });
});
