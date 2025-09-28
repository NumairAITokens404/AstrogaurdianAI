import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  variant?: "primary" | "warning" | "danger" | "success";
  showPercentage?: boolean;
}

const ProgressBar = ({ 
  value, 
  className, 
  variant = "primary", 
  showPercentage = true 
}: ProgressBarProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "warning":
        return "bg-warning shadow-glow-warning";
      case "danger":
        return "bg-destructive shadow-glow-danger";
      case "success":
        return "bg-success";
      default:
        return "bg-primary shadow-glow-primary";
    }
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className={cn("h-full transition-all duration-1000 ease-out rounded-full", getVariantClasses())}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showPercentage && (
        <span className="text-sm font-mono text-muted-foreground min-w-[3rem] text-right">
          {value}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;