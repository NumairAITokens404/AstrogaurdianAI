import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Heart, Sparkles, Zap, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import HolographicDisplay from './HolographicDisplay';
import GlitchText from './GlitchText';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  feeling?: string;
}

const InteractiveMoodCompanion = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "How are you feeling today? (lonely, sad, happy, confused) or type 'exit' to quit:",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionActive, setSessionActive] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (feeling: string): string => {
    const responses = {
      lonely: "I understand. Let's do a quick breathing exercise together. 🧘‍♂️",
      sad: "That's ok astrobuddy! Let me play something nice to keep you focused on your mission. 🎵",
      happy: "That's good astrobuddy! Keep smiling and spread your energy ✨",
      confused: "That's ok astrobuddy! I've got your back. Tell me what's confusing you and we'll solve it together 🤝",
      exit: "Stay safe, astronaut! 🧑‍🚀"
    };

    return responses[feeling as keyof typeof responses] || 
           "Hmm, I didn't understand that feeling. But remember, you're never alone 👋";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !sessionActive) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      feeling: inputValue.toLowerCase()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      if (inputValue.toLowerCase() === 'exit') {
        setSessionActive(false);
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getResponse(inputValue.toLowerCase()),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);

      // Ask follow-up question if session is still active
      if (inputValue.toLowerCase() !== 'exit') {
        setTimeout(() => {
          const followUpMessage: Message = {
            id: (Date.now() + 2).toString(),
            type: 'bot',
            content: "How are you feeling now? (lonely, sad, happy, confused) or type 'exit' to quit:",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, followUpMessage]);
        }, 2000);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const resetSession = () => {
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: "How are you feeling today? (lonely, sad, happy, confused) or type 'exit' to quit:",
        timestamp: new Date()
      }
    ]);
    setSessionActive(true);
    setInputValue('');
  };

  return (
    <HolographicDisplay title="ASTRO GUARDIAN MOOD COMPANION">
      <div className="space-y-4">
        {/* Status Indicators */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div 
            className="p-3 bg-primary/10 rounded-lg border border-primary/30 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <Heart className="h-5 w-5 text-primary mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">Companion Status</div>
            <GlitchText text="ACTIVE" className="text-sm font-mono text-primary" />
          </motion.div>
          <motion.div 
            className="p-3 bg-success/10 rounded-lg border border-success/30 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <Sparkles className="h-5 w-5 text-success mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">Mood Analysis</div>
            <div className="text-sm font-mono text-success">RUNNING</div>
          </motion.div>
          <motion.div 
            className="p-3 bg-accent/10 rounded-lg border border-accent/30 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <Shield className="h-5 w-5 text-accent mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">Session Time</div>
            <div className="text-sm font-mono text-accent">{messages.length} msgs</div>
          </motion.div>
        </div>

        {/* Chat Interface */}
        <div className="bg-card/20 rounded-lg border border-border/30 backdrop-blur-sm">
          <div className="h-96 overflow-y-auto p-4 space-y-3">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-primary/20 border border-primary/40' 
                        : 'bg-accent/20 border border-accent/40'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 text-primary" />
                      ) : (
                        <Bot className="h-4 w-4 text-accent" />
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary/10 border border-primary/30 text-primary'
                        : 'bg-muted/20 border border-border/30 text-foreground'
                    }`}>
                      <div className="text-sm">{message.content}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-accent" />
                  </div>
                  <div className="p-3 rounded-lg bg-muted/20 border border-border/30">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-accent rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-accent rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-accent rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border/30">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={sessionActive ? "Type your feeling..." : "Session ended"}
                disabled={!sessionActive || isTyping}
                className="flex-1 bg-background/50 border-border/30"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || !sessionActive || isTyping}
                size="icon"
                className="bg-primary/20 hover:bg-primary/30 border border-primary/40"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {!sessionActive && (
              <div className="mt-2 text-center">
                <Button
                  onClick={resetSession}
                  variant="outline"
                  size="sm"
                  className="text-primary border-primary/30 hover:bg-primary/10"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Start New Session
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </HolographicDisplay>
  );
};

export default InteractiveMoodCompanion;