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
              <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                <span class="text-xl">📧</span>
              </div>
              <div>
                <h3 class="text-lg font-medium text-black dark:text-white">{{ t('message.email') || 'Email' }}</h3>
                <p class="text-gray-400">eslamgmal1@gmail.com</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                <span class="text-xl">📍</span>
              </div>
              <div>
                <h3 class="text-lg font-medium text-black dark:text-white">{{ t('message.location') || 'Location' }}</h3>
                <p class="text-gray-400">Riyadh, Saudi Arabia</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                <span class="text-xl">🔗</span>
              </div>
              <div>
                <h3 class="text-lg font-medium text-black dark:text-white">{{ t('message.social') || 'Social' }}</h3>
                <div class="flex space-x-4 mt-2">
                  <a title="LinkedIn" href="https://www.linkedin.com/in/eslamgamalelsayed/" class="text-gray-400 hover:text-blue-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a title="Github" href="https://github.com/eslamgmalelsayed" class="text-gray-400 hover:text-gray-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="md:w-2/3">
          <form class="space-y-6" name="contact" @submit.prevent="handleSubmit" aria-labelledby="contact-form-heading">
            <h2 id="contact-form-heading" class="sr-only">{{ t('message.contactForm') || 'Contact Form' }}</h2>
            
            <!-- Success Alert -->
            <div v-if="submitSuccess" class="bg-white dark:bg-green-800 bg-opacity-100 dark:bg-opacity-30 text-green-700 dark:text-green-400 p-4 rounded-md mb-6 border border-green-200 dark:border-transparent flex items-center" role="alert" aria-live="assertive">
              <span class="text-xl mr-2" aria-hidden="true">✅</span>
              <span>{{ t('message.messageSent') || 'Your message has been sent successfully!' }}</span>
            </div>
            
            <!-- Error Alert -->
            <div v-if="submitError" class="bg-white dark:bg-red-800 bg-opacity-100 dark:bg-opacity-30 text-red-700 dark:text-red-400 p-4 rounded-md mb-6 border border-red-200 dark:border-transparent flex items-center" role="alert" aria-live="assertive">
              <span class="text-xl mr-2" aria-hidden="true">❌</span>
              <span>{{ submitError }}</span>
            </div>
            
            <div>
              <label for="name" class="block text-sm font-medium text-black dark:text-white mb-1">
                {{ t('message.name') || 'Name' }} <span class="text-red-500" aria-hidden="true">*</span>
              </label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name" 
                name="name"
                class="bg-white dark:bg-gray-800 bg-opacity-100 dark:bg-opacity-30 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 dark:border-transparent"
                :placeholder="t('message.yourName') || 'Your name'"
                aria-required="true"
                :aria-invalid="!!errors.name"
                :aria-describedby="errors.name ? 'name-error' : undefined"
              />
              <p v-if="errors.name" id="name-error" class="text-red-500 text-sm mt-1" role="alert">{{ errors.name }}</p>
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-black dark:text-white mb-1">
                {{ t('message.email') || 'Email' }} <span class="text-red-500" aria-hidden="true">*</span>
              </label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                name="email"
                class="bg-white dark:bg-gray-800 bg-opacity-100 dark:bg-opacity-30 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 dark:border-transparent"
                :placeholder="t('message.yourEmail') || 'Your email'"
                aria-required="true"
                :aria-invalid="!!errors.email"
                :aria-describedby="errors.email ? 'email-error' : undefined"
              />
              <p v-if="errors.email" id="email-error" class="text-red-500 text-sm mt-1" role="alert">{{ errors.email }}</p>
            </div>
            
            <div>
              <label for="subject" class="block text-sm font-medium text-black dark:text-white mb-1">
                {{ t('message.subject') || 'Subject' }} <span class="text-red-500" aria-hidden="true">*</span>
              </label>
              <input 
                type="text" 
                id="subject" 
                v-model="formData.subject" 
                name="subject"
                class="bg-white dark:bg-gray-800 bg-opacity-100 dark:bg-opacity-30 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 dark:border-transparent"
                :placeholder="t('message.messageSubject') || 'Message subject'"
                aria-required="true"
                :aria-invalid="!!errors.subject"
                :aria-describedby="errors.subject ? 'subject-error' : undefined"
              />
              <p v-if="errors.subject" id="subject-error" class="text-red-500 text-sm mt-1" role="alert">{{ errors.subject }}</p>
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-black dark:text-white mb-1">
                {{ t('message.message') || 'Message' }} <span class="text-red-500" aria-hidden="true">*</span>
              </label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                name="message"
                rows="5" 
                class="bg-white resize-none dark:bg-gray-800 bg-opacity-100 dark:bg-opacity-30 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 dark:border-transparent"
                :placeholder="t('message.yourMessage') || 'Your message'"
                aria-required="true"
                :aria-invalid="!!errors.message"
                :aria-describedby="errors.message ? 'message-error' : undefined"
              ></textarea>
              <p v-if="errors.message" id="message-error" class="text-red-500 text-sm mt-1" role="alert">{{ errors.message }}</p>
            </div>
            
            <div>
              <button 
                type="submit" 
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                :disabled="isSubmitting"
                :aria-busy="isSubmitting"
              >
                <span v-if="isSubmitting" class="mr-2" aria-hidden="true">⏳</span>
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
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import emailjs from '@emailjs/browser';

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

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Clear errors when user starts typing
watch(() => formData.value.name, () => {
  if (formData.value.name.trim() && errors.value.name) {
    errors.value.name = '';
  }
});

watch(() => formData.value.email, () => {
  if (validateEmail(formData.value.email) && errors.value.email) {
    errors.value.email = '';
  }
});

watch(() => formData.value.subject, () => {
  if (formData.value.subject.trim() && errors.value.subject) {
    errors.value.subject = '';
  }
});

watch(() => formData.value.message, () => {
  if (formData.value.message.trim() && errors.value.message) {
    errors.value.message = '';
  }
});

const validateEmail = (email: string) => {
  if (!email.trim()) return false;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateForm = () => {
  let isValid = true;

  // Reset all errors first
  errors.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // Validate name (min 2 characters)
  if (!formData.value.name.trim()) {
    errors.value.name = t('message.nameRequired') || 'Name is required';
    isValid = false;
  } else if (formData.value.name.trim().length < 2) {
    errors.value.name = t('message.nameMinLength') || 'Name must be at least 2 characters';
    isValid = false;
  }

  // Validate email
  if (!formData.value.email.trim()) {
    errors.value.email = t('message.emailRequired') || 'Email is required';
    isValid = false;
  } else if (!validateEmail(formData.value.email)) {
    errors.value.email = t('message.emailInvalid') || 'Please enter a valid email address';
    isValid = false;
  }

  // Validate subject (min 3 characters)
  if (!formData.value.subject.trim()) {
    errors.value.subject = t('message.subjectRequired') || 'Subject is required';
    isValid = false;
  } else if (formData.value.subject.trim().length < 3) {
    errors.value.subject = t('message.subjectMinLength') || 'Subject must be at least 3 characters';
    isValid = false;
  }

  // Validate message (min 10 characters)
  if (!formData.value.message.trim()) {
    errors.value.message = t('message.messageRequired') || 'Message is required';
    isValid = false;
  } else if (formData.value.message.trim().length < 10) {
    errors.value.message = t('message.messageMinLength') || 'Message must be at least 10 characters';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  // Validate form before submission
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  submitSuccess.value = false;
  submitError.value = '';

  try {
    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: formData.value.name,
      from_email: formData.value.email,
      subject: formData.value.subject,
      message: formData.value.message,
      to_email: 'eslamgmal1@gmail.com' // Your email address
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    
    if (response.text === 'OK') {
      // Reset form on success
      formData.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      
      submitSuccess.value = true;
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        submitSuccess.value = false;
      }, 5000);
    } else {
      throw new Error('Unexpected response from email service');
    }
  } catch (error) {
    console.error('Error sending email:', error);
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
