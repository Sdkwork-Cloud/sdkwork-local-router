import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface PageHeaderProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  actions?: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(({
  actions,
  className,
  description,
  eyebrow,
  title,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-4 border-b border-[var(--sdk-color-border-subtle)] px-6 py-5 md:flex-row md:items-end md:justify-between',
        className,
      )}
      data-sdk-pattern="page-header"
      data-slot="page-header"
      {...props}
    >
      <div className="space-y-2">
        {eyebrow ? (
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sdk-color-text-muted)]" data-slot="page-header-eyebrow">
            {eyebrow}
          </div>
        ) : null}
        <div className="text-2xl font-semibold tracking-tight" data-slot="page-header-title">{title}</div>
        {description ? (
          <div className="max-w-3xl text-sm text-[var(--sdk-color-text-secondary)]" data-slot="page-header-description">
            {description}
          </div>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-3" data-slot="page-header-actions">{actions}</div> : null}
    </div>
  );
});
PageHeader.displayName = 'PageHeader';
