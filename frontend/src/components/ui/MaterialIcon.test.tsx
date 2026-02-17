import { render, screen } from '@testing-library/react'

import MaterialIcon from '@/components/ui/MaterialIcon'

describe('MaterialIcon', () => {
  it('renders the icon name as text content', () => {
    render(<MaterialIcon name="hub" />)
    expect(screen.getByText('hub')).toBeInTheDocument()
  })

  it('has aria-hidden attribute', () => {
    render(<MaterialIcon name="hub" />)
    expect(screen.getByText('hub')).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies custom className', () => {
    render(<MaterialIcon name="hub" className="text-[20px]" />)
    const el = screen.getByText('hub')
    expect(el.className).toContain('text-[20px]')
    expect(el.className).toContain('material-symbols-outlined')
  })
})
