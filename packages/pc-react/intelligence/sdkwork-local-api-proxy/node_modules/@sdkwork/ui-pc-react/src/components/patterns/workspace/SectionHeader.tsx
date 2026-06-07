import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface SectionHeaderProps
  extends React.PropsWithChildren<Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>> {
  actions?: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  meta?: React.ReactNode;
  sticky?: boolean;
  title?: React.ReactNode;
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(({
  actions,
  children,
  className,
  description,
  eyebrow,
  meta,
  sticky = false,
  title,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'border-b border-[var(--sdk-color-border-subtle)] bg-[var(--sdk-color-surface-panel)]/95 px-4 py-4 sm:px-6',
        sticky ? 'sticky top-0 z-20 backdrop-blur-xl' : null,
        className,
      )}
      data-sdk-pattern="section-header"
      data-slot="section-header"
      {...props}
    >
      {(eyebrow || title || description || meta || actions) ? (
        <div className="flex flex-wrap items-start justify-between gap-3" data-slot="section-header-header">
          <div className="min-w-0 flex-1">
            {eyebrow ? (
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--sdk-color-text-muted)]" data-slot="section-header-eyebrow">
                {eyebrow}
              </div>
            ) : null}
            {title ? (
              <div className="mt-1 text-sm font-semibold text-[var(--sdk-color-text-primary)]" data-slot="section-header-title">
                {title}
              </div>
            ) : null}
            {description ? (
              <div className="mt-1 text-sm text-[var(--sdk-color-text-secondary)]" data-slot="section-header-description">
                {description}
              </div>
            ) : null}
            {meta ? <div className="mt-2" data-slot="section-header-meta">{meta}</div> : null}
          </div>
          {actions ? <div className="flex shrink-0 items-center gap-2" data-slot="section-header-actions">{actions}</div> : null}
        </div>
      ) : null}
      {children ? (
        <div className={cn(title || description || actions ? 'mt-4' : null)} data-slot="section-header-content">
          {children}
        </div>
      ) : null}
    </div>
  );
});
SectionHeader.displayName = 'SectionHeader';
