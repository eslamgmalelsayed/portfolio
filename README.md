# Eslam Gamal's Portfolio

A modern, responsive portfolio website built with Vue.js, featuring dark/light mode, multilingual support (English and Arabic), and a playful UI with emoji icons.

![Portfolio Preview](https://eslamgmalelsayed.com)

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Toggle between light and dark themes with persistent preference
- **Multilingual Support**: Full support for English and Arabic languages
- **Interactive UI**: Animated components and smooth transitions
- **Playful Elements**: Custom emoji icons throughout the interface
- **Project Showcase**: Filterable project gallery with search functionality
- **Contact Form**: Interactive contact form with validation
- **Persistent Preferences**: User theme and language preferences saved in localStorage

## 🛠️ Tech Stack

- **Vue.js 3**: Progressive JavaScript framework
- **Vue Router**: Official router for Vue.js
- **Vue I18n**: Internationalization plugin for Vue.js
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Typed JavaScript at scale
- **Vite**: Next generation frontend tooling

## 🏗️ Project Structure

```
portfolio/
├── public/              # Static assets
├── src/
│   ├── assets/          # Project assets (images, fonts, etc.)
│   ├── components/      # Reusable Vue components
│   ├── locales/         # Translation files (en, ar)
│   ├── router/          # Vue Router configuration
│   ├── views/           # Page components
│   ├── App.vue          # Root component
│   ├── i18n.ts          # Internationalization setup
│   └── main.ts          # Application entry point
├── index.html           # HTML entry point
├── package.json         # Project dependencies
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/eslamgmalelsayed/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and visit `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally

## 🌐 Deployment

The site can be deployed to any static hosting service:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service of choice (Netlify, Vercel, GitHub Pages, etc.)

## 🎨 Customization

### Changing Content

Most of the content can be modified in the locale files:
- English: `src/locales/en/index.ts`
- Arabic: `src/locales/ar/index.ts`

### Modifying Theme

The theme colors can be adjusted in the `tailwind.config.js` file.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Eslam Gamal**
- Website: [eslamgamal.com](https://github.com/eslamgmalelsayed)
- GitHub: [@eslamgmalelsayed](https://github.com/eslamgmalelsayed)
