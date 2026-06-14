"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles, Copy, Trash2, Download, Droplet } from "lucide-react";
import { toast } from "sonner";
import { GlassCard } from "@/components/ui/GlassCard";
import { useSettingsStore } from "@/store/useSettingsStore";
import { generateHumanizedText } from "@/lib/llm";

export default function Home() {
  const { provider, apiKeys, model } = useSettingsStore();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  
  const handleHumanize = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to humanize.");
      return;
    }

    const apiKey = apiKeys[provider];
    if (!apiKey) {
      toast.error(`No API key configured for ${provider}.`, {
        action: {
          label: "Settings",
          onClick: () => window.location.href = "/settings"
        }
      });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await generateHumanizedText(inputText, {
        provider,
        apiKey,
        model
      });
      setOutputText(result);
      toast.success("Text humanized successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to humanize text.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    toast.success("Copied to clipboard");
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-25rem)] pb-20">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative"
      >
        <div className="absolute -top-12 -left-32 bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 px-4 py-2 rounded-full shadow-sm flex items-center gap-2 text-primary-500 font-medium text-sm">
          <Sparkles className="w-4 h-4" />
          Human Score 100%
        </div>
        
        <div className="absolute top-4 -right-32 bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 px-4 py-2 rounded-full shadow-sm flex items-center gap-2 text-primary-500 font-medium text-sm">
          <Droplet className="w-4 h-4" />
          Natural Flow: Excellent
        </div>

        <h1 className="text-6xl md:text-7xl font-bold font-heading tracking-tight leading-tight mb-6">
          Make AI Writing <br />
          <span className="text-primary-500">Sound Human</span>
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto text-lg">
          Transform AI-generated text into natural, authentic human writing using your own LLM API.
        </p>
      </motion.div>

      {/* Main Workspace */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full relative"
      >
        <GlassCard className="w-full p-6 flex flex-col md:flex-row gap-6 relative z-10">
          
          {/* Left Panel */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-2 px-2 text-neutral-600 dark:text-neutral-300 font-semibold text-sm">
              <Bot className="w-4 h-4" />
              AI Generated Text
            </div>
            <div className="relative flex-1">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste AI-generated text here..."
                className="w-full h-full min-h-[300px] resize-none glass-input p-6 leading-relaxed"
              />
              <div className="absolute bottom-4 right-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-white/50 dark:bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/40 dark:border-white/10">
                Words: {wordCount}
              </div>
            </div>
          </div>

          {/* Center Action */}
          <div className="flex items-center justify-center shrink-0 md:py-0 py-4">
            <div className="flex flex-col items-center gap-2 relative group cursor-pointer" onClick={handleHumanize}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg shadow-primary-500/30 transition-shadow group-hover:shadow-xl group-hover:shadow-primary-500/40 relative z-10"
              >
                {isProcessing ? (
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-8 h-8" />
                  </motion.div>
                ) : (
                  <Sparkles className="w-8 h-8" />
                )}
              </motion.button>
              <span className="text-primary-500 font-semibold text-sm">Humanize</span>
              
              {/* Outer rings animation */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+14px)] w-24 h-24 bg-primary-500/10 rounded-full z-0 group-hover:animate-ping" />
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2 text-neutral-600 dark:text-neutral-300 font-semibold text-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary-500" />
                Humanized Output
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleCopy} className="hover:text-primary-500 transition-colors" title="Copy">
                  <Copy className="w-4 h-4" />
                </button>
                <button onClick={handleClear} className="hover:text-primary-500 transition-colors" title="Clear">
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="hover:text-primary-500 transition-colors" title="Download">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="relative flex-1">
              <textarea
                value={outputText}
                readOnly
                placeholder="Your humanized text will appear here..."
                className="w-full h-full min-h-[300px] resize-none glass-input p-6 leading-relaxed bg-white/30 dark:bg-black/20"
              />
            </div>
          </div>
        </GlassCard>

      </motion.div>
    </div>
  );
}
