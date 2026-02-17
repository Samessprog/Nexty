import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

function Label({ className, ...props }: ComponentProps<'label'>) {
  return (
    <label
      className={cn(
        'text-xs font-semibold uppercase tracking-wider font-mono pointer-events-none',
        className,
      )}
      {...props}
    />
  )
}

export { Label }
