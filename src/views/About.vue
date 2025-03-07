<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Add TypeScript declaration for window.planeInterval
declare global {
  interface Window {
    planeInterval: number | NodeJS.Timeout | undefined;
  }
}

const { t } = useI18n();

// Experience timeline animation
const planePosition = ref(0);
const experiencePositions = ref<number[]>([]);
const currentPlaneIndex = ref(0);

// Update plane positions based on current DOM
const updatePlanePositions = () => {
  // Specifically target the timeline emoji containers
  const timelineNodes = document.querySelectorAll('.experience-item .timeline-node');
  const positions: number[] = [];
  
  timelineNodes.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    // Get the center position of each timeline node
    const position = rect.top + window.scrollY + rect.height / 2 - 12;
    positions.push(position);
  });
  
  // Only update positions if we found timeline nodes
  if (positions.length > 0) {
    experiencePositions.value = positions;
  }
  
  // Set initial position
  if (positions.length > 0) {
    planePosition.value = positions[0];
    currentPlaneIndex.value = 0;
  }
};

// Start the plane animation
const startPlaneAnimation = () => {
  // Clear any existing interval
  if (window.planeInterval) {
    clearInterval(window.planeInterval);
  }
  
  // Force update positions to ensure we have the latest
  updatePlanePositions();
  
  // Set initial position to the first node
  if (experiencePositions.value.length > 0) {
    planePosition.value = experiencePositions.value[0];
    currentPlaneIndex.value = 0;
  }
  
  // Create a new interval to move the plane every 3 seconds
  window.planeInterval = setInterval(() => {
    // Make sure we have valid positions
    if (experiencePositions.value.length === 0) {
      updatePlanePositions();
      return;
    }
    
    // Move to the next position
    currentPlaneIndex.value = (currentPlaneIndex.value + 1) % experiencePositions.value.length;
    
    // If we've reached the end, reset to the beginning after a pause
    if (currentPlaneIndex.value === 0) {
      // We're at the beginning of a new cycle
      setTimeout(() => {
        // Update the plane position to the first node
        planePosition.value = experiencePositions.value[0];
      }, 1000); // 1 second pause before restarting
    } else {
      // Update the plane position immediately
      planePosition.value = experiencePositions.value[currentPlaneIndex.value];
    }
  }, 3000);
};

// Initialize the experience positions and start the plane animation
onMounted(() => {
  // Clear any existing interval first
  if (window.planeInterval) {
    clearInterval(window.planeInterval);
  }
  
  // Wait for the DOM to be fully rendered
  setTimeout(() => {
    updatePlanePositions();
    
    // Add window resize listener to update positions when window size changes
    window.addEventListener('resize', updatePlanePositions);
    
    // Add scroll event listener to update plane positions when scrolling
    window.addEventListener('scroll', updatePlanePositions);
    
    // Start the plane animation with a delay to ensure DOM is ready
    setTimeout(() => {
      startPlaneAnimation();
    }, 1000);
  }, 500);
});

// Clean up when component is unmounted
onBeforeUnmount(() => {
  if (window.planeInterval) {
    clearInterval(window.planeInterval);
  }
  window.removeEventListener('resize', updatePlanePositions);
  window.removeEventListener('scroll', updatePlanePositions);
});
</script>

<template>
  <div class="container mx-auto px-4 py-16 min-h-screen flex flex-col justify-center">
    <div class="max-w-full mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-black dark:text-white">{{ t('message.about') }}</h1>
      
      <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/3">
          <!-- Profile image with simple display -->
          <div class="profile-card relative overflow-hidden rounded-lg">
            <!-- SVG Illustration -->
            <div class="flex items-center justify-center">
              <svg 
                viewBox="0 0 400 300" 
                class="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <!-- Background -->
                <rect width="400" height="300" rx="10" fill="#0f172a" class="dark:fill-[#01223d]" />
                
                <!-- Desk -->
                <rect x="50" y="200" width="300" height="20" rx="2" fill="#64748b" class="dark:fill-blue-800" />
                <rect x="70" y="220" width="260" height="10" rx="1" fill="#475569" class="dark:fill-blue-900" />
                
                <!-- Animated signature "Eslam" under the laptop - text based approach -->
                <g class="signature-container" aria-label="Eslam signature" role="img">
                  <!-- Letter E -->
                  <path d="M130,235 h20 m-20,7 h15 m-15,8 h20" 
                        stroke="#f472b6" stroke-width="3" fill="none" 
                        stroke-linecap="round" class="signature-letter" />
                  
                  <!-- Letter S -->
                  <path d="M160,235 c5,-5 15,-5 15,0 c0,5 -15,10 -15,15 c0,5 10,5 15,0" 
                        stroke="#f472b6" stroke-width="3" fill="none" 
                        stroke-linecap="round" class="signature-letter" />
                  
                  <!-- Letter L -->
                  <path d="M185,235 v15 h10" 
                        stroke="#f472b6" stroke-width="3" fill="none" 
                        stroke-linecap="round" class="signature-letter" />
                  
                  <!-- Letter A -->
                  <path d="M205,250 v-15 m0,15 v-15 c0,-5 10,-5 10,0 v15 m-10,-7 h10" 
                        stroke="#f472b6" stroke-width="3" fill="none" 
                        stroke-linecap="round" class="signature-letter" />
                  
                  <!-- Letter M -->
                  <path d="M225,250 v-15 l7,10 l7,-10 v15" 
                        stroke="#f472b6" stroke-width="3" fill="none" 
                        stroke-linecap="round" class="signature-letter" />
                  
                  <!-- Decorative underline -->
                  <path d="M125,255 q40,10 80,0 q40,-10 80,0" 
                        stroke="#f472b6" stroke-width="2" fill="none" 
                        stroke-linecap="round" class="signature-underline" />
                </g>
                
                <!-- Computer (with animation) -->
                <g class="laptop-animation">
                  <rect x="120" y="120" width="160" height="100" rx="5" fill="#1e293b" class="dark:fill-blue-950" />
                  <rect x="125" y="125" width="150" height="85" rx="2" fill="#0ea5e9" class="dark:fill-blue-600" />
                  
                  <!-- Code on screen -->
                  <rect x="135" y="135" width="130" height="65" rx="2" fill="#0f172a" class="dark:fill-[#01223d]" />
                  <line x1="145" y1="145" x2="185" y2="145" stroke="#a855f7" stroke-width="2" class="dark:stroke-blue-400" />
                  <line x1="145" y1="155" x2="195" y2="155" stroke="#ec4899" stroke-width="2" class="dark:stroke-blue-300" />
                  <line x1="155" y1="165" x2="215" y2="165" stroke="#a855f7" stroke-width="2" class="dark:stroke-blue-400" />
                  <line x1="145" y1="175" x2="205" y2="175" stroke="#ec4899" stroke-width="2" class="dark:stroke-blue-300" />
                  <line x1="155" y1="185" x2="185" y2="185" stroke="#a855f7" stroke-width="2" class="dark:stroke-blue-400" />
                </g>
                
                <!-- Person -->
                <!-- Head -->
                <circle cx="200" cy="80" r="25" fill="#f8fafc" class="dark:fill-gray-200" />
                <!-- Body -->
                <path d="M180,105 L180,160 C180,160 190,170 200,170 C210,170 220,160 220,160 L220,105 Z" fill="#8b5cf6" class="dark:fill-blue-600" />
                <!-- Arms -->
                <path d="M180,110 C180,110 160,120 150,145 C145,155 155,160 160,150 C165,140 180,125 180,125" fill="#8b5cf6" class="dark:fill-blue-600" />
                <path d="M220,110 C220,110 240,120 250,145 C255,155 245,160 240,150 C235,140 220,125 220,125" fill="#8b5cf6" class="dark:fill-blue-600" />
                
                <!-- Emoji elements with animations -->
                <text x="240" y="50" font-family="sans-serif" font-size="24" fill="white" class="emoji-float-1">💻</text>
                <text x="140" y="50" font-family="sans-serif" font-size="24" fill="white" class="emoji-float-2">🚀</text>
                <text x="300" y="150" font-family="sans-serif" font-size="24" fill="white" class="emoji-float-3">⚡</text>
                <text x="80" y="150" font-family="sans-serif" font-size="24" fill="white" class="emoji-float-4">🔍</text>
                
                <!-- Decorative elements with animations -->
                <circle cx="50" cy="50" r="15" fill="#8b5cf6" class="dark:fill-blue-500 opacity-60 circle-pulse-1" />
                <circle cx="350" cy="250" r="15" fill="#ec4899" class="dark:fill-blue-400 opacity-60 circle-pulse-2" />
                <path d="M30,200 Q100,150 170,200" stroke="#a855f7" stroke-width="2" fill="none" class="dark:stroke-blue-400 path-dash-1" />
                <path d="M230,200 Q300,150 370,200" stroke="#ec4899" stroke-width="2" fill="none" class="dark:stroke-blue-300 path-dash-2" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="md:w-2/3">
          <h2 class="text-2xl font-semibold mb-4 text-black dark:text-white">{{ t('about.title') }}</h2>
          <div class="text-gray-600 dark:text-gray-300 mb-6">
            {{ t('about.description') }}
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <!-- Education Section -->
            <div class="mb-12">
              <h2 class="text-2xl font-bold mb-6 text-violet-700 dark:text-blue-400 flex items-center">
                <span class="mr-2" role="img" aria-label="Education">🎓</span>
                {{ t('about.education.title') }}
              </h2>
              
              <div class="grid grid-cols-1 gap-6 max-w-md">
                <!-- Education Card 1 -->
                <div class="bg-white dark:bg-[#01223d] rounded-xl shadow-md p-5 border border-violet-200 dark:border-blue-900 w-full">
                  <div class="flex flex-col md:flex-row md:items-start">
                    <!-- University Logo/Icon -->
                    <div class="flex-shrink-0 mb-3 md:mb-0 md:mr-5 flex justify-center">
                      <div class="w-14 h-14 bg-violet-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <span class="text-2xl" role="img" aria-label="University">🏛️</span>
                      </div>
                    </div>
                    
                    <!-- Education Details -->
                    <div class="overflow-hidden flex-grow">
                      <h3 class="text-lg font-bold text-violet-700 dark:text-blue-400">{{ t('about.education.degree') }}</h3>
                      <p class="text-gray-700 dark:text-gray-300 font-medium text-sm">{{ t('about.education.university') }}</p>
                      <p class="text-gray-600 dark:text-gray-400 text-xs">{{ t('about.education.date') }}</p>
                      <p class="mt-2 text-gray-800 dark:text-gray-200 text-sm">{{ t('about.education.description') }}</p>
                    </div>
                  </div>
                </div>
                
                <!-- Education Card 2 -->
                <div class="bg-white dark:bg-[#01223d] rounded-xl shadow-md p-5 border border-violet-200 dark:border-blue-900 w-full">
                  <div class="flex flex-col md:flex-row md:items-start">
                    <!-- Course Logo/Icon -->
                    <div class="flex-shrink-0 mb-3 md:mb-0 md:mr-5 flex justify-center">
                      <div class="w-14 h-14 bg-violet-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <span class="text-2xl" role="img" aria-label="Course">📚</span>
                      </div>
                    </div>
                    
                    <!-- Course Details -->
                    <div class="overflow-hidden flex-grow">
                      <h3 class="text-lg font-bold text-violet-700 dark:text-blue-400">{{ t('about.course') }}</h3>
                      <p class="text-gray-600 dark:text-gray-400 text-xs">{{ t('about.courseDate') }}</p>
                      <p class="mt-2 text-gray-800 dark:text-gray-200 text-sm">{{ t('about.courseDescription') }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Experience Timeline -->
            <div class="relative">
              <h3 class="text-xl font-bold mb-4 text-violet-700 dark:text-blue-400 flex items-center">
                <span class="mr-2" role="img" aria-label="Experience">🚀</span>
                {{ t('about.experience') }}
              </h3>
              
              <!-- Paper Airplane Journey Line -->
              <div class="absolute top-12 bottom-0 w-16 h-full overflow-hidden z-10" :class="{ 'left-0': $i18n.locale === 'en', 'right-0': $i18n.locale === 'ar' }">
                <svg class="absolute h-full w-16" :class="{ 'left-0': $i18n.locale === 'en', 'right-0': $i18n.locale === 'ar' }" viewBox="0 0 40 300" preserveAspectRatio="none">
                  <!-- Curvy path for the journey -->
                  <path 
                    class="journey-path"
                    :d="$i18n.locale === 'en' ? 'M 10,0 C 5,50 30,100 10,150 C -10,200 20,250 10,300' : 'M 30,0 C 35,50 10,100 30,150 C 50,200 20,250 30,300'"
                    stroke="currentColor" 
                    stroke-width="2" 
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    :class="{'text-violet-500 dark:text-blue-500': true}"
                  />
                </svg>
                
                <!-- Paper plane emoji that points to each job title -->
                <div class="plane-container" :class="{ 'left-0': $i18n.locale === 'en', 'right-0 rtl-plane': $i18n.locale === 'ar' }">
                  <span class="plane-emoji" :style="{ top: planePosition + 'px' }">✈️</span>
                </div>
              </div>
              
              <!-- Experience Item 1 -->
              <div class="mb-16 relative experience-item">
                <!-- Timeline emoji icon with animated pulse -->
                <div class="absolute bg-white dark:bg-[#01223d] w-14 h-14 rounded-full flex items-center justify-center border-2 border-violet-500 dark:border-blue-500 shadow-md timeline-emoji z-10 timeline-node" :class="{ '-left-8': $i18n.locale === 'en', '-right-8': $i18n.locale === 'ar' }">
                  <span class="text-2xl" role="img" aria-label="Developer">👨‍💻</span>
                </div>
                
                <!-- Content card with hover effect -->
                <div class="bg-white dark:bg-[#01223d] rounded-lg p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-gray-700" :class="{ 'ml-8': $i18n.locale === 'en', 'mr-8': $i18n.locale === 'ar' }">
                  <div class="flex items-center justify-between mb-2">
                    <div class="font-bold text-lg text-black dark:text-white">{{ t('about.job1Title') }}</div>
                    <div class="text-emerald-600 dark:text-emerald-400 font-medium text-sm px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 whitespace-nowrap flex items-center">
                      <span class="mr-1" role="img" aria-label="Current">⏳</span>
                      {{ t('about.job1Date') }}
                    </div>
                  </div>
                  
                  <div class="text-black dark:text-blue-300 font-medium mb-2">{{ t('about.job1Company') }}</div>
                  
                  <div class="text-gray-600 dark:text-gray-300">
                    <ul class="list-disc pl-5 space-y-1">
                      <li>{{ t('about.job1Bullet1') }}</li>
                      <li>{{ t('about.job1Bullet2') }}</li>
                      <li>{{ t('about.job1Bullet3') }}</li>
                      <li>{{ t('about.job1Bullet4') }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <!-- Experience Item 2 -->
              <div class="mb-16 relative experience-item">
                <!-- Timeline emoji icon -->
                <div class="absolute bg-white dark:bg-[#01223d] w-14 h-14 rounded-full flex items-center justify-center border-2 border-violet-500 dark:border-blue-500 shadow-md timeline-emoji z-10 timeline-node" :class="{ '-left-8': $i18n.locale === 'en', '-right-8': $i18n.locale === 'ar' }">
                  <span class="text-2xl" role="img" aria-label="Freelancer">🚀</span>
                </div>
                
                <!-- Content card with hover effect -->
                <div class="bg-white dark:bg-[#01223d] rounded-lg p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-gray-700" :class="{ 'ml-8': $i18n.locale === 'en', 'mr-8': $i18n.locale === 'ar' }">
                  <div class="flex items-center justify-between mb-2">
                    <div class="font-bold text-lg text-black dark:text-white">{{ t('about.job2Title') }}</div>
                    <div class="text-violet-600 dark:text-blue-400 font-medium text-sm px-2 py-1 rounded-full bg-violet-100 dark:bg-blue-900/30 whitespace-nowrap">{{ t('about.job2Date') }}</div>
                  </div>
                  
                  <div class="text-black dark:text-blue-300 font-medium mb-2">{{ t('about.job2Company') }}</div>
                  
                  <div class="text-gray-600 dark:text-gray-300">
                    <ul class="list-disc pl-5 space-y-1">
                      <li>{{ t('about.job2Bullet1') }}</li>
                      <li>{{ t('about.job2Bullet2') }}</li>
                      <li>{{ t('about.job2Bullet3') }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <!-- Experience Item 3 -->
              <div class="relative experience-item">
                <!-- Timeline emoji icon -->
                <div class="absolute bg-white dark:bg-[#01223d] w-14 h-14 rounded-full flex items-center justify-center border-2 border-violet-500 dark:border-blue-500 shadow-md timeline-emoji z-10 timeline-node" :class="{ '-left-8': $i18n.locale === 'en', '-right-8': $i18n.locale === 'ar' }">
                  <span class="text-2xl" role="img" aria-label="Intern">🌱</span>
                </div>
                
                <!-- Content card with hover effect -->
                <div class="bg-white dark:bg-[#01223d] rounded-lg p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-gray-700" :class="{ 'ml-8': $i18n.locale === 'en', 'mr-8': $i18n.locale === 'ar' }">
                  <div class="flex items-center justify-between mb-2">
                    <div class="font-bold text-lg text-black dark:text-white">{{ t('about.job3Title') }}</div>
                    <div class="text-violet-600 dark:text-blue-400 font-medium text-sm px-2 py-1 rounded-full bg-violet-100 dark:bg-blue-900/30 whitespace-nowrap">{{ t('about.job3Date') }}</div>
                  </div>
                  
                  <div class="text-black dark:text-blue-300 font-medium mb-2">{{ t('about.job3Company') }}</div>
                  
                  <div class="text-gray-600 dark:text-gray-300">
                    <ul class="list-disc pl-5 space-y-1">
                      <li>{{ t('about.job3Bullet1') }}</li>
                    </ul>
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

/* Timeline emoji styles */
.timeline-emoji {
  filter: drop-shadow(0 0 5px rgba(147, 197, 253, 0.3));
}

/* Timeline animations */
.chain-links {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chain-link {
  font-size: 24px;
  margin-bottom: 10px;
  animation: float 3s ease-in-out infinite;
  opacity: 0;
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.chain-link:hover {
  transform: scale(1.3) rotate(15deg);
  filter: drop-shadow(0 0 5px rgba(99, 102, 241, 0.7));
}

:root.dark .chain-link:hover {
  filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.7));
}

.chain-link:nth-child(1) { animation-delay: 0.1s; }
.chain-link:nth-child(2) { animation-delay: 0.3s; }
.chain-link:nth-child(3) { animation-delay: 0.5s; }
.chain-link:nth-child(4) { animation-delay: 0.7s; }
.chain-link:nth-child(5) { animation-delay: 0.9s; }
.chain-link:nth-child(6) { animation-delay: 1.1s; }
.chain-link:nth-child(7) { animation-delay: 1.3s; }

@keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  50% {
    transform: translateY(-5px) rotate(5deg);
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 1;
  }
}

.timeline-node {
  animation: pulse 2s infinite;
  position: relative;
}

.timeline-node::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.4);
  z-index: -1;
  opacity: 0;
  transform: scale(1);
  animation: ripple 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
}

@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* Dark mode adjustments */
:root.dark .timeline-node::after {
  background: rgba(59, 130, 246, 0.4);
}

:root.dark .timeline-node {
  animation: pulseDark 2s infinite;
}

@keyframes pulseDark {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

/* Timeline animations */
.journey-path {
  stroke-dasharray: 500;
  stroke-dashoffset: 500;
  animation: dash 3s linear forwards;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

.plane-container {
  position: absolute;
  width: 16px;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.plane-emoji {
  position: absolute;
  font-size: 1.5rem;
  filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.7));
  animation: glow 2s infinite alternate;
  transition: top 0.5s ease-in-out;
  z-index: 30;
  transform: translateY(-50%); /* Center vertically relative to its position */
}

.rtl-plane .plane-emoji {
  transform: scaleX(-1) translateY(-50%); /* Maintain vertical centering while flipping horizontally */
}

:root.dark .plane-emoji {
  filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.7));
}

@keyframes glow {
  0% {
    filter: drop-shadow(0 0 3px rgba(99, 102, 241, 0.7));
  }
  100% {
    filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.7));
  }
}

/* Adjust timeline for RTL */
:root[dir="rtl"] .experience-item {
  direction: rtl;
}

/* Ensure the timeline nodes are positioned correctly in RTL */
:root[dir="rtl"] .timeline-node {
  right: -8px;
  left: auto;
}

/* Ensure the content cards have proper margin in RTL */
:root[dir="rtl"] .experience-item > div:not(.timeline-node) {
  margin-right: 2rem;
  margin-left: 0;
}

/* Add laptop animation */
@keyframes laptop-float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
}

.laptop-animation {
  animation: laptop-float 2s ease-in-out infinite;
  transform-origin: center;
}

/* Emoji floating animations with different timings */
@keyframes emoji-float-1 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-3px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

@keyframes emoji-float-2 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(-5deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

@keyframes emoji-float-3 {
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-4px) scale(1.1); }
  100% { transform: translateY(0) scale(1); }
}

@keyframes emoji-float-4 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-3px) rotate(10deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

.emoji-float-1 {
  animation: emoji-float-1 3s ease-in-out infinite;
  transform-origin: center;
}

.emoji-float-2 {
  animation: emoji-float-2 2.5s ease-in-out infinite;
  transform-origin: center;
}

.emoji-float-3 {
  animation: emoji-float-3 2.7s ease-in-out infinite;
  transform-origin: center;
}

.emoji-float-4 {
  animation: emoji-float-4 3.2s ease-in-out infinite;
  transform-origin: center;
}

/* Circle pulse animations */
@keyframes circle-pulse {
  0% { opacity: 0.6; r: 15; }
  50% { opacity: 0.8; r: 18; }
  100% { opacity: 0.6; r: 15; }
}

.circle-pulse-1 {
  animation: circle-pulse 4s ease-in-out infinite;
}

.circle-pulse-2 {
  animation: circle-pulse 3.5s ease-in-out infinite;
  animation-delay: 1s;
}

/* Path dash animations */
@keyframes path-dash {
  0% { stroke-dasharray: 0, 500; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 500, 0; stroke-dashoffset: 0; }
  100% { stroke-dasharray: 500, 0; stroke-dashoffset: 500; }
}

.path-dash-1 {
  animation: path-dash 15s linear infinite;
}

.path-dash-2 {
  animation: path-dash 15s linear infinite;
  animation-delay: 7.5s;
}

/* Signature text styling */
.signature-letter {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw-letter 0.8s ease-in-out forwards;
  filter: drop-shadow(0 0 2px rgba(244, 114, 182, 0.7));
}

.signature-letter:nth-child(1) { animation-delay: 0s; }
.signature-letter:nth-child(2) { animation-delay: 0.5s; }
.signature-letter:nth-child(3) { animation-delay: 1s; }
.signature-letter:nth-child(4) { animation-delay: 1.5s; }
.signature-letter:nth-child(5) { animation-delay: 2s; }

.signature-underline {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: draw-letter 1s ease-in-out forwards;
  animation-delay: 2.5s;
}

@keyframes draw-letter {
  to {
    stroke-dashoffset: 0;
  }
}

.dark .signature-letter,
.dark .signature-underline {
  stroke: #93c5fd;
}

.signature-container {
  animation: signature-reset 8s infinite;
  animation-delay: 4s;
}

@keyframes signature-reset {
  0%, 10% {
    opacity: 1;
  }
  15% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  25%, 100% {
    opacity: 1;
  }
}
</style>
