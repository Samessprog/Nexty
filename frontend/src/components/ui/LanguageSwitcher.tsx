import { CaretDown, Globe } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggle = () => {
    const next = i18n.language === 'pl' ? 'en' : 'pl'
    void i18n.changeLanguage(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="glass-panel dark:bg-zinc-800/70 dark:border-zinc-700 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors hover:border-black/30 dark:hover:border-zinc-500 cursor-pointer shadow-sm"
      aria-label="Switch language"
    >
      <Globe size={16} weight="bold" />
      <span>PL / EN</span>
      <CaretDown size={14} weight="bold" />
    </button>
  )
}
