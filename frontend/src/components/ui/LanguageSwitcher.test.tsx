import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import TestWrapper, { testI18n } from '@/test/TestI18nProvider'

describe('LanguageSwitcher', () => {
  it('renders the language toggle button', () => {
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>,
    )
    expect(screen.getByRole('button', { name: 'Switch language' })).toBeInTheDocument()
    expect(screen.getByText('PL / EN')).toBeInTheDocument()
  })

  it('switches language on click', async () => {
    const user = userEvent.setup()
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>,
    )

    expect(testI18n.language).toBe('en')

    await user.click(screen.getByRole('button', { name: 'Switch language' }))
    expect(testI18n.language).toBe('pl')

    await user.click(screen.getByRole('button', { name: 'Switch language' }))
    expect(testI18n.language).toBe('en')
  })
})
