import { useState, useEffect } from "react";
import MissionHeader from "@/components/MissionHeader";
import CrewHealthPanel from "@/components/CrewHealthPanel";
import AISuggestionsPanel from "@/components/AISuggestionsPanel";
import RoverNavigationPanel from "@/components/RoverNavigationPanel";
import HazardDetectionPanel from "@/components/HazardDetectionPanel";
import MissionCharts from "@/components/MissionCharts";
import SolarSystemMap from "@/components/SolarSystemMap";
import AlertNotification from "@/components/AlertNotification";
import ParticleSystem from "@/components/ParticleSystem";
import HolographicDisplay from "@/components/HolographicDisplay";
import MatrixRain from "@/components/MatrixRain";
import GlitchText from "@/components/GlitchText";
import AdvancedHUD from "@/components/AdvancedHUD";
import QuantumLoader from "@/components/QuantumLoader";
import { useRealTimeData } from "@/contexts/RealTimeDataContext";
import spaceBackground from "@/assets/space-background.jpg";
import { motion } from "framer-motion";
import { Cpu, Zap, Shield, Activity, Target, Radar } from "lucide-react";

const Index = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeNavItem, setActiveNavItem] = useState("crew-health");
  const realTimeData = useRealTimeData();

  const navigationItems = [
    { id: "crew-health", label: "Crew Health" },
    { id: "rover-navigation", label: "Rover Navigation" },
    { id: "hazards", label: "Hazards & Debris" },
    { id: "mission-charts", label: "Mission Analytics" },
    { id: "digital-twin", label: "Digital Twin Simulation" },
    { id: "mood-companion", label: "Mood/Companion" }
  ];

  const renderMainContent = () => {
    switch (activeNavItem) {
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
        return (
          <HolographicDisplay title="QUANTUM DIGITAL TWIN MATRIX">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <motion.div 
                  className="p-4 bg-gradient-to-br from-success/20 to-primary/10 rounded-lg border border-success/40"
                  whileHover={{ rotateY: 5, scale: 1.02 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="text-sm text-muted-foreground mb-2 flex items-center">
                    <Cpu className="h-4 w-4 mr-2" />
                    Simulation Status
                  </div>
                  <div className="text-lg font-medium text-success flex items-center">
                    <QuantumLoader size="sm" color="primary" />
                    <GlitchText text="RUNNING" className="ml-2" trigger="continuous" intensity="low" />
                  </div>
                </motion.div>
              <motion.div 
                className="p-4 bg-gradient-to-br from-primary/20 to-accent/10 rounded-lg border border-primary/40"
                whileHover={{ rotateY: -5, scale: 1.02 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-sm text-muted-foreground mb-2">Prediction Accuracy</div>
                <div className="text-lg font-medium text-primary font-mono">{realTimeData.systemStatus.predictionAccuracy.toFixed(1)}%</div>
              </motion.div>
              </div>
              <div className="space-y-4">
                <motion.div 
                  className="p-4 bg-gradient-to-br from-warning/20 to-destructive/10 rounded-lg border border-warning/40"
                  whileHover={{ rotateY: 5, scale: 1.02 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                <div className="text-sm text-muted-foreground mb-2">Processing Power</div>
                <GlitchText 
                  text={realTimeData.systemStatus.processingPower > 90 ? "HIGH LOAD" : realTimeData.systemStatus.processingPower > 70 ? "MODERATE" : "LOW"}
                  className={`text-lg font-medium ${
                    realTimeData.systemStatus.processingPower > 90 ? "text-warning" : 
                    realTimeData.systemStatus.processingPower > 70 ? "text-primary" : "text-success"
                  }`}
                  trigger="hover" 
                  intensity="medium" 
                />
                </motion.div>
                <motion.div 
                  className="p-4 bg-gradient-to-br from-success/20 to-primary/10 rounded-lg border border-success/40"
                  whileHover={{ rotateY: -5, scale: 1.02 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="text-sm text-muted-foreground mb-2">Data Sync</div>
                  <div className="text-lg font-medium text-success flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2" />
                    Real-time
                  </div>
                </motion.div>
              </div>
            </div>
          </HolographicDisplay>
        );
      case "mood-companion":
        return (
          <HolographicDisplay title="PSYCHOLOGICAL WELLNESS MATRIX">
            <div className="space-y-6">
              <motion.div 
                className="p-4 bg-gradient-to-r from-success/20 to-primary/10 rounded-lg border border-success/40"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-muted-foreground">Overall Morale</span>
                  <GlitchText 
                    text={realTimeData.systemStatus.morale > 80 ? "EXCELLENT" : realTimeData.systemStatus.morale > 60 ? "GOOD" : "NEEDS ATTENTION"}
                    className={`font-bold ${
                      realTimeData.systemStatus.morale > 80 ? "text-success" : 
                      realTimeData.systemStatus.morale > 60 ? "text-primary" : "text-warning"
                    }`}
                    trigger="hover" 
                  />
                </div>
                <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-success to-primary h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${realTimeData.systemStatus.morale}%` }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
              <motion.div 
                className="p-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg border border-accent/30"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-sm text-muted-foreground mb-3 flex items-center">
                  <Cpu className="h-4 w-4 mr-2" />
                  AI Companion Messages
                </div>
                <div className="space-y-3 text-sm">
                  <motion.div 
                    className="text-foreground p-2 bg-success/10 rounded border-l-2 border-success"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <GlitchText text="Outstanding performance on Mission Objective Alpha-7!" />
                  </motion.div>
                  <motion.div 
                    className="text-muted-foreground p-2 bg-primary/5 rounded border-l-2 border-primary"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    "Optimal rest cycle scheduled in 2.3 hours. Prepare for regenerative hibernation."
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </HolographicDisplay>
        );
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
        <HolographicDisplay title="MISSION COMMAND OVERVIEW" className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Real-time Mission Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
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
                    <span className="ml-2">1247</span>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-3 bg-warning/10 rounded-lg border border-warning/30"
                >
                  <div className="text-sm text-muted-foreground">Communication Delay</div>
                  <GlitchText 
                    text="14m 32s"
                    className="text-lg font-mono text-warning"
                    trigger="hover"
                    intensity="medium"
                  />
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
              <div className="text-sm font-medium text-muted-foreground">Navigation</div>
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

        {/* Enhanced Floating Elements */}
        <div className="fixed bottom-8 right-8 pointer-events-none">
          <motion.div
            className="relative"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-2xl opacity-80" />
            <motion.div
              className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-orange-300/40 to-transparent"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            />
            {/* Orbital rings */}
            <motion.div
              className="absolute -inset-4 border border-orange-400/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -inset-8 border border-orange-400/20 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
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