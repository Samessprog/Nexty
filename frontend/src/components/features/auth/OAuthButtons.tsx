import { useTranslation } from 'react-i18next'

import GoogleIcon from '@/components/ui/GoogleIcon'
import LinkedInIcon from '@/components/ui/LinkedInIcon'

export default function OAuthButtons() {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        className="flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-200 dark:border-zinc-700 rounded hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-slate-300 dark:hover:border-zinc-600 transition-all duration-200 group cursor-pointer"
      >
        <GoogleIcon />
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white font-mono">
          {t('login.google')}
        </span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-200 dark:border-zinc-700 rounded hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-slate-300 dark:hover:border-zinc-600 transition-all duration-200 group cursor-pointer"
      >
        <LinkedInIcon />
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white font-mono">
          {t('login.linkedin')}
        </span>
      </button>
    </div>
  )
}
