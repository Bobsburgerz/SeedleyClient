import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Billing from '../components/Billing'; // Adjust the path according to your file structure

const mockStore = configureStore([]);

describe('Billing Component', () => {
  let store;
  let mock;

  beforeEach(() => {
    store = mockStore({
      user: {
        credits: 5000, // $50.00
        usage: 2500, // $25.00
        customer: 'cus_test'
      }
    });

    mock = new MockAdapter(axios);
    mock.onGet('/api/billing-details/cus_test').reply(200, {
      next_payment_date: '2023-12-01',
      amount_due: 1999 // $19.99
    });
  });

  afterEach(() => {
    mock.reset();
  });

  it('should display billing details', async () => {
    render(
      <Provider store={store}>
        <Billing />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/next payment date/i)).toBeInTheDocument();
      expect(screen.getByText(/amount due/i)).toBeInTheDocument();
      expect(screen.getByText('$19.99')).toBeInTheDocument();
    });
  });
});
