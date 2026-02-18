import type { Icon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

interface SidebarNavItemProps {
  icon: Icon;
  label: string;
  active?: boolean;
  danger?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
}

export default function SidebarNavItem({
  icon: IconComponent,
  label,
  active = false,
  danger = false,
  onClick,
  collapsed = false,
}: SidebarNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-center rounded-md px-3 py-2 transition-all",
        collapsed ? "justify-center" : "gap-3",
        active && "border border-white/5 bg-white/5 text-white shadow-sm",
        !active && !danger && "text-zinc-400 hover:bg-white/5 hover:text-white",
        danger && "text-zinc-400 hover:bg-white/5 hover:text-red-400",
      )}
    >
      <IconComponent
        size={20}
        weight={active ? "fill" : "regular"}
        className="shrink-0"
      />
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
      {collapsed ? (
        <span className="pointer-events-none absolute left-full z-50 ml-2 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
          {label}
        </span>
      ) : null}
    </button>
  );
}
