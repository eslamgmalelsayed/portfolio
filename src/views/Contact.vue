<template>
  <div class="container mx-auto px-4 py-16 min-h-screen flex flex-col justify-center">
    <div class="max-w-full mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-black dark:text-white">{{ t('message.contact') }}</h1>
      
      <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/3">
          <h2 class="text-2xl font-semibold mb-4 text-black dark:text-white">{{ t('message.getInTouch') || 'Get in Touch' }}</h2>
          <p class="text-gray-400 mb-6">
            {{ t('message.contactIntro') || 'Feel free to contact me for any work or suggestions below.' }}
          </p>
          
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="bg-white dark:bg-gray-800 bg-opacity-100 dark:bg-opacity-30 p-3 rounded-full mr-4 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-medium text-black dark:text-white">{{ t('message.email') || 'Email' }}</h3>
                <p class="text-gray-400">contact@example.com</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-white dark:bg-gray-800 bg-opacity-100 dark:bg-opacity-30 p-3 rounded-full mr-4 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-medium text-black dark:text-white">{{ t('message.location') || 'Location' }}</h3>
                <p class="text-gray-400">City, Country</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-white dark:bg-gray-800 bg-opacity-100 dark:bg-opacity-30 p-3 rounded-full mr-4 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-medium text-black dark:text-white">{{ t('message.social') || 'Social' }}</h3>
                <div class="flex space-x-4 mt-2">
                  <a href="#" class="text-gray-400 hover:text-blue-500 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" class="text-gray-400 hover:text-pink-500 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" class="text-gray-400 hover:text-gray-100 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="md:w-2/3">
          <form @submit.prevent class="space-y-6" netlify>
            <div>
              <label for="name" class="block text-sm font-medium text-black dark:text-white mb-1">
                {{ t('message.name') || 'Name' }} <span class="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name" 
                class="bg-white dark:bg-gray-800 bg-opacity-100 dark:bg-opacity-30 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 dark:border-transparent"
                :placeholder="t('message.yourName') || 'Your name'"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-black dark:text-white mb-1">
                {{ t('message.email') || 'Email' }} <span class="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                class="bg-white dark:bg-gray-800 bg-opacity-100 dark:bg-opacity-30 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 dark:border-transparent"
                :placeholder="t('message.yourEmail') || 'Your email'"
              />
            </div>
            
            <div>
              <label for="subject" class="block text-sm font-medium text-black dark:text-white mb-1">
                {{ t('message.subject') || 'Subject' }} <span class="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="subject" 
                v-model="formData.subject" 
                class="bg-white dark:bg-gray-800 bg-opacity-100 dark:bg-opacity-30 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 dark:border-transparent"
                :placeholder="t('message.messageSubject') || 'Message subject'"
              />
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-black dark:text-white mb-1">
                {{ t('message.message') || 'Message' }} <span class="text-red-500">*</span>
              </label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                rows="5" 
                class="bg-white dark:bg-gray-800 bg-opacity-100 dark:bg-opacity-30 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 dark:border-transparent"
                :placeholder="t('message.yourMessage') || 'Your message'"
              ></textarea>
            </div>
            
            <div>
              <button 
                type="submit" 
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {{ (t('message.send') || 'Send Message') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const errors = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref('');

const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateForm = () => {
  let isValid = true;

  errors.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  if (!formData.value.name.trim()) {
    errors.value.name = t('message.nameRequired') || 'Name is required';
    isValid = false;
  }

  if (!formData.value.email.trim()) {
    errors.value.email = t('message.emailRequired') || 'Email is required';
    isValid = false;
  } else if (!validateEmail(formData.value.email)) {
    errors.value.email = t('message.emailInvalid') || 'Please enter a valid email address';
    isValid = false;
  }

  if (!formData.value.subject.trim()) {
    errors.value.subject = t('message.subjectRequired') || 'Subject is required';
    isValid = false;
  }

  if (!formData.value.message.trim()) {
    errors.value.message = t('message.messageRequired') || 'Message is required';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  submitSuccess.value = false;
  submitError.value = '';

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form on success
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    
    submitSuccess.value = true;
  } catch (error) {
    submitError.value = t('message.submitError') || 'An error occurred. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
:root.dark .code-block {
  background-color: #011627;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
</style>
