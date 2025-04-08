<template>
  <h2>MonthView</h2>
  <p>요청 경로 : {{ currentRoute.fullPath }}</p>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  name: 'MonthView',
  setup() {
    const currentRoute = useRoute();
    return { currentRoute };
  },
};
</script>
