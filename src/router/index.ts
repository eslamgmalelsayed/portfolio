import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Import views
const Home = () => import('../views/Home.vue')
const About = () => import('../views/About.vue')
const Skills = () => import('../views/Skills.vue')
const Projects = () => import('../views/Projects.vue')
const Contact = () => import('../views/Contact.vue')
const NotFound = () => import('../views/NotFound.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      description: 'Eslam Gamal Elsayed - Frontend Developer specializing in Vue.js and modern web technologies',
      keywords: 'frontend developer, vue.js, javascript, portfolio, web development',
      ogImage: '/images/home-og.jpg'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About',
      description: 'Learn about Eslam Gamal Elsayed - Frontend Developer with experience in Vue.js, JavaScript, and web development',
      keywords: 'about, frontend developer, experience, education, vue.js, javascript',
      ogImage: '/images/about-og.jpg'
    }
  },
  {
    path: '/skills',
    name: 'Skills',
    component: Skills,
    meta: {
      title: 'Skills',
      description: 'Explore the technical skills and expertise of Eslam Gamal Elsayed - Frontend Developer',
      keywords: 'skills, frontend, vue.js, javascript, html, css, typescript, web development',
      ogImage: '/images/skills-og.jpg'
    }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: {
      title: 'Projects',
      description: 'View the portfolio of projects developed by Eslam Gamal Elsayed - Frontend Developer',
      keywords: 'projects, portfolio, web applications, vue.js, javascript, frontend development',
      ogImage: '/images/projects-og.jpg'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contact',
      description: 'Get in touch with Eslam Gamal Elsayed - Frontend Developer based in Riyadh, Saudi Arabia',
      keywords: 'contact, email, hire, frontend developer, Riyadh, Saudi Arabia',
      ogImage: '/images/contact-og.jpg'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '404 Not Found',
      description: 'Page not found - Eslam Gamal Elsayed Portfolio',
      robots: 'noindex, nofollow'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update page title and meta tags based on route meta
router.beforeEach((to, from, next) => {
  // Update document title
  document.title = `Eslam Gamal Elsayed | ${to.meta.title || 'Portfolio'}`
  
  // Update meta description
  let descriptionMeta = document.querySelector('meta[name="description"]')
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', to.meta.description as string || 'Eslam Gamal Elsayed - Frontend Developer Portfolio')
  }
  
  // Update meta keywords
  let keywordsMeta = document.querySelector('meta[name="keywords"]')
  if (keywordsMeta && to.meta.keywords) {
    keywordsMeta.setAttribute('content', to.meta.keywords as string)
  }
  
  // Update Open Graph meta tags
  let ogTitleMeta = document.querySelector('meta[property="og:title"]')
  if (ogTitleMeta) {
    ogTitleMeta.setAttribute('content', `Eslam Gamal Elsayed | ${to.meta.title || 'Portfolio'}`)
  }
  
  let ogDescriptionMeta = document.querySelector('meta[property="og:description"]')
  if (ogDescriptionMeta) {
    ogDescriptionMeta.setAttribute('content', to.meta.description as string || 'Eslam Gamal Elsayed - Frontend Developer Portfolio')
  }
  
  let ogUrlMeta = document.querySelector('meta[property="og:url"]')
  if (ogUrlMeta) {
    ogUrlMeta.setAttribute('content', `https://eslamgmalelsayed.com${to.path}`)
  }
  
  let ogImageMeta = document.querySelector('meta[property="og:image"]')
  if (ogImageMeta && to.meta.ogImage) {
    ogImageMeta.setAttribute('content', to.meta.ogImage as string)
  }
  
  // Update Twitter Card meta tags
  let twitterTitleMeta = document.querySelector('meta[name="twitter:title"]')
  if (twitterTitleMeta) {
    twitterTitleMeta.setAttribute('content', `Eslam Gamal Elsayed | ${to.meta.title || 'Portfolio'}`)
  }
  
  let twitterDescriptionMeta = document.querySelector('meta[name="twitter:description"]')
  if (twitterDescriptionMeta) {
    twitterDescriptionMeta.setAttribute('content', to.meta.description as string || 'Eslam Gamal Elsayed - Frontend Developer Portfolio')
  }
  
  let twitterImageMeta = document.querySelector('meta[name="twitter:image"]')
  if (twitterImageMeta && to.meta.ogImage) {
    twitterImageMeta.setAttribute('content', to.meta.ogImage as string)
  }
  
  // Handle robots meta tag for pages that should not be indexed
  let robotsMeta = document.querySelector('meta[name="robots"]')
  if (!robotsMeta) {
    robotsMeta = document.createElement('meta')
    robotsMeta.setAttribute('name', 'robots')
    document.head.appendChild(robotsMeta)
  }
  
  if (to.meta.robots) {
    robotsMeta.setAttribute('content', to.meta.robots as string)
  } else {
    robotsMeta.setAttribute('content', 'index, follow')
  }
  
  next()
})

export default router
