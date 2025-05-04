# Eslam Gamal's Portfolio

A modern, responsive portfolio website built with Vue.js, featuring dark/light mode, multilingual support (English and Arabic), dynamic navigation, and a playful UI with emoji icons.

## 🚀 Demo

[https://eslamgmalelsayed.com](https://eslamgmalelsayed.com)
## 🚀 Features

- **Dynamic Navigation**: Single-page experience with smooth component transitions
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Toggle between light and dark themes with persistent preference
- **Multilingual Support**: Full support for English and Arabic languages with RTL layout
- **Interactive UI**: Animated components and smooth transitions
- **Playful Elements**: Custom emoji icons and animated timeline
- **Project Showcase**: Filterable project gallery with search functionality
- **Contact Form**: Interactive contact form with EmailJS integration
- **Interactive ChatBot**: AI-powered chat assistant for easy navigation
- **Timeline Animation**: Interactive timeline with pulsing nodes and animations
- **Consistent Social Links**: Unified social media links across components
- **Persistent Preferences**: User theme and language preferences saved in localStorage
- **Progressive Web App**: Offline support with service worker caching
- **Accessibility Features**: Proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Vue.js 3**: Progressive JavaScript framework
- **Vue Router**: Official router for Vue.js
- **Vue I18n**: Internationalization plugin for Vue.js
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Typed JavaScript at scale
- **Vite**: Next generation frontend tooling
- **EmailJS**: Email delivery service for contact form
- **Service Workers**: PWA offline support

## 🏗️ Project Structure

```
portfolio/
├── public/              # Static assets and service worker
├── src/
│   ├── assets/          # Project assets (images, fonts, etc.)
│   ├── components/      # Reusable Vue components
│   │   ├── Navigation.vue   # Site navigation with language toggle
│   │   ├── ThemeToggle.vue  # Dark/light mode toggle
│   │   ├── ChatBot.vue      # Interactive chat assistant
│   │   └── ...          # Other components
│   ├── locales/         # Translation files (en, ar)
│   ├── views/           # Page components
│   │   ├── Home.vue     # Homepage with project showcase
│   │   ├── About.vue    # About page with timeline
│   │   ├── Contact.vue  # Contact page with form
│   │   └── ...          # Other views
│   ├── App.vue          # Root component with dynamic navigation
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

The site is deployed using Netlify's continuous deployment:

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Set up environment variables if needed
4. Deploy!

## 📱 PWA Support

The portfolio includes Progressive Web App support:

- Offline functionality
- App-like experience on mobile devices
- Automatic caching of static assets
- Custom install prompt
- Service worker for background sync

## 🎨 Customization

### Theme

The color scheme can be customized in `tailwind.config.js`:
- Light mode colors in the default theme
- Dark mode colors in the dark variant
- Custom animations and transitions in the CSS

### Content

Update the content in:
- Translation files in `src/locales/`
- Component text in individual `.vue` files
- Project data in the components

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details

## 👤 Contact

- GitHub: [@eslamgmalelsayed](https://github.com/eslamgmalelsayed)
- LinkedIn: [eslamgamalelsayed](https://www.linkedin.com/in/eslamgamalelsayed/)
- Location: Riyadh, Saudi Arabia
