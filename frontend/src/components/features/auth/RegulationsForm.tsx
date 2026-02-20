import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/Button";
import type { RegulationsFormData } from "@/schemas/regulationsSchema";
import { regulationsSchema } from "@/schemas/regulationsSchema";

interface RegulationsFormProps {
  onSubmit: () => Promise<void>;
  onBack: () => void;
  isSubmitting: boolean;
  authError: string | null;
  clearAuthError: () => void;
}

export default function RegulationsForm({
  onSubmit,
  onBack,
  isSubmitting,
  authError,
  clearAuthError,
}: RegulationsFormProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegulationsFormData>({
    resolver: zodResolver(regulationsSchema),
    mode: "onTouched",
  });

  const handleFormSubmit = async () => {
    await onSubmit();
  };

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
    >
      <div className="flex flex-col gap-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 size-4 accent-black dark:accent-white shrink-0"
            {...register("termsOfService")}
            onChange={(e) => {
              void register("termsOfService").onChange(e);
              clearAuthError();
            }}
          />
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {t("regulations.termsLabel")}{" "}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-black dark:text-white hover:underline"
            >
              {t("regulations.termsLink")}
            </a>
          </span>
        </label>
        {!!errors.termsOfService?.message && (
          <p className="text-sm text-destructive -mt-2 ml-7">
            {t(errors.termsOfService.message)}
          </p>
        )}

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 size-4 accent-black dark:accent-white shrink-0"
            {...register("privacyPolicy")}
            onChange={(e) => {
              void register("privacyPolicy").onChange(e);
              clearAuthError();
            }}
          />
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {t("regulations.privacyLabel")}{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-black dark:text-white hover:underline"
            >
              {t("regulations.privacyLink")}
            </a>
          </span>
        </label>
        {!!errors.privacyPolicy?.message && (
          <p className="text-sm text-destructive -mt-2 ml-7">
            {t(errors.privacyPolicy.message)}
          </p>
        )}
      </div>

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
              ? t("regulations.submitting")
              : t("regulations.submit")}
          </span>
          {!isSubmitting && (
            <CheckCircle
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
          <span>{t("regulations.backToLogin")}</span>
        </Button>
      </div>
    </form>
  );
}
