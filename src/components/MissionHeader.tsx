import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Menu, Settings, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const MissionHeader = () => {
  return (
    <div>
      <header className="flex items-center justify-between p-6 border-b border-border/30 bg-card/50 backdrop-blur-md">
        <div className="flex items-center space-x-6">
          <motion.h1 
            className="text-2xl font-bold text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            AstroGuardian
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Badge variant="secondary" className="text-primary bg-primary/10 border-primary/30">
              Mission Copilot
            </Badge>
          </motion.div>
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
      
      {/* AstroGuardian Greeting */}
      <motion.div 
        className="p-6 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-b border-primary/30"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Sparkles className="h-6 w-6 text-primary" />
          </motion.div>
          <motion.p 
            className="text-lg text-foreground font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <span className="text-primary font-bold">Hello! SKYRON CREW,</span> I am{" "}
            <span className="text-primary font-bold animate-pulse">AstroGuardian</span> - your AI mission companion.
            Ready to ensure your safety across the cosmos! 🚀
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default MissionHeader;