import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, LockKey, WarningCircle } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/Button";
import PasswordInput from "@/components/ui/PasswordInput";
import type { NewPasswordFormData } from "@/schemas/newPasswordSchema";
import { newPasswordSchema } from "@/schemas/newPasswordSchema";

interface NewPasswordFormProps {
  onSubmit: (newPassword: string) => Promise<void>;
  onBack: () => void;
  isSubmitting: boolean;
  authError: string | null;
  clearAuthError: () => void;
}

export default function NewPasswordForm({
  onSubmit,
  onBack,
  isSubmitting,
  authError,
  clearAuthError,
}: NewPasswordFormProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
    mode: "onTouched",
  });

  const handleFormSubmit = async (data: NewPasswordFormData) => {
    await onSubmit(data.newPassword);
  };

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
    >
      <PasswordInput
        id="newPassword"
        label={t("newPassword.newPasswordLabel")}
        error={
          errors.newPassword?.message
            ? t(errors.newPassword.message)
            : undefined
        }
        {...register("newPassword")}
        onFocus={clearAuthError}
      />

      <PasswordInput
        id="confirmPassword"
        label={t("newPassword.confirmPasswordLabel")}
        error={
          errors.confirmPassword?.message
            ? t(errors.confirmPassword.message)
            : undefined
        }
        {...register("confirmPassword")}
        onFocus={clearAuthError}
      />

      {!!authError && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          <WarningCircle size={18} weight="bold" className="shrink-0" />
          <span>{t(authError)}</span>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-2">
        <Button type="submit" className="w-full group" disabled={isSubmitting}>
          <span>
            {isSubmitting
              ? t("newPassword.submitting")
              : t("newPassword.submit")}
          </span>
          {!isSubmitting && (
            <LockKey
              size={18}
              weight="bold"
              className="group-hover:translate-x-0.5 transition-transform"
            />
          )}
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={onBack}
          disabled={isSubmitting}
        >
          <ArrowLeft size={18} weight="bold" />
          <span>{t("newPassword.backToLogin")}</span>
        </Button>
      </div>
    </form>
  );
}
