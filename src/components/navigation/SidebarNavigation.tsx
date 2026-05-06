import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────
// 1. SidebarContainer
//    Mobile  → sticky horizontal scrollable pill-tab bar at top
//    Desktop → sticky vertical aside (original behaviour)
// ─────────────────────────────────────────────────────────────────
export function SidebarContainer({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <>
      {/* ── Mobile: sticky top tab strip ── */}
      <div className="md:hidden sticky top-0 z-20 w-full bg-white border-b border-gray-200 shadow-sm">
        {title && (
          <p className="px-4 pt-2.5 text-[9px] font-bold tracking-widest uppercase text-gray-400">
            {title}
          </p>
        )}
        {/*
          flex-row + overflow-x-auto lets groups/items flow as a horizontal
          scrollable strip. SidebarGroup on mobile renders a transparent
          wrapper so items flow inline.
        */}
        <div className="flex flex-row items-center gap-1.5 overflow-x-auto px-3 py-2 scrollbar-none">
          {children}
        </div>
      </div>

      {/* ── Desktop: sticky vertical sidebar ── */}
      <aside className="hidden md:block w-full">
        <div className="border-kapwa-border-weak bg-kapwa-bg-surface sticky top-32 overflow-hidden rounded-lg border shadow-sm">
          {title && (
            <div className="border-kapwa-border-weak bg-kapwa-bg-surface-raised/50 border-b px-4 py-3">
              <h2 className="text-kapwa-text-strong text-[11px] font-semibold tracking-widest uppercase">
                {title}
              </h2>
            </div>
          )}
          <nav className="scrollbar-thin max-h-[calc(100vh-200px)] overflow-y-auto p-2">
            {children}
          </nav>
        </div>
      </aside>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// 2. SidebarGroup
//    Mobile  → invisible pass-through (items flow inline in the strip)
//    Desktop → labelled section with heading
// ─────────────────────────────────────────────────────────────────
export function SidebarGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      {/* Mobile: just render children directly into the flex row */}
      <div className="md:hidden contents">{children}</div>

      {/* Desktop: original grouped layout */}
      <div className="hidden md:block mb-4 last:mb-0">
        <h3 className="text-kapwa-text-disabled px-3 py-2 text-[10px] font-bold tracking-widest uppercase">
          {title}
        </h3>
        <ul className="space-y-1">{children}</ul>
      </div>
    </>
  );
}

interface SidebarItemProps {
  label: string;
  tooltip?: string;
  icon?: LucideIcon;
  path?: string;
  onClick?: () => void;
  isActive?: boolean;
  description?: string;
}

export function SidebarItem({
  label,
  tooltip,
  icon: Icon,
  path,
  onClick,
  isActive,
  description,
}: SidebarItemProps) {
  const location = useLocation();
  const active = isActive ?? (path ? location.pathname === path : false);

  // Desktop styles (unchanged)
  const desktopCls = [
    'hidden md:flex',
    'w-full items-start gap-3 px-3 py-2 rounded-md text-[10px] transition-all group',
    'border-l-2',
    active
      ? 'bg-kapwa-bg-surface text-kapwa-text-brand-bold font-semibold border-kapwa-border-brand'
      : 'text-kapwa-text-support hover:bg-kapwa-bg-surface-raised hover:text-kapwa-text-strong border-transparent',
  ].join(' ');

  // Mobile styles: compact pill
  const mobileCls = [
    'md:hidden',
    'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5',
    'text-[11px] font-semibold whitespace-nowrap transition-all',
    active
      ? 'bg-primary-600 text-white shadow-sm'
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300',
  ].join(' ');

  const desktopContent = (
    <>
      {Icon && (
        <Icon
          className={`h-4 w-4 shrink-0 ${
            active
              ? 'text-kapwa-text-brand'
              : 'text-kapwa-text-disabled group-hover:text-kapwa-text-on-disabled'
          }`}
        />
      )}
      <div className="flex flex-col overflow-hidden text-left">
        <span className="truncate">{label}</span>
        {description && (
          <span
            className={`text-[10px] leading-tight ${
              active ? 'text-kapwa-text-brand/70' : 'text-kapwa-text-disabled'
            }`}
          >
            {description}
          </span>
        )}
      </div>
    </>
  );

  const mobileContent = (
    <>
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
      <span>{label}</span>
    </>
  );

  const hoverTitle = tooltip || label;

  if (path) {
    return (
      // `contents` makes the <li> invisible so both children participate
      // directly in the parent flex/grid layout.
      <li className="contents">
        {/* Desktop row */}
        <Link
          to={path}
          title={hoverTitle}
          className={desktopCls}
          state={{ scrollToContent: true }}
          aria-current={active ? 'page' : undefined}
        >
          {desktopContent}
        </Link>
        {/* Mobile pill */}
        <Link
          to={path}
          title={hoverTitle}
          className={mobileCls}
          state={{ scrollToContent: true }}
          aria-current={active ? 'page' : undefined}
        >
          {mobileContent}
        </Link>
      </li>
    );
  }

  return (
    <li className="contents">
      {/* Desktop row */}
      <button
        type="button"
        onClick={onClick}
        title={hoverTitle}
        className={desktopCls}
        aria-current={active ? 'page' : undefined}
      >
        {desktopContent}
      </button>
      {/* Mobile pill */}
      <button
        type="button"
        onClick={onClick}
        title={hoverTitle}
        className={mobileCls}
        aria-current={active ? 'page' : undefined}
      >
        {mobileContent}
      </button>
    </li>
  );
}