<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

interface StructuredData {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  [key: string]: any;
}

const route = useRoute();
const structuredData = ref<StructuredData>({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Eslam Gamal Elsayed Portfolio',
  description: 'Frontend Developer specializing in Vue.js, JavaScript, and modern web technologies',
  url: 'https://eslamgamal.dev',
});

// Update structured data based on current route
const updateStructuredData = () => {
  // Base data that's common across pages
  const baseData = {
    '@context': 'https://schema.org',
    name: `Eslam Gamal Elsayed | ${route.meta.title || 'Portfolio'}`,
    description: route.meta.description as string || 'Eslam Gamal Elsayed - Frontend Developer Portfolio',
    url: `https://eslamgamal.dev${route.path}`,
  };
  
  // Page-specific structured data
  switch (route.name) {
    case 'Home':
      structuredData.value = {
        ...baseData,
        '@type': 'WebSite',
        author: {
          '@type': 'Person',
          name: 'Eslam Gamal Elsayed',
          jobTitle: 'Frontend Developer',
          url: 'https://eslamgamal.dev'
        }
      };
      break;
      
    case 'About':
      structuredData.value = {
        ...baseData,
        '@type': 'ProfilePage',
        mainEntity: {
          '@type': 'Person',
          name: 'Eslam Gamal Elsayed',
          jobTitle: 'Frontend Developer',
          email: 'eslamgmal1@gmail.com',
          url: 'https://eslamgamal.dev',
          sameAs: [
            'https://github.com/eslamgmalelsayed',
            'https://www.linkedin.com/in/eslamgamalelsayed/'
          ],
          workLocation: {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Riyadh',
              addressCountry: 'Saudi Arabia'
            }
          }
        }
      };
      break;
      
    case 'Skills':
      structuredData.value = {
        ...baseData,
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Vue.js'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'JavaScript'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'TypeScript'
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'HTML/CSS'
          }
        ]
      };
      break;
      
    case 'Projects':
      structuredData.value = {
        ...baseData,
        '@type': 'CollectionPage',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'SoftwareApplication',
              name: 'Portfolio Website',
              applicationCategory: 'WebApplication',
              operatingSystem: 'Any'
            }
            // Additional projects can be added here
          ]
        }
      };
      break;
      
    case 'Contact':
      structuredData.value = {
        ...baseData,
        '@type': 'ContactPage',
        mainEntity: {
          '@type': 'Person',
          name: 'Eslam Gamal Elsayed',
          email: 'eslamgmal1@gmail.com',
          jobTitle: 'Frontend Developer',
          url: 'https://eslamgamal.dev',
          sameAs: [
            'https://github.com/eslamgmalelsayed',
            'https://www.linkedin.com/in/eslamgamalelsayed/'
          ]
        }
      };
      break;
      
    default:
      structuredData.value = {
        ...baseData,
        '@type': 'WebPage'
      };
  }
};

// Update structured data when route changes
watch(() => route.path, updateStructuredData, { immediate: true });

// Function to inject structured data into the page
const injectStructuredData = () => {
  // Remove any existing JSON-LD script
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Create and inject new script with updated structured data
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.textContent = JSON.stringify(structuredData.value);
  document.head.appendChild(script);
};

// Watch for changes to structured data and update the injected script
watch(structuredData, injectStructuredData, { deep: true });

// Initial setup
onMounted(() => {
  updateStructuredData();
  injectStructuredData();
});
</script>

<template>
  <!-- This component doesn't render anything visible -->
</template>
