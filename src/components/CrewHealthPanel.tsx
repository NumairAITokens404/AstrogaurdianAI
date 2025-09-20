import StatusCard from "./StatusCard";
import ProgressBar from "./ProgressBar";
import AnimatedAvatar from "./AnimatedAvatar";
import InteractiveChart from "./InteractiveChart";
import { Heart, Activity, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface CrewMember {
  id: number;
  name: string;
  heartRate: number;
  oxygenLevel: number;
  muscleLossRisk: "Low" | "Moderate" | "High" | "Elevated";
  status: "Normal" | "Warning" | "Critical";
}

const crewMembers: CrewMember[] = [
  {
    id: 1,
    name: "Crew Member #1",
    heartRate: 78,
    oxygenLevel: 97,
    muscleLossRisk: "Low",
    status: "Normal"
  },
  {
    id: 2,
    name: "Crew Member #2", 
    heartRate: 130,
    oxygenLevel: 65,
    muscleLossRisk: "High",
    status: "Critical"
  }
];

const CrewHealthPanel = () => {
  // Health monitoring chart data
  const healthData = [
    { time: '10:00', health: 95 },
    { time: '12:00', health: 92 },
    { time: '14:00', health: 88 },
    { time: '16:00', health: 65 },
    { time: '18:00', health: 70 },
    { time: '20:00', health: 75 }
  ];

  return (
    <div className="space-y-6">
      <motion.h2 
        className="text-lg font-semibold text-foreground mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Crew Health Monitoring
      </motion.h2>
      
      {/* Crew Avatars */}
      <motion.div 
        className="flex justify-center space-x-8 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <AnimatedAvatar
          name="Member #1"
          status="normal"
          heartRate={78}
          activity="EVA Prep"
        />
        <AnimatedAvatar
          name="Member #2"
          status="critical"
          heartRate={130}
          activity="Emergency"
        />
      </motion.div>

      {/* Health Trend Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <InteractiveChart
          type="area"
          title="Overall Health Trend"
          data={healthData}
          dataKey="health"
          color="#10b981"
          height={200}
        />
      </motion.div>
      
      {crewMembers.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + (index * 0.2), duration: 0.5 }}
        >
          <StatusCard 
            title={member.name}
            alert={member.status === "Critical"}
            glowEffect={member.status === "Critical"}
          >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Heart Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-mono font-bold text-primary">
                  {member.heartRate}
                </span>
                <span className="text-sm text-muted-foreground">BPM</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">O₂ Level</span>
                <span className="text-sm font-mono">{member.oxygenLevel}%</span>
              </div>
              <ProgressBar 
                value={member.oxygenLevel} 
                variant={member.oxygenLevel < 70 ? "danger" : "primary"}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Muscle Loss Risk</span>
              <div className="flex items-center space-x-2">
                {member.muscleLossRisk === "High" && (
                  <AlertTriangle className="h-4 w-4 text-warning" />
                )}
                <span className={`text-sm font-medium ${
                  member.muscleLossRisk === "High" ? "text-warning" : 
                  member.muscleLossRisk === "Moderate" ? "text-warning" : "text-success"
                }`}>
                  {member.muscleLossRisk}
                </span>
              </div>
            </div>
          </div>
          </StatusCard>
        </motion.div>
      ))}
    </div>
  );
};

export default CrewHealthPanel;