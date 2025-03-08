<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ThemeToggle from './components/ThemeToggle.vue';
import Navigation from './components/Navigation.vue';
import SeoManager from './components/SeoManager.vue';
import { setLanguage } from './i18n';
import { applyLanguage, initializePreferences } from './utils/preferences';

const { t, locale } = useI18n();
const availableLocales = ['en', 'ar'];

// Create a computed property for the current locale
const currentLocale = computed(() => locale.value as string);

// Custom cursor state
const cursorPosition = ref({ x: 0, y: 0 });
const cursorVisible = ref(false);
const cursorEnlarged = ref(false);
const isTouchDevice = ref(false);

// Function to switch language and store preference
const toggleLanguage = () => {
  const newLocale = currentLocale.value === 'en' ? 'ar' : 'en';
  setLanguage(newLocale as 'en' | 'ar');
  applyLanguage(newLocale as 'en' | 'ar');
};

// Set initial document direction and language
watch(
  currentLocale,
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
  <div :class="{ 'rtl': currentLocale === 'ar' }" class="min-h-screen bg-gray-100 dark:bg-[var(--dark-bg)] text-gray-800 dark:text-gray-200 transition-colors duration-200">
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
    
    <SeoManager />
    <Navigation />
    
    <main class="container mx-auto px-4 py-8 min-h-[calc(100vh-12rem)] overflow-hidden">
      <router-view v-slot="{ Component, route }">
        <transition 
          :name="currentLocale === 'ar' ? 'slide-rtl' : 'slide-ltr'" 
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
          <div class="flex items-center">
            <p class="text-gray-500 dark:text-gray-400 text-sm mr-2 rtl:ml-2 rtl:mr-0 hidden md:block">{{ t('footer.findMeIn') }}:</p>
            <div class="flex space-x-4 rtl:space-x-reverse">
              <a 
                href="https://github.com/eslamgmalelsayed" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="text-gray-400 hover:text-gray-100 dark:hover:text-white transition-colors"
                :aria-label="t('footer.github')"
                :title="t('footer.github')"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/eslamgamalelsayed/" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="text-gray-400 hover:text-blue-500 transition-colors"
                :aria-label="t('footer.linkedin')"
                :title="t('footer.linkedin')"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            &copy; {{ new Date().getFullYear() }} {{ t('footer.copyright') }}. {{ t('footer.language') }}: {{ currentLocale.toUpperCase() }}
          </p>
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
