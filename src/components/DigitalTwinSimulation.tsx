import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe2, Thermometer, Wind, Zap, Activity, Globe, Gauge } from 'lucide-react';
import HolographicDisplay from './HolographicDisplay';
import GlitchText from './GlitchText';
import QuantumLoader from './QuantumLoader';
import { useRealTimeData } from '@/contexts/RealTimeDataContext';

interface PlanetaryCondition {
  name: string;
  temperature: number;
  pressure: number;
  atmosphere: string;
  windSpeed: number;
  gravity: number;
  radiation: number;
  habitability: 'Hostile' | 'Moderate' | 'Favorable';
  icon: string;
}

const DigitalTwinSimulation = () => {
  const realTimeData = useRealTimeData();
  const [selectedPlanet, setSelectedPlanet] = useState('mars');
  const [simulationRunning, setSimulationRunning] = useState(true);
  
  const [planetaryConditions, setPlanetaryConditions] = useState<Record<string, PlanetaryCondition>>({
    mercury: {
      name: 'Mercury',
      temperature: 427,
      pressure: 0.0000000001,
      atmosphere: 'Trace O2, Na, H, He',
      windSpeed: 3.7,
      gravity: 0.378,
      radiation: 95.7,
      habitability: 'Hostile',
      icon: '☿️'
    },
    venus: {
      name: 'Venus',
      temperature: 462,
      pressure: 92,
      atmosphere: '96% CO2, 3.5% N2',
      windSpeed: 360,
      gravity: 0.907,
      radiation: 73.2,
      habitability: 'Hostile',
      icon: '♀️'
    },
    earth: {
      name: 'Earth',
      temperature: 15,
      pressure: 1,
      atmosphere: '78% N2, 21% O2',
      windSpeed: 10.1,
      gravity: 1.0,
      radiation: 12.4,
      habitability: 'Favorable',
      icon: '🌍'
    },
    mars: {
      name: 'Mars',
      temperature: -65,
      pressure: 0.006,
      atmosphere: '95% CO2, 2.7% N2',
      windSpeed: 60,
      gravity: 0.377,
      radiation: 24.5,
      habitability: 'Moderate',
      icon: '🔴'
    },
    jupiter: {
      name: 'Jupiter',
      temperature: -110,
      pressure: 1000,
      atmosphere: '89% H2, 10% He',
      windSpeed: 500,
      gravity: 2.36,
      radiation: 87.3,
      habitability: 'Hostile',
      icon: '🪐'
    },
    saturn: {
      name: 'Saturn',
      temperature: -140,
      pressure: 1000,
      atmosphere: '96% H2, 3% He',
      windSpeed: 1800,
      gravity: 0.916,
      radiation: 65.1,
      habitability: 'Hostile',
      icon: '🪐'
    }
  });

  useEffect(() => {
    if (!simulationRunning) return;

    const interval = setInterval(() => {
      setPlanetaryConditions(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(planet => {
          // Add realistic variations
          updated[planet] = {
            ...updated[planet],
            temperature: updated[planet].temperature + (Math.random() - 0.5) * 2,
            pressure: Math.max(0, updated[planet].pressure + (Math.random() - 0.5) * 0.01),
            windSpeed: Math.max(0, updated[planet].windSpeed + (Math.random() - 0.5) * 5),
            radiation: Math.max(0, updated[planet].radiation + (Math.random() - 0.5) * 2)
          };
        });
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [simulationRunning]);

  const currentPlanet = planetaryConditions[selectedPlanet];

  const getHabitabilityColor = (habitability: string) => {
    switch (habitability) {
      case 'Favorable': return 'text-success';
      case 'Moderate': return 'text-warning';
      case 'Hostile': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <HolographicDisplay title="PLANETARY ATMOSPHERIC DIGITAL TWIN">
      <div className="space-y-6">
        {/* Planet Selection */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
          {Object.entries(planetaryConditions).map(([key, planet]) => (
            <motion.button
              key={key}
              onClick={() => setSelectedPlanet(key)}
              className={`p-3 rounded-lg border text-center transition-colors ${
                selectedPlanet === key
                  ? 'bg-primary/20 border-primary/50 text-primary'
                  : 'bg-muted/10 border-border/30 hover:bg-muted/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-2xl mb-1">{planet.icon}</div>
              <div className="text-xs font-mono">{planet.name}</div>
            </motion.button>
          ))}
        </div>

        {/* Simulation Controls */}
        <div className="flex items-center justify-between p-4 bg-card/20 rounded-lg border border-border/30">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <QuantumLoader size="sm" color="primary" />
              <span className="text-sm text-muted-foreground">Simulation Status:</span>
              <GlitchText 
                text={simulationRunning ? "RUNNING" : "PAUSED"}
                className={`text-sm font-mono ${simulationRunning ? 'text-success' : 'text-warning'}`}
                trigger="continuous"
                intensity="low"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Accuracy: {realTimeData.systemStatus.predictionAccuracy.toFixed(1)}%
            </div>
          </div>
          <motion.button
            onClick={() => setSimulationRunning(!simulationRunning)}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              simulationRunning
                ? 'bg-warning/20 text-warning border border-warning/30'
                : 'bg-success/20 text-success border border-success/30'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {simulationRunning ? 'Pause' : 'Resume'}
          </motion.button>
        </div>

        {/* Current Planet Conditions */}
        <motion.div
          key={selectedPlanet}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Atmospheric Data */}
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Globe className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="text-lg font-medium">{currentPlanet.name}</h3>
                    <div className="text-xs text-muted-foreground">Atmospheric Analysis</div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded text-xs font-medium ${
                  currentPlanet.habitability === 'Favorable' ? 'bg-success/20 text-success' :
                  currentPlanet.habitability === 'Moderate' ? 'bg-warning/20 text-warning' :
                  'bg-destructive/20 text-destructive'
                }`}>
                  {currentPlanet.habitability}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-background/20 rounded border border-border/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Thermometer className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-muted-foreground">Temperature</span>
                  </div>
                  <div className="text-lg font-mono text-foreground">
                    {currentPlanet.temperature.toFixed(1)}°C
                  </div>
                </div>
                
                <div className="p-3 bg-background/20 rounded border border-border/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Gauge className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Pressure</span>
                  </div>
                  <div className="text-lg font-mono text-foreground">
                    {currentPlanet.pressure.toFixed(3)} atm
                  </div>
                </div>

                <div className="p-3 bg-background/20 rounded border border-border/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wind className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Wind Speed</span>
                  </div>
                  <div className="text-lg font-mono text-foreground">
                    {currentPlanet.windSpeed.toFixed(1)} km/h
                  </div>
                </div>

                <div className="p-3 bg-background/20 rounded border border-border/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-4 w-4 text-warning" />
                    <span className="text-sm text-muted-foreground">Radiation</span>
                  </div>
                  <div className="text-lg font-mono text-foreground">
                    {currentPlanet.radiation.toFixed(1)} mSv/y
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/10 rounded-lg border border-border/30">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-4 w-4 text-success" />
                <span className="text-sm text-muted-foreground">Atmosphere Composition</span>
              </div>
              <div className="text-sm font-mono text-foreground">{currentPlanet.atmosphere}</div>
            </div>
          </div>

          {/* Environmental Simulation */}
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-success/10 to-primary/10 rounded-lg border border-success/30">
              <h4 className="text-sm font-medium text-success mb-3">Survival Analysis</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Surface Gravity</span>
                  <span className="font-mono text-sm">{currentPlanet.gravity.toFixed(2)}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Radiation Level</span>
                  <span className={`font-mono text-sm ${
                    currentPlanet.radiation > 50 ? 'text-destructive' : 
                    currentPlanet.radiation > 20 ? 'text-warning' : 'text-success'
                  }`}>
                    {currentPlanet.radiation > 50 ? 'LETHAL' : 
                     currentPlanet.radiation > 20 ? 'HIGH' : 'SAFE'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">EVA Capability</span>
                  <span className={`font-mono text-sm ${
                    currentPlanet.habitability === 'Favorable' ? 'text-success' :
                    currentPlanet.habitability === 'Moderate' ? 'text-warning' :
                    'text-destructive'
                  }`}>
                    {currentPlanet.habitability === 'Favorable' ? 'POSSIBLE' :
                     currentPlanet.habitability === 'Moderate' ? 'LIMITED' :
                     'IMPOSSIBLE'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
              <h4 className="text-sm font-medium text-accent mb-3">Mission Recommendations</h4>
              <div className="space-y-2 text-sm">
                {currentPlanet.habitability === 'Favorable' && (
                  <div className="text-success">✓ Standard EVA protocols approved</div>
                )}
                {currentPlanet.habitability === 'Moderate' && (
                  <>
                    <div className="text-warning">⚠ Enhanced life support required</div>
                    <div className="text-warning">⚠ Limited surface operations</div>
                  </>
                )}
                {currentPlanet.habitability === 'Hostile' && (
                  <>
                    <div className="text-destructive">✗ Surface operations prohibited</div>
                    <div className="text-destructive">✗ Orbital missions only</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </HolographicDisplay>
  );
};

export default DigitalTwinSimulation;