import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import CatFact from '../components/CatFact';

jest.mock('axios');

describe('CatFact Component', () => {
  test('displays a cat fact when fetched successfully', async () => {
    
    const catFact = 'Cats have five toes on their front paws but only four on the back ones.';
    axios.get.mockResolvedValue({ data: { fact: catFact } });

    // Act
    render(<CatFact />);

    // Assert
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(catFact)).toBeInTheDocument();
    });
  });

  test('displays an error message if the fetch fails', async () => {

    axios.get.mockRejectedValue(new Error('Network Error'));

    render(<CatFact />);
    
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Error fetching fact/i)).toBeInTheDocument();
    });
  });
});
