import type { InputHTMLAttributes, ReactNode } from 'react'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
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
  ...inputProps
}: FormInputProps) {
  const errorId = id ? `${id}-error` : undefined

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono"
          htmlFor={id}
        >
          {label}
        </label>
        {labelExtra}
      </div>
      <div className="relative">
        <input
          id={id}
          className={`w-full h-12 px-4 bg-white dark:bg-zinc-800 border rounded text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all shadow-sm font-mono tracking-tight ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/10'
              : 'border-slate-200 dark:border-zinc-700 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black/10 dark:focus:ring-white/10'
          }`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />
        {icon && !trailing ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
            {icon}
          </div>
        ) : null}
        {trailing}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-xs text-red-600 dark:text-red-400 font-mono">
          {error}
        </p>
      ) : null}
    </div>
  )
}
