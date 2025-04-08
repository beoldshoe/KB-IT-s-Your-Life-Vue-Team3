<template>
  <div class="background">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BackImage',
};
</script>

<style scoped>
.background {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-image: url('/images/backImage.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  z-index: -1;
}
</style>
