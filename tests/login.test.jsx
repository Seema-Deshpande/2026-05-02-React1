import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Login from '../src/pages/Auth/Login';

describe('Login Component', () => {
  // Test 1: Render test — confirm email, password fields and submit button are present
  it('renders the login form fields', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  // Test 2: Input capture test — typed values are reflected in controlled inputs
  it('reflects typed values in email and password inputs', async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'jane@example.com');
    await user.type(passwordInput, 'secret123');

    expect(emailInput).toHaveValue('jane@example.com');
    expect(passwordInput).toHaveValue('secret123');
  });

  // Test 3: Successful submission test — form submits correct email and password
  it('logs email and password on submit', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const user = userEvent.setup();

    render(<Login />);
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/password/i), 'secret123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(logSpy).toHaveBeenCalledWith('Email:', 'jane@example.com');
    expect(logSpy).toHaveBeenCalledWith('Password:', 'secret123');

    logSpy.mockRestore();
    alertSpy.mockRestore();
  });
});
