<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary dark:text-primary-light">404</h1>
      <h2 class="text-3xl font-semibold mt-4 mb-6">{{ t('message.pageNotFound') || 'Page Not Found' }}</h2>
      <p class="text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-md mx-auto">
        {{ t('message.pageNotFoundDesc') || 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.' }}
      </p>
      <button @click="goHome" class="btn btn-primary">
        {{ t('message.backToHome') || 'Back to Home' }}
      </button>
    </div>
  </div>
</template>
