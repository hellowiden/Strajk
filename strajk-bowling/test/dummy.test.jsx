import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

function Greeting({ name }) {
  return <div>Hello, {name}!</div>;
}

test('renders greeting with name', () => {
  // ARRANGE
  const name = 'Alice';
  render(<Greeting name={name} />);

  // ASSERT
  const greetingElement = screen.getByText(`Hello, ${name}!`);
  expect(greetingElement).toBeInTheDocument();
});
