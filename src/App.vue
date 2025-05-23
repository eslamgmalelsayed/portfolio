<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import ThemeToggle from './components/ThemeToggle.vue';
import DotNavigation from './components/DotNavigation.vue';
import { setLanguage } from './i18n';
import { applyLanguage, initializePreferences } from './utils/preferences';
import ChatBot from './components/ChatBot.vue';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Skills from './views/Skills.vue';
import Projects from './views/Projects.vue';
import Contact from './views/Contact.vue';

const { t, locale } = useI18n();
const availableLocales = ['en', 'ar'];

// Create a computed property for the current locale
const currentLocale = computed(() => locale.value as string);

// Custom cursor state
const cursorVisible = ref(false);
const cursorEnlarged = ref(false);
const isTouchDevice = ref(false);

// Dynamic component management
const currentSection = ref('Home');
const currentComponent = shallowRef(Home);

const components = {
  Home,
  About,
  Skills,
  Projects,
  Contact
};

const changeSection = (sectionName: string) => {
  currentSection.value = sectionName;
  currentComponent.value = components[sectionName as keyof typeof components];
};

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
  const x = e.clientX;
  const y = e.clientY;
  const transform = `translate(${x}px, ${y}px)`;
  
  // Update cursor elements directly for smoother movement
  const dot = document.querySelector('.cursor-dot') as HTMLElement;
  const outline = document.querySelector('.cursor-outline') as HTMLElement;
  
  if (dot && outline) {
    dot.style.transform = transform;
    outline.style.transform = transform;
    if (!cursorVisible.value) {
      cursorVisible.value = true;
    }
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
  <div :class="{ 'rtl': currentLocale === 'ar' }" class="min-h-screen bg-gray-100 dark:bg-[#011627] text-gray-800 dark:text-gray-200 transition-colors duration-200">
    <!-- Custom cursor (only shown on non-touch devices) -->
    <template v-if="!isTouchDevice">
      <div 
        class="cursor-dot" 
        :class="{ 'cursor-visible': cursorVisible }"
      ></div>
      <div 
        class="cursor-outline" 
        :class="{ 
          'cursor-visible': cursorVisible, 
          'cursor-enlarged': cursorEnlarged 
        }"
      ></div>
      <div 
        v-for="i in 5" 
        :key="i"
        class="cursor-trail" 
        :class="{ 'cursor-visible': cursorVisible }"
        :style="{ 
          animationDelay: `${i * 0.05}s`
        }"
      ></div>
    </template>
    
    <DotNavigation @section-change="changeSection" />
    <ChatBot @section-change="changeSection" />
    
    <main class="container mx-auto px-4 py-8 min-h-[calc(100vh-12rem)] overflow-hidden">
      <transition 
        :name="currentLocale === 'ar' ? 'slide-rtl' : 'slide-ltr'" 
        mode="out-in"
        appear
      >
        <component :is="currentComponent" :key="currentSection" />
      </transition>
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
                class="text-gray-400 hover:text-gray-100 dark:hover:text-white transition-colors border-r border-gray-300 dark:border-gray-700 pr-4"
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
                class="text-gray-400 hover:text-[#0077b5] dark:hover:text-[#0077b5] transition-colors border-r border-gray-300 dark:border-gray-700 pr-4"
                :aria-label="t('footer.linkedin')"
                :title="t('footer.linkedin')"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/966570359187" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="text-gray-400 hover:text-[#25D366] dark:hover:text-[#25D366] transition-colors"
                :aria-label="t('message.whatsapp') || 'WhatsApp'"
                :title="t('message.whatsapp') || 'WhatsApp'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div class="flex items-center space-x-4 rtl:space-x-reverse">
            <ThemeToggle />
            <button 
              @click="toggleLanguage"
              class="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {{ currentLocale === 'en' ? 'العربية' : 'English' }}
            </button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.rtl {
  direction: rtl;
}

/* Custom cursor styles */
.cursor-dot,
.cursor-outline {
  pointer-events: none;
  position: fixed;
  z-index: 9999;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  opacity: 0;
  transition: none;
  will-change: transform;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background-color: #3b82f6;
}

.cursor-outline {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(59, 130, 246, 0.5);
  transition: transform 0.1s ease-out;
}

.cursor-visible {
  opacity: 1;
}

.cursor-enlarged {
  transform: translate(-50%, -50%) scale(1.5);
}

.cursor-trail {
  pointer-events: none;
  position: fixed;
  width: 4px;
  height: 4px;
  background-color: rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  z-index: 9998;
  transform: translate(-50%, -50%);
  opacity: 0;
  animation: trail-fade 1s linear forwards;
}

@keyframes trail-fade {
  0% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.1);
  }
}

/* Slide transitions */
.slide-ltr-enter-active,
.slide-ltr-leave-active,
.slide-rtl-enter-active,
.slide-rtl-leave-active {
  transition: all 0.3s ease-out;
}

.slide-ltr-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-ltr-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.slide-rtl-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-rtl-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
