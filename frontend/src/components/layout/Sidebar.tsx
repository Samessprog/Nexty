import {
  Bell,
  CaretLeft,
  CaretRight,
  ChartBar,
  ClipboardText,
  Flag,
  GameController,
  GearSix,
  Hexagon,
  ListBullets,
  ListChecks,
  PlayCircle,
  Question,
  Ranking,
  SignOut,
  SquaresFour,
  Trophy,
  UsersThree,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

import SidebarAccordion from "./SidebarAccordion";
import SidebarNavItem from "./SidebarNavItem";
import SidebarUserProfile from "./SidebarUserProfile";

import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface AccordionSubItem {
  labelKey: string;
  icon: Icon;
}

const NOTIFICATIONS_ITEMS: AccordionSubItem[] = [
  { labelKey: "dashboard.suggestion.mySubmissions", icon: ClipboardText },
  { labelKey: "dashboard.suggestion.departmentSubmissions", icon: UsersThree },
  { labelKey: "dashboard.suggestion.organizationSubmissions", icon: ListBullets },
];

const OBLIGATIONS_ITEMS: AccordionSubItem[] = [
  { labelKey: "dashboard.suggestion.howItWorks", icon: Question },
  { labelKey: "dashboard.suggestion.tutorial", icon: PlayCircle },
  { labelKey: "dashboard.suggestion.challenges", icon: GameController },
];

const SOCIAL_ITEMS: AccordionSubItem[] = [
  { labelKey: "dashboard.suggestion.rankingsAwards", icon: Ranking },
  { labelKey: "dashboard.suggestion.surveys", icon: Flag },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const { t } = useTranslation();
  const { logout } = useAuth();

  const handleLogout = () => {
    void logout();
  };

  const renderSubItems = (items: AccordionSubItem[]) =>
    items.map((item) => {
      const IconComp = item.icon;
      return (
        <button
          key={item.labelKey}
          type="button"
          className="flex w-full items-center gap-3 rounded-md py-1.5 pl-9 pr-3 text-left text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <IconComp size={18} className="shrink-0" />
          <span>{t(item.labelKey)}</span>
        </button>
      );
    });

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          data-testid="sidebar-backdrop"
          aria-label="Close sidebar"
        />
      ) : null}

      <aside
        className={cn(
          "fixed z-50 flex h-full shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 transition-all duration-300 lg:static lg:translate-x-0",
          collapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
        data-testid="sidebar"
      >
        {/* Logo + collapse toggle */}
        <div
          className={cn(
            "flex h-16 items-center border-b border-zinc-900/50",
            collapsed ? "justify-center px-2" : "justify-between px-6",
          )}
        >
          <div
            className={cn(
              "flex items-center",
              collapsed ? "justify-center" : "gap-2.5",
            )}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/5 bg-white/10 shadow-inner">
              <Hexagon size={20} className="text-white" weight="bold" />
            </div>
            {!collapsed && (
              <span className="text-lg font-semibold tracking-tight text-white">
                {t("brand.name")}
              </span>
            )}
          </div>
          {!collapsed && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden h-7 w-7 items-center justify-center rounded-md bg-zinc-800 text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white lg:flex"
              aria-label={t("dashboard.sidebar.collapse")}
              data-testid="sidebar-collapse-toggle"
            >
              <CaretLeft size={20} />
            </button>
          )}
        </div>
        {collapsed && (
          <div className="flex justify-center py-2">
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden h-7 w-7 items-center justify-center rounded-md bg-zinc-800 text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white lg:flex"
              aria-label={t("dashboard.sidebar.expand")}
              data-testid="sidebar-collapse-toggle"
            >
              <CaretRight size={20} />
            </button>
          </div>
        )}

        {/* User profile */}
        <div
          className={cn(
            "border-b border-zinc-900/50 py-6",
            collapsed ? "px-2" : "px-5",
          )}
        >
          <SidebarUserProfile
            name={t("dashboard.user.name")}
            role={t("dashboard.user.role")}
            collapsed={collapsed}
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
          <SidebarNavItem
            icon={SquaresFour}
            label={t("dashboard.sidebar.dashboard")}
            active
            collapsed={collapsed}
          />

          <SidebarAccordion
            icon={Bell}
            label={t("dashboard.sidebar.notifications")}
            collapsed={collapsed}
          >
            {renderSubItems(NOTIFICATIONS_ITEMS)}
          </SidebarAccordion>

          <SidebarAccordion
            icon={ListChecks}
            label={t("dashboard.sidebar.obligations")}
            collapsed={collapsed}
          >
            {renderSubItems(OBLIGATIONS_ITEMS)}
          </SidebarAccordion>

          <SidebarAccordion
            icon={UsersThree}
            label={t("dashboard.sidebar.social")}
            collapsed={collapsed}
          >
            {renderSubItems(SOCIAL_ITEMS)}
          </SidebarAccordion>

          <SidebarNavItem
            icon={ClipboardText}
            label={t("dashboard.sidebar.mySubmissions")}
            collapsed={collapsed}
          />
          <SidebarNavItem
            icon={ChartBar}
            label={t("dashboard.sidebar.rankings")}
            collapsed={collapsed}
          />
          <SidebarNavItem
            icon={Trophy}
            label={t("dashboard.sidebar.rewards")}
            collapsed={collapsed}
          />

          <div className="mt-2 pt-6">
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                {t("dashboard.sidebar.system")}
              </p>
            )}
            <SidebarNavItem
              icon={GearSix}
              label={t("dashboard.sidebar.settings")}
              collapsed={collapsed}
            />
            <SidebarNavItem
              icon={SignOut}
              label={t("dashboard.sidebar.logout")}
              danger
              onClick={handleLogout}
              collapsed={collapsed}
            />
          </div>
        </nav>

        {/* Version */}
        {!collapsed && (
          <div className="border-t border-zinc-900/50 p-4 text-center">
            <p className="text-[10px] text-zinc-600">
              {t("dashboard.version")}
            </p>
          </div>
        )}

      </aside>
    </>
  );
}
