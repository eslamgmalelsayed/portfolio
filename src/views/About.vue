<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { onMounted } from 'vue';

const { t } = useI18n();

// Initialize the animations
onMounted(() => {
  // Add any initialization code here if needed
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
                <rect width="400" height="300" rx="10" fill="#f8fafc" class="dark:fill-[#01223d]" />
                
                <!-- Desk -->
                <rect x="50" y="200" width="300" height="20" rx="2" fill="#94a3b8" class="dark:fill-blue-800" />
                <rect x="70" y="220" width="260" height="10" rx="1" fill="#64748b" class="dark:fill-blue-900" />
                
                <!-- Animated signature "Eslam" under the laptop - text based approach -->
                <g class="signature-container" aria-label="Eslam signature" role="img">
                  <!-- Letter E -->
                  <path d="M130,235 h20 m-20,7 h15 m-15,8 h20" 
                        stroke="#d946ef" stroke-width="3" fill="none" 
                        stroke-linecap="round" class="signature-letter dark:stroke-[#f472b6]" />
                  
                  <!-- Letter S -->
                  <path d="M160,235 c5,-5 15,-5 15,0 c0,5 -15,10 -15,15 c0,5 10,5 15,0" 
                        stroke="#d946ef" stroke-width="3" fill="none" 
                        stroke-linecap="round" class="signature-letter dark:stroke-[#f472b6]" />
                  
                  <!-- Letter L -->
                  <path d="M185,235 v15 h10" 
                        stroke="#d946ef" stroke-width="3" fill="none" 
                        stroke-linecap="round" class="signature-letter dark:stroke-[#f472b6]" />
                  
                  <!-- Letter A -->
                  <path d="M205,250 v-15 m0,15 v-15 c0,-5 10,-5 10,0 v15 m-10,-7 h10" 
                        stroke="#d946ef" stroke-width="3" fill="none" 
                        stroke-linecap="round" class="signature-letter dark:stroke-[#f472b6]" />
                  
                  <!-- Letter M -->
                  <path d="M225,250 v-15 l7,10 l7,-10 v15" 
                        stroke="#d946ef" stroke-width="3" fill="none" 
                        stroke-linecap="round" class="signature-letter dark:stroke-[#f472b6]" />
                  
                  <!-- Decorative underline -->
                  <path d="M125,255 q40,10 80,0 q40,-10 80,0" 
                        stroke="#d946ef" stroke-width="2" fill="none" 
                        stroke-linecap="round" class="signature-underline dark:stroke-[#f472b6]" />
                </g>
                
                <!-- Computer (with animation) -->
                <g class="laptop-animation">
                  <rect x="120" y="120" width="160" height="100" rx="5" fill="#475569" class="dark:fill-blue-950" />
                  <rect x="125" y="125" width="150" height="85" rx="2" fill="#0ea5e9" class="dark:fill-blue-600" />
                  
                  <!-- Code on screen -->
                  <rect x="135" y="135" width="130" height="65" rx="2" fill="#334155" class="dark:fill-[#01223d]" />
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
                <text x="240" y="50" font-family="sans-serif" font-size="24" fill="#334155" class="emoji-float-1 dark:fill-white">💻</text>
                <text x="140" y="50" font-family="sans-serif" font-size="24" fill="#334155" class="emoji-float-2 dark:fill-white">🚀</text>
                <text x="300" y="150" font-family="sans-serif" font-size="24" fill="#334155" class="emoji-float-3 dark:fill-white">⚡</text>
                <text x="100" y="100" font-family="sans-serif" font-size="24" fill="#334155" class="emoji-float-4 dark:fill-white">🔍</text>
                
                <!-- Decorative elements -->
                <circle cx="175" cy="50" r="20" fill="#8b5cf6" class="dark:fill-blue-600 opacity-60 circle-pulse-1" />
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
          
          <!-- CV Download Button -->
          <div class="mb-8">
            <a 
              href="https://drive.google.com/file/d/1sQR8DwhO1li835HVyIMKljI4Zi2nKAa6/view?usp=drive_link" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center px-6 py-3 bg-violet-600 dark:bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-violet-700 dark:hover:bg-blue-700 transition-colors duration-200 transform hover:-translate-y-1"
            >
              <span class="mr-2 text-xl" role="img" aria-label="Document">📄</span>
              {{ t('about.downloadCV') }}
            </a>
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
                      <h3 class="text-lg font-bold text-black dark:text-blue-400">{{ t('about.education.degree') }}</h3>
                      <p class="text-black dark:text-blue-300 font-medium text-sm">{{ t('about.education.university') }}</p>
                      <p class="text-emerald-600 dark:text-emerald-400 font-medium text-xs px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 whitespace-nowrap inline-flex items-center mt-1">
                        <span class="mr-1" role="img" aria-label="Date">⏳</span>
                        {{ t('about.education.date') }}
                      </p>
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
                      <h3 class="text-lg font-bold text-black dark:text-blue-400">{{ t('about.course') }}</h3>
                      <p class="text-black dark:text-blue-300 font-medium text-sm">{{ t('about.courseProvider') }}</p>
                      <p class="text-emerald-600 dark:text-emerald-400 font-medium text-xs px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 whitespace-nowrap inline-flex items-center mt-1">
                        <span class="mr-1" role="img" aria-label="Date">⏳</span>
                        {{ t('about.courseDate') }}
                      </p>
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
              
              <!-- Flying plane emoji with sparkle landing effects -->
              <div class="flying-plane-container">
                <span class="flying-plane" role="img" aria-label="Flying plane">✈️</span>
                <div class="landing-effect landing-1">
                  <span class="landing-emoji landing-sparkle" role="img" aria-label="Sparkle">✨</span>
                </div>
                <div class="landing-effect landing-2">
                  <span class="landing-emoji landing-sparkle" role="img" aria-label="Sparkle">✨</span>
                </div>
                <div class="landing-effect landing-3">
                  <span class="landing-emoji landing-sparkle" role="img" aria-label="Sparkle">✨</span>
                </div>
                <div class="landing-effect landing-4">
                  <span class="landing-emoji landing-sparkle" role="img" aria-label="Sparkle">✨</span>
                </div>
              </div>
              
              <!-- Timeline with animated journey path -->
              <div class="relative h-full">
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
                      <div class="text-emerald-600 dark:text-emerald-400 font-medium text-xs px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 whitespace-nowrap inline-flex items-center">
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

/* Circle pulse animations with different timings */
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

/* Laptop animation */
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

/* Timeline path animation */
.timeline-path {
  animation: draw-line 1.5s ease-out forwards,
             pulse-line 2s infinite;
}

@keyframes draw-line {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes pulse-line {
  50% {
    stroke-width: 3px;
    stroke-opacity: 0.8;
  }
}

.timeline-segment {
  fill: none;
  stroke-linecap: round;
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: 
    draw-segment 1s ease-out forwards,
    pulse-segment 1.5s infinite;
}

@keyframes draw-segment {
  to { stroke-dashoffset: 0; }
}

@keyframes pulse-segment {
  50% { stroke-width: 3px; opacity: 0.8; }
}

/* Flying plane animation */
.flying-plane-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.flying-plane {
  position: absolute;
  font-size: 24px;
  animation: fly-plane 15s ease-in-out infinite;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
  z-index: 20;
  will-change: transform, top, left;
}

/* Smoke effects when the plane lands */
.landing-effect {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  opacity: 0;
  z-index: 15;
  transform: scale(0) rotate(0deg);
  will-change: transform, opacity;
}

.landing-emoji {
  position: absolute;
  font-size: 20px;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.1));
}

.landing-sparkle {
  font-size: 20px;
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% {
    transform: scale(0.8) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.2) rotate(15deg);
    opacity: 1;
  }
}

.landing-1 {
  top: 10px;
  left: 50%;
  animation: landing-appear 15s ease-in-out infinite;
  animation-delay: 1.5s;
}

.landing-2 {
  top: 50%;
  left: 90%;
  animation: landing-appear 15s ease-in-out infinite;
  animation-delay: 4.5s;
}

.landing-3 {
  top: 95%;
  left: 50%;
  animation: landing-appear 15s ease-in-out infinite;
  animation-delay: 7.5s;
}

.landing-4 {
  top: 50%;
  left: 10%;
  animation: landing-appear 15s ease-in-out infinite;
  animation-delay: 10.5s;
}

@keyframes landing-appear {
  0%, 95% {
    opacity: 0;
    transform: scale(0) rotate(-10deg);
  }
  2% {
    opacity: 1;
    transform: scale(0.5) rotate(5deg);
  }
  3% {
    transform: scale(1.2) rotate(-5deg);
  }
  5% {
    transform: scale(1) rotate(0deg);
  }
  8% {
    opacity: 1;
    transform: scale(1.1) rotate(5deg);
  }
  10% {
    opacity: 0;
    transform: scale(0) rotate(10deg);
  }
}

/* RTL support for landing effects */
[dir="rtl"] .landing-1 {
  right: 50%;
  left: auto;
}

[dir="rtl"] .landing-2 {
  right: 90%;
  left: auto;
}

[dir="rtl"] .landing-3 {
  right: 50%;
  left: auto;
}

[dir="rtl"] .landing-4 {
  right: 10%;
  left: auto;
}

[dir="rtl"] .landing-sparkle {
  left: -10px;
  right: auto;
}

/* RTL support for the flying plane */
[dir="rtl"] .flying-plane {
  animation-name: fly-plane-rtl;
}

@keyframes fly-plane-rtl {
  /* Start position - top right corner */
  0% {
    top: 0;
    right: 0;
    transform: rotate(-25deg) scaleX(-1);
  }
  
  /* Fly across top */
  10% {
    top: 10px;
    right: 50%;
    transform: rotate(0deg) scaleX(-1);
  }
  
  /* Top left corner */
  20% {
    top: 0;
    right: 100%;
    transform: rotate(25deg) scaleX(-1);
  }
  
  /* Fly down left side */
  30% {
    top: 50%;
    right: 90%;
    transform: rotate(90deg) scaleX(-1);
  }
  
  /* Bottom left corner */
  40% {
    top: 100%;
    right: 100%;
    transform: rotate(135deg) scaleX(-1);
  }
  
  /* Fly across bottom */
  50% {
    top: 95%;
    right: 50%;
    transform: rotate(180deg) scaleX(-1);
  }
  
  /* Bottom right corner */
  60% {
    top: 100%;
    right: 0;
    transform: rotate(-135deg) scaleX(-1);
  }
  
  /* Fly up right side */
  70% {
    top: 50%;
    right: 10%;
    transform: rotate(-90deg) scaleX(-1);
  }
  
  /* Diagonal across center */
  80% {
    top: 40%;
    right: 60%;
    transform: rotate(45deg) scaleX(-1);
  }
  
  /* Loop around center */
  90% {
    top: 60%;
    right: 40%;
    transform: rotate(-225deg) scaleX(-1);
  }
  
  /* Return to start */
  100% {
    top: 0;
    right: 0;
    transform: rotate(-25deg) scaleX(-1);
  }
}

@keyframes fly-plane {
  /* Start position - top left corner */
  0% {
    top: 0;
    left: 0;
    transform: rotate(25deg);
  }
  
  /* Fly across top */
  10% {
    top: 10px;
    left: 50%;
    transform: rotate(0deg);
  }
  
  /* Top right corner */
  20% {
    top: 0;
    left: 100%;
    transform: rotate(-25deg);
  }
  
  /* Fly down right side */
  30% {
    top: 50%;
    left: 90%;
    transform: rotate(-90deg);
  }
  
  /* Bottom right corner */
  40% {
    top: 100%;
    left: 100%;
    transform: rotate(-135deg);
  }
  
  /* Fly across bottom */
  50% {
    top: 95%;
    left: 50%;
    transform: rotate(180deg);
  }
  
  /* Bottom left corner */
  60% {
    top: 100%;
    left: 0;
    transform: rotate(135deg);
  }
  
  /* Fly up left side */
  70% {
    top: 50%;
    left: 10%;
    transform: rotate(90deg);
  }
  
  /* Diagonal across center */
  80% {
    top: 40%;
    left: 60%;
    transform: rotate(-45deg);
  }
  
  /* Loop around center */
  90% {
    top: 60%;
    left: 40%;
    transform: rotate(225deg);
  }
  
  /* Return to start */
  100% {
    top: 0;
    left: 0;
    transform: rotate(25deg);
  }
}

/* Responsive adjustments for animations */
@media (max-width: 768px) {
  /* Adjust flying plane for mobile */
  .flying-plane {
    font-size: 18px; /* Smaller plane on mobile */
  }
  
  .landing-emoji {
    font-size: 16px; /* Smaller sparkles on mobile */
  }
  
  /* Optimize animation performance on mobile */
  @keyframes fly-plane {
    /* Simplified path for mobile to improve performance */
    0% {
      top: 0;
      left: 0;
      transform: rotate(25deg);
    }
    
    25% {
      top: 30%;
      left: 90%;
      transform: rotate(-90deg);
    }
    
    50% {
      top: 95%;
      left: 50%;
      transform: rotate(180deg);
    }
    
    75% {
      top: 50%;
      left: 10%;
      transform: rotate(90deg);
    }
    
    100% {
      top: 0;
      left: 0;
      transform: rotate(25deg);
    }
  }
  
  /* Simplified RTL animation for mobile */
  @keyframes fly-plane-rtl {
    0% {
      top: 0;
      right: 0;
      transform: rotate(-25deg) scaleX(-1);
    }
    
    25% {
      top: 30%;
      right: 90%;
      transform: rotate(90deg) scaleX(-1);
    }
    
    50% {
      top: 95%;
      right: 50%;
      transform: rotate(180deg) scaleX(-1);
    }
    
    75% {
      top: 50%;
      right: 10%;
      transform: rotate(-90deg) scaleX(-1);
    }
    
    100% {
      top: 0;
      right: 0;
      transform: rotate(-25deg) scaleX(-1);
    }
  }
}

/* Reduce motion preference support */
@media (prefers-reduced-motion: reduce) {
  .flying-plane,
  .landing-effect,
  .landing-emoji,
  .signature-letter,
  .timeline-emoji,
  .timeline-node {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Improve animation performance with will-change */
.signature-letter {
  will-change: stroke-dashoffset;
}
</style>
