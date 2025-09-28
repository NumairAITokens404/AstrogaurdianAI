import StatusCard from "./StatusCard";
import ProgressBar from "./ProgressBar";
import InteractiveChart from "./InteractiveChart";
import { Button } from "@/components/ui/button";
import { Navigation, MapPin, Zap, Wifi, AlertTriangle, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const RoverNavigationPanel = () => {
  const [isRoverActive, setIsRoverActive] = useState(true);
  const [selectedWaypoint, setSelectedWaypoint] = useState("Delta-7");
  
  // Rover telemetry data
  const telemetryData = [
    { time: '14:00', speed: 2.1 },
    { time: '14:30', speed: 1.8 },
    { time: '15:00', speed: 2.4 },
    { time: '15:30', speed: 1.2 },
    { time: '16:00', speed: 0.8 },
    { time: '16:30', speed: 1.5 }
  ];

  const powerData = [
    { time: '14:00', power: 85 },
    { time: '14:30', power: 82 },
    { time: '15:00', power: 78 },
    { time: '15:30', power: 74 },
    { time: '16:00', power: 71 },
    { time: '16:30', power: 68 }
  ];

  const waypoints = [
    { id: "Delta-7", name: "Site Delta-7", distance: "2.3 km", status: "active" },
    { id: "Alpha-12", name: "Site Alpha-12", distance: "5.7 km", status: "pending" },
    { id: "Gamma-3", name: "Site Gamma-3", distance: "8.1 km", status: "pending" }
  ];

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-between">
        <motion.h2 
          className="text-lg font-semibold text-foreground"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Rover Navigation Control
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button
            onClick={() => setIsRoverActive(!isRoverActive)}
            className={`flex items-center space-x-2 ${
              isRoverActive ? 'bg-primary/20 hover:bg-primary/30' : 'bg-destructive/20 hover:bg-destructive/30'
            }`}
            variant="outline"
          >
            {isRoverActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isRoverActive ? 'Pause Mission' : 'Resume Mission'}</span>
          </Button>
        </motion.div>
      </div>

      {/* Navigation Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <StatusCard title="Mars Surface Map">
          <div className="relative h-48 bg-secondary/50 rounded-lg border border-border/30 overflow-hidden mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-orange-700/30" />
            
            {/* Rover Position Indicator */}
            <motion.div 
              className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <div className="absolute inset-0 w-3 h-3 bg-primary/30 rounded-full animate-ping" />
              </div>
            </motion.div>
            
            {/* Danger Zone */}
            <div className="absolute top-1/4 right-1/4 flex items-center space-x-1 bg-destructive/20 border border-destructive/40 rounded px-2 py-1">
              <AlertTriangle className="h-3 w-3 text-destructive" />
              <span className="text-xs text-destructive font-medium">HAZARD ZONE</span>
            </div>
            
            {/* Path Line */}
            <svg className="absolute inset-0 w-full h-full">
              <motion.path
                d="M 60 120 Q 100 80 140 100 T 200 90"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </StatusCard>
      </motion.div>

      {/* Rover Status Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <StatusCard title="Position" className="text-center">
            <div className="space-y-2">
              <MapPin className="h-8 w-8 text-primary mx-auto" />
              <div className="text-sm font-mono text-primary">14°S, 175°E</div>
            </div>
          </StatusCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <StatusCard title="Speed" className="text-center">
            <div className="space-y-2">
              <Navigation className="h-8 w-8 text-primary mx-auto" />
              <div className="text-sm font-mono text-primary">1.2 m/s</div>
            </div>
          </StatusCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <StatusCard title="Power" className="text-center">
            <div className="space-y-2">
              <Zap className="h-8 w-8 text-warning mx-auto" />
              <div className="text-sm font-mono text-warning">68%</div>
            </div>
          </StatusCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <StatusCard title="Signal" className="text-center">
            <div className="space-y-2">
              <Wifi className="h-8 w-8 text-success mx-auto" />
              <div className="text-sm font-mono text-success">Strong</div>
            </div>
          </StatusCard>
        </motion.div>
      </div>

      {/* Telemetry Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <InteractiveChart
            type="line"
            title="Rover Speed (m/s)"
            data={telemetryData}
            dataKey="speed"
            color="#3b82f6"
            height={200}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <InteractiveChart
            type="area"
            title="Power Level (%)"
            data={powerData}
            dataKey="power"
            color="#f59e0b"
            height={200}
          />
        </motion.div>
      </div>

      {/* Mission Waypoints */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <StatusCard title="Mission Waypoints">
          <div className="space-y-3">
            {waypoints.map((waypoint, index) => (
              <motion.div
                key={waypoint.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                  selectedWaypoint === waypoint.id
                    ? 'bg-primary/20 border-primary/50'
                    : 'bg-secondary/30 border-border/30 hover:border-primary/30'
                }`}
                onClick={() => setSelectedWaypoint(waypoint.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + (index * 0.1), duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className={`w-3 h-3 rounded-full ${
                        waypoint.status === 'active' ? 'bg-success' : 'bg-muted-foreground/50'
                      }`}
                      animate={waypoint.status === 'active' ? {
                        scale: [1, 1.3, 1],
                        opacity: [1, 0.7, 1]
                      } : {}}
                      transition={waypoint.status === 'active' ? {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      } : {}}
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground">{waypoint.name}</div>
                      <div className="text-xs text-muted-foreground">Distance: {waypoint.distance}</div>
                    </div>
                  </div>
                  {waypoint.status === 'active' && (
                    <motion.div 
                      className="text-xs text-success font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      ACTIVE
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </StatusCard>
      </motion.div>
    </motion.div>
  );
};

export default RoverNavigationPanel;