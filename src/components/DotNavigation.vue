<template>
  <nav class="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 rtl:right-auto rtl:left-6">
    <ul class="flex flex-col gap-4">
      <li v-for="section in sections" :key="section.name">
        <button
          @click="changeSection(section.name)"
          class="relative group flex items-center"
          :aria-label="section.label"
        >
          <span 
            class="w-3 h-3 rounded-full transition-all duration-200 mr-2 rtl:ml-2 rtl:mr-0"
            :class="[
              activeSection === section.name 
                ? 'bg-blue-500 scale-125' 
                : 'bg-gray-400 dark:bg-gray-600 group-hover:scale-110'
            ]"
          ></span>
          <!-- Modern Popover -->
          <div 
            class="absolute right-full mr-8 rtl:right-auto rtl:left-full rtl:ml-8 rtl:mr-0 
                   opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out
                   backdrop-blur-md bg-white/80 dark:bg-gray-800/80
                   px-4 py-2 rounded-xl shadow-lg 
                   transform -translate-y-1/2 top-1/2 
                   translate-x-2 group-hover:translate-x-0
                   scale-95 group-hover:scale-100
                   pointer-events-none
                   border border-gray-200/50 dark:border-gray-700/50
                   flex items-center gap-2 min-w-[120px]"
          >
            <span class="text-lg">{{ section.emoji }}</span>
            <span class="text-sm font-medium whitespace-nowrap">{{ section.label }}</span>
          </div>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const emit = defineEmits(['sectionChange']);

const activeSection = ref('Home');

const sections = computed(() => [
  { name: 'Home', emoji: '👋', label: t('nav.home') },
  { name: 'About', emoji: '👨‍💻', label: t('nav.about') },
  { name: 'Skills', emoji: '🛠️', label: t('nav.skills') },
  { name: 'Projects', emoji: '🚀', label: t('nav.projects') },
  { name: 'Contact', emoji: '📧', label: t('nav.contact') }
]);

const changeSection = (sectionName: string) => {
  activeSection.value = sectionName;
  emit('sectionChange', sectionName);
};
</script>

<style scoped>
.rtl .group {
  flex-direction: row-reverse;
}

.backdrop-blur-md {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
