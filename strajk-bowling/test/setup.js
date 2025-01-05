import { afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { server } from '../mocks/node';

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  sessionStorage.clear();
});
