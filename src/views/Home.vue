<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted, onUnmounted, Ref, computed, watch } from 'vue';

const { t, locale } = useI18n();

// Typing effect for the introduction text
const introText = ref('');
const fullIntroText = ref(t('home.intro') || '');
const nameText = ref('');
const fullNameText = ref(t('home.name') || '');
const roleText = ref('');
const fullRoleText = ref(t('home.role') || '');
const showCursor = ref(true);

// Skills for the carousel - using computed property to make it reactive to language changes
const skills = computed(() => [
  { 
    name: t('home.skills.javascript'), 
    color: '#f7df1e', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' 
  },
  { 
    name: t('home.skills.vue'), 
    color: '#42b883', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' 
  },
  { 
    name: t('home.skills.typescript'), 
    color: '#3178c6', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' 
  },
  { 
    name: t('home.skills.vuetify'), 
    color: '#1867C0', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuetify/vuetify-original.svg' 
  },
]);

// Carousel state - simplified approach
const activeSkillIndex = ref(0);
const totalSkills = computed(() => skills.value?.length || 0);

// Get the current skill safely
const currentSkill = computed(() => {
  if (!skills.value || skills.value.length === 0 || activeSkillIndex.value >= skills.value.length) {
    return { name: '', color: '#ffffff', icon: '' };
  }
  return skills.value[activeSkillIndex.value];
});

// Store interval IDs for cleanup
const intervals = ref<number[]>([]);

// Function to simulate typing effect
const typeText = async (targetRef: Ref<string>, fullText: string, speed = 100) => {
  targetRef.value = '';
  // Safety check for undefined or null fullText
  if (!fullText) return;
  
  for (let i = 0; i < fullText.length; i++) {
    targetRef.value += fullText.charAt(i);
    await new Promise(resolve => setTimeout(resolve, speed));
  }
};

// Reset and restart animations when language changes
watch(locale, async () => {
  // Clear all intervals
  clearAllIntervals();
  
  // Reset carousel
  activeSkillIndex.value = 0;
  
  // Update text references with safety checks
  fullIntroText.value = t('home.intro') || '';
  fullNameText.value = t('home.name') || '';
  fullRoleText.value = t('home.role') || '';
  
  // Restart typing animations with safety checks
  await typeText(introText, fullIntroText.value, 80);
  await new Promise(resolve => setTimeout(resolve, 300));
  await typeText(nameText, fullNameText.value, 150);
  await new Promise(resolve => setTimeout(resolve, 500));
  await typeText(roleText, fullRoleText.value, 80);
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Restart intervals
  setupIntervals();
});

// Clear all intervals
const clearAllIntervals = () => {
  intervals.value.forEach(interval => {
    window.clearInterval(interval);
  });
  intervals.value = [];
};

// Function to set up intervals
const setupIntervals = () => {
  // Clear any existing intervals first
  clearAllIntervals();

  // Blink cursor effect
  const cursorInterval = window.setInterval(() => {
    showCursor.value = !showCursor.value;
  }, 1500);
  intervals.value.push(cursorInterval);
  
  // Simple carousel rotation - no animation, just index change
  const carouselInterval = window.setInterval(() => {
    if (totalSkills.value > 1) {
      activeSkillIndex.value = (activeSkillIndex.value + 1) % totalSkills.value;
    }
  }, 2000); // 2 seconds rotation interval
  intervals.value.push(carouselInterval);
};

// Start typing animation sequence
onMounted(async () => {
  await typeText(introText, fullIntroText.value, 80);
  await new Promise(resolve => setTimeout(resolve, 300));
  await typeText(nameText, fullNameText.value, 150);
  await new Promise(resolve => setTimeout(resolve, 500));
  await typeText(roleText, fullRoleText.value, 80);
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Set up intervals
  setupIntervals();
});

// Clean up intervals on component unmount
onUnmounted(() => {
  clearAllIntervals();
});

// Function to navigate to the previous skill
const previousSkill = () => {
  if (totalSkills.value > 1) {
    activeSkillIndex.value = (activeSkillIndex.value - 1 + totalSkills.value) % totalSkills.value;
  }
};

// Function to navigate to the next skill
const nextSkill = () => {
  if (totalSkills.value > 1) {
    activeSkillIndex.value = (activeSkillIndex.value + 1) % totalSkills.value;
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-16 min-h-screen flex flex-col justify-center">
    <div class="max-w-full mx-auto">
      <!-- Grid layout for main content -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left side: Introduction and name (spans 8 columns on large screens) -->
        <div class="lg:col-span-9">
          <div class="mb-6 text-gray-300 font-mono min-h-[2rem]">
            <p class="text-xl md:text-2xl">{{ introText }}&nbsp;</p>
          </div>
          
          <h1 class="text-6xl md:text-8xl font-bold mb-8 text-black dark:text-white font-mono break-words name-container min-h-[8rem]">
            {{ nameText }}
            <span class="cursor-container inline-block w-[1ch] h-[1em] align-middle relative">
              <span v-show="showCursor && nameText.length === fullNameText.length" class="cursor absolute top-0 left-0">|</span>
            </span>
            <span v-show="nameText.length === 0">&nbsp;</span>
          </h1>
          
          <p class="text-2xl md:text-4xl text-blue-500 font-mono mb-10 role-container min-h-[4rem]">
            {{ roleText }}
            <span class="cursor-container inline-block w-[1ch] h-[1em] align-middle relative">
              <span v-show="showCursor && roleText.length === fullRoleText.length && nameText.length === fullNameText.length" class="cursor absolute top-0 left-0">|</span>
            </span>
            <span v-show="roleText.length === 0">&nbsp;</span>
          </p>
          
          <div class="font-mono text-lg md:text-2xl mt-10 min-h-[5rem]">
            <div class="text-gray-500 dark:text-gray-400 font-mono mb-2">
              <p class="text-xl">{{ t('home.github') }}</p>
            </div>
            <span class="text-black dark:text-white">const</span> <span class="text-green-600 dark:text-green-400">githubLink</span> <span class="text-black dark:text-white">=</span> <span class="text-orange-600 dark:text-orange-300">"github.com/eslamgmalelsayed"</span>
          </div>
        </div>
        
        <!-- Right side: Current Tech Stack (spans 4 columns on large screens) -->
        <div class="lg:col-span-3 flex flex-col items-center justify-center">
          <div class="skills-section w-full">
            <div class="text-gray-500 dark:text-gray-400 font-mono mb-2 min-h-[2rem] text-center">
              <p class="text-xl text-center">{{ t('home.techStack') }}</p>
            </div>
            
            <!-- Skills grid - simplified approach -->
            <div class="skills-container relative">
              <div class="skills-display overflow-hidden relative rounded-lg bg-gray-200 dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-30">
                <div class="p-3">
                  <!-- Simple skill display with transition -->
                  <div class="carousel-container relative overflow-hidden h-24" role="region" aria-label="Skills carousel">
                    <transition name="fade" mode="out-in">
                      <div 
                        :key="activeSkillIndex"
                        class="skill-item flex justify-center"
                      >
                        <div 
                          class="skill-icon-wrapper p-3 rounded-lg text-center" 
                          :style="{ 
                            backgroundColor: (currentSkill?.color || '#ffffff') + '20',
                            '--skill-color': currentSkill?.color || '#ffffff' 
                          }"
                          role="group"
                          :aria-label="currentSkill?.name || ''"
                        >
                          <img 
                            :src="currentSkill?.icon || ''" 
                            :alt="currentSkill?.name || ''" 
                            class="w-10 h-10 mx-auto" 
                          />
                          <div class="text-sm font-medium text-black dark:text-white text-center mt-2">
                            {{ currentSkill?.name || '' }}
                          </div>
                        </div>
                      </div>
                    </transition>
                  </div>
                  
                  <div class="mt-3 text-gray-600 dark:text-gray-300 text-xs font-mono text-center" aria-live="polite">
                    <span class="text-green-600 dark:text-green-300">// </span>
                    <span>{{ t('home.skillCounter', { current: activeSkillIndex + 1, total: totalSkills }) }}</span>
                  </div>
                  
                  <!-- Carousel controls for accessibility -->
                  <div class="flex justify-center mt-2 space-x-2">
                    <button 
                      @click="previousSkill"
                      title="Previous skill" 
                      class="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                      aria-label="Previous skill"
                    >
                      ⬅️
                    </button>
                    <button 
                      @click="nextSkill" 
                      title="Next skill" 
                      class="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                      aria-label="Next skill"
                    >
                      ➡️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

:root.dark .code-block {
  background-color: #011627;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from, to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.skills-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

.skill-icon-wrapper {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(var(--skill-color), 0.3);
  transition: all 0.3s ease;
}

.skill-icon-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transform: translateX(-100%);
  animation: shine 2s infinite;
}

@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  20% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Fade transition for carousel */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
