import { Provider } from '@/store/useSettingsStore';
import { SYSTEM_PROMPT } from './prompts';

interface HumanizeConfig {
  provider: Provider;
  apiKey: string;
  model: string;
}

export async function generateHumanizedText(text: string, config: HumanizeConfig): Promise<string> {
  const { provider, apiKey, model } = config;

  if (!apiKey) {
    throw new Error(`API key for ${provider} is missing`);
  }

  try {
    switch (provider) {
      case 'OpenAI':
        return await fetchOpenAI(text, apiKey, model);
      case 'Claude':
        return await fetchClaude(text, apiKey, model);
      case 'Gemini':
        return await fetchGemini(text, apiKey, model);
      case 'DeepSeek':
        return await fetchDeepSeek(text, apiKey, model);
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  } catch (error: any) {
    console.error(`Error with ${provider}:`, error);
    throw new Error(error.message || `Failed to humanize text using ${provider}`);
  }
}

async function fetchOpenAI(text: string, apiKey: string, model: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: text },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `OpenAI API Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

async function fetchClaude(text: string, apiKey: string, model: string): Promise<string> {
  // Claude expects Anthropic-Version header
  // Note: Using Claude directly from frontend may result in CORS errors depending on their API setup
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true', // Needed if calling from browser
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: text },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Claude API Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.content[0].text.trim();
}

async function fetchGemini(text: string, apiKey: string, model: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: [
        { parts: [{ text }] }
      ]
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gemini API Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
}

async function fetchDeepSeek(text: string, apiKey: string, model: string): Promise<string> {
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: text },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `DeepSeek API Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
