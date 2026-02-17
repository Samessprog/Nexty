import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import LoginForm from '@/components/features/auth/LoginForm'
import DesignPanel from '@/components/layout/DesignPanel'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import MaterialIcon from '@/components/ui/MaterialIcon'

export default function LoginPage() {
  const { t } = useTranslation()

  return (
    <div className="h-screen overflow-hidden flex">
      <DesignPanel />

      <div className="w-full lg:w-1/2 bg-white h-full overflow-y-auto relative flex flex-col">
        <div className="absolute top-6 right-8 z-20">
          <LanguageSwitcher />
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-20 xl:px-32 max-w-3xl mx-auto w-full py-12">
          <div className="lg:hidden flex items-center gap-2 mb-10 text-slate-900">
            <div className="size-6 bg-black text-white rounded flex items-center justify-center">
              <MaterialIcon name="hub" className="text-[16px]" />
            </div>
            <span className="font-bold tracking-tight font-mono" data-testid="mobile-logo">
              {t('brand.name')}
            </span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 font-mono">
              {t('login.heading')}
            </h2>
            <p className="text-slate-500 text-sm">{t('login.subheading')}</p>
          </div>

          <LoginForm />
        </div>

        <div className="bg-slate-50 border-t border-slate-100 py-4 text-center">
          <p className="text-sm text-slate-600">
            {t('login.newUser')}{' '}
            <Link
              to="/register"
              className="font-bold text-black hover:text-zinc-700 transition-colors"
            >
              {t('login.requestAccess')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
