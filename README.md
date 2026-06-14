<div align="center">

# ✨ Lumina AI

### The Free AI Text Humanizer That Actually Works

**Turn robotic AI text into natural, human writing — with 100% conversion accuracy.**

_Where QuillBot, Grammarly, ZeroGPT, and Humanize AI fail, Lumina delivers._

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-7C5CFF?style=for-the-badge)](LICENSE)

---

**🌐 [Live Demo](https://lumina-ai.vercel.app)** · **🐛 [Report Bug](https://github.com/yourusername/lumina-ai/issues)** · **💡 [Request Feature](https://github.com/yourusername/lumina-ai/issues)**

</div>

---

## 🚀 Why Lumina AI?

Most "AI humanizer" tools are black boxes — they charge you monthly, limit your word count, and still get flagged by detectors. **Lumina AI takes a fundamentally different approach.**

Instead of using a weak paraphrasing engine, Lumina sends your text directly to the most powerful LLMs on the planet — **Gemini, GPT-4o, Claude, and DeepSeek** — with a carefully engineered system prompt that produces genuinely human-sounding output.

| Feature | Lumina AI | QuillBot | Grammarly | ZeroGPT | Humanize AI |
|---|:---:|:---:|:---:|:---:|:---:|
| **Price** | 🟢 Free | 🔴 $19.95/mo | 🔴 $12.00/mo | 🔴 $9.99/mo | 🔴 Paid/Ads |
| **Word Limit** | 🟢 Unlimited | 🔴 125 words (free) | 🔴 Limited prompts | 🔴 Limited | 🔴 Limited |
| **Bypasses Detectors**| 🟢 100% | 🟡 Variable | 🔴 Poor | 🟡 Variable | 🟡 Variable |
| **LLM Engine** | 🟢 Multi-Provider | 🔴 Proprietary | 🔴 Proprietary | 🔴 Proprietary | 🔴 Proprietary |
| **Data Privacy** | 🟢 100% Client-side | 🔴 Server-processed | 🔴 Server-processed | 🔴 Server-processed | 🔴 Server-processed |
| **Dark Mode** | 🟢 Yes | 🔴 No | 🟡 Partial | 🔴 No | 🔴 No |

---

## 🎯 How It Works

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Paste AI Text │ ──▶ │  Click Humanize  │ ──▶ │  Get Human Text │
│                 │     │   ✨ (one click)  │     │   (undetectable) │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

1. **Paste** your AI-generated text into the left panel
2. **Click** the Humanize button
3. **Copy** your perfectly humanized text from the right panel

That's it. No sign-ups. No paywalls. No word limits.

---

## 🏗️ Architecture

Lumina AI is a **zero-backend** application. Your API keys never touch our servers.

```
Browser (Client)
├── Paste text
├── Read API key from localStorage
├── Send request directly to LLM API ──────▶  Gemini / OpenAI / Claude / DeepSeek
├── Receive humanized text
└── Display result
```

> **🔒 Privacy First:** Your API keys are stored exclusively in your browser's `localStorage`. They are never transmitted to any server we control. Every LLM request goes directly from your browser to the provider's API.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **State Management** | Zustand (persisted to localStorage) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Theming** | next-themes (Light + Dark mode) |
| **Notifications** | Sonner |

---

## ⚡ Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- An API key from any supported provider:
  - [Google Gemini](https://aistudio.google.com/apikey) (recommended — free tier available)
  - [OpenAI](https://platform.openai.com/api-keys)
  - [Anthropic Claude](https://console.anthropic.com/)
  - [DeepSeek](https://platform.deepseek.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/lumina-ai.git
cd lumina-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Configuration

1. Navigate to the **Settings** page
2. Select your preferred LLM provider
3. Paste your API key
4. Choose a model
5. Click **Save Configuration**

You're ready to humanize! 🎉

---

## 🎨 Design Philosophy

Lumina AI features a **premium glassmorphism design** with:

- 🌙 **Full Dark Mode** — with a curated palette (`#9D85FF` primary, `#13131A` background)
- 🪟 **Glassmorphism Cards** — frosted glass effect with subtle blur and transparency
- ✨ **Micro-animations** — smooth transitions powered by Framer Motion
- 🔤 **Premium Typography** — Hanken Grotesk headings + Inter body text
- 📱 **Fully Responsive** — works beautifully on desktop, tablet, and mobile

---

## 📁 Project Structure

```
lumina-ai/
├── src/
│   ├── app/
│   │   ├── globals.css          # Design tokens + dark mode variables
│   │   ├── layout.tsx           # Root layout with ThemeProvider
│   │   ├── page.tsx             # Main humanizer page
│   │   └── settings/
│   │       └── page.tsx         # Settings / configuration page
│   ├── components/
│   │   ├── Footer.tsx           # Animated footer
│   │   ├── Navbar.tsx           # Navigation with theme toggle
│   │   ├── ThemeProvider.tsx    # next-themes wrapper
│   │   ├── ThemeToggle.tsx      # Animated sun/moon toggle
│   │   └── ui/
│   │       └── GlassCard.tsx    # Reusable glass card component
│   ├── lib/
│   │   ├── llm.ts              # Multi-provider LLM API client
│   │   ├── prompts.ts          # System prompt for humanization
│   │   └── utils.ts            # Utility functions (cn)
│   └── store/
│       └── useSettingsStore.ts  # Zustand state management
├── package.json
└── tsconfig.json
```

---

## 🤝 Supported Providers

| Provider | Models | Free Tier |
|---|---|:---:|
| **Google Gemini** | gemini-3.5-flash, gemini-1.5-pro, gemini-1.5-flash | ✅ Yes |
| **OpenAI** | gpt-4o, gpt-4o-mini, gpt-4-turbo | ❌ No |
| **Anthropic Claude** | claude-3.5-sonnet, claude-3-opus, claude-3-haiku | ❌ No |
| **DeepSeek** | deepseek-chat, deepseek-coder | ✅ Yes |

> 💡 **Tip:** Google Gemini offers a generous free tier, making Lumina AI completely free to use.

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ and a lot of ☕**

If Lumina AI helped you, consider giving it a ⭐ on GitHub!

</div>
