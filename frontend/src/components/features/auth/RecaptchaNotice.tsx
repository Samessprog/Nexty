import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function RecaptchaNotice() {
  const { t } = useTranslation()

  return (
    <div className="mt-10 text-center">
      <p className="text-xs text-slate-400 dark:text-slate-500">
        {t('login.recaptcha')}{' '}
        <Link to="/privacy" className="underline hover:text-slate-600 dark:hover:text-slate-300">
          {t('login.privacyPolicy')}
        </Link>{' '}
        and{' '}
        <Link to="/terms" className="underline hover:text-slate-600 dark:hover:text-slate-300">
          {t('login.termsOfService')}
        </Link>
        .
      </p>
    </div>
  )
}
