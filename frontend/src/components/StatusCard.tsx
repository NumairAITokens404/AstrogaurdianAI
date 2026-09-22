import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatusCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  alert?: boolean;
  glowEffect?: boolean;
}

const StatusCard = ({ title, children, className, alert, glowEffect }: StatusCardProps) => {
  return (
    <Card 
      className={cn(
        "bg-gradient-card border-border/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30",
        alert && "border-destructive/50 shadow-glow-danger",
        glowEffect && "animate-pulse-glow",
        className
      )}
    >
      <CardHeader className="pb-3">
        <CardTitle className={cn(
          "text-sm font-medium tracking-wide",
          alert ? "text-destructive" : "text-foreground"
        )}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
};

export default StatusCard;