// AssistModal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
 
import AssistModal from '../components/AssistantComponents/Modals/AssistantModal';
import { withProvider } from './mockStore';
describe('AssistModal', () => {
  const mockOnClose = jest.fn();
  const mockAddAssistant = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockAddAssistant.mockClear();
  });

  test('renders correctly', () => {
    render(<AssistModal onClose={mockOnClose} addAssistant={mockAddAssistant} />);
    expect(screen.getByText('Choose your assistant')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(<AssistModal onClose={mockOnClose} addAssistant={mockAddAssistant} />);
    fireEvent.click(screen.getByText('x'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls addAssistant when start from scratch button is clicked', () => {
    render(<AssistModal onClose={mockOnClose} addAssistant={mockAddAssistant} />);
    fireEvent.click(screen.getByText('start from scratch'));
    expect(mockAddAssistant).toHaveBeenCalledTimes(1);
  });
});
