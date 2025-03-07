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
      title: 'Home'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About'
    }
  },
  {
    path: '/skills',
    name: 'Skills',
    component: Skills,
    meta: {
      title: 'Skills'
    }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: {
      title: 'Projects'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contact'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '404 Not Found'
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

// Update page title based on route meta
router.beforeEach((to, from, next) => {
  document.title = `Portfolio | ${to.meta.title || 'Home'}`
  next()
})

export default router
