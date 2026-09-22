import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Heart, Sparkles, Zap, Shield, Volume2, VolumeX, FileDown } from 'lucide-react';
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
      content: "How are you feeling today? You can type anything (e.g., anxious, stressed, excited, bored, overwhelmed, tired, focused, lonely, homesick, frustrated). Type 'exit' to end.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionActive, setSessionActive] = useState(true);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (feelingKey: string): string => {
    const responses: Record<string, string> = {
      lonely: "I hear you. Let's try a grounding check-in: look around and name 3 things you can see, 2 things you can feel, and 1 thing you can hear. I'm right here with you. 🧭",
      sad: "It's okay to feel sad. Try a 4-7-8 breathing cycle with me: inhale 4, hold 7, exhale 8 — repeat 4 times. Want a calm audio track? 🎵",
      happy: "Love that energy! Capture one good moment in a sentence so we can revisit it later. ✨",
      confused: "Let's untangle it. What part feels unclear — the goal, the steps, or the tools? Pick one and we’ll break it down. 🧩",
      anxious: "You're safe. Let's try box breathing (4-4-4-4). Also, label the fear in one short sentence. Naming it reduces intensity. 📦",
      stressed: "Small reset: stand, stretch shoulders, roll your neck, sip water. Then we’ll pick the single smallest next task together. 💧",
      excited: "Awesome! Channel it. What’s one bold step you can take in 10 minutes? 🚀",
      bored: "Boredom can hide fatigue. Micro-shift: 2-minute walk, or switch to a 10-minute creative task. 🎨",
      overwhelmed: "Too much at once — let’s stack-rank: Must, Should, Nice-to-have. What’s the one Must we can do in 5–10 minutes? 📋",
      tired: "Rest fuels performance. Consider a 20-minute power nap or gentle movement. Your body matters. 😴",
      focused: "Great flow! Set a 25-minute focus timer, no notifications. I’ll be here when it ends. ⏱️",
      homesick: "That’s tough away from home. Message someone with one photo and one sentence about your day. Connection helps. 🏠",
      frustrated: "I get it. Let’s defuse: write down the blocker in 1–2 lines. Then list 2 possible paths. We’ll try the simpler one. 🔧",
      grateful: "Beautiful. What’s one thing you’re grateful for right now? Gratitude rewires stress. 🌟",
      calm: "Nice and steady. Want a short visualization? Imagine a safe place with rich detail for 60 seconds. 🌊",
      motivated: "Lock it in. What’s the next action that moves the needle most? Let’s commit. ✅",
      exit: "Stay safe, astronaut! 🧑‍🚀"
    };
    return responses[feelingKey] || "I’m here for you. Tell me more about how you feel in your own words. 👋";
  };

  const feelingsSynonyms: Record<string, string[]> = {
    lonely: ["lonely", "isolated", "alone"],
    sad: ["sad", "down", "blue", "low"],
    happy: ["happy", "joyful", "glad"],
    confused: ["confused", "lost", "uncertain"],
    anxious: ["anxious", "nervous", "worried", "tense"],
    stressed: ["stressed", "under pressure", "burnt", "burned", "overworked"],
    excited: ["excited", "pumped", "thrilled"],
    bored: ["bored", "disengaged", "meh"],
    overwhelmed: ["overwhelmed", "overloaded", "too much"],
    tired: ["tired", "exhausted", "sleepy", "fatigued"],
    focused: ["focused", "in the zone", "flow"],
    homesick: ["homesick", "missing home", "nostalgic"],
    frustrated: ["frustrated", "annoyed", "irritated", "stuck"],
    grateful: ["grateful", "thankful", "appreciative"],
    calm: ["calm", "peaceful", "relaxed"],
    motivated: ["motivated", "driven", "determined"]
  };

  const detectFeelingKey = (text: string): string | null => {
    const normalized = text.toLowerCase();
    for (const key of Object.keys(feelingsSynonyms)) {
      if (feelingsSynonyms[key].some(word => normalized.includes(word))) {
        return key;
      }
    }
    if (normalized === 'exit') return 'exit';
    return null;
  };

  const speak = (text: string) => {
    if (!ttsEnabled) return;
    if (typeof window === 'undefined' || typeof window.speechSynthesis === 'undefined') return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {}
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && typeof window.speechSynthesis !== 'undefined') {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

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
        content: getResponse(detectFeelingKey(inputValue) || ''),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      speak(botResponse.content);
      setIsTyping(false);

      // Ask follow-up question if session is still active
      if (inputValue.toLowerCase() !== 'exit') {
        setTimeout(() => {
          const followUpMessage: Message = {
            id: (Date.now() + 2).toString(),
            type: 'bot',
            content: "How are you feeling now? You can type anything, or tap a suggestion below. Type 'exit' to end.",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, followUpMessage]);
          speak(followUpMessage.content);
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
        content: "How are you feeling today? You can type anything (e.g., anxious, stressed, excited, bored, overwhelmed, tired, focused, lonely, homesick, frustrated). Type 'exit' to end.",
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
          {/* Controls */}
          <div className="px-4 pt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-primary border-primary/30 hover:bg-primary/10"
                onClick={() => setTtsEnabled(prev => !prev)}
              >
                {ttsEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
                {ttsEnabled ? 'TTS On' : 'TTS Off'}
              </Button>
            </div>
            <div>
              <Button
                variant="outline"
                size="sm"
                className="text-primary border-primary/30 hover:bg-primary/10"
                onClick={() => {
                  const lines = messages.map(m => {
                    const role = m.type === 'user' ? 'YOU' : 'COMPANION';
                    return `[${m.timestamp.toLocaleString()}] ${role}: ${m.content}`;
                  }).join('\n');
                  const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'mood-companion-transcript.txt';
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  URL.revokeObjectURL(url);
                }}
              >
                <FileDown className="h-4 w-4 mr-2" />
                Export Transcript
              </Button>
            </div>
          </div>

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

          {/* Quick Suggestions */}
          <div className="px-4 pt-3 border-t border-border/30">
            <div className="flex flex-wrap gap-2">
              {['anxious','stressed','excited','bored','overwhelmed','tired','focused','lonely','homesick','frustrated','grateful','calm','motivated','happy','sad','confused'].map((s) => {
                const emojiMap: Record<string, string> = {
                  anxious: '😟',
                  stressed: '😤',
                  excited: '🤩',
                  bored: '😐',
                  overwhelmed: '🥵',
                  tired: '😴',
                  focused: '🎯',
                  lonely: '🥺',
                  homesick: '🏠',
                  frustrated: '😣',
                  grateful: '🙏',
                  calm: '🌊',
                  motivated: '⚡',
                  happy: '😊',
                  sad: '😔',
                  confused: '🤔'
                };
                return (
                <Button
                  key={s}
                  variant="outline"
                  size="sm"
                  className="text-primary border-primary/30 hover:bg-primary/10"
                  onClick={() => {
                    if (!sessionActive || isTyping) return;
                    setInputValue(s);
                    setTimeout(() => { handleSendMessage(); }, 50);
                  }}
                  disabled={!sessionActive || isTyping}
                >
                  <span className="mr-1">{emojiMap[s]}</span>{s}
                </Button>
                );
              })}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border/30">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={sessionActive ? "Share your feeling or pick a suggestion..." : "Session ended"}
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