<div align="center">
  <br />
    <a href="https://www.jsmastery.pro/ultimate-next-course" target="_blank">
      <img width="3600" height="1040" alt="image (56)" src="https://github.com/user-attachments/assets/74afdf8a-95c2-4748-891a-cba2fb0350da" />
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-ShadCN_UI-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=000000" alt="shadcnui" />
    <img src="https://img.shields.io/badge/-Vitest-black?style=for-the-badge&logoColor=white&logo=vitest&color=6E9F18" alt="vitest" />
    <img src="https://img.shields.io/badge/-Recharts-black?style=for-the-badge&logoColor=white&logo=recharts&color=61DAFB" alt="recharts" />
    <img src="https://img.shields.io/badge/-Radix_UI-black?style=for-the-badge&logoColor=white&logo=radixui&color=161618" alt="radixui" />
  </div>

  <h3 align="center">The Complete Testing Course</h3>
  <p aligh="center">A modern, responsive web application for exploring Pokemon, comparing their stats, and simulating battles. Built with Next.js 15, TypeScript, and Tailwind CSS.</p>

   <div align="center">
     Build this project step by step with our detailed course on <a href="https://www.jsmastery.pro" target="_blank"><b>JavaScript Mastery PRO</b></a> Website. Join the JSM PRO family!
    </div>
</div>

## 🚨 JSM Testing Course

This repository contains the code corresponding to our in-depth **Next.js Testing Course** available on the  
<a href="https://jsmastery.com/course/the-complete-next-js-testing-course" target="_blank"><b>JavaScript Mastery Pro Website</b></a>.

Learn how to write reliable tests for your Next.js applications, handle edge cases, and ensure your code is maintainable and bug-free. This course guides you step-by-step, making testing approachable for beginners and intermediate developers alike.

<a href="https://jsmastery.com/course/the-complete-next-js-testing-course" target="_blank">
  <img src="https://github.com/user-attachments/assets/54ef6cd0-1f00-4989-a6a5-3f77ca3f68a2" style="width: 150px; height: auto;" alt="JSM Testing Course" />
</a>

## ✨ Features

- **🔍 Pokemon Explorer**: Browse through a comprehensive list of Pokemon fetched from the PokeAPI
- **🏷️ Type Filtering**: Filter Pokemon by their types (Fire, Water, Grass, etc.)
- **⚔️ Battle Simulator**: Select two Pokemon to compare their stats and analyze battle potential
- **♾️ Infinite Scroll**: Load more Pokemon as you scroll for seamless browsing
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **📊 Real-time Stats**: View detailed Pokemon statistics including HP, Attack, Defense, Special Attack, Special Defense, and Speed
- **🎨 Modern UI**: Clean, intuitive interface with dark/light theme support

## 🛠️ Tech Stack

- **🏗️ Framework**: Next.js 15 with App Router
- **💻 Language**: TypeScript
- **🎨 Styling**: Tailwind CSS
- **🧩 UI Components**: Radix UI primitives
- **📈 Charts**: Recharts for stat visualizations
- **🎯 Icons**: Lucide React
- **🧪 Testing**: Vitest with Testing Library
- **🌐 API**: PokeAPI (https://pokeapi.co/)

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/pokemon-battle-simulator.git
cd pokemon-test
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### 🔍 Browsing Pokemon

- Scroll through the Pokemon grid to explore different Pokemon
- Use the type filter to narrow down Pokemon by their elemental types
- Click on any Pokemon card to select it for battle

### ⚔️ Battle Simulation

1. Select the first Pokemon by clicking on its card (it will be highlighted in blue)
2. Select the second Pokemon (highlighted in red)
3. Click "View Analysis" in the battle arena to see detailed stat comparisons
4. Use the radar chart to visualize the battle potential
5. Clear selections using the X buttons in the battle arena

### 🎮 Features Overview

- **♾️ Infinite Loading**: More Pokemon load automatically as you scroll
- **🏷️ Type Filtering**: Filter by specific Pokemon types or view all
- **📊 Stat Comparison**: Detailed breakdown of all six base stats
- **📱 Responsive Layout**: Works perfectly on all screen sizes

## 🧪 Testing

Run the test suite:

```bash
npm test
```

The project includes tests for:

- Pokemon data fetching actions
- Component rendering and interactions
- Battle calculations and utilities
- Integration tests for key user flows

## 📁 Project Structure

```
├── actions/                 # Server actions for API calls
│   └── pokemons.action.ts   # Pokemon data fetching logic
├── app/                     # Next.js app directory
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── Battle/              # Battle-related components
│   │   ├── BattleArena.tsx
│   │   ├── BattleHeader.tsx
│   │   ├── BattleModal.tsx
│   │   ├── BattleRadar.tsx
│   │   └── BattleWinner.tsx
│   ├── Filter/              # Filtering components
│   │   └── TypeFilter.tsx
│   ├── Pokemon/             # Pokemon display components
│   │   ├── PokemonCard.tsx
│   │   └── PokemonMain.tsx
│   ├── Skeleton/            # Loading skeleton components
│   ├── ui/                  # Reusable UI components
│   └── theme-provider.tsx   # Theme provider
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── tests/                   # Test files
│   ├── actions/             # Action tests
│   ├── integration/         # Integration tests
│   ├── mocks/               # Test mocks
│   └── unit/                # Unit tests
└── types/                   # TypeScript type definitions
    └── pokemon.ts           # Pokemon-related types
```

## 📜 Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Vitest test suite

## 🔗 API Reference

This project uses the [PokeAPI](https://pokeapi.co/) for Pokemon data. The main endpoints used are:

- `/api/v2/pokemon` - List Pokemon with pagination
- `/api/v2/pokemon/{id}` - Get detailed Pokemon information
- `/api/v2/type/{type}` - Get Pokemon by type
- `/api/v2/type` - List all Pokemon types

## 🙏 Acknowledgments

- Pokemon data provided by [PokeAPI](https://pokeapi.co/)
- Icons from [Lucide React](https://lucide.dev/)
- UI components built with [Radix UI](https://www.radix-ui.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
