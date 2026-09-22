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
        "glass transition-all duration-300 hover:glass-strong",
        alert && "border-destructive/50 shadow-[0_0_20px_hsl(var(--destructive)/0.4)]",
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