import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import OAuthButtons from '@/components/features/auth/OAuthButtons'
import RecaptchaNotice from '@/components/features/auth/RecaptchaNotice'
import FormInput from '@/components/ui/FormInput'
import MaterialIcon from '@/components/ui/MaterialIcon'
import PasswordInput from '@/components/ui/PasswordInput'
import type { LoginFormData } from '@/schemas/loginSchema'
import { loginSchema } from '@/schemas/loginSchema'

export default function LoginForm() {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  })

  const onSubmit = (_data: LoginFormData) => {
    // TODO: send to API
  }

  return (
    <>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      >
        <FormInput
          id="email"
          label={t('login.emailLabel')}
          type="email"
          placeholder={t('login.emailPlaceholder')}
          icon="alternate_email"
          error={errors.email?.message ? t(errors.email.message) : undefined}
          {...register('email')}
        />

        <PasswordInput
          id="password"
          label={t('login.passwordLabel')}
          placeholder={t('login.passwordPlaceholder')}
          error={errors.password?.message ? t(errors.password.message) : undefined}
          {...register('password')}
          labelExtra={
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-slate-500 hover:text-black transition-colors underline decoration-slate-300 underline-offset-2 hover:decoration-black"
            >
              {t('login.forgotPassword')}
            </Link>
          }
        />

        <div className="pt-2">
          <button
            type="submit"
            className="w-full h-12 bg-[#000000] hover:bg-zinc-800 text-white text-sm font-bold uppercase tracking-wide rounded-md shadow-md hover:shadow-lg hover:shadow-zinc-900/20 transition-all duration-200 flex items-center justify-center gap-2 group font-mono"
          >
            <span>{t('login.submit')}</span>
            <MaterialIcon
              name="lock_open"
              className="text-[18px] group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-xs font-medium text-slate-400 uppercase tracking-wider font-mono">
            {t('login.divider')}
          </span>
        </div>
      </div>

      <OAuthButtons />
      <RecaptchaNotice />
    </>
  )
}
