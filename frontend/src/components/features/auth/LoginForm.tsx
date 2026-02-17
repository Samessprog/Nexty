import { At, SignIn, WarningCircle } from '@phosphor-icons/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import OAuthButtons from '@/components/features/auth/OAuthButtons'
import RecaptchaNotice from '@/components/features/auth/RecaptchaNotice'
import { Button } from '@/components/ui/Button'
import FormInput from '@/components/ui/FormInput'
import PasswordInput from '@/components/ui/PasswordInput'
import { useLogin } from '@/hooks/useLogin'
import type { LoginFormData } from '@/schemas/loginSchema'
import { loginSchema } from '@/schemas/loginSchema'

export default function LoginForm() {
  const { t } = useTranslation()
  const { login, isSubmitting, authError, clearAuthError } = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password)
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
          icon={<At size={20} weight="bold" />}
          error={errors.email?.message ? t(errors.email.message) : undefined}
          {...register('email')}
          onFocus={clearAuthError}
        />

        <PasswordInput
          id="password"
          label={t('login.passwordLabel')}
          error={errors.password?.message ? t(errors.password.message) : undefined}
          {...register('password')}
          onFocus={clearAuthError}
          labelExtra={
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors underline decoration-muted-foreground/50 underline-offset-2 hover:decoration-foreground"
            >
              {t('login.forgotPassword')}
            </Link>
          }
        />

        {authError && (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            <WarningCircle size={18} weight="bold" className="shrink-0" />
            <span>{t(authError)}</span>
          </div>
        )}

        <div className="pt-2">
          <Button type="submit" className="w-full group" disabled={isSubmitting}>
            <span>{isSubmitting ? t('auth.signingIn') : t('login.submit')}</span>
            {!isSubmitting && (
              <SignIn
                size={18}
                weight="bold"
                className="group-hover:translate-x-0.5 transition-transform"
              />
            )}
          </Button>
        </div>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-input" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
            {t('login.divider')}
          </span>
        </div>
      </div>

      <OAuthButtons />
      <RecaptchaNotice />
    </>
  )
}
