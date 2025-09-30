import StatusCard from "./StatusCard";
import AsteroidScanner from "./AsteroidScanner";
import { Shield, AlertTriangle, Zap } from "lucide-react";

const HazardDetectionPanel = () => {
  const hazards = [
    {
      type: "Oxygen Drop",
      severity: "Critical",
      location: "Crew Member #2",
      icon: AlertTriangle,
      color: "text-destructive"
    },
    {
      type: "Space Debris",
      severity: "Moderate", 
      location: "Sector 7-A",
      icon: Zap,
      color: "text-warning"
    }
  ];

  return (
    <div className="space-y-4">
      <AsteroidScanner />
      <StatusCard title="Hazards & Debris" alert={true}>
        <div className="space-y-4">
          {hazards.map((hazard, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg border border-border/30">
              <div className="flex items-center space-x-3">
                <hazard.icon className={`h-5 w-5 ${hazard.color}`} />
                <div>
                  <div className="text-sm font-medium text-foreground">{hazard.type}</div>
                  <div className="text-xs text-muted-foreground">{hazard.location}</div>
                </div>
              </div>
              <div className={`text-xs font-medium px-2 py-1 rounded ${
                hazard.severity === "Critical" 
                  ? "bg-destructive/20 text-destructive border border-destructive/30" 
                  : "bg-warning/20 text-warning border border-warning/30"
              }`}>
                {hazard.severity}
              </div>
            </div>
          ))}
          
          <div className="pt-2 border-t border-border/30">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Tracked Objects</span>
              <span className="font-mono text-foreground">36,000+</span>
            </div>
          </div>
        </div>
      </StatusCard>

      <StatusCard title="Digital Twin Simulation">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-success" />
            <span className="text-sm text-success font-medium">Best Safe Action Recommended</span>
          </div>
          
          <div className="h-12 bg-secondary/50 rounded-lg border border-border/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-success/10 to-primary/10" />
            <svg className="absolute inset-0 w-full h-full">
              <path
                d="M 0 24 Q 50 12 100 24 T 200 24 Q 250 12 300 24"
                stroke="hsl(var(--success))"
                strokeWidth="2"
                fill="none"
                className="animate-data-stream"
              />
            </svg>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Simulation completed in 847ms
          </div>
        </div>
      </StatusCard>
    </div>
  );
};

export default HazardDetectionPanel;