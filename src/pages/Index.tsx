import { useState, useEffect } from "react";
import MissionHeader from "@/components/MissionHeader";
import CrewHealthPanel from "@/components/CrewHealthPanel";
import AISuggestionsPanel from "@/components/AISuggestionsPanel";
import RoverNavigationPanel from "@/components/RoverNavigationPanel";
import HazardDetectionPanel from "@/components/HazardDetectionPanel";
import AlertNotification from "@/components/AlertNotification";
import spaceBackground from "@/assets/space-background.jpg";

const Index = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

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
                <div className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Crew Health</div>
                <div className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors">Rover Navigation</div>
                <div className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors">Hazards & Debris</div>
                <div className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors">Digital Twin Simulation</div>
                <div className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors">Mood/Companion</div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <CrewHealthPanel />
              <RoverNavigationPanel />
            </div>
            <HazardDetectionPanel />
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