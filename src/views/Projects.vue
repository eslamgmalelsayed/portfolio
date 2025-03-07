<template>
  <div class="container mx-auto px-4 py-16 min-h-screen flex flex-col justify-center">
    <div class="max-w-full mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-black dark:text-white">{{ t('message.projects') }}</h1>
      
      <div class="mb-8">
        <!-- Search Bar -->
        <div class="mb-6">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              type="text" 
              v-model="searchQuery" 
              class="bg-gray-800 bg-opacity-30 text-white placeholder-gray-400 w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              :placeholder="t('message.searchProjects') || 'Search projects...'"
            >
          </div>
        </div>
        
        <!-- Projects Grid -->
        <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="project-card card relative overflow-hidden transition-all duration-300 rounded-lg shadow-md hover:shadow-lg"
            style="transform-style: preserve-3d; perspective: 1000px; will-change: transform; touch-action: none;"
          >
            <div class="card-highlight absolute inset-0 w-full h-full bg-blue-100 dark:bg-blue-400 rounded-lg opacity-0 transition-opacity duration-300 pointer-events-none" style="transform: translate(0%, 0%); filter: blur(30px);"></div>
            
            <div class="relative z-10" style="transform: translateZ(20px)">
              <!-- Project Image -->
              <div class="bg-gray-100 dark:bg-gray-800 h-48 rounded-t-lg flex items-center justify-center overflow-hidden">
                <span class="text-gray-500 dark:text-gray-400">{{ project.title }} Image</span>
              </div>
              
              <!-- Project Content -->
              <div class="p-6 bg-white dark:bg-gray-800 rounded-b-lg border-t border-gray-100 dark:border-gray-700">
                <h3 class="text-xl font-semibold mb-2 text-black dark:text-white">{{ project.title }}</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">{{ project.description }}</p>
                
                <!-- Technologies -->
                <div class="flex flex-wrap gap-2 mb-4">
                  <span 
                    v-for="tech in project.technologies" 
                    :key="tech"
                    class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                  >
                    {{ tech }}
                  </span>
                </div>
                
                <!-- Links -->
                <div class="flex justify-between mt-4">
                  <a :href="project.github" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 text-sm flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a :href="project.link" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 text-sm flex items-center">
                    {{ t('message.viewProject') || 'View Project' }}
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- No Projects Found -->
        <div v-if="filteredProjects.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="mt-2 text-lg font-medium text-black dark:text-white">{{ t('message.noProjectsFound') || 'No projects found' }}</h3>
          <p class="mt-1 text-sm text-gray-400">{{ t('message.tryDifferentSearch') || 'Try a different search term or category.' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const projects = ref([
  {
    id: 1,
    title: 'E-commerce Website',
    description: 'A full-featured e-commerce platform built with Vue.js and Node.js.',
    image: '/placeholder.jpg',
    technologies: ['Vue.js', 'Node.js', 'Express', 'MongoDB'],
    category: 'web',
    link: '#',
    github: '#'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A productivity app for managing tasks and projects with team collaboration features.',
    image: '/placeholder.jpg',
    technologies: ['Vue.js', 'Vuex', 'Firebase'],
    category: 'web',
    link: '#',
    github: '#'
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A weather application that displays current and forecasted weather data.',
    image: '/placeholder.jpg',
    technologies: ['Vue.js', 'Tailwind CSS', 'OpenWeather API'],
    category: 'web',
    link: '#',
    github: '#'
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A personal portfolio website built with Vue.js and Tailwind CSS.',
    image: '/placeholder.jpg',
    technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
    category: 'web',
    link: '#',
    github: '#'
  },
  {
    id: 5,
    title: 'Mobile Chat App',
    description: 'A real-time chat application for mobile devices.',
    image: '/placeholder.jpg',
    technologies: ['Vue.js', 'Socket.io', 'Express'],
    category: 'mobile',
    link: '#',
    github: '#'
  }
]);

const searchQuery = ref('');

const categories = ref(['web', 'mobile']);

const filteredProjects = computed(() => {
  if (!searchQuery.value) {
    return projects.value;
  }
  
  const query = searchQuery.value.toLowerCase();
  
  return projects.value.filter(project => 
    project.title.toLowerCase().includes(query) || 
    project.description.toLowerCase().includes(query) || 
    project.technologies.some(tech => tech.toLowerCase().includes(query))
  );
});

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
  
  const overlay = cardElement.querySelector('.project-image-overlay') as HTMLElement;
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
  
  const overlay = cardElement.querySelector('.project-image-overlay') as HTMLElement;
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
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => {
      const cardElement = card as HTMLElement;
      
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
    });
  }, 500); // Increased timeout to ensure DOM is ready
});

onUnmounted(() => {
  // Remove event listeners when component is unmounted
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card) => {
    const cardElement = card as HTMLElement;
    
    // Remove event listeners using stored handlers
    if ((cardElement as any)._mouseMoveHandler) {
      cardElement.removeEventListener('mousemove', (cardElement as any)._mouseMoveHandler);
    }
    if ((cardElement as any)._mouseLeaveHandler) {
      cardElement.removeEventListener('mouseleave', (cardElement as any)._mouseLeaveHandler);
    }
  });
});
</script>

<style scoped>


:root.dark .code-block {
  background-color: #011627;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.project-card {
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-image-overlay {
  transition: opacity 0.3s ease;
}

.card-highlight {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Fade transition for projects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
