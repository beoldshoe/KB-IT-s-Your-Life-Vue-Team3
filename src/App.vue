<template>
  <div class="container">
    <Header />
    <router-view />
    <Loading v-if="isLoading" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
</script>
