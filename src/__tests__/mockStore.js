import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// Create a mock reducer (you can add more logic as needed)
const mockReducer = (state = {}, action) => state;

export const store = configureStore({
  reducer: {
    mock: mockReducer
  }
});

export const withProvider = (component) => (
  <Provider store={store}>
    {component}
  </Provider>
);

// Simple test case to ensure this file is recognized as a test suite
describe('Mock Store Setup', () => {
  it('should provide the store to the component', () => {
    const TestComponent = () => <div>Test Component</div>;
    const { getByText } = render(withProvider(<TestComponent />));
    expect(getByText('Test Component')).toBeInTheDocument();
  });
});
