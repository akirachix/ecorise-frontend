
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import '@testing-library/jest-dom';
// import App from './App';

// // Mock the routed components for isolated testing
// jest.mock('./Dashboard', () => () => <div>DashboardMock</div>);
// jest.mock('./Login', () => () => <div>LoginScreenMock</div>);

// describe('App routing with MemoryRouter', () => {
//   test('renders DashboardMock on /dashboard route', () => {
//     render(
//       <MemoryRouter
//         future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
//         initialEntries={['/dashboard']}
//       >
//         <App />
//       </MemoryRouter>
//     );
//     expect(screen.getByText('DashboardMock')).toBeInTheDocument();
//   });

//   test('renders LoginScreenMock on /login route', () => {
//     render(
//       <MemoryRouter
//         future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
//         initialEntries={['/login']}
//       >
//         <App />
//       </MemoryRouter>
//     );
//     expect(screen.getByText('LoginScreenMock')).toBeInTheDocument();
//   });

//   test('renders nothing on unknown route', () => {
//     render(
//       <MemoryRouter
//         future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
//         initialEntries={['/unknown']}
//       >
//         <App />
//       </MemoryRouter>
//     );
//     expect(screen.queryByText('DashboardMock')).not.toBeInTheDocument();
//     expect(screen.queryByText('LoginScreenMock')).not.toBeInTheDocument();
//   });
// });
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from './App';

// Mock routed components for isolated routing tests
jest.mock('./Dashboard', () => () => <div>DashboardMock</div>);
jest.mock('./Login', () => () => <div>LoginScreenMock</div>);

describe('App routing', () => {
  const renderWithRoute = (route) =>
    render(
      <MemoryRouter initialEntries={[route]}>
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
