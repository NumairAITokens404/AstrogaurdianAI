import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, Target, AlertTriangle, Shield, Zap, Satellite } from 'lucide-react';
import StatusCard from './StatusCard';
import GlitchText from './GlitchText';
import { Button } from './ui/button';

interface AsteroidObject {
  id: string;
  name: string;
  distance: number; // in km
  size: number; // in meters
  velocity: number; // km/s
  threatLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  type: 'Asteroid' | 'Debris' | 'Comet';
  trajectory: 'Stable' | 'Approaching' | 'Receding';
}

const AsteroidScanner = () => {
  const [scannerActive, setScannerActive] = useState(true);
  const [scanRadius, setScanRadius] = useState(20); // km
  const [detectedObjects, setDetectedObjects] = useState<AsteroidObject[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [lastScanTime, setLastScanTime] = useState(new Date());

  // Generate random asteroids/debris
  const generateAsteroidObjects = (): AsteroidObject[] => {
    const objects: AsteroidObject[] = [];
    const numObjects = Math.floor(Math.random() * 8) + 3; // 3-10 objects

    for (let i = 0; i < numObjects; i++) {
      const distance = Math.random() * 20; // Within 20km
      const size = Math.random() * 500 + 10; // 10-510 meters
      const velocity = Math.random() * 15 + 0.5; // 0.5-15.5 km/s
      
      let threatLevel: AsteroidObject['threatLevel'] = 'Low';
      if (distance < 5 && size > 100) threatLevel = 'Critical';
      else if (distance < 10 && size > 50) threatLevel = 'High';
      else if (distance < 15 || size > 200) threatLevel = 'Medium';

      const types: AsteroidObject['type'][] = ['Asteroid', 'Debris', 'Comet'];
      const trajectories: AsteroidObject['trajectory'][] = ['Stable', 'Approaching', 'Receding'];

      objects.push({
        id: `OBJ-${i + 1}-${Date.now()}`,
        name: `${types[Math.floor(Math.random() * types.length)]}-${String(i + 1).padStart(3, '0')}`,
        distance: Number(distance.toFixed(1)),
        size: Number(size.toFixed(0)),
        velocity: Number(velocity.toFixed(2)),
        threatLevel,
        type: types[Math.floor(Math.random() * types.length)],
        trajectory: trajectories[Math.floor(Math.random() * trajectories.length)]
      });
    }

    return objects.sort((a, b) => a.distance - b.distance);
  };

  useEffect(() => {
    if (!scannerActive) return;

    const scanInterval = setInterval(() => {
      // Simulate scanning progress
      setScanProgress(0);
      const progressInterval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setDetectedObjects(generateAsteroidObjects());
            setLastScanTime(new Date());
            return 0;
          }
          return prev + 10;
        });
      }, 100);

      return () => clearInterval(progressInterval);
    }, 5000);

    // Initial scan
    setDetectedObjects(generateAsteroidObjects());

    return () => clearInterval(scanInterval);
  }, [scannerActive]);

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'Critical': return 'text-destructive';
      case 'High': return 'text-warning';
      case 'Medium': return 'text-primary';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getThreatIcon = (threat: string) => {
    switch (threat) {
      case 'Critical': return AlertTriangle;
      case 'High': return AlertTriangle;
      case 'Medium': return Target;
      case 'Low': return Shield;
      default: return Target;
    }
  };

  const criticalObjects = detectedObjects.filter(obj => obj.threatLevel === 'Critical').length;
  const highThreatObjects = detectedObjects.filter(obj => obj.threatLevel === 'High').length;

  return (
    <StatusCard title="ASTEROID SCANNER" alert={criticalObjects > 0}>
      <div className="space-y-4">
        {/* Scanner Status */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-primary/10 rounded-lg border border-primary/30 text-center">
            <Radar className="h-5 w-5 text-primary mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">Scanner Status</div>
            <GlitchText 
              text={scannerActive ? "ACTIVE" : "OFFLINE"}
              className={`text-sm font-mono ${scannerActive ? 'text-success' : 'text-destructive'}`}
              trigger="continuous"
              intensity="low"
            />
          </div>
          
          <div className="p-3 bg-accent/10 rounded-lg border border-accent/30 text-center">
            <Satellite className="h-5 w-5 text-accent mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">Scan Radius</div>
            <div className="text-sm font-mono text-accent">{scanRadius} km</div>
          </div>
          
          <div className="p-3 bg-warning/10 rounded-lg border border-warning/30 text-center">
            <Target className="h-5 w-5 text-warning mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">Objects Detected</div>
            <div className="text-sm font-mono text-warning">{detectedObjects.length}</div>
          </div>
        </div>

        {/* Scan Progress */}
        {scanProgress > 0 && scanProgress < 100 && (
          <div className="p-3 bg-muted/10 rounded-lg border border-border/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Scanning...</span>
              <span className="text-sm font-mono">{scanProgress}%</span>
            </div>
            <div className="w-full bg-muted/20 rounded-full h-2">
              <motion.div
                className="bg-primary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${scanProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        )}

        {/* Scanner Control */}
        <div className="flex justify-between items-center p-3 bg-card/20 rounded-lg border border-border/30">
          <div className="text-sm text-muted-foreground">
            Last scan: {lastScanTime.toLocaleTimeString()}
          </div>
          <Button
            onClick={() => setScannerActive(!scannerActive)}
            size="sm"
            variant={scannerActive ? "destructive" : "default"}
            className="border border-border/30"
          >
            <Zap className="h-4 w-4 mr-2" />
            {scannerActive ? 'Disable' : 'Enable'}
          </Button>
        </div>

        {/* Threat Summary */}
        {(criticalObjects > 0 || highThreatObjects > 0) && (
          <motion.div 
            className="p-3 bg-destructive/10 rounded-lg border border-destructive/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">IMMEDIATE THREATS DETECTED</span>
            </div>
            {criticalObjects > 0 && (
              <div className="text-xs text-destructive">• {criticalObjects} Critical threat(s)</div>
            )}
            {highThreatObjects > 0 && (
              <div className="text-xs text-warning">• {highThreatObjects} High threat(s)</div>
            )}
          </motion.div>
        )}

        {/* Detected Objects List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <AnimatePresence>
            {detectedObjects.map((object, index) => {
              const ThreatIcon = getThreatIcon(object.threatLevel);
              return (
                <motion.div
                  key={object.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-3 rounded-lg border ${
                    object.threatLevel === 'Critical' 
                      ? 'bg-destructive/10 border-destructive/30' 
                      : object.threatLevel === 'High'
                      ? 'bg-warning/10 border-warning/30'
                      : 'bg-muted/10 border-border/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <ThreatIcon className={`h-4 w-4 ${getThreatColor(object.threatLevel)}`} />
                      <span className="text-sm font-medium">{object.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        object.threatLevel === 'Critical' ? 'bg-destructive/20 text-destructive' :
                        object.threatLevel === 'High' ? 'bg-warning/20 text-warning' :
                        object.threatLevel === 'Medium' ? 'bg-primary/20 text-primary' :
                        'bg-success/20 text-success'
                      }`}>
                        {object.threatLevel}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {object.distance.toFixed(1)} km
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Size: </span>
                      <span className="font-mono">{object.size}m</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Velocity: </span>
                      <span className="font-mono">{object.velocity} km/s</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Trajectory: </span>
                      <span className={`font-mono ${
                        object.trajectory === 'Approaching' ? 'text-warning' :
                        object.trajectory === 'Receding' ? 'text-success' :
                        'text-muted-foreground'
                      }`}>
                        {object.trajectory}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {detectedObjects.length === 0 && scannerActive && (
          <div className="text-center py-8 text-muted-foreground">
            <Radar className="h-8 w-8 mx-auto mb-2 animate-spin" />
            <div className="text-sm">Scanning for objects...</div>
          </div>
        )}

        {!scannerActive && (
          <div className="text-center py-8 text-muted-foreground">
            <Satellite className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <div className="text-sm">Scanner offline</div>
          </div>
        )}
      </div>
    </StatusCard>
  );
};

export default AsteroidScanner;