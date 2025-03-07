<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline';
import { getThemePreference, saveThemePreference, applyTheme } from '../utils/preferences';

const { t } = useI18n();
const isDark = ref(false);
const isAnimating = ref(false);

// Function to toggle dark mode with animation
const toggleDarkMode = () => {
  if (isAnimating.value) return; // Prevent multiple clicks during animation
  
  isAnimating.value = true;
  isDark.value = !isDark.value;
  
  // Reset animation state after animation completes
  setTimeout(() => {
    isAnimating.value = false;
  }, 600); // Match this with the CSS animation duration
  
  updateTheme();
};

// Function to update theme based on isDark value
const updateTheme = () => {
  const theme = isDark.value ? 'dark' : 'light';
  saveThemePreference(theme);
  applyTheme(theme);
};

// Initialize theme based on user preference or system preference
onMounted(() => {
  // Get saved preference using our utility
  const savedTheme = getThemePreference();
  
  // Set initial state based on preference
  if (savedTheme === 'system') {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  } else {
    isDark.value = savedTheme === 'dark';
  }
  
  // Apply initial theme
  updateTheme();
  
  // Listen for system preference changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = (e: MediaQueryListEvent) => {
    if (getThemePreference() === 'system') {
      isDark.value = e.matches;
      updateTheme();
    }
  };
  
  // Add event listener
  mediaQuery.addEventListener('change', handleChange);
  
  // Clean up event listener on component unmount
  onUnmounted(() => {
    mediaQuery.removeEventListener('change', handleChange);
  });
});

// Watch for changes to isDark and update theme
watch(isDark, () => {
  updateTheme();
});
</script>

<template>
  <button 
    @click="toggleDarkMode" 
    class="theme-toggle relative w-10 h-10 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 bg-gray-100 dark:bg-[#1d3b53] border border-gray-200 dark:border-gray-600"
    :aria-label="isDark ? t('message.theme') + ': ' + t('message.light') : t('message.theme') + ': ' + t('message.dark')"
  >
    <div class="relative overflow-hidden w-6 h-6">
      <!-- Sun icon -->
      <SunIcon 
        class="absolute inset-0 w-6 h-6 text-yellow-500 transition-transform duration-500 ease-in-out"
        :class="isDark ? 'translate-y-10' : 'translate-y-0'"
      />
      
      <!-- Moon icon -->
      <MoonIcon 
        class="absolute inset-0 w-6 h-6 text-blue-400 transition-transform duration-500 ease-in-out"
        :class="isDark ? 'translate-y-0' : '-translate-y-10'"
      />
    </div>
    
    <!-- Animation elements -->
    <div 
      v-if="isAnimating" 
      class="absolute inset-0 rounded-full overflow-hidden"
    >
      <div 
        v-if="isDark" 
        class="theme-toggle-animation-dark absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-900 opacity-0"
      ></div>
      <div 
        v-else 
        class="theme-toggle-animation-light absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-300 opacity-0"
      ></div>
    </div>
  </button>
</template>

<style scoped>
.theme-toggle-animation-dark {
  animation: theme-toggle-fade 0.6s ease-in-out;
}

.theme-toggle-animation-light {
  animation: theme-toggle-fade 0.6s ease-in-out;
}

@keyframes theme-toggle-fade {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.5);
  }
  100% {
    opacity: 0;
    transform: scale(2);
  }
}
</style>
