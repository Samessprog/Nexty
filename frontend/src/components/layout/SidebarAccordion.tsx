import { CaretDown } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface SidebarAccordionProps {
  icon: Icon;
  label: string;
  collapsed?: boolean;
  children: React.ReactNode;
}

export default function SidebarAccordion({
  icon: IconComponent,
  label,
  collapsed = false,
  children,
}: SidebarAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "group relative flex w-full items-center rounded-md px-3 py-2 text-zinc-400 transition-all hover:bg-white/5 hover:text-white",
          collapsed ? "justify-center" : "gap-3",
        )}
        aria-expanded={isOpen}
      >
        <IconComponent size={20} className="shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 text-left text-sm font-medium">
              {label}
            </span>
            <CaretDown
              size={14}
              weight="bold"
              className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </>
        )}
        {collapsed ? (
          <span className="pointer-events-none absolute left-full z-50 ml-2 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            {label}
          </span>
        ) : null}
      </button>

      {!collapsed && (
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-200 ease-out",
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden min-h-0">
            <div className="mt-1 space-y-0.5">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}
