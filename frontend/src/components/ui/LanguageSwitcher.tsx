import { useTranslation } from 'react-i18next'

import MaterialIcon from '@/components/ui/MaterialIcon'

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
      className="glass-panel flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-black transition-colors hover:border-black/30 cursor-pointer shadow-sm"
      aria-label="Switch language"
    >
      <MaterialIcon name="language" className="text-[16px]" />
      <span>PL / EN</span>
      <MaterialIcon name="expand_more" className="text-[14px]" />
    </button>
  )
}
