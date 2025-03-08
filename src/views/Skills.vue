<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';

const { t } = useI18n();

const skillCategories = [
  {
    name: 'Frontend',
    icon: 'mdi-language-html5',
    skills: [
      { name: 'HTML', color: '#e34c26' },
      { name: 'CSS', color: '#264de4' },
      { name: 'SASS', color: '#cc6699' },
      { name: 'Bootstrap', color: '#7952b3' },
      { name: 'Bulma CSS', color: '#00d1b2' },
      { name: 'Tailwind CSS', color: '#38bdf8' },
      { name: 'Vuetify', color: '#1867c0' },
    ]
  },
  {
    name: 'JS Frameworks',
    icon: 'mdi-language-javascript',
    skills: [
      { name: 'JavaScript', color: '#f7df1e' },
      { name: 'Vue.js', color: '#42b883' },
      { name: 'Nuxt.js', color: '#00dc82' },
      { name: 'TypeScript', color: '#3178c6' },
      { name: 'React.js', color: '#61dafb' },
      { name: 'Next.js', color: '#000000' },
      { name: 'Storybook', color: '#ff4785' },
      { name: 'Testing', color: '#15c213' },
    ]
  },
  {
    name: 'Tools',
    icon: 'mdi-tools',
    skills: [
      { name: 'Git', color: '#f05032' },
      { name: 'VS Code', color: '#007acc' },
      { name: 'Figma', color: '#f24e1e' },
      { name: 'Adobe XD', color: '#ff61f6' },
      { name: 'Azure', color: '#0078d4' },
      { name: 'AWS', color: '#ff9900' },
      { name: 'Docker', color: '#2496ed' },
    ]
  },
  {
    name: 'Other',
    icon: 'mdi-code-braces',
    skills: [
      { name: 'RESTful APIs', color: '#009688' },
      { name: 'GraphQL', color: '#e535ab' },
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'Agile', color: '#83ba63' },
    ]
  }
];

const activeTab = ref('Frontend');

function setActiveTab(tabName: string) {
  activeTab.value = tabName;
}

onMounted(() => {
  // Set initial active tab
  activeTab.value = 'Frontend';
});

const certificates = [
  {
    name: 'Vue.js Developer Certification',
    issuer: 'Vue.js Organization',
    date: '2023',
    link: '#'
  },
  {
    name: 'TypeScript Advanced Concepts',
    issuer: 'Microsoft',
    date: '2022',
    link: '#'
  },
  {
    name: 'Frontend Web Development',
    issuer: 'Udemy',
    date: '2021',
    link: '#'
  }
];

function getSkillDescription(skill: string): string {
  const descriptions: Record<string, string> = {
    'HTML': 'Creating semantic and accessible markup for web applications',
    'CSS': 'Styling web applications with modern CSS features and techniques',
    'SASS': 'Using preprocessor for more maintainable and organized stylesheets',
    'Bootstrap': 'Building responsive layouts with the popular CSS framework',
    'Bulma CSS': 'Creating modern interfaces with this flexbox-based CSS framework',
    'Tailwind CSS': 'Rapidly building custom designs with utility-first approach',
    'Vuetify': 'Implementing Material Design components in Vue applications',
    
    'JavaScript': 'Developing modern web applications with ES6+ features',
    'Vue.js': 'Building interactive UIs with Vue 3 Composition API',
    'Nuxt.js': 'Creating server-side rendered and static Vue applications',
    'TypeScript': 'Writing type-safe code with interfaces and advanced types',
    'React.js': 'Creating component-based UIs with hooks and context API',
    'Next.js': 'Building server-rendered React applications with optimized performance',
    'Storybook': 'Developing and documenting UI components in isolation',
    'Testing': 'Writing unit and integration tests for frontend applications',
    
    'Git': 'Version control with branching strategies and collaborative workflows',
    'VS Code': 'Maximizing productivity with extensions and custom configurations',
    'Figma': 'Designing user interfaces and creating interactive prototypes',
    'Adobe XD': 'Creating wireframes, prototypes, and design systems',
    'Azure': 'Deploying and managing applications in Microsoft\'s cloud platform',
    'AWS': 'Utilizing cloud services for hosting and scaling web applications',
    'Docker': 'Containerizing applications for consistent deployment environments',
    
    'RESTful APIs': 'Consuming and integrating with backend services',
    'GraphQL': 'Working with flexible API queries and efficient data fetching',
    'PostgreSQL': 'Storing and retrieving data from relational databases',
    'Agile': 'Following iterative development methodologies and practices'
  };
  
  return descriptions[skill] || 'Proficient in using this technology';
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white dark:bg-[#011627] rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
      <!-- Code Editor Header -->
      <div class="flex items-center bg-gray-100 dark:bg-[#1E2D3D] p-2 border-b border-gray-200 dark:border-gray-700">
        <div class="flex space-x-2 mr-4">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div class="text-gray-700 dark:text-[#a9b7c6] font-mono text-sm">skills.json</div>
      </div>
      
      <!-- Code Editor Tabs -->
      <div class="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
        <button 
          v-for="category in skillCategories" 
          :key="category.name"
          @click="setActiveTab(category.name)"
          class="px-3 py-2 sm:px-4 font-mono text-xs sm:text-sm border-r border-gray-200 dark:border-gray-700 focus:outline-none transition-colors"
          :class="activeTab === category.name ? 'bg-gray-100 dark:bg-[#1E2D3D] text-black dark:text-white border-b-2 border-blue-500 dark:border-[#f78c6c]' : 'text-gray-700 dark:text-[#a9b7c6] hover:bg-gray-100 dark:hover:bg-[#1E2D3D] hover:text-black dark:hover:text-white'"
        >
          {{ category.name }}.js
        </button>
      </div>
      
      <!-- Code Editor Content -->
      <div class="p-3 sm:p-4 md:p-6 font-mono">
        <template v-for="category in skillCategories" :key="category.name">
          <div v-if="activeTab === category.name" class="text-gray-700 dark:text-[#a9b7c6] mb-6">
            <div class="mb-2">
              <span class="text-purple-600 dark:text-[#c792ea]">const</span> 
              <span class="text-yellow-600 dark:text-[#ffcb6b] ml-1 sm:ml-2">{{ category.name.toLowerCase().replace(/\s+/g, '') }}Skills</span> 
              <span class="text-black dark:text-white ml-1 sm:ml-2">=</span> 
              <span class="text-blue-500 dark:text-[#89ddff] ml-1 sm:ml-2">{</span>
            </div>
            
            <div class="ml-4 sm:ml-8 space-y-4 sm:space-y-6">
              <div v-for="(skill, index) in category.skills" :key="index" class="mb-2">
                <div class="flex items-center mb-1">
                  <span class="text-green-600 dark:text-[#c3e88d] text-sm sm:text-base">"{{ skill.name }}"</span>
                  <span class="text-black dark:text-white">:</span>
                  <span class="text-orange-500 dark:text-[#f78c6c] ml-1 sm:ml-2 text-sm sm:text-base">true</span>
                </div>
                
                <div class="text-xs sm:text-sm text-gray-500 mb-2">
                  <span class="text-blue-600 dark:text-[#82aaff]">function</span> 
                  <span class="text-yellow-600 dark:text-[#ffcb6b] ml-1 sm:ml-2">describe{{ skill.name.replace(/\./g, '').replace(/\s+/g, '') }}()</span> 
                  <span class="text-black dark:text-white ml-1 sm:ml-2">{</span>
                </div>
                <div class="ml-2 sm:ml-4 text-xs sm:text-sm text-green-600 dark:text-[#c3e88d]">
                  "{{ getSkillDescription(skill.name) }}"
                </div>
                <div class="text-xs sm:text-sm text-black dark:text-white">}</div>
              </div>
            </div>
            
            <div class="text-blue-500 dark:text-[#89ddff]">};</div>
          </div>
        </template>
      </div>
    </div>
    
    <!-- Certificates Section -->
    <div class="bg-white dark:bg-[#011627] rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
      <div class="flex items-center bg-gray-100 dark:bg-[#1E2D3D] p-2 border-b border-gray-200 dark:border-gray-700">
        <div class="flex space-x-2 mr-4">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div class="text-gray-700 dark:text-[#a9b7c6] font-mono text-sm">certificates.json</div>
      </div>
      
      <div class="p-3 sm:p-4 md:p-6 font-mono">
        <div class="text-gray-700 dark:text-[#a9b7c6] mb-4">
          <span class="text-purple-600 dark:text-[#c792ea]">const</span> 
          <span class="text-yellow-600 dark:text-[#ffcb6b] ml-1 sm:ml-2">certificates</span> 
          <span class="text-black dark:text-white ml-1 sm:ml-2">=</span> 
          <span class="text-blue-500 dark:text-[#89ddff] ml-1 sm:ml-2">[</span>
        </div>
        
        <div class="ml-4 sm:ml-8 space-y-4 sm:space-y-6">
          <div v-for="(cert, index) in certificates" :key="index" class="mb-4">
            <div class="text-blue-500 dark:text-[#89ddff]">{</div>
            <div class="ml-2 sm:ml-4">
              <div>
                <span class="text-green-600 dark:text-[#c3e88d] text-xs sm:text-sm">"name"</span>
                <span class="text-black dark:text-white">:</span>
                <span class="text-green-600 dark:text-[#c3e88d] ml-1 sm:ml-2 text-xs sm:text-sm">"{{ cert.name }}"</span>
                <span class="text-gray-500">,</span>
              </div>
              <div>
                <span class="text-green-600 dark:text-[#c3e88d] text-xs sm:text-sm">"issuer"</span>
                <span class="text-black dark:text-white">:</span>
                <span class="text-green-600 dark:text-[#c3e88d] ml-1 sm:ml-2 text-xs sm:text-sm">"{{ cert.issuer }}"</span>
                <span class="text-gray-500">,</span>
              </div>
              <div>
                <span class="text-green-600 dark:text-[#c3e88d] text-xs sm:text-sm">"date"</span>
                <span class="text-black dark:text-white">:</span>
                <span class="text-orange-500 dark:text-[#f78c6c] ml-1 sm:ml-2 text-xs sm:text-sm">"{{ cert.date }}"</span>
                <span class="text-gray-500">,</span>
              </div>
              <div>
                <span class="text-green-600 dark:text-[#c3e88d] text-xs sm:text-sm">"link"</span>
                <span class="text-black dark:text-white">:</span>
                <span class="text-blue-600 dark:text-[#82aaff] ml-1 sm:ml-2 hover:underline text-xs sm:text-sm">
                  <a :href="cert.link" target="_blank">"{{ cert.link }}"</a>
                </span>
              </div>
            </div>
            <div class="text-blue-500 dark:text-[#89ddff]">}{{ index < certificates.length - 1 ? ',' : '' }}</div>
          </div>
        </div>
        
        <div class="text-blue-500 dark:text-[#89ddff]">];</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Responsive styles */
@media (max-width: 640px) {
  .container {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}

@media (max-width: 480px) {
  button {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
  }
}
</style>