# Eslam Gamal's Portfolio

A modern, responsive portfolio website built with Vue.js, featuring dark/light mode, multilingual support (English and Arabic), and a playful UI with emoji icons.

## 🚀 Demo

[https://eslamgmalelsayed.com](https://eslamgmalelsayed.com)

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Toggle between light and dark themes with persistent preference
- **Multilingual Support**: Full support for English and Arabic languages with RTL layout
- **Interactive UI**: Animated components and smooth transitions
- **Playful Elements**: Custom emoji icons throughout the interface
- **Project Showcase**: Filterable project gallery with search functionality
- **Contact Form**: Interactive contact form with EmailJS integration
- **Timeline Animation**: Interactive timeline with animated plane emoji
- **Consistent Social Links**: Unified social media links across components
- **Persistent Preferences**: User theme and language preferences saved in localStorage
- **Accessibility Features**: Proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Vue.js 3**: Progressive JavaScript framework
- **Vue Router**: Official router for Vue.js
- **Vue I18n**: Internationalization plugin for Vue.js
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Typed JavaScript at scale
- **Vite**: Next generation frontend tooling
- **EmailJS**: Email delivery service for contact form

## 🏗️ Project Structure

```
portfolio/
├── public/              # Static assets
├── src/
│   ├── assets/          # Project assets (images, fonts, etc.)
│   ├── components/      # Reusable Vue components
│   │   ├── Navigation.vue   # Site navigation with language toggle
│   │   ├── ThemeToggle.vue  # Dark/light mode toggle
│   │   └── ...          # Other components
│   ├── locales/         # Translation files (en, ar)
│   ├── router/          # Vue Router configuration
│   ├── views/           # Page components
│   │   ├── Home.vue     # Homepage with project showcase
│   │   ├── About.vue    # About page with timeline
│   │   ├── Contact.vue  # Contact page with form
│   │   └── ...          # Other views
│   ├── App.vue          # Root component with footer
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

### Social Links

Social links are displayed in three locations:
- Footer (App.vue)
- Mobile navigation menu (Navigation.vue)
- Contact page (Contact.vue)

To update social links, modify them in all three locations to maintain consistency.

## 🌍 Internationalization

The portfolio supports both English and Arabic languages with proper RTL support for Arabic. Language preference is stored in localStorage for persistence between sessions.

To add a new language:
1. Create a new locale file in `src/locales/[language-code]/index.ts`
2. Add the language option in the language toggle in `Navigation.vue`
3. Update the i18n configuration in `i18n.ts`

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Eslam Gamal**
- Email: [eslamgmal1@gmail.com](mailto:eslamgmal1@gmail.com)
- Website: [eslamgamal.com](https://github.com/eslamgmalelsayed)
- GitHub: [@eslamgmalelsayed](https://github.com/eslamgmalelsayed)
- LinkedIn: [eslamgamalelsayed](https://www.linkedin.com/in/eslamgamalelsayed/)
- Location: Riyadh, Saudi Arabia
