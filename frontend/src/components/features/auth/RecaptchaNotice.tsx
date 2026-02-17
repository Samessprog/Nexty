import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function RecaptchaNotice() {
  const { t } = useTranslation()

  return (
    <div className="mt-10 text-center">
      <p className="text-xs text-slate-400">
        {t('login.recaptcha')}{' '}
        <Link to="/privacy" className="underline hover:text-slate-600">
          {t('login.privacyPolicy')}
        </Link>{' '}
        and{' '}
        <Link to="/terms" className="underline hover:text-slate-600">
          {t('login.termsOfService')}
        </Link>
        .
      </p>
    </div>
  )
}
