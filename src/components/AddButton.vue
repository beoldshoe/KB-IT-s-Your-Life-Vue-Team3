<template>
  <button class="add-button" @click="handleClick">
    <img src="@/assets/add-button.png" alt="Add" class="add-icon" />
  </button>
</template>

<script setup>
const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>

<style scoped>
.add-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 1000; 
}

.add-icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.add-button:hover {
  transform: scale(1.1);
}
</style>
