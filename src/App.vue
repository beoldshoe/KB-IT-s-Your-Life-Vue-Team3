<template>
  <div class="container">
    <BackImage />
    <router-view />
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import BackImage from './components/BackImage.vue';

export default {
  name: 'App',
  components: {
    BackImage,
  },
  setup() {
    const currentRoute = useRoute();
    return { currentRoute };
  },
};
</script>
