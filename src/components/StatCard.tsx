import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  variant?: 'success' | 'warning' | 'danger' | 'default';
}

export const StatCard = ({ title, value, icon: Icon, trend, variant = 'default' }: StatCardProps) => {
  const variantClasses = {
    success: 'border-success/20 bg-success-light',
    warning: 'border-warning/20 bg-warning-light',
    danger: 'border-danger/20 bg-danger-light',
    default: 'border-border bg-card',
  };

  const iconColorClasses = {
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    danger: 'text-danger bg-danger/10',
    default: 'text-primary bg-primary/10',
  };

  return (
    <Card className={cn('p-6 transition-all hover:shadow-md', variantClasses[variant])}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold tabular-nums">{value}</p>
          
          {trend && (
            <div className="mt-2 flex items-center gap-1 text-xs">
              <span className={cn('font-medium', trend.isPositive ? 'text-success' : 'text-danger')}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>

        <div className={cn('rounded-xl p-3', iconColorClasses[variant])}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
    </Card>
  );
};
