import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';
import LoginPage from '../components/shared/LoginPage';

test('renders learn react link', () => {
  render(<LoginPage />);
  const linkElement = screen.getByText(/Please Login/i);
  expect(linkElement).toBeInTheDocument();
});


