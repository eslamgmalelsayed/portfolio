<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { onMounted, onUnmounted } from 'vue';

const { t } = useI18n();

// 3D card effect constants
const MAX_ROTATION = 10; 
const MAX_LIFT = 10; 
const PERSPECTIVE = 1000; 

function handleMouseMove(event: MouseEvent, cardElement: HTMLElement) {
  const rect = cardElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const percentX = (event.clientX - centerX) / (rect.width / 2);
  const percentY = (event.clientY - centerY) / (rect.height / 2);
  
  const rotateX = -percentY * MAX_ROTATION;
  const rotateY = percentX * MAX_ROTATION;
  const translateZ = MAX_LIFT;
  
  cardElement.style.transform = `
    perspective(${PERSPECTIVE}px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateZ(${translateZ}px)
    scale3d(1.05, 1.05, 1.05)
  `;
  
  updateCardShadow(cardElement, percentX, percentY);
  
  const highlight = cardElement.querySelector('.card-highlight') as HTMLElement;
  if (highlight) {
    const translateX = percentX * 100;
    const translateY = percentY * 100;
    highlight.style.transform = `translate(${translateX}%, ${translateY}%)`;
    highlight.style.opacity = '0.15';
  }
  
  const overlay = cardElement.querySelector('.profile-image-overlay') as HTMLElement;
  if (overlay) {
    overlay.style.opacity = '1';
  }
}

function handleMouseLeave(cardElement: HTMLElement) {
  cardElement.style.transform = `
    perspective(${PERSPECTIVE}px)
    rotateX(0deg)
    rotateY(0deg)
    translateZ(0px)
    scale3d(1, 1, 1)
  `;
  
  cardElement.style.boxShadow = '0 10px 30px -15px rgba(0, 0, 0, 0.2)';
  
  const highlight = cardElement.querySelector('.card-highlight') as HTMLElement;
  if (highlight) {
    highlight.style.opacity = '0';
  }
  
  const overlay = cardElement.querySelector('.profile-image-overlay') as HTMLElement;
  if (overlay) {
    overlay.style.opacity = '0';
  }
}

function updateCardShadow(cardElement: HTMLElement, percentX: number, percentY: number) {
  const shadowX = percentX * 20;
  const shadowY = percentY * 20;
  const shadowBlur = 30;
  const shadowOpacity = 0.25;
  
  cardElement.style.boxShadow = `
    ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity}),
    0 10px 30px -15px rgba(0, 0, 0, 0.3)
  `;
}

onMounted(() => {
  // Add event listeners after DOM is fully rendered
  setTimeout(() => {
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
      const cardElement = profileCard as HTMLElement;
      
      // Remove existing event listeners to prevent duplicates
      cardElement.removeEventListener('mousemove', (e: MouseEvent) => handleMouseMove(e, cardElement));
      cardElement.removeEventListener('mouseleave', () => handleMouseLeave(cardElement));
      
      // Add new event listeners with proper binding
      const mouseMoveHandler = (e: MouseEvent) => handleMouseMove(e, cardElement);
      const mouseLeaveHandler = () => handleMouseLeave(cardElement);
      
      cardElement.addEventListener('mousemove', mouseMoveHandler);
      cardElement.addEventListener('mouseleave', mouseLeaveHandler);
      
      // Store handlers on the element for later removal
      (cardElement as any)._mouseMoveHandler = mouseMoveHandler;
      (cardElement as any)._mouseLeaveHandler = mouseLeaveHandler;
    }
  }, 500); // Timeout to ensure DOM is ready
});

onUnmounted(() => {
  // Remove event listeners when component is unmounted
  const profileCard = document.querySelector('.profile-card');
  if (profileCard) {
    const cardElement = profileCard as HTMLElement;
    
    // Remove event listeners using stored handlers
    if ((cardElement as any)._mouseMoveHandler) {
      cardElement.removeEventListener('mousemove', (cardElement as any)._mouseMoveHandler);
    }
    if ((cardElement as any)._mouseLeaveHandler) {
      cardElement.removeEventListener('mouseleave', (cardElement as any)._mouseLeaveHandler);
    }
  }
});
</script>

<template>
  <div class="container mx-auto px-4 py-16 min-h-screen flex flex-col justify-center">
    <div class="max-w-full mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-black dark:text-white">{{ t('message.about') }}</h1>
      
      <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/3">
          <!-- Profile image with 3D card effect -->
          <div 
            class="profile-card relative overflow-hidden transition-all duration-300 rounded-lg"
            style="transform-style: preserve-3d; perspective: 1000px; will-change: transform; touch-action: none;"
          >
            <div class="card-highlight absolute inset-0 w-full h-full bg-white dark:bg-blue-400 rounded-lg opacity-0 transition-opacity duration-300 pointer-events-none" style="transform: translate(0%, 0%); filter: blur(30px);"></div>
            
            <div class="relative z-10" style="transform: translateZ(20px)">
              <!-- Profile image placeholder -->
              <div class="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center overflow-hidden">
                <div class="profile-image-container relative w-full h-full">
                  <span class="text-gray-500 dark:text-gray-400 absolute inset-0 flex items-center justify-center">Profile Image</span>
                  <div class="profile-image-overlay absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="md:w-2/3">
          <h2 class="text-2xl font-semibold mb-4 text-black dark:text-white">{{ t('message.aboutMe') || 'About Me' }}</h2>
          <p class="text-gray-400 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, 
            nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia.
            Vivamus finibus vel libero vel finibus. Nullam eget magna euismod, rhoncus magna ut, feugiat nulla.
          </p>
          <p class="text-gray-400 mb-4">
            Praesent sed ultricies magna. Nam sed nulla at elit suscipit feugiat. Donec eget magna euismod, 
            rhoncus magna ut, feugiat nulla. Vivamus finibus vel libero vel finibus.
          </p>
          
          <!-- Education and Experience sections -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 class="text-xl font-semibold mb-4 border-b border-gray-700 pb-2 text-black dark:text-white">
                {{ t('message.education') || 'Education' }}
              </h3>
              
              <!-- Education Item 1 -->
              <div class="mb-6">
                <div class="flex items-center mb-2">
                  <div class="bg-gray-800 bg-opacity-30 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  </div>
                  
                  <div class="font-medium text-lg text-black dark:text-white">University Name</div>
                </div>
                <div class="text-black dark:text-white font-medium">Degree in Computer Science</div>
                <div class="text-gray-500 text-sm mb-2">2018 - 2022</div>
                <p class="text-gray-400">
                  Focused on web development, algorithms, and software engineering principles.
                </p>
              </div>
              
              <!-- Education Item 2 -->
              <div class="mb-6">
                <div class="flex items-center mb-2">
                  <div class="bg-gray-800 bg-opacity-30 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  
                  <div class="font-medium text-lg text-black dark:text-white">Technical Institute</div>
                </div>
                <div class="text-black dark:text-white font-medium">Web Development Certificate</div>
                <div class="text-gray-500 text-sm mb-2">2017 - 2018</div>
                <p class="text-gray-400">
                  Specialized training in frontend technologies and responsive design principles.
                </p>
              </div>
            </div>
            
            <div>
              <h3 class="text-xl font-semibold mb-4 border-b border-gray-700 pb-2 text-black dark:text-white">
                {{ t('message.experience') || 'Experience' }}
              </h3>
              
              <!-- Experience Timeline -->
              <div class="relative border-l border-gray-700 pl-8 ml-4 mt-8">
                <!-- Experience Item 1 -->
                <div class="mb-12 relative">
                  <!-- Timeline emoji icon -->
                  <div class="absolute -left-12 bg-white dark:bg-[#01223d] w-10 h-10 rounded-full flex items-center justify-center border-2 border-violet-500 dark:border-blue-500 shadow-md">
                    <span class="text-xl pr-1" role="img" aria-label="Developer">👨‍💻</span>
                  </div>
                  
                  <!-- Content card with hover effect -->
                  <div class="bg-white dark:bg-[#01223d] rounded-lg p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between mb-2">
                      <div class="font-bold text-lg text-black dark:text-white">Frontend Developer</div>
                      <div class="text-violet-600 dark:text-blue-400 font-medium text-sm px-3 py-1 rounded-full bg-violet-100 dark:bg-blue-900/30">2022 - Present</div>
                    </div>
                    
                    <div class="text-black dark:text-blue-300 font-medium mb-2">Company Name</div>
                    
                    <p class="text-gray-600 dark:text-gray-300">
                      Responsible for developing and maintaining web applications using Vue.js, TypeScript, and Tailwind CSS.
                    </p>
                    
                    <!-- Tech stack tags -->
                    <div class="flex flex-wrap gap-2 mt-3">
                      <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded">Vue.js</span>
                      <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded">TypeScript</span>
                      <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded">Tailwind CSS</span>
                    </div>
                  </div>
                </div>
                
                <!-- Experience Item 2 -->
                <div class="mb-12 relative">
                  <!-- Timeline emoji icon -->
                  <div class="absolute -left-12 bg-white dark:bg-[#01223d] w-10 h-10 rounded-full flex items-center justify-center border-2 border-violet-500 dark:border-blue-500 shadow-md">
                    <span class="text-xl pr-1" role="img" aria-label="Junior Developer">🚀</span>
                  </div>
                  
                  <!-- Content card with hover effect -->
                  <div class="bg-white dark:bg-[#01223d] rounded-lg p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between mb-2">
                      <div class="font-bold text-lg text-black dark:text-white">Junior Developer</div>
                      <div class="text-violet-600 dark:text-blue-400 font-medium text-sm px-3 py-1 rounded-full bg-violet-100 dark:bg-blue-900/30">2020 - 2022</div>
                    </div>
                    
                    <div class="text-black dark:text-blue-300 font-medium mb-2">Previous Company</div>
                    
                    <p class="text-gray-600 dark:text-gray-300">
                      Worked on front-end development projects using JavaScript and CSS frameworks. Collaborated with design team to implement responsive interfaces.
                    </p>
                    
                    <!-- Tech stack tags -->
                    <div class="flex flex-wrap gap-2 mt-3">
                      <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded">JavaScript</span>
                      <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded">CSS</span>
                      <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded">Responsive Design</span>
                    </div>
                  </div>
                </div>
                
                <!-- Experience Item 3 -->
                <div class="relative">
                  <!-- Timeline emoji icon -->
                  <div class="absolute -left-12 bg-white dark:bg-[#01223d] w-10 h-10 rounded-full flex items-center justify-center border-2 border-violet-500 dark:border-blue-500 shadow-md">
                    <span class="text-xl pr-1" role="img" aria-label="Intern">🌱</span>
                  </div>
                  
                  <!-- Content card with hover effect -->
                  <div class="bg-white dark:bg-[#01223d] rounded-lg p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between mb-2">
                      <div class="font-bold text-lg text-black dark:text-white">Intern</div>
                      <div class="text-violet-600 dark:text-blue-400 font-medium text-sm px-3 py-1 rounded-full bg-violet-100 dark:bg-blue-900/30">2019 - 2020</div>
                    </div>
                    
                    <div class="text-black dark:text-blue-300 font-medium mb-2">Startup Inc.</div>
                    
                    <p class="text-gray-600 dark:text-gray-300">
                      Assisted in developing web applications and gained hands-on experience with modern web technologies and development workflows.
                    </p>
                    
                    <!-- Tech stack tags -->
                    <div class="flex flex-wrap gap-2 mt-3">
                      <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded">HTML</span>
                      <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded">CSS</span>
                      <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded">JavaScript</span>
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

.profile-card {
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-image-overlay {
  transition: opacity 0.3s ease;
}

.card-highlight {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
</style>
