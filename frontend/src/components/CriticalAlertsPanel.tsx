import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AlertTriangle, Zap, Shield, Activity, Thermometer, Droplets } from 'lucide-react';
import { useRealTimeData } from '@/contexts/RealTimeDataContext';

const CriticalAlertsPanel = () => {
  const realTimeData = useRealTimeData();
  const [criticalAlerts, setCriticalAlerts] = useState<Array<{
    id: string;
    severity: 'critical' | 'warning' | 'info';
    title: string;
    message: string;
    icon: any;
  }>>([]);

  useEffect(() => {
    const alerts = [];

    // Check oxygen levels
    if (realTimeData.systemStatus.oxygenLevels < 80) {
      alerts.push({
        id: 'oxygen',
        severity: 'critical' as const,
        title: 'OXYGEN CRITICAL',
        message: `System oxygen at ${realTimeData.systemStatus.oxygenLevels}%`,
        icon: Activity
      });
    } else if (realTimeData.systemStatus.oxygenLevels < 90) {
      alerts.push({
        id: 'oxygen',
        severity: 'warning' as const,
        title: 'Oxygen Warning',
        message: `System oxygen at ${realTimeData.systemStatus.oxygenLevels}%`,
        icon: Activity
      });
    }

    // Check crew member health
    realTimeData.crewMembers.forEach((member) => {
      if (member.status === 'Critical') {
        alerts.push({
          id: `crew-${member.id}`,
          severity: 'critical' as const,
          title: 'CREW CRITICAL',
          message: `${member.name}: O2 ${member.oxygenLevel}%, HR ${member.heartRate}bpm`,
          icon: AlertTriangle
        });
      }
    });

    // Check rover power
    if (realTimeData.roverData.power < 70) {
      alerts.push({
        id: 'rover-power',
        severity: 'warning' as const,
        title: 'Rover Power Low',
        message: `Rover battery at ${realTimeData.roverData.power}%`,
        icon: Zap
      });
    }

    // Check system status
    if (realTimeData.systemStatus.emergencySystemsStatus !== 'ONLINE') {
      alerts.push({
        id: 'emergency',
        severity: 'warning' as const,
        title: 'Emergency Systems',
        message: realTimeData.systemStatus.emergencySystemsStatus,
        icon: Shield
      });
    }

    setCriticalAlerts(alerts);
  }, [realTimeData]);

  const getSeverityColors = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-destructive/10',
          border: 'border-destructive',
          text: 'text-destructive',
          glow: 'shadow-[0_0_20px_hsl(var(--destructive)/0.4)]'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10',
          border: 'border-warning',
          text: 'text-warning',
          glow: 'shadow-[0_0_20px_hsl(var(--warning)/0.3)]'
        };
      default:
        return {
          bg: 'bg-primary/10',
          border: 'border-primary',
          text: 'text-primary',
          glow: 'shadow-[0_0_20px_hsl(var(--primary)/0.2)]'
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 right-6 w-96 max-h-[70vh] overflow-y-auto z-40 glass-strong rounded-lg p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground font-mono flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
          CRITICAL ALERTS
        </h3>
        <div className="flex items-center space-x-2">
          <motion.div
            className="w-2 h-2 bg-destructive rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-xs text-muted-foreground font-mono">
            LIVE
          </span>
        </div>
      </div>

      {criticalAlerts.length === 0 ? (
        <motion.div
          className="glass rounded-lg p-4 border-l-4 border-success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center text-success">
            <Shield className="h-5 w-5 mr-2" />
            <span className="font-medium">All Systems Nominal</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            No critical issues detected
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {criticalAlerts.map((alert, index) => {
            const colors = getSeverityColors(alert.severity);
            const Icon = alert.icon;

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass rounded-lg p-3 border-l-4 ${colors.border} ${colors.glow}`}
              >
                <div className={`flex items-start ${colors.text}`}>
                  <Icon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-bold text-sm mb-1">{alert.title}</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {alert.message}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-border/30">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="glass rounded p-2">
            <div className="text-muted-foreground mb-1">System Load</div>
            <div className="font-mono text-primary">
              {realTimeData.systemStatus.processingPower}%
            </div>
          </div>
          <div className="glass rounded p-2">
            <div className="text-muted-foreground mb-1">Morale</div>
            <div className="font-mono text-success">
              {realTimeData.systemStatus.morale}%
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CriticalAlertsPanel;
