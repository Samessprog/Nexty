import { cn } from "@/lib/utils";

interface SidebarUserProfileProps {
  name: string;
  role: string;
  collapsed?: boolean;
}

export default function SidebarUserProfile({
  name,
  role,
  collapsed = false,
}: SidebarUserProfileProps) {
  return (
    <div
      className={cn(
        "flex items-center",
        collapsed ? "justify-center" : "gap-3",
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold text-white shadow-sm">
        {name.charAt(0)}
      </div>
      {!collapsed && (
        <div className="flex min-w-0 flex-col">
          <h2 className="truncate text-sm font-medium text-white">{name}</h2>
          <p className="truncate text-xs text-zinc-500">{role}</p>
        </div>
      )}
    </div>
  );
}
