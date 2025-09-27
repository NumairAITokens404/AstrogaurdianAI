import StatusCard from "./StatusCard";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle2, XCircle, Sparkles, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Suggestion {
  id: string;
  action: string;
  confidence: number;
  status: "pending" | "approved" | "overridden";
}

const AISuggestionsPanel = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: "1",
      action: "Administer oxygen pack",
      confidence: 92,
      status: "pending"
    },
    {
      id: "2", 
      action: "Call rover to habitat",
      confidence: 74,
      status: "pending"
    },
    {
      id: "3",
      action: "Initiate digital twin check",
      confidence: 61,
      status: "pending"
    }
  ]);

  const generateNewSuggestions = () => {
    const newSuggestionsList = [
      [
        { id: "4", action: "Adjust habitat pressure", confidence: 88, status: "pending" as const },
        { id: "5", action: "Activate backup life support", confidence: 67, status: "pending" as const },
        { id: "6", action: "Schedule maintenance check", confidence: 73, status: "pending" as const }
      ],
      [
        { id: "7", action: "Optimize power distribution", confidence: 91, status: "pending" as const },
        { id: "8", action: "Recalibrate sensors", confidence: 56, status: "pending" as const },
        { id: "9", action: "Update navigation protocols", confidence: 84, status: "pending" as const }
      ],
      [
        { id: "10", action: "Enhance communication array", confidence: 77, status: "pending" as const },
        { id: "11", action: "Initiate emergency protocols", confidence: 93, status: "pending" as const },
        { id: "12", action: "Deploy exploration drone", confidence: 65, status: "pending" as const }
      ]
    ];
    
    const randomIndex = Math.floor(Math.random() * newSuggestionsList.length);
    setSuggestions(newSuggestionsList[randomIndex]);
  };

  const handleApprove = (id: string) => {
    setSuggestions(prev => prev.map(s => 
      s.id === id ? { ...s, status: "approved" as const } : s
    ));
  };

  const handleOverride = (id: string) => {
    setSuggestions(prev => prev.map(s => 
      s.id === id ? { ...s, status: "overridden" as const } : s
    ));
  };

  return (
    <StatusCard title="AI Copilot Suggestions" className="h-fit">
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="space-y-3 p-3 rounded-lg bg-secondary/30 border border-border/30">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{suggestion.action}</span>
              </div>
              {suggestion.status !== "pending" && (
                <div className="flex items-center space-x-1">
                  {suggestion.status === "approved" ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                </div>
              )}
            </div>
            
            <ProgressBar 
              value={suggestion.confidence}
              variant={suggestion.confidence > 80 ? "primary" : suggestion.confidence > 60 ? "warning" : "danger"}
              showPercentage={true}
            />
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {suggestion.confidence}% confidence
              </span>
              
              {suggestion.status === "pending" && (
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleApprove(suggestion.id)}
                    className="h-7 px-3 text-xs bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
                  >
                    Approve
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleOverride(suggestion.id)}
                    className="h-7 px-3 text-xs border-destructive/30 text-destructive hover:bg-destructive/10"
                  >
                    Override
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        <Button 
          className="w-full mt-4 bg-secondary hover:bg-secondary/80 text-primary border border-primary/30"
          variant="outline"
          onClick={generateNewSuggestions}
        >
          Simulate
        </Button>
      </div>
    </StatusCard>
  );
};

export default AISuggestionsPanel;