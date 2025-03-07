<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import ThemeToggle from './components/ThemeToggle.vue';
import Navigation from './components/Navigation.vue';
import { setLanguage } from './i18n';
import { applyLanguage, initializePreferences } from './utils/preferences';

const { t, locale } = useI18n();
const availableLocales = ['en', 'ar'];

// Custom cursor state
const cursorPosition = ref({ x: 0, y: 0 });
const cursorVisible = ref(false);
const cursorEnlarged = ref(false);
const isTouchDevice = ref(false);

// Function to switch language and store preference
const toggleLanguage = () => {
  const newLocale = locale.value === 'en' ? 'ar' : 'en';
  setLanguage(newLocale);
  applyLanguage(newLocale as 'en' | 'ar');
};

// Set initial document direction and language
watch(
  () => locale.value,
  (newLocale) => {
    applyLanguage(newLocale as 'en' | 'ar');
  },
  { immediate: true }
);

// Custom cursor functions
const onMouseMove = (e: MouseEvent) => {
  cursorPosition.value = { x: e.clientX, y: e.clientY };
  if (!cursorVisible.value) {
    cursorVisible.value = true;
  }
};

const onMouseEnter = () => {
  cursorVisible.value = true;
};

const onMouseLeave = () => {
  cursorVisible.value = false;
};

const onMouseDown = () => {
  cursorEnlarged.value = true;
};

const onMouseUp = () => {
  cursorEnlarged.value = false;
};

const onLinkHover = () => {
  cursorEnlarged.value = true;
};

const onLinkLeave = () => {
  cursorEnlarged.value = false;
};

// Initialize app with stored preferences
onMounted(() => {
  // Initialize preferences from localStorage
  initializePreferences();
  
  // Check if device is touch-based
  isTouchDevice.value = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  
  if (!isTouchDevice.value) {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    // Add event listeners for links and buttons using event delegation
    document.body.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, .interactive') || 
          target.closest('a, button, .interactive')) {
        onLinkHover();
      }
    });
    
    document.body.addEventListener('mouseout', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, .interactive') || 
          target.closest('a, button, .interactive')) {
        onLinkLeave();
      }
    });
  }
});

// Clean up event listeners
onUnmounted(() => {
  if (!isTouchDevice.value) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseenter', onMouseEnter);
    document.removeEventListener('mouseleave', onMouseLeave);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
    
    // Remove event delegation listeners
    document.body.removeEventListener('mouseover', () => {});
    document.body.removeEventListener('mouseout', () => {});
  }
});
</script>

<template>
  <div :class="{ 'rtl': locale === 'ar' }" class="min-h-screen bg-gray-100 dark:bg-[var(--dark-bg)] text-gray-800 dark:text-gray-200 transition-colors duration-200">
    <!-- Custom cursor (only shown on non-touch devices) -->
    <template v-if="!isTouchDevice">
      <div 
        class="cursor-dot" 
        :class="{ 'cursor-visible': cursorVisible }"
        :style="{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px` 
        }"
      ></div>
      <div 
        class="cursor-outline" 
        :class="{ 
          'cursor-visible': cursorVisible, 
          'cursor-enlarged': cursorEnlarged 
        }"
        :style="{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px` 
        }"
      ></div>
      <div 
        v-for="i in 5" 
        :key="i"
        class="cursor-trail" 
        :class="{ 'cursor-visible': cursorVisible }"
        :style="{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px`,
          animationDelay: `${i * 0.05}s`
        }"
      ></div>
    </template>
    
    <Navigation />
    
    <main class="container mx-auto px-4 py-8 min-h-[calc(100vh-12rem)] overflow-hidden">
      <router-view v-slot="{ Component, route }">
        <transition 
          :name="locale === 'ar' ? 'slide-rtl' : 'slide-ltr'" 
          mode="out-in"
          appear
        >
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <footer class="bg-white dark:bg-[#011627] text-gray-700 dark:text-[#a9b7c6] border-t border-gray-200 dark:border-gray-700 py-6 mt-auto shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <p class="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">&copy; {{ new Date().getFullYear() }} Portfolio. {{ t('message.language') }}: {{ locale.toUpperCase() }}</p>
          
          <div class="flex">
            <a 
              href="https://github.com/eslamgmalelsayed" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="h-10 flex items-center px-4 text-gray-700 dark:text-[#a9b7c6] hover:text-black dark:hover:text-white transition-colors duration-200 relative border-r border-gray-200 dark:border-gray-700"
            >
              <span class="sr-only">GitHub</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/eslamgamalelsayed/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="h-10 flex items-center px-4 text-gray-700 dark:text-[#a9b7c6] hover:text-black dark:hover:text-white transition-colors duration-200 relative"
            >
              <span class="sr-only">LinkedIn</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.rtl {
  direction: rtl;
  text-align: right;
}

/* Custom dark mode colors */
.dark {
  --dark-bg: #011627;
  --dark-card: #01223d;
  --dark-btn-primary: #01223d;
  --dark-btn-primary-hover: #012e52;
  --dark-btn-secondary: #011627;
  --dark-btn-secondary-hover: #01223d;
}

/* Global styles */
.card {
  @apply bg-white dark:bg-[var(--dark-card)] rounded-lg shadow-md p-6 transition-colors duration-200 border border-gray-200 dark:border-gray-700;
}

.btn {
  @apply px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-primary {
  @apply bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-700 dark:bg-[var(--dark-btn-primary)] dark:text-white dark:hover:bg-[var(--dark-btn-primary-hover)] dark:focus:ring-blue-700;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 dark:bg-[var(--dark-btn-secondary)] dark:text-gray-200 dark:hover:bg-[var(--dark-btn-secondary-hover)] dark:focus:ring-gray-700;
}

/* Route transitions */
.slide-ltr-enter-active,
.slide-ltr-leave-active,
.slide-rtl-enter-active,
.slide-rtl-leave-active {
  transition: all 0.35s ease-out;
}

.slide-ltr-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-ltr-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.slide-rtl-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-rtl-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Custom cursor styles */
.cursor-dot,
.cursor-outline,
.cursor-trail {
  pointer-events: none;
  position: fixed;
  z-index: 9999;
  border-radius: 50%;
  opacity: 0;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  will-change: transform, opacity;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background-color: rgba(139, 92, 246, 0.9); /* Violet color with opacity */
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.6);
}

.dark .cursor-dot {
  background-color: rgba(147, 197, 253, 0.9); /* Blue color with opacity for dark mode */
  box-shadow: 0 0 10px rgba(147, 197, 253, 0.6);
}

.cursor-outline {
  width: 40px;
  height: 40px;
  background-color: rgba(139, 92, 246, 0.15); /* Violet with low opacity */
  transition: transform 0.2s ease, width 0.2s ease, height 0.2s ease, background-color 0.2s ease;
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
}

.dark .cursor-outline {
  background-color: rgba(147, 197, 253, 0.15); /* Blue with low opacity for dark mode */
  box-shadow: 0 0 15px rgba(147, 197, 253, 0.3);
}

.cursor-trail {
  width: 20px;
  height: 20px;
  background-color: rgba(139, 92, 246, 0.1); /* Violet with very low opacity */
  animation: cursorTrailFade 0.5s ease forwards;
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.2);
}

.dark .cursor-trail {
  background-color: rgba(147, 197, 253, 0.1); /* Blue with very low opacity for dark mode */
  box-shadow: 0 0 8px rgba(147, 197, 253, 0.2);
}

.cursor-visible {
  opacity: 1;
}

.cursor-enlarged {
  transform: translate(-50%, -50%) scale(1.5);
  background-color: rgba(139, 92, 246, 0.1); /* Violet with low opacity when enlarged */
}

.dark .cursor-enlarged {
  background-color: rgba(147, 197, 253, 0.1); /* Blue with low opacity when enlarged for dark mode */
}

@keyframes cursorTrailFade {
  0% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
  }
}

/* Text selection styles */
::selection {
  background-color: rgba(203, 213, 225, 0.6); /* Light grey with opacity */
  color: inherit;
}

.dark ::selection {
  background-color: rgba(71, 85, 105, 0.6); /* Darker grey for dark mode */
  color: inherit;
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .cursor-trail {
    display: none;
  }
  
  .slide-ltr-enter-active,
  .slide-ltr-leave-active,
  .slide-rtl-enter-active,
  .slide-rtl-leave-active {
    transition: opacity 0.3s ease-out;
    transform: none;
  }
  
  .slide-ltr-enter-from,
  .slide-rtl-enter-from {
    opacity: 0;
    transform: none;
  }
  
  .slide-ltr-leave-to,
  .slide-rtl-leave-to {
    opacity: 0;
    transform: none;
  }
  
  .cursor-dot,
  .cursor-outline {
    transition: opacity 0.3s ease;
    transform: translate(-50%, -50%);
  }
  
  .cursor-enlarged {
    transform: translate(-50%, -50%);
  }
}
</style>
