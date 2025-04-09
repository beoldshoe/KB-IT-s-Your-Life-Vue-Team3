<template>
  <div>
    <div class="modal-overlay">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ mode === 0 ? '수정 모달' : '추가 모달' }}
            </h5>
          </div>

          <div class="modal-body">
            <div class="modal-content">
              <label for="date" class="form-label">날짜 선택</label>
              <input
                type="date"
                id="date"
                class="form-control"
                v-model="formData.date"
              />
            </div>

            <div class="modal-content">
              <label class="form-label">수입/지출</label>
              <div>
                <input
                  type="radio"
                  id="income"
                  value="수입"
                  v-model="formData.type"
                  class="form-check-input"
                />
                <label for="income" class="form-check-label">수입</label>
                <input
                  type="radio"
                  id="expense"
                  value="지출"
                  v-model="formData.type"
                  class="form-check-input"
                />
                <label for="expense" class="form-check-label">지출</label>
              </div>
            </div>

            <div class="modal-content">
              <label for="price" class="form-label">금액</label>
              <input
                type="number"
                id="price"
                class="form-control"
                v-model="formData.price"
                placeholder="금액을 입력하세요"
              />
            </div>
            <div class="modal-content">
              <label for="category" class="form-label">카테고리</label>
              <select
                id="category"
                class="form-control"
                v-model="formData.category"
              >
                <option value="" disabled selected>선택</option>
                <option
                  v-for="category in store.categories"
                  :key="category.id"
                  :value="category.name"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div class="modal-content">
              <label for="memo" class="form-label">메모</label>
              <textarea
                id="memo"
                class="form-control"
                v-model="formData.memo"
                placeholder="메모를 입력하세요"
              ></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              닫기
            </button>

            <div v-if="mode === 0" class="action-buttons">
              <button type="button" class="btn btn-primary" @click="editItem">
                수정
              </button>
              <button type="button" class="btn btn-danger" @click="deleteItem">
                삭제
              </button>
            </div>
            <div v-else>
              <button
                type="button"
                class="btn btn-success"
                @click="confirmAction"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useFinancialStore } from '../stores/financial.js';

const store = useFinancialStore();
const emit = defineEmits(['close']);
const formData = ref({
  userId: null,
  date: '',
  type: '',
  price: '',
  category: '',
  memo: '',
});

const mode = ref(1);

const closeModal = () => {
  emit('close');
};

const confirmAction = async () => {
  await store.postTrans(
    formData.value.userId,
    formData.value.date,
    formData.value.type,
    formData.value.category,
    formData.value.price,
    formData.value.memo
  );
  closeModal();
};

const editItem = async () => {
  await store.editTrans(
    props.itemData.id,
    formData.value.userId,
    formData.value.date,
    formData.value.type,
    formData.value.category,
    formData.value.price,
    formData.value.memo
  );
  closeModal();
};

const deleteItem = async () => {
  await store.removeTrans(formData.value.id);
  closeModal();
};

onMounted(async () => {
  await store.fetchCategories('target', '');

  if (!formData.value.userId) {
    formData.value.userId = store.currentUser?.id;
  }
});

const props = defineProps({
  mode: {
    type: Number,
    default: 1,
  },
  itemData: {
    type: Object,
    default: () => ({}),
  },
});

if (props.mode === 0) {
  formData.value = { ...props.itemData };

  if (!formData.value.userId) {
    formData.value.userId = store.currentUser?.id;
  }

  mode.value = 0;
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-dialog {
  background-color: #e7f1fe;
  max-width: 600px;
  width: 100%;
}

.modal-content {
  padding: 20px;
  border-radius: 8px;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-buttons {
  display: flex;
  gap: 10px;
}
</style>
