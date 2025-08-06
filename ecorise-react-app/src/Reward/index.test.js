import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Rewards from '../Reward';


jest.mock('../hooks/useFetchRewards', () => ({
  useRewards: jest.fn(),
}));

import { useRewards } from '../hooks/useFetchRewards';

describe('Rewards component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading initially', () => {
    useRewards.mockReturnValue({
      rewards: [],
      loading: true,
      error: null,
    });

    render(<Rewards />);
    expect(screen.getByText(/loading rewards/i)).toBeInTheDocument();
  });

  test('displays error message', () => {
    useRewards.mockReturnValue({
      rewards: [],
      loading: false,
      error: 'Failed to fetch rewards',
    });

    render(<Rewards />);
    expect(screen.getByText(/error: failed to fetch rewards/i)).toBeInTheDocument();
  });

  test('displays empty message when no rewards', () => {
    useRewards.mockReturnValue({
      rewards: [],
      loading: false,
      error: null,
    });

    render(<Rewards />);
    expect(screen.getByText(/no rewards available/i)).toBeInTheDocument();
  });

  test('renders rewards and paginates correctly', async () => {
    const mockRewards = [
      { reward_id: 1, rewards: 'Reward A', rewards_at: '2023-07-01', user: 'User1', recycled_clothes: 10 },
      { reward_id: 2, rewards: 'Reward B', rewards_at: '2023-07-02', user: 'User2', recycled_clothes: 5 },
      { reward_id: 3, rewards: 'Reward C', rewards_at: '2023-07-03', user: 'User3', recycled_clothes: 8 },
      { reward_id: 4, rewards: 'Reward D', rewards_at: '2023-07-04', user: 'User4', recycled_clothes: 3 },
      { reward_id: 5, rewards: 'Reward E', rewards_at: '2023-07-05', user: 'User5', recycled_clothes: 12 },
      { reward_id: 6, rewards: 'Reward F', rewards_at: '2023-07-06', user: 'User6', recycled_clothes: 7 },
    ];

    useRewards.mockReturnValue({
      rewards: mockRewards,
      loading: false,
      error: null,
    });

    render(<Rewards />);

    
    mockRewards.slice(0, 5).forEach(r => {
      expect(screen.getByText(r.rewards)).toBeInTheDocument();
    });
   
    expect(screen.queryByText('Reward F')).not.toBeInTheDocument();

    
    expect(screen.getByRole('button', { name: /previous page/i })).toBeDisabled();

    expect(screen.getByRole('button', { name: /next page/i })).toBeEnabled();

    
    fireEvent.click(screen.getByRole('button', { name: /next page/i }));

    await waitFor(() => {
    
      expect(screen.getByText('Reward F')).toBeInTheDocument();
    
      expect(screen.queryByText('Reward A')).not.toBeInTheDocument();
    });

    
    expect(screen.getByRole('button', { name: /next page/i })).toBeDisabled();

   
    expect(screen.getByRole('button', { name: /previous page/i })).toBeEnabled();
  });

  test('changes rows per page properly', () => {
    const mockRewards = new Array(12).fill(null).map((_, i) => ({
      reward_id: i + 1,
      rewards: `Reward ${i + 1}`,
      rewards_at: '2023-07-01',
      user: `User${i + 1}`,
      recycled_clothes: i * 2,
    }));

    useRewards.mockReturnValue({
      rewards: mockRewards,
      loading: false,
      error: null,
    });

    render(<Rewards />);

    
    expect(screen.getByText(/page 1 of 3/i)).toBeInTheDocument();

   
    fireEvent.change(screen.getByLabelText(/rows per page/i), { target: { value: '10' } });

   
    expect(screen.getByText(/page 1 of 2/i)).toBeInTheDocument();
  });
});
