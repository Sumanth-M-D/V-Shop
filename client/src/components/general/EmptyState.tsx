import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  onAction?: () => void;
}

function EmptyState({
  icon,
  title,
  subtitle,
  ctaLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <section className="flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-secondary--shade__0 bg-white/60 px-6 py-10 text-center text-secondary">
      {icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary--shade__0 text-2xl text-primary">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{title}</h2>
        {subtitle && (
          <p className="max-w-sm text-sm text-secondary--shade__3">{subtitle}</p>
        )}
      </div>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow hover:bg-primary--shade__1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {ctaLabel ?? "Take action"}
        </button>
      )}
    </section>
  );
}

export default EmptyState;

