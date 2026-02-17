import { render, screen } from '@testing-library/react'

import LoginPage from '@/pages/LoginPage'
import TestWrapper from '@/test/TestI18nProvider'

vi.mock('@/hooks/useLogin', () => ({
  useLogin: () => ({
    login: vi.fn(),
    isSubmitting: false,
    authError: null,
    clearAuthError: vi.fn(),
  }),
}))

describe('LoginPage', () => {
  it('renders the full login page', () => {
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    )
    expect(screen.getAllByText('KZN Nexus').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/initialize your continuous improvement/i)).toBeInTheDocument()
  })

  it('renders the design panel with hidden class for mobile', () => {
    const { container } = render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    )
    const designPanel = container.querySelector('.abstract-bg')
    expect(designPanel).toBeInTheDocument()
    expect(designPanel?.className).toContain('hidden')
    expect(designPanel?.className).toContain('lg:flex')
  })

  it('renders footer with register link', () => {
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    )
    expect(screen.getByText('New to KZN Nexus?')).toBeInTheDocument()
    expect(screen.getByText('Request Access')).toBeInTheDocument()
  })

  it('renders the language switcher', () => {
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    )
    expect(screen.getByRole('button', { name: 'Switch language' })).toBeInTheDocument()
  })
})
