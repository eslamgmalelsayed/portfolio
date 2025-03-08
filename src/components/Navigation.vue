<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import ThemeToggle from './ThemeToggle.vue';

const { t, locale } = useI18n({ useScope: 'global' });
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
  // Get current locale and determine new locale
  const currentLang = locale.value;
  const newLang = currentLang === 'en' ? 'ar' : 'en';
  
  // Update the locale
  locale.value = newLang;
  
  // Update document attributes
  document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = newLang;
};

// Determine if the current route is active
const isActiveRoute = (routeName: string) => {
  if (!route || !route.name) return false;
  return route.name === routeName;
};

// Navigation links with emoji icons
const navLinks = [
  { name: 'Home', path: '/', label: t('nav.home'), emoji: '👋' },
  { name: 'About', path: '/about', label: t('nav.about'), emoji: '👨‍💻' },
  { name: 'Skills', path: '/skills', label: t('nav.skills'), emoji: '🛠️' },
  { name: 'Projects', path: '/projects', label: t('nav.projects'), emoji: '🚀' },
  { name: 'Contact', path: '/contact', label: t('nav.contact'), emoji: '📧' }
];

// Close mobile menu when window is resized to desktop size
const handleResize = () => {
  if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
};

// Add event listeners
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

// Remove event listeners
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
        <router-link 
          to="/" 
          class="flex items-center px-4 h-full font-bold text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          @click="closeMobileMenu"
        >
          <span class="mr-2">🚀</span>
          <span>Eslam</span>
        </router-link>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex h-full">
          <router-link 
            v-for="link in navLinks" 
            :key="link.name"
            :to="link.path"
            :class="[
              'flex items-center px-4 h-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200',
              isActiveRoute(link.name) ? 'active-link' : ''
            ]"
          >
            <span class="mr-1.5 rtl:ml-1.5 rtl:mr-0">{{ link.emoji }}</span>
            <span>{{ link.label }}</span>
          </router-link>
        </div>
      </div>
      
      <!-- Right side controls -->
      <div class="flex items-center space-x-2 rtl:space-x-reverse px-4">
        <!-- Theme Toggle -->
        <ThemeToggle />
        
        <!-- Language Toggle -->
        <button
          @click="toggleLanguage"
          class="px-3 py-1.5 text-sm rounded-md font-medium bg-gray-100 dark:bg-[#1d3b53] text-gray-700 dark:text-[#a9b7c6] border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-[#2c5282] hover:text-black dark:hover:text-white transition-colors duration-200 focus:outline-none"
          aria-label="Toggle language"
        >
          {{ locale === 'en' ? 'العربية' : 'English' }}
        </button>
      
        <!-- Mobile Menu Button - only visible on mobile -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          aria-controls="mobile-menu"
          :aria-expanded="isMobileMenuOpen"
        >
          <span class="sr-only">{{ isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu') }}</span>
          <!-- Icon when menu is closed -->
          <svg 
            class="h-6 w-6" 
            :class="{ 'hidden': isMobileMenuOpen, 'block': !isMobileMenuOpen }"
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <!-- Icon when menu is open -->
          <svg 
            class="h-6 w-6" 
            :class="{ 'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }"
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Mobile menu, show/hide based on menu state -->
    <div 
      id="mobile-menu" 
      class="md:hidden"
      :class="{ 'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }"
    >
      <div class="px-4 py-6 flex-1 flex flex-col">
        <!-- Close button at the top right -->
        <div class="flex justify-end mb-8">
          <button 
            @click="closeMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          >
            <span class="sr-only">{{ t('nav.closeMenu') }}</span>
            <svg 
              class="h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Mobile Navigation Links -->
        <div class="flex flex-col space-y-4 mb-8">
          <router-link 
            v-for="link in navLinks" 
            :key="link.name"
            :to="link.path"
            :class="[
              'flex items-center px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200',
              isActiveRoute(link.name) ? 'active-link-mobile' : ''
            ]"
            @click="closeMobileMenu"
          >
            <span class="mr-2 rtl:ml-2 rtl:mr-0 text-xl">{{ link.emoji }}</span>
            <span class="text-lg">{{ link.label }}</span>
          </router-link>
        </div>
        
        <!-- Mobile Controls -->
        <div class="flex flex-col space-y-4">
          <!-- Language Toggle -->
          <button
            @click="toggleLanguage"
            class="px-4 py-2 text-base rounded-md font-medium bg-gray-100 dark:bg-[#1d3b53] text-gray-700 dark:text-[#a9b7c6] border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-[#2c5282] hover:text-black dark:hover:text-white transition-colors duration-200 focus:outline-none"
            aria-label="Toggle language"
          >
            {{ locale === 'en' ? 'العربية' : 'English' }}
          </button>
        </div>
        
      </div>
    </div>
  </nav>
</template>

<style scoped>
.active-link {
  color: black !important;
  font-weight: 600;
  position: relative;
}

.active-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: currentColor;
}

.dark .active-link {
  color: white !important;
}

.active-link-mobile {
  color: black !important;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.05);
}

.dark .active-link-mobile {
  color: white !important;
  background-color: rgba(255, 255, 255, 0.05);
}

/* RTL Support */
.rtl .active-link::after {
  right: 0;
  left: auto;
}
</style>
