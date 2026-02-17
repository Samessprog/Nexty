import type { ComponentProps, ReactNode } from 'react'

import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils'

interface FormInputProps extends ComponentProps<'input'> {
  label: string
  icon?: ReactNode
  trailing?: ReactNode
  labelExtra?: ReactNode
  error?: string
}

export default function FormInput({
  label,
  icon,
  trailing,
  labelExtra,
  id,
  error,
  className,
  ...inputProps
}: FormInputProps) {
  const errorId = id ? `${id}-error` : undefined

  return (
    <div className="space-y-1.5">
      {labelExtra && (
        <div className="flex items-center justify-end">{labelExtra}</div>
      )}

      <div className="relative">
        <Input
          id={id}
          className={cn(
            icon && !trailing && 'pr-10',
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
          placeholder=" "
        />

        <Label
          htmlFor={id}
          className={cn(
            'absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-200 ease-out origin-[0]',
            'peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:scale-75',
            'peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:scale-75',
            error
              ? 'text-destructive peer-focus:text-destructive'
              : 'text-muted-foreground peer-focus:text-foreground',
          )}
        >
          {label}
        </Label>

        {icon && !trailing ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </div>
        ) : null}
        {trailing}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-xs text-destructive font-mono">
          {error}
        </p>
      ) : null}
    </div>
  )
}
