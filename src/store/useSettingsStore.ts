import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Provider = 'Gemini' | 'OpenAI' | 'Claude' | 'DeepSeek';

interface SettingsState {
  provider: Provider;
  apiKeys: Record<Provider, string>;
  model: string;
  setProvider: (provider: Provider) => void;
  setApiKey: (provider: Provider, key: string) => void;
  setModel: (model: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      provider: 'Gemini',
      apiKeys: {
        Gemini: '',
        OpenAI: '',
        Claude: '',
        DeepSeek: '',
      },
      model: 'gemini-3.5-flash',
      setProvider: (provider) => set({ provider }),
      setApiKey: (provider, key) => 
        set((state) => ({
          apiKeys: { ...state.apiKeys, [provider]: key }
        })),
      setModel: (model) => set({ model }),
    }),
    {
      name: 'lumina-settings',
    }
  )
);
