# Portfolio Documentation

Welcome to the portfolio project documentation. This guide will help you understand the project structure and how to get started.

## Table of Contents
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Guide](#development-guide)
- [Deployment](#deployment)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Git

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

## Project Structure
```
portfolio/
├── src/
│   ├── assets/        # Images, fonts, and other static files
│   ├── components/    # Reusable Vue components
│   ├── views/         # Page components
│   ├── router/        # Vue Router configuration
│   ├── store/         # State management (if used)
│   └── utils/         # Helper functions
├── public/            # Public static assets
├── docs/             # Documentation
└── tests/            # Test files
```

## Development Guide

### Code Style
- Follow the [Vue.js Style Guide](https://vuejs.org/style-guide/)
- Use ESLint for code linting
- Use Prettier for code formatting

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run linter

### Key Features
- Responsive design
- Dark/Light mode toggle
- Portfolio projects showcase
- Contact form
- Blog section (if applicable)

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
1. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/portfolio/',
  // ...other config
})
```

2. Run deployment script:
```bash
npm run deploy
```

### Environment Variables
Create a `.env` file in the root directory:
```
VITE_API_URL=your_api_url
VITE_CONTACT_EMAIL=your_email
```

## Contributing
Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.