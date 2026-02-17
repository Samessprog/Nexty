import { Moon, Sun } from '@phosphor-icons/react'

import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="glass-panel dark:bg-zinc-800/70 dark:border-zinc-700 flex items-center justify-center size-8 rounded-full cursor-pointer shadow-sm hover:border-black/30 dark:hover:border-zinc-500 transition-colors"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun size={16} weight="bold" className="text-amber-400" />
      ) : (
        <Moon size={16} weight="bold" className="text-slate-600" />
      )}
    </button>
  )
}
