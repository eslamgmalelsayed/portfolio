<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import ThemeToggle from './ThemeToggle.vue';

const { t, locale } = useI18n();
const route = useRoute();

// Mobile menu state
const isMobileMenuOpen = ref(false);

// Function to toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Function to close mobile menu
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Function to switch language
const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'ar' : 'en';
  document.documentElement.dir = locale.value === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = locale.value;
};

// Determine if the current route is active
const isActiveRoute = (routeName: string) => {
  if (!route || !route.name) return false;
  return route.name === routeName;
};

// Navigation links with emoji icons
const navLinks = [
  { name: 'Home', path: '/', label: 'Hi', emoji: '👋' },
  { name: 'About', path: '/about', label: 'About', emoji: '👨‍💻' },
  { name: 'Skills', path: '/skills', label: 'Skills', emoji: '🛠️' },
  { name: 'Projects', path: '/projects', label: 'Projects', emoji: '🚀' },
  { name: 'Contact', path: '/contact', label: 'Contact', emoji: '📧' }
];

// Social links with emoji icons
const socialLinks = [
  { 
    name: 'GitHub', 
    url: 'https://github.com/eslamgmalelsayed', 
    emoji: '💻'
  },
  { 
    name: 'Website', 
    url: 'https://example.com', 
    emoji: '🌐'
  },
  { 
    name: 'Telegram', 
    url: 'https://t.me/username', 
    emoji: '✈️'
  }
];

// Close mobile menu when window is resized to desktop size
const handleResize = () => {
  if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
    closeMobileMenu();
  }
};

// Add event listeners
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

// Clean up event listeners
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <nav class="bg-white dark:bg-[#011627] text-gray-700 dark:text-[#a9b7c6] border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
    <div class="flex items-center justify-between h-16">
      <!-- Logo and Navigation Links -->
      <div class="flex items-center h-full">
        <!-- Logo -->
        <div class="flex-shrink-0 px-8 h-full flex items-center border-r border-gray-200 dark:border-gray-700">
          <router-link to="/" class="text-xl font-bold text-black dark:text-white logo-link">
            Eslam Gamal
          </router-link>
        </div>
        
        <!-- Desktop Navigation - next to logo -->
        <div class="hidden md:flex items-center h-full" role="navigation">
          <router-link 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path"
            class="h-full flex items-center px-6 text-gray-700 dark:text-[#a9b7c6] hover:text-black dark:hover:text-white transition-colors duration-200 relative border-r border-gray-200 dark:border-gray-700"
            :class="{ 'active-link': isActiveRoute(link.name) }"
            :aria-current="isActiveRoute(link.name) ? 'page' : undefined"
          >
          {{ link.label }}
            <span class="ml-1 rtl:ml-1 rtl:mr-0 text-blue-500 dark:text-yellow-400" aria-hidden="true">{{ link.emoji }}</span>
          </router-link>
        </div>
      </div>
        
      <!-- Theme, Language toggles and Mobile Menu Button -->
      <div class="flex items-center space-x-4 rtl:space-x-reverse px-4 h-full">
        <ThemeToggle title="Toggle theme" />
        <button 
          @click="toggleLanguage"
          title="Toggle language"
          class="px-3 py-1.5 text-sm rounded-md font-medium bg-gray-100 dark:bg-[#1d3b53] text-gray-700 dark:text-[#a9b7c6] border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-[#2c5282] hover:text-black dark:hover:text-white transition-colors duration-200 focus:outline-none"
          aria-label="Toggle language"
        >
          {{ locale === 'en' ? 'العربية' : 'English' }}
        </button>
      
        <!-- Mobile Menu Button - only visible on mobile -->
        <button 
          id="nav-toggle"
          @click.stop="toggleMobileMenu"
          class="md:hidden focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700 dark:text-[#a9b7c6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700 dark:text-[#a9b7c6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Mobile Navigation Menu - Full Screen -->
    <div 
      v-if="isMobileMenuOpen" 
      class="md:hidden fixed inset-0 bg-white dark:bg-[#011627] z-50 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <div class="px-4 py-6 flex-1 flex flex-col">
        <!-- Close button at the top right -->
        <div class="flex justify-end mb-8">
          <button 
            @click.stop="closeMobileMenu"
            class="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            aria-label="Close navigation menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-700 dark:text-[#a9b7c6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Navigation Links - Centered -->
        <div class="flex-1 flex flex-col justify-center items-center space-y-8" role="navigation">
          <router-link 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path"
            class="text-2xl text-gray-700 dark:text-[#a9b7c6] hover:text-black dark:hover:text-white transition-colors duration-200 flex items-center"
            :class="{ 'text-black dark:text-white': isActiveRoute(link.name) }"
            @click.stop="closeMobileMenu"
            :aria-current="isActiveRoute(link.name) ? 'page' : undefined"
          >
            <span class="mr-2 rtl:ml-2 rtl:mr-0 text-blue-500 dark:text-yellow-400" aria-hidden="true">{{ link.emoji }}</span>
            {{ link.label }}
          </router-link>
        </div>
        
        <!-- Theme and Language toggles at the bottom -->
        <div class="flex justify-center space-x-6 rtl:space-x-reverse py-8">
          <ThemeToggle />
          <button 
            @click="toggleLanguage" 
            class="px-4 py-2 text-base rounded-md font-medium bg-gray-100 dark:bg-[#1d3b53] text-gray-700 dark:text-[#a9b7c6] border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-[#2c5282] hover:text-black dark:hover:text-white transition-colors duration-200 focus:outline-none"
            aria-label="Toggle language"
          >
            {{ locale === 'en' ? 'العربية' : 'English' }}
          </button>
        </div>
        
        <!-- Social links at the bottom -->
        <div class="flex flex-col items-center pb-4">
          <p class="text-gray-500 dark:text-gray-400 text-sm mb-3">find me in:</p>
          <div class="flex space-x-6 rtl:space-x-reverse">
            <a 
              v-for="link in socialLinks" 
              :key="link.name" 
              :href="link.url" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-gray-700 dark:text-[#a9b7c6] hover:text-black dark:hover:text-white"
              :aria-label="link.name"
            >
              <span class="sr-only">{{ link.name }}</span>
              <span>{{ link.emoji }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.active-link {
  color: black !important;
  position: relative;
}

.active-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: rgb(59, 130, 246);
  z-index: 10;
}

:root.dark .active-link {
  color: white !important;
}

:root.dark .active-link::after {
  background-color: rgb(247, 140, 108);
}

/* Hover effect for non-active links */
.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: rgb(59, 130, 246);
  z-index: 10;
}

:root.dark .router-link-exact-active::after {
  background-color: rgb(247, 140, 108);
}

/* Hover effect for all links */
a.router-link-exact-active {
  color: black !important;
}

:root.dark a.router-link-exact-active {
  color: white !important;
}

a:not(.router-link-exact-active):hover {
  position: relative;
}

a:not(.router-link-exact-active):hover::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: rgba(59, 130, 246, 0.5);
}

:root.dark a:not(.router-link-exact-active):hover::after {
  background-color: rgba(247, 140, 108, 0.5);
}

/* Logo link - no border or outline on hover */
.logo-link {
  outline: none;
  text-decoration: none;
  position: relative;
}

.logo-link::after {
  display: none;
}

.logo-link:hover {
  text-decoration: none;
  outline: none;
}
</style>
