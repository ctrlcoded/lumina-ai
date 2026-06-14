"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Settings2, Key, Cpu, Save } from "lucide-react";
import { toast } from "sonner";
import { GlassCard } from "@/components/ui/GlassCard";
import { useSettingsStore, Provider } from "@/store/useSettingsStore";
import { cn } from "@/lib/utils";

const MODELS: Record<Provider, string[]> = {
  Gemini: ["gemini-3.5-flash", "gemini-1.5-pro", "gemini-1.5-flash"],
  OpenAI: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"],
  Claude: ["claude-3-5-sonnet-20240620", "claude-3-opus-20240229", "claude-3-haiku-20240307"],
  DeepSeek: ["deepseek-chat", "deepseek-coder"],
};

export default function SettingsPage() {
  const { provider, apiKeys, model, setProvider, setApiKey, setModel } = useSettingsStore();
  
  const [localKey, setLocalKey] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setLocalKey(apiKeys[provider] || "");
  }, [provider, apiKeys]);

  const handleProviderChange = (newProvider: Provider) => {
    setProvider(newProvider);
    setModel(MODELS[newProvider][0]);
  };

  const handleSave = () => {
    setApiKey(provider, localKey);
    toast.success("Settings saved successfully", {
      description: `Updated configuration for ${provider}`,
    });
  };

  if (!isMounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center max-w-2xl mx-auto w-full mb-20"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-heading mb-4">Configuration</h1>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
          Set up your preferred LLM provider and configure humanization parameters.
        </p>
      </div>

      <GlassCard className="w-full p-8 flex flex-col gap-8 relative overflow-hidden">
        {/* Decorative background blur inside card */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-500/10 blur-[80px] rounded-full pointer-events-none" />

        {/* Provider Selection */}
        <div className="flex flex-col gap-3 relative z-10">
          <label className="text-sm font-semibold flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
            <Settings2 className="w-4 h-4 text-primary-500" />
            Provider Selector
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(Object.keys(MODELS) as Provider[]).map((p) => (
              <button
                key={p}
                onClick={() => handleProviderChange(p)}
                className={cn(
                  "py-3 px-4 rounded-2xl text-sm font-medium transition-all duration-300 border",
                  provider === p 
                    ? "bg-primary-500 text-white border-primary-500 shadow-md shadow-primary-500/20" 
                    : "bg-white/50 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 border-white dark:border-white/10 hover:bg-white dark:hover:bg-white/10 hover:border-primary-200 dark:hover:border-primary-700"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* API Key */}
        <div className="flex flex-col gap-3 relative z-10">
          <label className="text-sm font-semibold flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
            <Key className="w-4 h-4 text-primary-500" />
            API Key
          </label>
          <input
            type="password"
            value={localKey}
            onChange={(e) => setLocalKey(e.target.value)}
            placeholder={`Enter your ${provider} API key`}
            className="glass-input w-full px-5 py-3 text-sm"
          />
          <p className="text-xs text-neutral-400 dark:text-neutral-500 pl-1">
            Keys are stored locally in your browser and never sent to our servers.
          </p>
        </div>

        {/* Model Selection */}
        <div className="flex flex-col gap-3 relative z-10">
          <label className="text-sm font-semibold flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
            <Cpu className="w-4 h-4 text-primary-500" />
            Model Selector
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="glass-input w-full px-5 py-3 text-sm appearance-none cursor-pointer"
          >
            {MODELS[provider].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-white/40 dark:border-white/10 mt-2 relative z-10 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-full text-sm font-medium transition-all shadow-md shadow-primary-500/20 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Save className="w-4 h-4" />
            Save Configuration
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
}
