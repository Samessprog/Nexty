import { Eye, EyeSlash } from "@phosphor-icons/react";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import FormInput from "@/components/ui/FormInput";

interface PasswordInputProps extends ComponentProps<"input"> {
  label: string;
  labelExtra?: ReactNode;
  error?: string;
}

export default function PasswordInput({
  label,
  labelExtra,
  error,
  ...inputProps
}: PasswordInputProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  return (
    <FormInput
      label={label}
      labelExtra={labelExtra}
      error={error}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          onClick={() => setVisible((v) => !v)}
          aria-label={
            visible ? t("login.hidePassword") : t("login.showPassword")
          }
        >
          {visible ? (
            <Eye size={20} weight="bold" />
          ) : (
            <EyeSlash size={20} weight="bold" />
          )}
        </button>
      }
      {...inputProps}
    />
  );
}
