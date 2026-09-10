
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AICopilot from './AICopilot';
import axios from 'axios';

jest.mock('axios');

describe('AICopilot Component', () => {
  test('renders floating launcher button', () => {
    render(<AICopilot />);
    const launcher = screen.getByRole('button', { name: /kite ai/i });
    expect(launcher).toBeInTheDocument();
  });

  test('opens drawer when launcher is clicked', () => {
    render(<AICopilot />);
    const launcher = screen.getByRole('button', { name: /kite ai/i });
    fireEvent.click(launcher);

    expect(screen.getByText('Kite AI Copilot')).toBeInTheDocument();
    expect(screen.getByText(/suggested inquiries/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ask about portfolio/i)).toBeInTheDocument();
  });

  test('sends message and displays AI reply', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        reply: 'Your portfolio is up by 12%!',
        portfolioStats: { healthScore: 90 },
      },
    });

    render(<AICopilot />);
    const launcher = screen.getByRole('button', { name: /kite ai/i });
    fireEvent.click(launcher);

    const input = screen.getByPlaceholderText(/ask about portfolio/i);
    const sendButton = screen.getByTitle('Send message');

    fireEvent.change(input, { target: { value: 'How is my portfolio?' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Your portfolio is up by 12%!')).toBeInTheDocument();
    });
  });
});
