import { useTranslation } from 'react-i18next'

import GoogleIcon from '@/components/ui/GoogleIcon'
import LinkedInIcon from '@/components/ui/LinkedInIcon'

export default function OAuthButtons() {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        className="flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 group"
      >
        <GoogleIcon />
        <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 font-mono">
          {t('login.google')}
        </span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 group"
      >
        <LinkedInIcon />
        <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 font-mono">
          {t('login.linkedin')}
        </span>
      </button>
    </div>
  )
}
