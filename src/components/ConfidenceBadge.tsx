import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ConfidenceBadgeProps {
  confidence: number;
  showLabel?: boolean;
}

export const ConfidenceBadge = ({ confidence, showLabel = true }: ConfidenceBadgeProps) => {
  const percentage = Math.round(confidence * 100);
  
  const getVariant = () => {
    if (confidence >= 0.85) return 'success';
    if (confidence >= 0.70) return 'warning';
    return 'danger';
  };

  const getLabel = () => {
    if (confidence >= 0.85) return 'Excellent';
    if (confidence >= 0.70) return 'Good';
    return 'Low';
  };

  const variant = getVariant();
  const variantClasses = {
    success: 'bg-success-light text-success border-success/20',
    warning: 'bg-warning-light text-warning border-warning/20',
    danger: 'bg-danger-light text-danger border-danger/20',
  };

  return (
    <Badge 
      variant="outline" 
      className={cn('font-mono font-medium', variantClasses[variant])}
    >
      {percentage}%
      {showLabel && ` • ${getLabel()}`}
    </Badge>
  );
};
