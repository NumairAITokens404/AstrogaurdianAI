import StatusCard from "./StatusCard";
import ProgressBar from "./ProgressBar";
import { Heart, Activity, AlertTriangle } from "lucide-react";

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
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">Crew Health</h2>
      
      {crewMembers.map((member) => (
        <StatusCard 
          key={member.id}
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
      ))}
    </div>
  );
};

export default CrewHealthPanel;