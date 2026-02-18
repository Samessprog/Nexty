import { Hexagon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

import HexagonalDesign from "@/components/layout/HexagonalDesign";

export default function DesignPanel() {
  const { t } = useTranslation();

  return (
    <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 abstract-bg overflow-hidden">
      <div className="flex items-center gap-3 relative z-10">
        <div className="size-8 text-[#195de6] flex items-center justify-center bg-white/5 rounded backdrop-blur-sm border border-white/10">
          <Hexagon size={20} weight="bold" />
        </div>
        <h2 className="text-white text-lg font-bold tracking-tight font-mono">
          {t("brand.name")}
        </h2>
      </div>

      <HexagonalDesign />

      <div className="relative z-10 max-w-md">
        <h1 className="text-white text-4xl font-bold leading-tight tracking-tight mb-4">
          {t("brand.tagline")}
        </h1>
        <p className="text-zinc-400 text-sm font-light leading-relaxed">
          {t("brand.description")}
        </p>
      </div>
    </div>
  );
}
