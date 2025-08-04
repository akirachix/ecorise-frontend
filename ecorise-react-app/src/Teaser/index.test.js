// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import '@testing-library/jest-dom';

// jest.mock('./index.css', () => ({}));

// import Teaser from './index';

// const renderWithRouter = (component) => {
//   return render(
//     <MemoryRouter>
//       {component}
//     </MemoryRouter>
//   );
// };

// describe('Teaser Component', () => {
//   test('renders without crashing', () => {
//     renderWithRouter(<Teaser />);
//     expect(screen.getByText('Welcome to Ecorise')).toBeInTheDocument();
//   });

//   test('displays correct headings', () => {
//     renderWithRouter(<Teaser />);
    
//     expect(screen.getByRole('heading', { name: /welcome to ecorise/i })).toBeInTheDocument();
//     expect(screen.getByRole('heading', { name: /we connect you to the traders/i })).toBeInTheDocument();
//   });

//   test('contains navigation links', () => {
//     renderWithRouter(<Teaser />);
    
//     const loginLink = screen.getByRole('link', { name: /login/i });
//     const signupLink = screen.getByRole('link', { name: /create account/i });
    
//     expect(loginLink).toBeInTheDocument();
//     expect(signupLink).toBeInTheDocument();
//     expect(loginLink).toHaveAttribute('href', '/login');
//     expect(signupLink).toHaveAttribute('href', '/signup');
//   });

//   test('displays images with correct alt text', () => {
//     renderWithRouter(<Teaser />);
    
//     expect(screen.getByAltText('Clothing pile')).toBeInTheDocument();
//     expect(screen.getByAltText('Ecorise Logo')).toBeInTheDocument();
//   });
// });
