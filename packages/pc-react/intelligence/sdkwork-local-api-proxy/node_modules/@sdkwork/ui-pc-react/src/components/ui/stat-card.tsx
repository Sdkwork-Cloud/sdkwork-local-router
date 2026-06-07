import * as React from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  change?: React.ReactNode;
  changeTone?: 'default' | 'success' | 'warning' | 'danger';
  description?: React.ReactNode;
  icon?: React.ReactNode;
  label: React.ReactNode;
  value: React.ReactNode;
}

const changeToneClass: Record<NonNullable<StatCardProps['changeTone']>, string> = {
  default: 'text-[var(--sdk-color-text-secondary)]',
  success: 'text-[var(--sdk-color-state-success)]',
  warning: 'text-[var(--sdk-color-state-warning)]',
  danger: 'text-[var(--sdk-color-state-danger)]',
};

function StatCard({
  change,
  changeTone = 'default',
  className,
  description,
  icon,
  label,
  value,
  ...props
}: StatCardProps) {
  return (
    <Card
      className={cn('h-full', className)}
      data-sdk-ui="stat-card"
      data-slot="stat-card"
      {...props}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0" data-slot="stat-card-header">
        <div className="space-y-1">
          <CardDescription data-slot="stat-card-label">{label}</CardDescription>
          <CardTitle className="text-3xl" data-slot="stat-card-value">
            {value}
          </CardTitle>
        </div>
        {icon ? <div className="text-[var(--sdk-color-text-secondary)]" data-slot="stat-card-icon">{icon}</div> : null}
      </CardHeader>
      {description || change ? (
        <CardContent className="flex items-center gap-4" data-slot="stat-card-body">
          {description ? (
            <p className="flex-1 text-sm text-[var(--sdk-color-text-secondary)]" data-slot="stat-card-description">
              {description}
            </p>
          ) : null}
          {change ? (
            <span className={cn('ml-auto text-sm font-medium', changeToneClass[changeTone])} data-slot="stat-card-change">
              {change}
            </span>
          ) : null}
        </CardContent>
      ) : null}
    </Card>
  );
}

StatCard.displayName = 'StatCard';

export { StatCard };
