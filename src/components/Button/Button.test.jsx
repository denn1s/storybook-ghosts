import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  it('renders its children as the label', () => {
    render(<Button>Schedule a Viewing</Button>)
    expect(screen.getByRole('button', { name: /schedule a viewing/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click me</Button>)

    await userEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when the disabled prop is true', () => {
    render(<Button disabled>Unavailable</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('defaults to type="button" so it does not submit forms accidentally', () => {
    render(<Button>Cancel</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })
})
