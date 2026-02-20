import { CaretDown, Check, Globe } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "pl", label: "Polski" },
  { code: "de", label: "Deutsch" },
] as const;

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = i18n.language?.split("-")[0] ?? "en";

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const selectLanguage = (code: string) => {
    void i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="glass-panel dark:bg-popover/70 dark:border-border flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer shadow-sm"
        aria-label="Switch language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe size={16} weight="bold" />
        <span>{currentLang.toUpperCase()}</span>
        <CaretDown
          size={14}
          weight="bold"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {!!isOpen && (
        <ul
          role="listbox"
          className="glass-panel dark:bg-popover/90 dark:border-border absolute right-0 top-full mt-1 z-50 min-w-[160px] rounded-xl py-1 shadow-lg"
        >
          {LANGUAGES.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <li
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                onClick={() => selectLanguage(lang.code)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    selectLanguage(lang.code);
                  }
                }}
                tabIndex={0}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer transition-colors hover:bg-accent hover:text-foreground ${
                  isSelected
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                <span className="w-6 font-mono">{lang.code.toUpperCase()}</span>
                <span className="flex-1">{lang.label}</span>
                {!!isSelected && <Check size={14} weight="bold" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
