import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Shield, Zap, Activity, Cpu, Wifi, Battery } from 'lucide-react';

const AdvancedHUD = () => {
  const [stats, setStats] = useState({
    power: 87,
    shields: 92,
    cpu: 45,
    network: 98,
    battery: 76,
    temperature: 23.5
  });

  const [threats, setThreats] = useState([
    { id: 1, type: "Asteroid", distance: "2.3 AU", threat: "Low" },
    { id: 2, type: "Solar Flare", distance: "Incoming", threat: "Medium" },
    { id: 3, type: "Debris Field", distance: "0.8 AU", threat: "High" }
  ]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [panelsVisible, setPanelsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        power: Math.max(0, Math.min(100, prev.power + (Math.random() - 0.5) * 2)),
        shields: Math.max(0, Math.min(100, prev.shields + (Math.random() - 0.5) * 1.5)),
        cpu: Math.max(0, Math.min(100, prev.cpu + (Math.random() - 0.5) * 5)),
        network: Math.max(0, Math.min(100, prev.network + (Math.random() - 0.5) * 1)),
        battery: Math.max(0, Math.min(100, prev.battery + (Math.random() - 0.5) * 0.5)),
        temperature: Math.max(-50, Math.min(100, prev.temperature + (Math.random() - 0.5) * 0.2))
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if mouse is over navigation sidebar (avoid showing panels when hovering over navigation)
      const isOverNavigation = (
        e.clientX < 200 && // Left sidebar area
        e.clientY > 100 && // Below header
        e.clientY < window.innerHeight * 0.8 // Above bottom area
      );
      
      // Check if mouse is near left panel (within 100px from left edge) or right panel (within 100px from right edge)
      const nearLeftPanel = e.clientX < 100 && !isOverNavigation;
      const nearRightPanel = e.clientX > window.innerWidth - 100;
      const inUpperArea = e.clientY < window.innerHeight * 0.7; // Only in upper 70% of screen
      
      setPanelsVisible((nearLeftPanel || nearRightPanel) && inUpperArea);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const StatBar = ({ label, value, icon: Icon, color }: any) => (
    <div className="flex items-center space-x-3 p-2">
      <Icon className={`h-4 w-4 ${color}`} />
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-mono">{Math.round(value)}%</span>
        </div>
        <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${color.replace('text-', 'bg-')}`}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed top-4 left-4 right-4 bottom-4 pointer-events-none z-50">
      {/* Top HUD Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background/80 to-transparent pointer-events-auto"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center space-x-6">
            <div className="text-primary font-mono text-lg tracking-wider">
              ASTRO-GUARDIAN
            </div>
            <div className="flex space-x-4 text-xs">
              <span className="text-muted-foreground">SOL: 1247</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-success">OPERATIONAL</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.div
              className="w-2 h-2 bg-success rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-success font-mono">NOMINAL</span>
          </div>
        </div>
      </motion.div>

      {/* Left Side Stats Panel */}
      <motion.div
        className="absolute left-2 top-20 w-60 bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg pointer-events-auto"
        initial={{ x: -300 }}
        animate={{ 
          x: panelsVisible ? 0 : -240,
          opacity: panelsVisible ? 1 : 0.3
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="p-3">
          <div className="text-sm font-medium text-foreground mb-3 font-mono uppercase tracking-wider">
            System Status
          </div>
          <div className="space-y-2">
            <StatBar label="Power Core" value={stats.power} icon={Zap} color="text-warning" />
            <StatBar label="Shields" value={stats.shields} icon={Shield} color="text-primary" />
            <StatBar label="CPU Usage" value={stats.cpu} icon={Cpu} color="text-success" />
            <StatBar label="Network" value={stats.network} icon={Wifi} color="text-accent" />
            <StatBar label="Battery" value={stats.battery} icon={Battery} color="text-destructive" />
          </div>
          
          <div className="mt-3 pt-3 border-t border-border/30">
            <div className="text-xs text-muted-foreground mb-2">TEMPERATURE</div>
            <div className="font-mono text-lg text-primary">{stats.temperature.toFixed(1)}°C</div>
          </div>
        </div>
      </motion.div>

      {/* Right Side Threat Panel */}
      <motion.div
        className="absolute right-2 top-20 w-72 bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg pointer-events-auto"
        initial={{ x: 300 }}
        animate={{ 
          x: panelsVisible ? 0 : 240,
          opacity: panelsVisible ? 1 : 0.3
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="p-3">
          <div className="text-sm font-medium text-foreground mb-3 font-mono uppercase tracking-wider">
            Threat Assessment
          </div>
          <div className="space-y-2">
            {threats.map((threat, index) => (
              <motion.div
                key={threat.id}
                className="p-2 bg-muted/20 rounded border border-border/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="font-medium text-sm">{threat.type}</div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    threat.threat === 'High' ? 'bg-destructive/20 text-destructive' :
                    threat.threat === 'Medium' ? 'bg-warning/20 text-warning' :
                    'bg-success/20 text-success'
                  }`}>
                    {threat.threat}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  Distance: {threat.distance}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom Navigation */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-card/20 backdrop-blur-sm border border-border/30 rounded-t-lg pointer-events-auto"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center px-8 py-3 space-x-6">
          <motion.button
            className="p-2 rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Activity className="h-4 w-4" />
          </motion.button>
          <motion.button
            className="p-2 rounded bg-muted/20 text-muted-foreground hover:bg-muted/30 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shield className="h-4 w-4" />
          </motion.button>
          <motion.button
            className="p-2 rounded bg-muted/20 text-muted-foreground hover:bg-muted/30 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Crosshair Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-8 h-8 border border-primary/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary/50 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedHUD;