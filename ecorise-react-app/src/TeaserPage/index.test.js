import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Teaser from './Teaser'; 


jest.mock('./index.css', () => ({}));

// Mock react-router-dom Link component for testing
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ to, children, className, ...props }) => (
    <a 
      href={to} 
      data-testid={`link-to-${to}`} 
      className={className}
      {...props}
    >
      {children}
    </a>
  ),
}));

describe('Teaser Component', () => {
  // Helper function to render component with router context
  const renderWithRouter = (component, { initialEntries = ['/'] } = {}) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        {component}
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders teaser container and image side', () => {
    renderWithRouter(<Teaser />);
    
    const teaserContainer = screen.getByRole('region', { name: /teaser-container/i });
    expect(teaserContainer).toBeInTheDocument();

    const teaserImage = screen.getByAltText(/Clothing pile/i);
    expect(teaserImage).toBeInTheDocument();
    expect(teaserImage).toHaveAttribute('src', '/Images/clothe.png');
  });

  test('renders teaser content with logo and text', () => {
    renderWithRouter(<Teaser />);
    
    const logo = screen.getByAltText(/Ecorise Logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/Images/logo.png');

    const heading = screen.getByRole('heading', { name: /Welcome to Ecorise/i });
    expect(heading).toBeInTheDocument();

    const subheading = screen.getByRole('heading', { name: /We connect you to the traders/i });
    expect(subheading).toBeInTheDocument();
  });

  test('renders navigation buttons with correct links', () => {
    renderWithRouter(<Teaser />);
    
    const loginLink = screen.getByTestId('link-to-/login');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveTextContent('Login');
    expect(loginLink).toHaveAttribute('href', '/login');

    const signupLink = screen.getByTestId('link-to-/signup');
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveTextContent('Create Account');
    expect(signupLink).toHaveAttribute('href', '/signup');
  });

  test('applies correct CSS classes', () => {
    renderWithRouter(<Teaser />);
    
    const teaserContainer = screen.getByRole('region', { name: /teaser-container/i });
    expect(teaserContainer).toHaveClass('teaser-container');

    const teaserImage = screen.getByAltText(/Clothing pile/i);
    expect(teaserImage).toHaveClass('teaser-image');

    const teaserLogo = screen.getByAltText(/Ecorise Logo/i);
    expect(teaserLogo).toHaveClass('teaser-logo');

    const loginButton = screen.getByTestId('link-to-/login');
    expect(loginButton).toHaveClass('teaser-btn teaser-btn-login');

    const signupButton = screen.getByTestId('link-to-/signup');
    expect(signupButton).toHaveClass('teaser-btn teaser-btn-create');
  });

  test('handles missing images gracefully', () => {
    renderWithRouter(<Teaser />);
    
    const images = screen.getAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
      expect(img).toHaveAttribute('src');
    });
  });

  test('has proper accessibility attributes', () => {
    renderWithRouter(<Teaser />);
    
    const container = screen.getByRole('region');
    expect(container).toHaveAttribute('aria-label', 'teaser-container');
    
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });
});
