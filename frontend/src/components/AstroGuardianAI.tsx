import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Zap, Shield, Cpu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import HolographicDisplay from './HolographicDisplay';
import GlitchText from './GlitchText';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot' | 'system';
  content: string;
  timestamp: Date;
}

const AstroGuardianAI = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'sys-1',
      role: 'system',
      content: "You are AstroGuardian — the mission copilot. Be concise, helpful, and safety-focused.",
      timestamp: new Date()
    },
    {
      id: 'bot-1',
      role: 'bot',
      content: 'AstroGuardian online. How can I assist your mission?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;
    setError(null);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content })
      });
      if (!res.ok) {
        const problemText = await res.text();
        throw new Error(problemText || 'Request failed');
      }

      const data = await res.json();
      const botText = typeof data === 'string' ? data : data.text ?? '';

      const botMsg: ChatMessage = {
        id: `bot-${Date.now() + 1}`,
        role: 'bot',
        content: botText || 'No response received from AI.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(message);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now() + 2}`,
        role: 'bot',
        content: 'I encountered an error handling that request. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <HolographicDisplay title="ASTRO GUARDIAN AI">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <motion.div 
            className="p-3 bg-primary/10 rounded-lg border border-primary/30 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <Cpu className="h-5 w-5 text-primary mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">Model</div>
            <GlitchText text="Skyron AI Pro" className="text-sm font-mono text-primary" />
          </motion.div>
          <motion.div 
            className="p-3 bg-success/10 rounded-lg border border-success/30 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <Shield className="h-5 w-5 text-success mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">Latency</div>
            <div className="text-sm font-mono text-success">Low</div>
          </motion.div>
          <motion.div 
            className="p-3 bg-accent/10 rounded-lg border border-accent/30 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <Zap className="h-5 w-5 text-accent mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">Session</div>
            <div className="text-sm font-mono text-accent">{messages.filter(m => m.role !== 'system').length} msgs</div>
          </motion.div>
        </div>

        <div className="bg-card/20 rounded-lg border border-border/30 backdrop-blur-sm">
          <div className="h-96 overflow-y-auto p-4 space-y-3">
            <AnimatePresence>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${
                    m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      m.role === 'user' 
                        ? 'bg-primary/20 border border-primary/40' 
                        : 'bg-accent/20 border border-accent/40'
                    }`}>
                      {m.role === 'user' ? (
                        <User className="h-4 w-4 text-primary" />
                      ) : (
                        <Bot className="h-4 w-4 text-accent" />
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      m.role === 'user'
                        ? 'bg-primary/10 border border-primary/30 text-primary'
                        : 'bg-muted/20 border border-border/30 text-foreground'
                    }`}>
                      <div className="text-sm">{m.content}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {m.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-accent" />
                  </div>
                  <div className="p-3 rounded-lg bg-muted/20 border border-border/30">
                    <div className="flex space-x-1">
                      <motion.div className="w-2 h-2 bg-accent rounded-full" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
                      <motion.div className="w-2 h-2 bg-accent rounded-full" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                      <motion.div className="w-2 h-2 bg-accent rounded-full" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {error && (
              <div className="text-xs text-destructive mt-2">{error}</div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-border/30">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask AstroGuardian..."
                disabled={isTyping}
                className="flex-1 bg-background/50 border-border/30"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className="bg-primary/20 hover:bg-primary/30 border border-primary/40"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </HolographicDisplay>
  );
};

export default AstroGuardianAI;


