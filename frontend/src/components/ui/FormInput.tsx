import type { InputHTMLAttributes, ReactNode } from 'react'

import MaterialIcon from '@/components/ui/MaterialIcon'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: string
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
  ...inputProps
}: FormInputProps) {
  const errorId = id ? `${id}-error` : undefined

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono"
          htmlFor={id}
        >
          {label}
        </label>
        {labelExtra}
      </div>
      <div className="relative">
        <input
          id={id}
          className={`w-full h-12 px-4 bg-white border rounded text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all shadow-sm font-mono tracking-tight ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/10'
              : 'border-slate-200 focus:border-black focus:ring-1 focus:ring-black/10'
          }`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />
        {icon && !trailing ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <MaterialIcon name={icon} className="text-[20px]" />
          </div>
        ) : null}
        {trailing}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-xs text-red-600 font-mono">
          {error}
        </p>
      ) : null}
    </div>
  )
}
