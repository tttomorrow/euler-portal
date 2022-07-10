<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <AppHeader />
  <main><Content /></main>
  <AppFooter />
</template>

<style lang="scss" scoped>
main {
  margin-top: 80px;
  @media (max-width: 1100px) {
    margin-top: 48px;
  }
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
