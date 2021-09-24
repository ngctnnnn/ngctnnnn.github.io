<template>
  <div class="antialiased">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 sticky justify-center white" style="width: 100%">
      <nav class="flex justify-between items-center py-10 font-bold" style="width: 100%">
        <a class="text-xl" href="/" aria-label="A technical blog">
          <img
            class="inline-block mr-2 spin-img"
            style="width: 36px; height: 31px;"
            alt="logo"
            src="/logo.svg"
          />
          <span v-if="!isIndex" class="hidden md:inline nav-text">A technical blog</span>
        </a>
        <div class="text-base text-gray-500 leading-5">
          <a
            class="hover:text-gray-700 text-xl"
            href="https://github.com/ngctnnnn/ngctnnnn.github.io"
            target="_blank"
            rel="noopener"
            >About us</a
          >
        </div>
      </nav>
    </div>
    <main class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <Home v-if="isIndex" />
      <Article v-else />
    </main>
  </div>
  
</template>

<script setup>
import { computed } from 'vue'
import posts from '../metadata.json'
import { useRoute } from 'vitepress'
import Home from './Home.vue'
import Article from './Article.vue'

const route = useRoute()
const isIndex = computed(() => route.path.replace(/index.html$/, '') === '/')
</script>

<style>

</style>