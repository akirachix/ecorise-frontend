import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./index"; 
import { BrowserRouter } from "react-router-dom";
import { renderHook } from '@testing-library/react-hooks';

jest.mock('../utils/fetchEcoriseApi', () => ({
  fetchUsers: jest.fn(),
  fetchPickups: jest.fn(),
  fetchMarkets: jest.fn(),
  fetchRewards: jest.fn(),
  fetchProducts: jest.fn(),
  fetchPayment: jest.fn(),
}));

const {
  fetchUsers,
  fetchPickups,
  fetchMarkets,
  fetchRewards,
  fetchProducts,
  fetchPayment,
} = require('../utils/fetchEcoriseApi');

describe('ecorise hooks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('useUsers success', async () => {
    fetchUsers.mockResolvedValue([{ id: 1 }, { id: 2 }]);
    const { result, waitForNextUpdate } = renderHook(() => EcoriseHooks.useUsers());
    await waitForNextUpdate();
    expect(result.current.data).toEqual([{ id: 1 }, { id: 2 }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('useUsers error', async () => {
    fetchUsers.mockRejectedValue(new Error('User error'));
    const { result, waitForNextUpdate } = renderHook(() => EcoriseHooks.useUsers());
    await waitForNextUpdate();
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('User error');
  });

  test('usePickups success', async () => {
    fetchPickups.mockResolvedValue([{ id: 'a' }]);
    const { result, waitForNextUpdate } = renderHook(() => EcoriseHooks.usePickups());
    await waitForNextUpdate();
    expect(result.current.data).toEqual([{ id: 'a' }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('usePickups error', async () => {
    fetchPickups.mockRejectedValue(new Error('Pickup error'));
    const { result, waitForNextUpdate } = renderHook(() => EcoriseHooks.usePickups());
    await waitForNextUpdate();
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Pickup error');
  });

  test('useMarkets success', async () => {
    fetchMarkets.mockResolvedValue([{ id: 'm' }]);
    const { result, waitForNextUpdate } = renderHook(() => EcoriseHooks.useMarkets());
    await waitForNextUpdate();
    expect(result.current.data).toEqual([{ id: 'm' }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('useMarkets error', async () => {
    fetchMarkets.mockRejectedValue(new Error('Market error'));
    const { result, waitForNextUpdate } = renderHook(() => EcoriseHooks.useMarkets());
    await waitForNextUpdate();
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Market error');
  });

  test('useRewards success', async () => {
    fetchRewards.mockResolvedValue([{ id: 'r' }]);
    const { result, waitForNextUpdate } = renderHook(() => EcoriseHooks.useRewards());
    await waitForNextUpdate();
    expect(result.current.data).toEqual([{ id: 'r' }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('useRewards error', async () => {
    fetchRewards.mockRejectedValue(new Error('Reward error'));
    const { result, waitForNextUpdate } = renderHook(() => EcoriseHooks.useRewards());
    await waitForNextUpdate();
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Reward error');
  });

  test('useProducts success', async () => {
    fetchProducts.mockResolvedValue([{ id: 'p' }]);
    const { result, waitForNextUpdate } = renderHook(() => EcoriseHooks.useProducts());
    await waitForNextUpdate();
    expect(result.current.data).toEqual([{ id: 'p' }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('useProducts error', async () => {
    fetchProducts.mockRejectedValue(new Error('Product error'));
    const { result, waitForNextUpdate } = renderHook(() => EcoriseHooks.useProducts());
    await waitForNextUpdate();
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Product error');
  });

  test('usePayment success', async () => {
    fetchPayment.mockResolvedValue([{ id: 'pay' }]);
    const { result, waitForNextUpdate } = renderHook(() => EcoriseHooks.usePayment());
    await waitForNextUpdate();
    expect(result.current.data).toEqual([{ id: 'pay' }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('usePayment error', async () => {
    fetchPayment.mockRejectedValue(new Error('Payment error'));
    const { result, waitForNextUpdate } = renderHook(() => EcoriseHooks.usePayment());
    await waitForNextUpdate();
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Payment error');
  });
});


