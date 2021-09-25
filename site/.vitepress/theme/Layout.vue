<script setup>
import { computed } from 'vue'
import posts from '../metadata.json'
import { useRoute } from 'vitepress'
import Home from './Pages/Home.vue'
import Article from './components/Article.vue'

const route = useRoute()
const isIndex = computed(() => route.path.replace(/index.html$/, '') === '/')
</script>

<template>
  <div class="antialiased">
    <div class="flex bg-white">
      <nav class="z-50 fixed w-full flex justify-center py-3 font-bold bg-white border border-fuchsia-600">
        <div class="w-full flex justify-between px-4 sm:px-6 xl:max-w-5xl xl:px-0">
          <a class="text-xl" href="/" aria-label="A technical blog">
          <img
            class="inline-block mr-2 spin-img"
            style="width: 36px; height: 31px;"
            alt="logo"
            src="/logo.svg"
          />
          <span v-if="!isIndex" class="hidden md:inline nav-text">A technical blog</span>
          </a>
          <div class="text-base text-gray-500 leading-5 space-x-6">
            <a
              class="hover:text-gray-700 text-xl"
              href="https://github.com/ngctnnnn/ngctnnnn.github.io"
              target="_blank"
              rel="noopener"
              >About us</a
            >
          </div>
        </div>
      </nav>
    </div>

    <main class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 mt-14">
      <Home v-if="isIndex" />
      <Article v-else />
    </main>
  </div>
  
</template>

<style>

</style>