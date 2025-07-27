import React from 'react';
import { render, screen } from '@testing-library/react';
import Feedback from './Feedback';


jest.mock('../hooks/useFetchFeedback', () => ({
  useFeedback: jest.fn(),
}));

import { useFeedback } from '../hooks/useFetchFeedback';

describe('Feedback component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('shows loading state', () => {
    useFeedback.mockReturnValue({
      feedback: null,
      loading: true,
      error: null,
    });

    render(<Feedback />);

    expect(screen.getByText(/Loading feedback.../i)).toBeInTheDocument();
  });

  test('shows error message', () => {
    useFeedback.mockReturnValue({
      feedback: null,
      loading: false,
      error: 'Failed to fetch',
    });

    render(<Feedback />);

    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
  });

  test('shows no feedback message if empty array', () => {
    useFeedback.mockReturnValue({
      feedback: [],
      loading: false,
      error: null,
    });

    render(<Feedback />);

    expect(screen.getByText(/No feedback available./i)).toBeInTheDocument();
  });

  test('shows feedback table with data', () => {
    const feedbackData = [
      {
        feedback_id: '1',
        user_type: 'admin',
        created_at: '2022-01-01T12:00:00Z',
        feedback: 'Great service!',
        user: 'John Doe',
      },
      {
        feedback_id: '2',
        user_type: 'user',
        created_at: '2022-02-15T08:30:00Z',
        feedback: 'Could be better.',
        user: 'Jane Smith',
      },
    ];

    useFeedback.mockReturnValue({
      feedback: feedbackData,
      loading: false,
      error: null,
    });

    render(<Feedback />);

   
    expect(screen.getByRole('heading', { name: /Feedback List/i })).toBeInTheDocument();

  
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

   
    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByText('user')).toBeInTheDocument();

    
    expect(screen.getByText(new Date('2022-01-01T12:00:00Z').toLocaleDateString())).toBeInTheDocument();
    expect(screen.getByText(new Date('2022-02-15T08:30:00Z').toLocaleDateString())).toBeInTheDocument();

   
    expect(screen.getByText('Great service!')).toBeInTheDocument();
    expect(screen.getByText('Could be better.')).toBeInTheDocument();

    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
});
