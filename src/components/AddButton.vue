<template>
  <button class="add-button" @click="openModal">
    <img src="@/assets/add-button.png" alt="Add" class="add-icon" />
  </button>
  <AddModal
    v-if="showModal"
    :mode="1"
    :itemData="item"
    @close="showModal = false"
  />
</template>

<script setup>
import { ref } from 'vue';
import AddModal from './AddModal.vue';
const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};
</script>

<style scoped>
.add-button {
  position: fixed;
  bottom: 40px;
  right: 40px;
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
  transition: 0.3s;
  transform: scale(1.4);
}
</style>
