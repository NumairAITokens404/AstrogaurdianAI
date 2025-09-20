import { useState, useEffect } from "react";
import MissionHeader from "@/components/MissionHeader";
import CrewHealthPanel from "@/components/CrewHealthPanel";
import AISuggestionsPanel from "@/components/AISuggestionsPanel";
import RoverNavigationPanel from "@/components/RoverNavigationPanel";
import HazardDetectionPanel from "@/components/HazardDetectionPanel";
import MissionCharts from "@/components/MissionCharts";
import AlertNotification from "@/components/AlertNotification";
import spaceBackground from "@/assets/space-background.jpg";
import { motion } from "framer-motion";

const Index = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeNavItem, setActiveNavItem] = useState("crew-health");

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
            <div className="p-6 bg-card/20 backdrop-blur-sm rounded-lg border border-border/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">Medical Bay Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Oxygen Levels</span>
                  <span className="text-warning">Critical</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Medical Supplies</span>
                  <span className="text-success">Optimal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Emergency Systems</span>
                  <span className="text-success">Online</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "rover-navigation":
        return (
          <div className="space-y-6">
            <RoverNavigationPanel />
            <div className="p-6 bg-card/20 backdrop-blur-sm rounded-lg border border-border/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">Route Planning</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="text-sm text-muted-foreground">Next Waypoint</div>
                  <div className="text-lg font-mono text-primary">Site Delta-7</div>
                </div>
                <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="text-sm text-muted-foreground">ETA</div>
                  <div className="text-lg font-mono text-primary">2.3 hrs</div>
                </div>
              </div>
            </div>
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
          <div className="p-6 bg-card/20 backdrop-blur-sm rounded-lg border border-border/30">
            <h3 className="text-lg font-semibold text-foreground mb-4">Digital Twin Simulation</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="text-sm text-muted-foreground">Simulation Status</div>
                  <div className="text-lg font-medium text-success">Running</div>
                </div>
                <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
                  <div className="text-lg font-medium text-primary">94.7%</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="text-sm text-muted-foreground">Processing Power</div>
                  <div className="text-lg font-medium text-warning">High Load</div>
                </div>
                <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="text-sm text-muted-foreground">Data Sync</div>
                  <div className="text-lg font-medium text-success">Real-time</div>
                </div>
              </div>
            </div>
          </div>
        );
      case "mood-companion":
        return (
          <div className="p-6 bg-card/20 backdrop-blur-sm rounded-lg border border-border/30">
            <h3 className="text-lg font-semibold text-foreground mb-4">Crew Psychological Status</h3>
            <div className="space-y-4">
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Overall Morale</span>
                  <span className="text-success">Good</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">AI Companion Messages</div>
                <div className="space-y-2 text-sm">
                  <div className="text-foreground">"Great work on today's mission objectives!"</div>
                  <div className="text-muted-foreground">"Remember to take your scheduled rest period."</div>
                </div>
              </div>
            </div>
          </div>
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
        backgroundImage: `linear-gradient(rgba(34, 39, 46, 0.95), rgba(34, 39, 46, 0.95)), url(${spaceBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated scan line */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scan-line" />
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

        {/* Mission Status Bar */}
        <div className="flex items-center justify-between p-4 bg-card/30 backdrop-blur-sm rounded-lg border border-border/30">
          <div className="flex items-center space-x-8">
            <div>
              <div className="text-sm text-muted-foreground">Mission Time</div>
              <div className="text-lg font-mono text-primary">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Sol (Mars Day)</div>
              <div className="text-lg font-mono text-primary">1247</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Communication Delay</div>
              <div className="text-lg font-mono text-warning">14m 32s</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">System Status</div>
            <div className="text-lg font-medium text-success">All Systems Nominal</div>
          </div>
        </div>

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

        {/* Floating Planet */}
        <div className="fixed bottom-8 right-8 pointer-events-none">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 animate-float shadow-2xl opacity-60" />
          <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-orange-300/30 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Index;