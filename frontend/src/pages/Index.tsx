import { useState, useEffect } from "react";
import MissionHeader from "@/components/MissionHeader";
import CrewHealthPanel from "@/components/CrewHealthPanel";
import AISuggestionsPanel from "@/components/AISuggestionsPanel";
import RoverNavigationPanel from "@/components/RoverNavigationPanel";
import HazardDetectionPanel from "@/components/HazardDetectionPanel";
import MissionCharts from "@/components/MissionCharts";
import SolarSystemMap from "@/components/SolarSystemMap";
import AlertNotification from "@/components/AlertNotification";
import InteractiveMoodCompanion from "@/components/InteractiveMoodCompanion";
import DigitalTwinSimulation from "@/components/DigitalTwinSimulation";
import ParticleSystem from "@/components/ParticleSystem";
import HolographicDisplay from "@/components/HolographicDisplay";
import MatrixRain from "@/components/MatrixRain";
import GlitchText from "@/components/GlitchText";
import AdvancedHUD from "@/components/AdvancedHUD";
import QuantumLoader from "@/components/QuantumLoader";
import SpaceShuttleMonitoring from "@/components/SpaceShuttleMonitoring";
import { useRealTimeData } from "@/contexts/RealTimeDataContext";
import spaceBackground from "@/assets/space-background.jpg";
import { motion } from "framer-motion";
import { Cpu, Zap, Shield, Activity, Target, Radar } from "lucide-react";

const Index = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeNavItem, setActiveNavItem] = useState("crew-health");
  const [communicationDelay, setCommunicationDelay] = useState("14m 32s");
  const [solDay, setSolDay] = useState(1247);
  const [earthDay, setEarthDay] = useState(new Date());
  const [prompt, setPrompt]= useState("");
  const [response, setResponse]= useState("");
  const realTimeData = useRealTimeData();

  const navigationItems = [
    { id: "astroguard-ai", label: "AstroGuardian AI" },
    { id: "crew-health", label: "Crew Health" },
    { id: "rover-navigation", label: "Rover Navigation" },
    { id: "hazards", label: "Hazards & Debris" },
    { id: "mission-charts", label: "Mission Analytics" },
    { id: "digital-twin", label: "Digital Twin Simulation" },
    { id: "mood-companion", label: "Mood/Companion" }
  ];

  const renderMainContent = () => {
    switch (activeNavItem) {
      case "astroguard-ai":
        function handleSubmit(){
          //make API Call.
          console.log("AI Response parsing from Gemini")
        }
      return (
        
        <div>
          <h2>AstroGuardian AI Coming Soon...</h2>
          <input value={prompt} placeholder="How can I assist you AstroBuddy!" type="text" onChange={(e)=> setPrompt(e.target.value)}></input>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )
        break;

      case "crew-health":
        return (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <CrewHealthPanel />
            <HolographicDisplay title="MEDICAL BAY STATUS" className="col-span-1">
              <div className="space-y-4">
                <motion.div 
                  className="flex justify-between items-center p-3 bg-muted/10 rounded border-l-4 border-destructive"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-muted-foreground flex items-center">
                    <Activity className="h-4 w-4 mr-2" />
                    Oxygen Levels
                  </span>
                  <GlitchText 
                    text={realTimeData.systemStatus.oxygenLevels < 80 ? "CRITICAL" : "NORMAL"} 
                    className={`${realTimeData.systemStatus.oxygenLevels < 80 ? "text-destructive" : "text-success"} font-bold`} 
                    trigger="continuous" 
                    intensity="high" 
                  />
                </motion.div>
                <motion.div 
                  className="flex justify-between items-center p-3 bg-muted/10 rounded border-l-4 border-success"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-muted-foreground flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Medical Supplies
                  </span>
                  <span className="text-success font-mono">{realTimeData.systemStatus.medicalSupplies.toFixed(1)}%</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between items-center p-3 bg-muted/10 rounded border-l-4 border-primary"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-muted-foreground flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    Emergency Systems
                  </span>
                  <span className={`font-mono flex items-center ${
                    realTimeData.systemStatus.emergencySystemsStatus === "ONLINE" ? "text-success" : "text-warning"
                  }`}>
                    <QuantumLoader size="sm" color="primary" />
                    <span className="ml-2">{realTimeData.systemStatus.emergencySystemsStatus}</span>
                  </span>
                </motion.div>
              </div>
            </HolographicDisplay>
          </div>
        );
      case "rover-navigation":
        return (
          <div className="space-y-6">
            <RoverNavigationPanel />
            <HolographicDisplay title="AUTONOMOUS NAVIGATION PROTOCOL">
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  className="p-4 bg-gradient-to-br from-primary/10 to-accent/5 rounded-lg border border-primary/30"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(var(--primary) / 0.3)" }}
                >
                  <div className="text-sm text-muted-foreground mb-2 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Next Waypoint
                  </div>
                  <GlitchText text="SITE DELTA-7" className="text-lg font-mono text-primary" />
                </motion.div>
                <motion.div 
                  className="p-4 bg-gradient-to-br from-warning/10 to-accent/5 rounded-lg border border-warning/30"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(var(--warning) / 0.3)" }}
                >
                  <div className="text-sm text-muted-foreground mb-2 flex items-center">
                    <Radar className="h-4 w-4 mr-2" />
                    ETA
                  </div>
                  <div className="text-lg font-mono text-warning flex items-center">
                    <QuantumLoader size="sm" color="accent" />
                    <span className="ml-2">2.3 hrs</span>
                  </div>
                </motion.div>
              </div>
            </HolographicDisplay>
          </div>
        );
      case "hazards":
        return <HazardDetectionPanel />;
      case "mission-charts":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MissionCharts />
          </motion.div>
        );
      case "digital-twin":
        return <DigitalTwinSimulation />;
      case "mood-companion":
        return <InteractiveMoodCompanion />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Communication delay timer (every 3 seconds)
  useEffect(() => {
    const generateCommDelay = () => {
      const minutes = Math.floor(Math.random() * 5) + 12; // 12-16 minutes
      const seconds = Math.floor(Math.random() * 60); // 0-59 seconds
      return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
    };
    
    const timer = setInterval(() => {
      setCommunicationDelay(generateCommDelay());
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Sol (Mars Day) timer (every 15 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setSolDay(prev => prev + Math.floor(Math.random() * 2)); // Increment by 0 or 1
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // Earth Day timer (every 10 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setEarthDay(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="min-h-screen bg-background relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(12, 16, 32, 0.9)), url(${spaceBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Effects */}
      <ParticleSystem />
      <MatrixRain />
      
      {/* Advanced HUD Overlay */}
      <AdvancedHUD />
      
      {/* Animated scan lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          animate={{
            y: ["-100%", "100vh"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
          animate={{
            y: ["-100%", "100vh"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        />
      </div>

      <MissionHeader />
      
      {/* Main Dashboard */}
      <div className="p-6 space-y-6">
        {/* Alert Notification */}
        {showAlert && (
          <AlertNotification 
            message="OXYGEN DROP DETECTED IN CREW MEMBER #2"
            onDismiss={() => setShowAlert(false)}
          />
        )}

        {/* Enhanced Mission Status Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-primary/10 rounded-lg border border-primary/30"
            >
              <div className="text-sm text-muted-foreground">Mission Time</div>
              <GlitchText 
                text={currentTime.toLocaleTimeString()}
                className="text-lg font-mono text-primary"
                trigger="continuous"
                intensity="low"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-accent/10 rounded-lg border border-accent/30"
            >
              <div className="text-sm text-muted-foreground">Sol (Mars Day)</div>
              <div className="text-lg font-mono text-accent flex items-center">
                <QuantumLoader size="sm" />
                <span className="ml-2">{solDay}</span>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-warning/10 rounded-lg border border-warning/30"
            >
              <div className="text-sm text-muted-foreground">Communication Delay</div>
              <GlitchText 
                text={communicationDelay}
                className="text-lg font-mono text-warning"
                trigger="hover"
                intensity="medium"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-success/10 rounded-lg border border-success/30"
            >
              <div className="text-sm text-muted-foreground">Earth Day</div>
              <div className="text-lg font-mono text-success">
                {earthDay.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: '2-digit',
                  year: '2-digit'
                })}
              </div>
            </motion.div>
          </div>
          <motion.div 
            className={`text-right p-3 rounded-lg border ${
              realTimeData.systemStatus.emergencySystemsStatus === "ONLINE" 
                ? "bg-success/10 border-success/30" 
                : "bg-warning/10 border-warning/30"
            }`}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px hsl(var(--success) / 0.4)" }}
          >
            <div className="text-sm text-muted-foreground">System Status</div>
            <div className={`text-lg font-medium flex items-center ${
              realTimeData.systemStatus.emergencySystemsStatus === "ONLINE" ? "text-success" : "text-warning"
            }`}>
              <motion.div
                className={`w-3 h-3 rounded-full mr-2 ${
                  realTimeData.systemStatus.emergencySystemsStatus === "ONLINE" ? "bg-success" : "bg-warning"
                }`}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {realTimeData.systemStatus.emergencySystemsStatus === "ONLINE" 
                ? "All Systems Nominal" 
                : "Maintenance Mode"
              }
            </div>
          </motion.div>
        </div>

        {/* Space Shuttle Monitoring Dashboard */}
        <HolographicDisplay title="MISSION COMMAND OVERVIEW" className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Space Shuttle Monitoring */}
            <div className="lg:col-span-1">
              <SpaceShuttleMonitoring />
            </div>
            
            {/* Solar System Map */}
            <div className="lg:col-span-1">
              <SolarSystemMap />
            </div>
          </div>
        </HolographicDisplay>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-3 p-4 bg-card/20 backdrop-blur-sm rounded-lg border border-border/30">
              <div className="text-sm font-medium text-muted-foreground">Navigation Menu</div>
              <div className="space-y-2 text-sm">
                {navigationItems.map((item) => (
                  <div
                    key={item.id}
                    className={`cursor-pointer transition-colors ${
                      activeNavItem === item.id
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setActiveNavItem(item.id)}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-7 space-y-6">
            {renderMainContent()}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3">
            <AISuggestionsPanel />
          </div>
        </div>


        {/* Floating Data Cubes */}
        <div className="fixed top-20 right-20 pointer-events-none">
          <motion.div
            className="grid grid-cols-2 gap-2"
            animate={{ 
              rotateX: [0, 360],
              rotateY: [0, 180]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {[1,2,3,4].map(i => (
              <motion.div
                key={i}
                className="w-4 h-4 bg-gradient-to-br from-primary/60 to-accent/40 rounded border border-primary/50"
                animate={{ 
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;