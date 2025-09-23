import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatusCard from "./StatusCard";
import GlitchText from "./GlitchText";

interface Planet {
  name: string;
  distance: number; // Distance from Earth in AU
  color: string;
  size: number;
  orbitalPeriod: number;
  angle: number;
}

const SolarSystemMap = () => {
  const [planets, setPlanets] = useState<Planet[]>([
    { name: "Sun", distance: 1, color: "#FDB813", size: 20, orbitalPeriod: 0, angle: 0 },
    { name: "Mercury", distance: 0.4, color: "#8C7853", size: 4, orbitalPeriod: 88, angle: 0 },
    { name: "Venus", distance: 0.7, color: "#FFC649", size: 6, orbitalPeriod: 225, angle: 45 },
    { name: "Earth", distance: 1, color: "#6B93D6", size: 8, orbitalPeriod: 365, angle: 90 },
    { name: "Mars", distance: 1.5, color: "#CD5C5C", size: 6, orbitalPeriod: 687, angle: 135 },
    { name: "Jupiter", distance: 5.2, color: "#D8CA9D", size: 16, orbitalPeriod: 4333, angle: 180 },
    { name: "Saturn", distance: 9.5, color: "#FAD5A5", size: 14, orbitalPeriod: 10759, angle: 225 },
    { name: "Uranus", distance: 19.2, color: "#4FD0E7", size: 10, orbitalPeriod: 30687, angle: 270 },
    { name: "Neptune", distance: 30.1, color: "#4B70DD", size: 10, orbitalPeriod: 60190, angle: 315 }
  ]);

  const [currentMissionLocation, setCurrentMissionLocation] = useState({
    name: "Mars Mission",
    distance: 225.3, // Distance in million kilometers
    travelTime: "7.2 months"
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Update planet positions (simplified orbital mechanics)
      setPlanets(prevPlanets => 
        prevPlanets.map(planet => ({
          ...planet,
          angle: planet.name === "Sun" ? 0 : (planet.angle + (360 / planet.orbitalPeriod)) % 360
        }))
      );

      // Update mission distance with realistic variations
      setCurrentMissionLocation(prev => ({
        ...prev,
        distance: 220 + Math.sin(Date.now() / 10000) * 15, // Simulate orbital mechanics
        travelTime: `${(6.8 + Math.random() * 0.8).toFixed(1)} months`
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const calculatePlanetPosition = (planet: Planet) => {
    const centerX = 200;
    const centerY = 200;
    const radius = planet.distance * 25; // Scale for visualization
    const x = centerX + radius * Math.cos((planet.angle * Math.PI) / 180);
    const y = centerY + radius * Math.sin((planet.angle * Math.PI) / 180);
    return { x, y };
  };

  return (
    <StatusCard title="Solar System Navigation Map">
      <div className="space-y-6">
        {/* Mission Status */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/30">
            <div className="text-sm text-muted-foreground">Distance to Mars</div>
            <GlitchText 
              text={`${currentMissionLocation.distance.toFixed(1)}M km`}
              className="text-lg font-mono text-primary"
              trigger="continuous"
              intensity="low"
            />
          </div>
          <div className="text-center p-3 bg-warning/10 rounded-lg border border-warning/30">
            <div className="text-sm text-muted-foreground">Travel Time</div>
            <div className="text-lg font-mono text-warning">{currentMissionLocation.travelTime}</div>
          </div>
          <div className="text-center p-3 bg-success/10 rounded-lg border border-success/30">
            <div className="text-sm text-muted-foreground">Communication Delay</div>
            <div className="text-lg font-mono text-success">
              {(currentMissionLocation.distance / 300).toFixed(1)}m
            </div>
          </div>
        </div>

        {/* Solar System Visualization */}
        <div className="relative">
          <motion.svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            className="mx-auto bg-space/20 rounded-lg border border-border/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Orbital paths */}
            {planets.slice(1).map((planet, index) => (
              <circle
                key={`orbit-${planet.name}`}
                cx="200"
                cy="200"
                r={planet.distance * 25}
                fill="none"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="1"
                strokeOpacity="0.3"
                strokeDasharray="2,4"
              />
            ))}

            {/* Planets */}
            {planets.map((planet, index) => {
              const position = calculatePlanetPosition(planet);
              return (
                <motion.g
                  key={planet.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.circle
                    cx={position.x}
                    cy={position.y}
                    r={planet.size}
                    fill={planet.color}
                    animate={{
                      scale: planet.name === "Earth" ? [1, 1.2, 1] : 1,
                      opacity: planet.name === "Mars" ? [0.8, 1, 0.8] : 1
                    }}
                    transition={{
                      duration: planet.name === "Earth" ? 2 : 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {/* Planet labels */}
                  <text
                    x={position.x}
                    y={position.y - planet.size - 8}
                    textAnchor="middle"
                    className="text-xs fill-current text-muted-foreground"
                    fontSize="10"
                  >
                    {planet.name}
                  </text>
                  {/* Distance labels for key planets */}
                  {(planet.name === "Mars" || planet.name === "Earth") && (
                    <text
                      x={position.x}
                      y={position.y + planet.size + 15}
                      textAnchor="middle"
                      className="text-xs fill-current text-primary font-mono"
                      fontSize="9"
                    >
                      {planet.name === "Mars" 
                        ? `${currentMissionLocation.distance.toFixed(0)}M km`
                        : "Home"
                      }
                    </text>
                  )}
                </motion.g>
              );
            })}

            {/* Mission trajectory line */}
            <motion.line
              x1={calculatePlanetPosition(planets.find(p => p.name === "Earth")!).x}
              y1={calculatePlanetPosition(planets.find(p => p.name === "Earth")!).y}
              x2={calculatePlanetPosition(planets.find(p => p.name === "Mars")!).x}
              y2={calculatePlanetPosition(planets.find(p => p.name === "Mars")!).y}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />
          </motion.svg>
        </div>

        {/* Planet distances table */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
          {planets.slice(1, 7).map((planet, index) => (
            <motion.div
              key={planet.name}
              className={`p-2 rounded border text-center ${
                planet.name === "Mars" 
                  ? "bg-primary/20 border-primary/50" 
                  : "bg-muted/10 border-border/30"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-xs text-muted-foreground">{planet.name}</div>
              <div className={`text-sm font-mono ${
                planet.name === "Mars" ? "text-primary" : "text-foreground"
              }`}>
                {planet.name === "Mars" 
                  ? `${currentMissionLocation.distance.toFixed(0)}M km`
                  : `${(planet.distance * 149.6).toFixed(0)}M km`
                }
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </StatusCard>
  );
};

export default SolarSystemMap;