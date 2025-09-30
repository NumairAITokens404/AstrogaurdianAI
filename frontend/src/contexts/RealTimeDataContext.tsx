import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CrewMember {
  id: number;
  name: string;
  heartRate: number;
  oxygenLevel: number;
  muscleLossRisk: "Low" | "Moderate" | "High" | "Elevated";
  status: "Normal" | "Warning" | "Critical";
}

interface RoverData {
  position: { lat: number; lng: number };
  speed: number;
  power: number;
  signal: string;
  telemetryData: Array<{ time: string; speed: number }>;
  powerData: Array<{ time: string; power: number }>;
}

interface SystemStatus {
  oxygenLevels: number;
  medicalSupplies: number;
  emergencySystemsStatus: string;
  predictionAccuracy: number;
  processingPower: number;
  morale: number;
}

interface RealTimeData {
  crewMembers: CrewMember[];
  roverData: RoverData;
  systemStatus: SystemStatus;
  missionCharts: {
    oxygenData: Array<{ time: string; level: number }>;
    heartRateData: Array<{ time: string; rate: number }>;
    systemPerformance: Array<{ time: string; cpu: number }>;
    roverStatus: Array<{ name: string; value: number }>;
  };
  lastUpdated: Date;
}

const RealTimeDataContext = createContext<RealTimeData | null>(null);

export const useRealTimeData = () => {
  const context = useContext(RealTimeDataContext);
  if (!context) {
    throw new Error('useRealTimeData must be used within a RealTimeDataProvider');
  }
  return context;
};

const generateRealisticVariation = (baseValue: number, variance: number = 0.1): number => {
  const variation = (Math.random() - 0.5) * 2 * variance;
  return Math.max(0, Math.min(100, baseValue + (baseValue * variation)));
};

const generateTimeStamp = (offset: number = 0): string => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + offset);
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
};

export const RealTimeDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<RealTimeData>(() => ({
    crewMembers: [
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
    ],
    roverData: {
      position: { lat: -14, lng: 175 },
      speed: 1.2,
      power: 68,
      signal: "Strong",
      telemetryData: [
        { time: generateTimeStamp(-360), speed: 2.1 },
        { time: generateTimeStamp(-330), speed: 1.8 },
        { time: generateTimeStamp(-300), speed: 2.4 },
        { time: generateTimeStamp(-270), speed: 1.2 },
        { time: generateTimeStamp(-240), speed: 0.8 },
        { time: generateTimeStamp(0), speed: 1.5 }
      ],
      powerData: [
        { time: generateTimeStamp(-360), power: 85 },
        { time: generateTimeStamp(-330), power: 82 },
        { time: generateTimeStamp(-300), power: 78 },
        { time: generateTimeStamp(-270), power: 74 },
        { time: generateTimeStamp(-240), power: 71 },
        { time: generateTimeStamp(0), power: 68 }
      ]
    },
    systemStatus: {
      oxygenLevels: 87,
      medicalSupplies: 98.7,
      emergencySystemsStatus: "ONLINE",
      predictionAccuracy: 94.7,
      processingPower: 85,
      morale: 85
    },
    missionCharts: {
      oxygenData: [
        { time: generateTimeStamp(-1440), level: 98 },
        { time: generateTimeStamp(-1200), level: 96 },
        { time: generateTimeStamp(-960), level: 94 },
        { time: generateTimeStamp(-720), level: 91 },
        { time: generateTimeStamp(-480), level: 89 },
        { time: generateTimeStamp(-240), level: 87 },
        { time: generateTimeStamp(0), level: 85 }
      ],
      heartRateData: [
        { time: generateTimeStamp(-1440), rate: 72 },
        { time: generateTimeStamp(-1200), rate: 68 },
        { time: generateTimeStamp(-960), rate: 85 },
        { time: generateTimeStamp(-720), rate: 95 },
        { time: generateTimeStamp(-480), rate: 130 },
        { time: generateTimeStamp(-240), rate: 125 },
        { time: generateTimeStamp(0), rate: 78 }
      ],
      systemPerformance: [
        { time: generateTimeStamp(-1440), cpu: 45 },
        { time: generateTimeStamp(-1200), cpu: 52 },
        { time: generateTimeStamp(-960), cpu: 67 },
        { time: generateTimeStamp(-720), cpu: 78 },
        { time: generateTimeStamp(-480), cpu: 89 },
        { time: generateTimeStamp(-240), cpu: 92 },
        { time: generateTimeStamp(0), cpu: 67 }
      ],
      roverStatus: [
        { name: 'Navigation', value: 95 },
        { name: 'Power', value: 78 },
        { name: 'Communication', value: 87 },
        { name: 'Sensors', value: 92 }
      ]
    },
    lastUpdated: new Date()
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        // Update crew members with realistic variations
        const updatedCrewMembers = prevData.crewMembers.map(member => {
          const newOxygenLevel = Math.round(generateRealisticVariation(member.oxygenLevel, 0.02));
          return {
            ...member,
            heartRate: Math.round(generateRealisticVariation(member.heartRate, 0.05)),
            oxygenLevel: newOxygenLevel,
            status: (newOxygenLevel < 70 ? "Critical" : newOxygenLevel < 85 ? "Warning" : "Normal") as "Normal" | "Warning" | "Critical"
          };
        });

        // Update rover data
        const newSpeed = generateRealisticVariation(prevData.roverData.speed, 0.15);
        const newPower = Math.max(60, prevData.roverData.power - 0.1 + (Math.random() - 0.5)); // Gradual power drain

        // Update telemetry data (keep last 6 entries)
        const newTelemetryEntry = { time: generateTimeStamp(0), speed: Number(newSpeed.toFixed(1)) };
        const updatedTelemetryData = [...prevData.roverData.telemetryData.slice(1), newTelemetryEntry];

        const newPowerEntry = { time: generateTimeStamp(0), power: Math.round(newPower) };
        const updatedPowerData = [...prevData.roverData.powerData.slice(1), newPowerEntry];

        // Update system status
        const updatedSystemStatus = {
          oxygenLevels: Math.round(generateRealisticVariation(prevData.systemStatus.oxygenLevels, 0.03)),
          medicalSupplies: Math.max(95, generateRealisticVariation(prevData.systemStatus.medicalSupplies, 0.01)),
          emergencySystemsStatus: Math.random() > 0.95 ? "MAINTENANCE" : "ONLINE",
          predictionAccuracy: generateRealisticVariation(prevData.systemStatus.predictionAccuracy, 0.02),
          processingPower: Math.round(generateRealisticVariation(prevData.systemStatus.processingPower, 0.1)),
          morale: Math.round(generateRealisticVariation(prevData.systemStatus.morale, 0.03))
        };

        // Update mission charts data
        const updatedMissionCharts = {
          oxygenData: [
            ...prevData.missionCharts.oxygenData.slice(1),
            { time: generateTimeStamp(0), level: updatedSystemStatus.oxygenLevels }
          ],
          heartRateData: [
            ...prevData.missionCharts.heartRateData.slice(1),
            { time: generateTimeStamp(0), rate: updatedCrewMembers[1].heartRate } // Use crew member #2's heart rate
          ],
          systemPerformance: [
            ...prevData.missionCharts.systemPerformance.slice(1),
            { time: generateTimeStamp(0), cpu: updatedSystemStatus.processingPower }
          ],
          roverStatus: [
            { name: 'Navigation', value: Math.round(generateRealisticVariation(95, 0.05)) },
            { name: 'Power', value: Math.round(newPower) },
            { name: 'Communication', value: Math.round(generateRealisticVariation(87, 0.08)) },
            { name: 'Sensors', value: Math.round(generateRealisticVariation(92, 0.06)) }
          ]
        };

        return {
          ...prevData,
          crewMembers: updatedCrewMembers,
          roverData: {
            ...prevData.roverData,
            speed: Number(newSpeed.toFixed(1)),
            power: Math.round(newPower),
            signal: newPower > 70 ? "Strong" : newPower > 50 ? "Moderate" : "Weak",
            telemetryData: updatedTelemetryData,
            powerData: updatedPowerData
          },
          systemStatus: updatedSystemStatus,
          missionCharts: updatedMissionCharts,
          lastUpdated: new Date()
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <RealTimeDataContext.Provider value={data}>
      {children}
    </RealTimeDataContext.Provider>
  );
};
