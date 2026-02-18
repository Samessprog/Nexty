import { Hexagon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import LoginForm from "@/components/features/auth/LoginForm";
import NewPasswordForm from "@/components/features/auth/NewPasswordForm";
import DesignPanel from "@/components/layout/DesignPanel";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const { t } = useTranslation();
  const {
    login,
    submitNewPassword,
    isSubmitting,
    authError,
    clearAuthError,
    challengeStep,
    resetChallenge,
  } = useLogin();

  const isNewPasswordChallenge =
    challengeStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED";

  return (
    <div className="h-screen overflow-hidden flex">
      <DesignPanel />

      <div className="w-full lg:w-1/2 bg-white dark:bg-zinc-900 h-full overflow-y-auto relative flex flex-col">
        <div className="absolute top-6 right-8 z-20 flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-20 xl:px-32 max-w-3xl mx-auto w-full py-12">
          <div className="lg:hidden flex items-center gap-2 mb-10 text-slate-900 dark:text-white">
            <div className="size-6 bg-black dark:bg-white text-white dark:text-black rounded flex items-center justify-center">
              <Hexagon size={16} weight="bold" />
            </div>
            <span
              className="font-bold tracking-tight font-mono"
              data-testid="mobile-logo"
            >
              {t("brand.name")}
            </span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2 font-mono">
              {isNewPasswordChallenge
                ? t("newPassword.heading")
                : t("login.heading")}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {isNewPasswordChallenge
                ? t("newPassword.subheading")
                : t("login.subheading")}
            </p>
          </div>

          {isNewPasswordChallenge ? (
            <NewPasswordForm
              onSubmit={submitNewPassword}
              onBack={resetChallenge}
              isSubmitting={isSubmitting}
              authError={authError}
              clearAuthError={clearAuthError}
            />
          ) : (
            <LoginForm
              onSubmit={login}
              isSubmitting={isSubmitting}
              authError={authError}
              clearAuthError={clearAuthError}
            />
          )}
        </div>

        <div className="bg-slate-50 dark:bg-zinc-800 border-t border-slate-100 dark:border-zinc-700 py-4 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {t("login.newUser")}{" "}
            <Link
              to="/register"
              className="font-bold text-black dark:text-white hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              {t("login.requestAccess")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
