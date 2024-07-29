// src/__tests__/mockStore.js
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

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
