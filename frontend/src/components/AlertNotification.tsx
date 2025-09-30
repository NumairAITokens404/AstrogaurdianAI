import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AlertNotificationProps {
  message: string;
  onDismiss?: () => void;
  className?: string;
}

const AlertNotification = ({ message, onDismiss, className }: AlertNotificationProps) => {
  return (
    <Alert 
      className={cn(
        "border-destructive/50 bg-destructive/10 shadow-glow-danger animate-pulse-glow",
        className
      )}
    >
      <AlertTriangle className="h-4 w-4 text-destructive" />
      <AlertDescription className="text-destructive font-medium">
        {message}
      </AlertDescription>
      {onDismiss && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="absolute top-2 right-2 h-6 w-6 p-0 text-destructive hover:text-destructive-foreground hover:bg-destructive/20"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </Alert>
  );
};

export default AlertNotification;