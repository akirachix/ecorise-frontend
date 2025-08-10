
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('./Dashboard', () => () => <div>DashboardMock</div>);
jest.mock('./Login', () => () => <div>LoginScreenMock</div>);

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation((msg, ...args) => {
    if (typeof msg === 'string' && msg.includes('No routes matched location')) return;
    return console.warn(msg, ...args);
  });
});

afterAll(() => {
  console.warn.mockRestore();
});

describe('App routing', () => {
  const renderWithRoute = (route) =>
    render(
      <MemoryRouter initialEntries={[route]} future={{v7_relativeSplatPath: true, v7_startTransition:true}}>
        <App />
      </MemoryRouter>
    );

  test('renders Dashboard on /dashboard route', async () => {
    renderWithRoute('/dashboard');
    expect(await screen.findByText('DashboardMock')).toBeInTheDocument();
  });

  test('renders LoginScreen on /login route', async () => {
    renderWithRoute('/login');
    expect(await screen.findByText('LoginScreenMock')).toBeInTheDocument();
  });

  test('renders nothing on unknown route', () => {
    renderWithRoute('/unknown');
    expect(screen.queryByText('DashboardMock')).not.toBeInTheDocument();
    expect(screen.queryByText('LoginScreenMock')).not.toBeInTheDocument();
  });
});
