<template>
  <button class="add-button" @click="handleClick">
    <span class="icon">+</span>
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.add-button:hover {
  background-color: #0056b3;
  transform: scale(1.1);
}

.icon {
  font-weight: bold;
}
</style>
