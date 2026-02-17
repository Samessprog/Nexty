import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import LoginForm from '@/components/features/auth/LoginForm'
import TestWrapper from '@/test/TestI18nProvider'

describe('LoginForm', () => {
  it('renders email and password inputs', () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>,
    )
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>,
    )
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('renders OAuth buttons', () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>,
    )
    expect(screen.getByText('Google Workspace')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn OIDC')).toBeInTheDocument()
  })

  it('handles controlled input changes', async () => {
    const user = userEvent.setup()
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>,
    )

    const emailInput = screen.getByLabelText('Email Address')
    await user.type(emailInput, 'test@example.com')
    expect(emailInput).toHaveValue('test@example.com')

    const passwordInput = screen.getByLabelText('Password')
    await user.type(passwordInput, 'secret123')
    expect(passwordInput).toHaveValue('secret123')
  })

  describe('validation', () => {
    it('shows required errors when submitting empty fields', async () => {
      const user = userEvent.setup()
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>,
      )

      await user.click(screen.getByRole('button', { name: /login/i }))

      await waitFor(() => {
        expect(screen.getByText('Email address is required')).toBeInTheDocument()
        expect(screen.getByText('Password is required')).toBeInTheDocument()
      })
    })

    it('shows email error for invalid email format', async () => {
      const user = userEvent.setup()
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>,
      )

      const emailInput = screen.getByLabelText('Email Address')
      await user.type(emailInput, 'not-an-email')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
      })
    })

    it('shows min length error for short password', async () => {
      const user = userEvent.setup()
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>,
      )

      const passwordInput = screen.getByLabelText('Password')
      await user.type(passwordInput, 'Aa1!')
      await user.tab()

      await waitFor(() => {
        expect(
          screen.getByText('Password must be at least 8 characters'),
        ).toBeInTheDocument()
      })
    })

    it('shows uppercase error when password lacks uppercase', async () => {
      const user = userEvent.setup()
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>,
      )

      const passwordInput = screen.getByLabelText('Password')
      await user.type(passwordInput, 'weakpass1!')
      await user.tab()

      await waitFor(() => {
        expect(
          screen.getByText('Password must contain at least one uppercase letter'),
        ).toBeInTheDocument()
      })
    })

    it('shows no errors with valid data', async () => {
      const user = userEvent.setup()
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>,
      )

      await user.type(screen.getByLabelText('Email Address'), 'user@example.com')
      await user.type(screen.getByLabelText('Password'), 'StrongP@ss1')
      await user.click(screen.getByRole('button', { name: /login/i }))

      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })

    it('clears error when user corrects input', async () => {
      const user = userEvent.setup()
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>,
      )

      const emailInput = screen.getByLabelText('Email Address')
      await user.type(emailInput, 'bad')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
      })

      await user.clear(emailInput)
      await user.type(emailInput, 'user@example.com')

      await waitFor(() => {
        expect(
          screen.queryByText('Please enter a valid email address'),
        ).not.toBeInTheDocument()
      })
    })
  })
})
