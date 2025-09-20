import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Menu, Settings } from "lucide-react";

const MissionHeader = () => {
  return (
    <header className="flex items-center justify-between p-6 border-b border-border/30 bg-card/50 backdrop-blur-md">
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl font-bold text-primary">AstroGuardian</h1>
        <Badge variant="secondary" className="text-primary bg-primary/10 border-primary/30">
          Mission Copilot
        </Badge>
      </div>
      
      <div className="flex items-center space-x-4">
        <Badge variant="outline" className="text-success border-success/50 bg-success/10">
          OPERATIONAL
        </Badge>
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Menu className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default MissionHeader;