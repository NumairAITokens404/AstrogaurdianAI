import { motion } from 'framer-motion';
import { AlertTriangle, Activity, Shield, Zap, Radio, Battery, Radiation, HeartPulse } from 'lucide-react';
import GlitchText from '@/components/GlitchText';
import { useRealTimeData } from '@/contexts/RealTimeDataContext';

const Stat = ({ label, value, tone }: { label: string; value: string; tone?: 'success' | 'warning' | 'destructive' | 'primary' | 'accent' }) => (
  <motion.div 
    className={`p-4 glass-card border ${
      tone === 'destructive' ? 'border-destructive/30' : tone === 'warning' ? 'border-warning/30' : tone === 'success' ? 'border-success/30' : 'border-primary/20'
    } rounded-lg`}
    whileHover={{ scale: 1.02 }}
  >
    <div className="text-xs text-muted-foreground mb-1">{label}</div>
    <GlitchText text={value} className={`text-lg font-mono ${
      tone === 'destructive' ? 'text-destructive' : tone === 'warning' ? 'text-warning' : tone === 'success' ? 'text-success' : 'text-primary'
    }`} />
  </motion.div>
);

const ImmediateStatusPanel = () => {
  const rt = useRealTimeData();
  const oxygenCritical = rt.systemStatus.oxygenLevels < 80;

  return (
    <div className="glass rounded-xl border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <div className="text-sm text-muted-foreground">Immediate Status</div>
        </div>
        <div className="text-xs text-muted-foreground">Live</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <Stat 
          label="Oxygen Levels" 
          value={oxygenCritical ? 'CRITICAL' : `${rt.systemStatus.oxygenLevels.toFixed(0)}%`} 
          tone={oxygenCritical ? 'destructive' : 'success'} 
        />
        <Stat 
          label="Emergency Systems" 
          value={rt.systemStatus.emergencySystemsStatus}
          tone={rt.systemStatus.emergencySystemsStatus === 'ONLINE' ? 'success' : 'warning'} 
        />
        <Stat 
          label="Power Core"
          value={`${Math.round(rt.metrics.power)}%`} 
          tone={rt.metrics.power > 30 ? 'primary' : 'warning'}
        />
        <Stat 
  label="Radiation"
  value={
    typeof rt.environment.radiation === 'number'
      ? `${rt.environment.radiation.toFixed(2)} mSv`
      : 'N/A'
  }
  tone={
    rt.environment.radiation > 5 ? 'warning' : 'success'
  }
/>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 mt-4">
        <motion.div 
          className="glass-card border rounded-lg p-3"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Radio className="h-4 w-4 text-accent" /> Communications
          </div>
          <div className="text-sm font-mono text-accent">Delay: {rt.communication.delay}</div>
        </motion.div>

        <motion.div 
          className="glass-card border rounded-lg p-3"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <HeartPulse className="h-4 w-4 text-success" /> Crew Vital Highlights
          </div>
          <div className="text-xs text-muted-foreground">Top Alerts</div>
          <div className="mt-1 text-sm">All within nominal ranges</div>
        </motion.div>

        <motion.div 
          className="glass-card border rounded-lg p-3"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Shield className="h-4 w-4 text-primary" /> Threat Monitor
          </div>
          <div className="text-sm">No immediate collision threats detected</div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImmediateStatusPanel;




