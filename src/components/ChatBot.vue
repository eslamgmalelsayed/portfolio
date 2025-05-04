<template>
  <div class="chatbot-container" :class="{ 'chatbot-open': isChatOpen }">
    <!-- Chat toggle button -->
    <button 
      @click="toggleChat" 
      class="chatbot-toggle bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 transform hover:scale-110"
      :class="{'animate-bounce-once': isAnimating}"
      :aria-label="t(isChatOpen ? 'chatbot.close' : 'chatbot.open')"
    >
      <span class="text-2xl" :class="{'animate-spin-once': isAnimating}">{{ isChatOpen ? '✖️' : '🤖' }}</span>
    </button>
    
    <!-- Chat window -->
    <div v-if="isChatOpen" class="chatbot-window bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-xl backdrop-blur-sm p-4 flex flex-col">
      <!-- Chat header -->
      <div class="chatbot-header flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center">
          <span class="text-2xl mr-2 animate-bounce">🤖</span>
          <h3 class="text-lg font-semibold text-black dark:text-white">{{ t('chatbot.title') }}</h3>
        </div>
        <button 
          @click="toggleChat" 
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          :aria-label="t('chatbot.close')"
        >
          <span class="text-xl">✖️</span>
        </button>
      </div>
      
      <!-- Chat messages -->
      <div ref="messagesContainer" class="chatbot-messages flex-grow overflow-y-auto mb-4 space-y-3">
        <div v-for="(message, index) in messages" :key="index" class="message-container" :class="{ 'user-message': message.sender === 'user', 'bot-message': message.sender === 'bot' }">
          <div class="message-bubble p-3 rounded-lg max-w-[80%] inline-block relative">
            <div class="message-text">{{ message.text }}</div>
            <div v-if="message.sender === 'bot' && message.options && message.options.length > 0" class="message-options mt-2 space-y-2">
              <button 
                v-for="option in message.options" 
                :key="option.text"
                @click="handleOptionClick(option)"
                class="option-button text-sm px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors w-full text-left"
              >
                {{ option.text }}
              </button>
            </div>
          </div>
        </div>
        <div v-if="isTyping" class="message-container bot-message">
          <div class="message-bubble p-3 rounded-lg inline-block">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Chat input -->
      <form @submit.prevent="sendMessage" class="chatbot-input flex items-center space-x-2">
        <input 
          v-model="userInput" 
          type="text" 
          :placeholder="t('chatbot.placeholder')"
          class="flex-grow bg-white dark:bg-gray-800 bg-opacity-100 dark:bg-opacity-30 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 dark:border-transparent"
          :disabled="isTyping"
        />
        <button 
          type="submit" 
          class="send-button bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors"
          :disabled="!userInput.trim() || isTyping"
          :aria-label="t('chatbot.send')"
        >
          <span class="text-xl">📤</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const emit = defineEmits(['section-change']);

// Chat state
const isChatOpen = ref(false);
const userInput = ref('');
const messages = ref<Array<{
  sender: 'user' | 'bot',
  text: string,
  options?: Array<{ text: string, value: string, action?: string, params?: any }>
}>>([]);
const isTyping = ref(false);
const messagesContainer = ref<HTMLElement | null>(null);
const isAnimating = ref(false);

// Toggle chat window
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
  isAnimating.value = true;
  
  if (isChatOpen.value && messages.value.length === 0) {
    // Add welcome message with quick reply options
    addBotMessage(t('chatbot.welcome'), [
      { text: t('chatbot.options.projects'), value: 'projects', action: 'navigateTo', params: { section: 'Projects' } },
      { text: t('chatbot.options.skills'), value: 'skills', action: 'navigateTo', params: { section: 'Skills' } },
      { text: t('chatbot.options.contact'), value: 'contact', action: 'navigateTo', params: { section: 'Contact' } },
      { text: t('chatbot.options.help'), value: 'help', action: 'showHelp' }
    ]);
  }
  
  // Reset animation after delay
  setTimeout(() => {
    isAnimating.value = false;
  }, 1000);
};

// Send user message
const sendMessage = async () => {
  const text = userInput.value.trim();
  if (!text || isTyping.value) return;
  
  // Add user message
  messages.value.push({ sender: 'user', text });
  userInput.value = '';
  
  // Simulate bot typing
  isTyping.value = true;
  await scrollToBottom();
  
  // Process the message and generate a response
  setTimeout(() => {
    processUserMessage(text);
    isTyping.value = false;
  }, 1000);
};

// Process user message and generate response
const processUserMessage = (text: string) => {
  const lowerText = text.toLowerCase();
  
  // Simple keyword matching
  if (lowerText.includes('project') || lowerText.includes('work') || lowerText.includes('portfolio')) {
    addBotMessage(t('chatbot.responses.projects'), [
      { text: t('chatbot.options.viewProjects'), value: 'view-projects', action: 'navigateTo', params: { section: 'Projects' } },
      { text: t('chatbot.options.notInterested'), value: 'not-interested', action: 'notInterested' }
    ]);
  } else if (lowerText.includes('skill') || lowerText.includes('tech') || lowerText.includes('know')) {
    addBotMessage(t('chatbot.responses.skills'), [
      { text: t('chatbot.options.viewSkills'), value: 'view-skills', action: 'navigateTo', params: { section: 'Skills' } },
      { text: t('chatbot.options.notInterested'), value: 'not-interested', action: 'notInterested' }
    ]);
  } else if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('reach') || lowerText.includes('hire')) {
    addBotMessage(t('chatbot.responses.contact'), [
      { text: t('chatbot.options.contactForm'), value: 'contact-form', action: 'navigateTo', params: { section: 'Contact' } },
      { text: t('chatbot.options.notInterested'), value: 'not-interested', action: 'notInterested' }
    ]);
  } else if (lowerText.includes('about') || lowerText.includes('who') || lowerText.includes('experience')) {
    addBotMessage(t('chatbot.responses.about'), [
      { text: t('chatbot.options.viewAbout'), value: 'view-about', action: 'navigateTo', params: { section: 'About' } },
      { text: t('chatbot.options.notInterested'), value: 'not-interested', action: 'notInterested' }
    ]);
  } else if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
    addBotMessage(t('chatbot.responses.greeting'), [
      { text: t('chatbot.options.help'), value: 'help', action: 'showHelp' },
      { text: t('chatbot.options.notInterested'), value: 'not-interested', action: 'notInterested' }
    ]);
  } else if (lowerText.includes('no') || lowerText.includes('not interested') || lowerText.includes('ignore')) {
    addBotMessage(t('chatbot.responses.acknowledge'), [
      { text: t('chatbot.options.help'), value: 'help', action: 'showHelp' }
    ]);
  } else {
    // Default response
    addBotMessage(t('chatbot.responses.default'), [
      { text: t('chatbot.options.projects'), value: 'projects', action: 'navigateTo', params: { section: 'Projects' } },
      { text: t('chatbot.options.skills'), value: 'skills', action: 'navigateTo', params: { section: 'Skills' } },
      { text: t('chatbot.options.contact'), value: 'contact', action: 'navigateTo', params: { section: 'Contact' } },
      { text: t('chatbot.options.notInterested'), value: 'not-interested', action: 'notInterested' }
    ]);
  }
};

// Add bot message with optional quick reply options
const addBotMessage = (text: string, options?: Array<{ text: string, value: string, action?: string, params?: any }>) => {
  messages.value.push({ sender: 'bot', text, options });
  scrollToBottom();
};

// Handle option click
const handleOptionClick = (option: { text: string, value: string, action?: string, params?: any }) => {
  // Add user selection as a message
  messages.value.push({ sender: 'user', text: option.text });
  
  // Process the action
  if (option.action) {
    switch (option.action) {
      case 'navigateTo':
        if (option.params?.section) {
          isChatOpen.value = false;
          emit('section-change', option.params.section);
        }
        break;
      case 'scrollToContactForm':
        isChatOpen.value = false;
        emit('section-change', 'Contact');
        // We'll handle the scroll in the Contact component
        break;
      case 'showProjects':
        addBotMessage(t('chatbot.responses.projectsInfo'), [
          { text: t('chatbot.options.viewProjects'), value: 'view-projects', action: 'navigateTo', params: { section: 'Projects' } },
          { text: t('chatbot.options.notInterested'), value: 'not-interested', action: 'notInterested' }
        ]);
        break;
      case 'showSkills':
        addBotMessage(t('chatbot.responses.skillsInfo'), [
          { text: t('chatbot.options.viewSkills'), value: 'view-skills', action: 'navigateTo', params: { section: 'Skills' } },
          { text: t('chatbot.options.notInterested'), value: 'not-interested', action: 'notInterested' }
        ]);
        break;
      case 'showContact':
        addBotMessage(t('chatbot.responses.contactInfo'), [
          { text: t('chatbot.options.contactForm'), value: 'contact-form', action: 'navigateTo', params: { section: 'Contact' } },
          { text: t('chatbot.options.notInterested'), value: 'not-interested', action: 'notInterested' }
        ]);
        break;
      case 'showHelp':
        addBotMessage(t('chatbot.responses.help'), [
          { text: t('chatbot.options.projects'), value: 'projects', action: 'navigateTo', params: { section: 'Projects' } },
          { text: t('chatbot.options.skills'), value: 'skills', action: 'navigateTo', params: { section: 'Skills' } },
          { text: t('chatbot.options.contact'), value: 'contact', action: 'navigateTo', params: { section: 'Contact' } },
          { text: t('chatbot.options.notInterested'), value: 'not-interested', action: 'notInterested' }
        ]);
        break;
      case 'notInterested':
        addBotMessage(t('chatbot.responses.acknowledge'), [
          { text: t('chatbot.options.help'), value: 'help', action: 'showHelp' }
        ]);
        break;
      default:
        break;
    }
  }
  
  scrollToBottom();
};

// Scroll to bottom of messages container
const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// Watch for messages changes to scroll to bottom
watch(messages, () => {
  scrollToBottom();
});

// Watch for language changes to update messages
watch(() => t('chatbot.welcome'), (newVal, oldVal) => {
  if (newVal !== oldVal && messages.value.length > 0) {
    // Update the welcome message if it exists
    const welcomeMessageIndex = messages.value.findIndex(m => 
      m.sender === 'bot' && (m.text === oldVal || m.text === t('chatbot.welcome', {}, { locale: 'en' }) || m.text === t('chatbot.welcome', {}, { locale: 'ar' }))
    );
    
    if (welcomeMessageIndex !== -1) {
      messages.value[welcomeMessageIndex].text = newVal;
      
      // Also update options if they exist
      if (messages.value[welcomeMessageIndex].options) {
        messages.value[welcomeMessageIndex].options = [
          { text: t('chatbot.options.projects'), value: 'projects', action: 'navigateTo', params: { section: 'Projects' } },
          { text: t('chatbot.options.skills'), value: 'skills', action: 'navigateTo', params: { section: 'Skills' } },
          { text: t('chatbot.options.contact'), value: 'contact', action: 'navigateTo', params: { section: 'Contact' } },
          { text: t('chatbot.options.notInterested'), value: 'not-interested', action: 'notInterested' }
        ];
      }
    }
  }
});
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.chatbot-toggle {
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.chatbot-window {
  position: absolute;
  bottom: 5rem;
  right: 0;
  width: 350px;
  height: 450px;
  animation: slide-up 0.3s ease-out;
}

.chatbot-messages {
  height: 300px;
  padding-right: 0.5rem;
}

.message-container {
  display: flex;
  margin-bottom: 0.75rem;
}

.user-message {
  justify-content: flex-end;
}

.bot-message {
  justify-content: flex-start;
}

.user-message .message-bubble {
  background-color: #3b82f6;
  color: white;
  border-radius: 1rem 1rem 0 1rem;
}

.bot-message .message-bubble {
  background-color: #e5e7eb;
  color: #1f2937;
  border-radius: 1rem 1rem 1rem 0;
}

.dark .bot-message .message-bubble {
  background-color: #374151;
  color: #f3f4f6;
}

.typing-indicator {
  display: flex;
  align-items: center;
  column-gap: 0.25rem;
}

.typing-indicator span {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #9ca3af;
  display: block;
  animation: typing 1s infinite ease-in-out alternate;
}

.typing-indicator span:nth-child(1) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.4s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes typing {
  from {
    opacity: 0.2;
    transform: translateY(0);
  }
  to {
    opacity: 1;
    transform: translateY(-0.5rem);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-bounce-once {
  animation: bounce 1s;
}

.animate-spin-once {
  animation: spin 1s;
}

@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Custom scrollbar */
.chatbot-messages::-webkit-scrollbar {
  width: 0.375rem;
}

.chatbot-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chatbot-messages::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 9999px;
}

.dark .chatbot-messages::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .chatbot-window {
    width: calc(100vw - 2rem);
    right: -1rem;
  }
}
</style>
