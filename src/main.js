import { defineCustomElements } from '@swisspost/internet-header/loader/index.cjs.js';
import { createApp } from 'vue'
import App from './App.vue'

defineCustomElements()
createApp(App).mount('#app')
