import InteractiveChart from './InteractiveChart';
import { motion } from 'framer-motion';

const MissionCharts = () => {
  // Sample data for different charts
  const oxygenData = [
    { time: '00:00', level: 98 },
    { time: '04:00', level: 96 },
    { time: '08:00', level: 94 },
    { time: '12:00', level: 91 },
    { time: '16:00', level: 89 },
    { time: '20:00', level: 87 },
    { time: '24:00', level: 85 }
  ];

  const heartRateData = [
    { time: '00:00', rate: 72 },
    { time: '04:00', rate: 68 },
    { time: '08:00', rate: 85 },
    { time: '12:00', rate: 95 },
    { time: '16:00', rate: 130 },
    { time: '20:00', rate: 125 },
    { time: '24:00', rate: 78 }
  ];

  const systemPerformance = [
    { time: '00:00', cpu: 45 },
    { time: '04:00', cpu: 52 },
    { time: '08:00', cpu: 67 },
    { time: '12:00', cpu: 78 },
    { time: '16:00', cpu: 89 },
    { time: '20:00', cpu: 92 },
    { time: '24:00', cpu: 67 }
  ];

  const roverStatus = [
    { name: 'Navigation', value: 95 },
    { name: 'Power', value: 78 },
    { name: 'Communication', value: 87 },
    { name: 'Sensors', value: 92 }
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart
          type="area"
          title="Oxygen Levels (24h)"
          data={oxygenData}
          dataKey="level"
          color="#10b981"
          height={250}
        />
        
        <InteractiveChart
          type="line"
          title="Heart Rate Monitoring"
          data={heartRateData}
          dataKey="rate"
          color="#ef4444"
          height={250}
        />
        
        <InteractiveChart
          type="bar"
          title="System Performance"
          data={systemPerformance}
          dataKey="cpu"
          color="#3b82f6"
          height={250}
        />
        
        <InteractiveChart
          type="pie"
          title="Rover System Status"
          data={roverStatus}
          dataKey="value"
          color="#8b5cf6"
          height={250}
        />
      </div>
    </motion.div>
  );
};

export default MissionCharts;