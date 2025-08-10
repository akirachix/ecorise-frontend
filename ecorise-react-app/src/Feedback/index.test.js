import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Feedback from './index';

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
      feedback: [],
      loading: true,
      error: null,
    });
    render(<Feedback />);
    expect(screen.getByText(/Loading feedback.../i)).toBeInTheDocument();
  });

  test('shows error message', () => {
    useFeedback.mockReturnValue({
      feedback: [],
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
        user_type: 'user',
        created_at: '2025-07-26T00:00:00Z',
        feedback: 'Great service!',
        user: 'Salma Fred',
      },
      {
        feedback_id: '2',
        user_type: 'user',
        created_at: '2025-07-27T00:00:00Z',
        feedback: 'Could be better.',
        user: 'Jane Rambo',
      },
    ];
    useFeedback.mockReturnValue({
      feedback: feedbackData,
      loading: false,
      error: null,
    });
    render(<Feedback />);
    expect(screen.getByRole('heading', { name: /Feedback/i })).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getAllByText('user')).toHaveLength(2);
    expect(screen.getByText(new Date('2025-07-26T00:00:00Z').toLocaleDateString())).toBeInTheDocument();
    expect(screen.getByText(new Date('2025-07-27T00:00:00Z').toLocaleDateString())).toBeInTheDocument();
    expect(screen.getByText('Great service!')).toBeInTheDocument();
    expect(screen.getByText('Could be better.')).toBeInTheDocument();
    expect(screen.getByText('Salma Fred')).toBeInTheDocument();
    expect(screen.getByText('Jane Rambo')).toBeInTheDocument();
  });
});