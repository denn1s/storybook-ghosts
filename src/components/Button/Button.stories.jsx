import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
}

export const Primary = {
  args: {
    children: 'Schedule a Viewing',
    variant: 'primary',
    size: 'md',
  },
}

export const Secondary = {
  args: {
    children: 'View Listings',
    variant: 'secondary',
    size: 'md',
  },
}

export const Ghost = {
  args: {
    children: 'Dismiss',
    variant: 'ghost',
    size: 'md',
  },
}

export const Danger = {
  args: {
    children: 'Cancel Closing',
    variant: 'danger',
    size: 'md',
  },
}

export const Small = {
  args: {
    children: 'Filter',
    variant: 'primary',
    size: 'sm',
  },
}

export const Large = {
  args: {
    children: 'Submit Disclosure',
    variant: 'primary',
    size: 'lg',
  },
}

export const Disabled = {
  args: {
    children: 'Unavailable',
    variant: 'primary',
    disabled: true,
  },
}

export const FullWidth = {
  args: {
    children: 'Schedule a Viewing',
    variant: 'primary',
    size: 'lg',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
}

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
}
