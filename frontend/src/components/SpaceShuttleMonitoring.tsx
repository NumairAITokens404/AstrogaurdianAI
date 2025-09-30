import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Activity, Thermometer, Droplets, Shield, Eye, Zap } from 'lucide-react';

interface RoomStatus {
  name: string;
  status: 'normal' | 'warning' | 'danger';
  temperature: number;
  smoke: boolean;
  gasLeak: boolean;
  waterLeak: boolean;
  occupied: boolean;
  securityBreach: boolean;
  detectedDangers: string[];
  recommendedActions: string[];
}

const SpaceShuttleMonitoring = () => {
  const [rooms, setRooms] = useState<RoomStatus[]>([
    {
      name: 'Command Bridge',
      status: 'normal',
      temperature: 22.5,
      smoke: false,
      gasLeak: false,
      waterLeak: false,
      occupied: true,
      securityBreach: false,
      detectedDangers: [],
      recommendedActions: []
    },
    {
      name: 'Engine Bay',
      status: 'warning',
      temperature: 45.2,
      smoke: false,
      gasLeak: false,
      waterLeak: false,
      occupied: false,
      securityBreach: false,
      detectedDangers: ['High Temperature'],
      recommendedActions: ['Monitor cooling systems', 'Check ventilation']
    },
    {
      name: 'Life Support',
      status: 'normal',
      temperature: 20.1,
      smoke: false,
      gasLeak: false,
      waterLeak: false,
      occupied: false,
      securityBreach: false,
      detectedDangers: [],
      recommendedActions: []
    },
    {
      name: 'Cargo Bay',
      status: 'danger',
      temperature: 18.7,
      smoke: false,
      gasLeak: true,
      waterLeak: false,
      occupied: false,
      securityBreach: false,
      detectedDangers: ['Gas Leak Detected'],
      recommendedActions: ['EVACUATE IMMEDIATELY', 'Activate emergency ventilation', 'Check gas lines']
    },
    {
      name: 'Medical Bay',
      status: 'normal',
      temperature: 21.3,
      smoke: false,
      gasLeak: false,
      waterLeak: false,
      occupied: true,
      securityBreach: false,
      detectedDangers: [],
      recommendedActions: []
    },
    {
      name: 'Crew Quarters',
      status: 'warning',
      temperature: 19.8,
      smoke: false,
      gasLeak: false,
      waterLeak: true,
      occupied: true,
      securityBreach: false,
      detectedDangers: ['Water Leak'],
      recommendedActions: ['Check plumbing systems', 'Deploy maintenance drones']
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRooms(prevRooms => 
        prevRooms.map(room => {
          // Simulate random changes
          const tempVariation = (Math.random() - 0.5) * 2;
          const newTemp = Math.max(15, Math.min(50, room.temperature + tempVariation));
          
          // Random chance for new issues
          const randomEvent = Math.random();
          let newStatus = room.status;
          let newDangers = [...room.detectedDangers];
          let newActions = [...room.recommendedActions];

          // Clear previous random dangers
          newDangers = newDangers.filter(danger => 
            !['High Temperature', 'Smoke Detected', 'Water Leak'].includes(danger)
          );
          newActions = newActions.filter(action => 
            !action.includes('Monitor') && !action.includes('Check')
          );

          // Add new dangers based on conditions
          if (newTemp > 40) {
            if (!newDangers.includes('High Temperature')) {
              newDangers.push('High Temperature');
              newActions.push('Monitor cooling systems', 'Check ventilation');
            }
          }

          if (randomEvent < 0.02 && !room.smoke) {
            newDangers.push('Smoke Detected');
            newActions.unshift('ACTIVATE FIRE SUPPRESSION', 'EVACUATE AREA');
            newStatus = 'danger';
          }

          if (randomEvent > 0.98 && room.waterLeak) {
            newDangers = newDangers.filter(d => d !== 'Water Leak');
            newActions = newActions.filter(a => !a.includes('plumbing'));
          }

          // Determine status based on dangers
          if (newDangers.some(d => d.includes('Gas Leak') || d.includes('Smoke') || d.includes('Security Breach'))) {
            newStatus = 'danger';
          } else if (newDangers.length > 0) {
            newStatus = 'warning';
          } else {
            newStatus = 'normal';
          }

          return {
            ...room,
            temperature: Number(newTemp.toFixed(1)),
            status: newStatus,
            detectedDangers: newDangers,
            recommendedActions: newActions
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-success border-success/30 bg-success/10';
      case 'warning': return 'text-warning border-warning/30 bg-warning/10';
      case 'danger': return 'text-destructive border-destructive/30 bg-destructive/10';
      default: return 'text-muted-foreground border-border/30 bg-muted/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'danger': return <XCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-mono text-primary mb-2">SPACE SHUTTLE MONITORING SYSTEM</h2>
        <p className="text-sm text-muted-foreground">Real-time environmental and security monitoring across all shuttle compartments</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div 
          className="p-4 bg-success/10 border border-success/30 rounded-lg text-center"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-2xl font-bold text-success">{rooms.filter(r => r.status === 'normal').length}</div>
          <div className="text-sm text-muted-foreground">Normal</div>
        </motion.div>
        <motion.div 
          className="p-4 bg-warning/10 border border-warning/30 rounded-lg text-center"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-2xl font-bold text-warning">{rooms.filter(r => r.status === 'warning').length}</div>
          <div className="text-sm text-muted-foreground">Warning</div>
        </motion.div>
        <motion.div 
          className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-center"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-2xl font-bold text-destructive">{rooms.filter(r => r.status === 'danger').length}</div>
          <div className="text-sm text-muted-foreground">Danger</div>
        </motion.div>
      </div>

      {/* Room Status Table */}
      <div className="bg-card/20 backdrop-blur-sm rounded-lg border border-border/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/20">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Room</th>
                <th className="p-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="p-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Conditions</th>
                <th className="p-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Sensors</th>
                <th className="p-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Dangers</th>
                <th className="p-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {rooms.map((room, index) => (
                <motion.tr
                  key={room.name}
                  className="hover:bg-muted/10 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="p-3">
                    <div className="font-medium text-foreground">{room.name}</div>
                  </td>
                  <td className="p-3">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(room.status)}`}>
                      {getStatusIcon(room.status)}
                      <span className="text-xs font-medium capitalize">{room.status}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-1 text-sm">
                      <Thermometer className="h-3 w-3 text-muted-foreground" />
                      <span className="font-mono">{room.temperature}°C</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <div className={`w-2 h-2 rounded-full ${room.smoke ? 'bg-destructive' : 'bg-success'}`} title={`Smoke: ${room.smoke ? 'Detected' : 'Clear'}`} />
                      <div className={`w-2 h-2 rounded-full ${room.gasLeak ? 'bg-destructive' : 'bg-success'}`} title={`Gas: ${room.gasLeak ? 'Leak' : 'Normal'}`} />
                      <div className={`w-2 h-2 rounded-full ${room.waterLeak ? 'bg-warning' : 'bg-success'}`} title={`Water: ${room.waterLeak ? 'Leak' : 'Normal'}`} />
                      <div className={`w-2 h-2 rounded-full ${room.occupied ? 'bg-primary' : 'bg-muted'}`} title={`Occupancy: ${room.occupied ? 'Occupied' : 'Empty'}`} />
                      <div className={`w-2 h-2 rounded-full ${room.securityBreach ? 'bg-destructive' : 'bg-success'}`} title={`Security: ${room.securityBreach ? 'Breach' : 'Secure'}`} />
                    </div>
                  </td>
                  <td className="p-3">
                    {room.detectedDangers.length > 0 ? (
                      <div className="space-y-1">
                        {room.detectedDangers.map((danger, idx) => (
                          <div key={idx} className="text-xs px-2 py-1 bg-destructive/20 text-destructive rounded">
                            {danger}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-success">No Issues</span>
                    )}
                  </td>
                  <td className="p-3">
                    {room.recommendedActions.length > 0 ? (
                      <div className="space-y-1">
                        {room.recommendedActions.slice(0, 2).map((action, idx) => (
                          <div key={idx} className="text-xs px-2 py-1 bg-warning/20 text-warning rounded">
                            {action}
                          </div>
                        ))}
                        {room.recommendedActions.length > 2 && (
                          <div className="text-xs text-muted-foreground">+{room.recommendedActions.length - 2} more</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">None required</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Critical Alerts */}
      {rooms.filter(r => r.status === 'danger').length > 0 && (
        <motion.div
          className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <XCircle className="h-5 w-5 text-destructive" />
            <span className="font-bold text-destructive">CRITICAL ALERTS</span>
          </div>
          <div className="space-y-2">
            {rooms.filter(r => r.status === 'danger').map(room => (
              <div key={room.name} className="text-sm">
                <span className="font-medium">{room.name}:</span> {room.detectedDangers.join(', ')}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SpaceShuttleMonitoring;