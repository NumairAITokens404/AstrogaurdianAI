import StatusCard from "./StatusCard";
import { MapPin, Navigation, AlertTriangle } from "lucide-react";

const RoverNavigationPanel = () => {
  return (
    <StatusCard title="Rover Navigation">
      <div className="space-y-4">
        {/* Navigation Map Placeholder */}
        <div className="relative h-48 bg-secondary/50 rounded-lg border border-border/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-orange-700/30" />
          
          {/* Rover Position Indicator */}
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow" />
              <div className="absolute inset-0 w-3 h-3 bg-primary/30 rounded-full animate-ping" />
            </div>
          </div>
          
          {/* Danger Zone */}
          <div className="absolute top-1/4 right-1/4 flex items-center space-x-1 bg-destructive/20 border border-destructive/40 rounded px-2 py-1">
            <AlertTriangle className="h-3 w-3 text-destructive" />
            <span className="text-xs text-destructive font-medium">DANGER ZONE</span>
          </div>
          
          {/* Path Line */}
          <svg className="absolute inset-0 w-full h-full">
            <path
              d="M 60 120 Q 100 80 140 100 T 200 90"
              stroke="hsl(var(--warning))"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,3"
              className="animate-data-stream"
            />
          </svg>
        </div>
        
        {/* Navigation Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Navigation className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Position</span>
            </div>
            <div className="text-sm font-mono text-foreground">2501° West</div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Distance to Habitat</span>
            </div>
            <div className="text-sm font-mono text-foreground">2.3 km</div>
          </div>
        </div>

        {/* Terrain Analysis */}
        <div className="p-3 bg-secondary/20 rounded-lg border border-border/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Terrain Analysis</span>
            <span className="text-xs text-success">Safe Route Calculated</span>
          </div>
          <div className="h-8 bg-secondary/50 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-success/20 via-warning/20 to-destructive/20" />
            <div className="absolute top-1/2 left-1/3 w-1 h-full bg-primary transform -translate-y-1/2" />
          </div>
        </div>
      </div>
    </StatusCard>
  );
};

export default RoverNavigationPanel;