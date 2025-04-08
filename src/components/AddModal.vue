<template>
  <!-- 모달 오버레이 -->
  <div class="modal-overlay">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <!-- 모달 제목 -->
        <div class="modal-header">
          <h5 class="modal-title">
            {{ mode === 0 ? '수정 모달' : '추가 모달' }}
          </h5>
        </div>

        <!-- 모달 본문 -->
        <div class="modal-body">
          <!-- 날짜 선택 -->
          <div class="modal-content">
            <label for="date" class="form-label">날짜 선택</label>
            <input
              type="date"
              id="date"
              class="form-control"
              v-model="formData.date"
            />
          </div>

          <!-- 수입/지출 선택 -->
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

          <!-- 금액 입력 -->
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

          <!-- 카테고리 드롭다운 -->
          <div class="modal-content">
            <label for="category" class="form-label">카테고리</label>
            <select
              id="category"
              class="form-control"
              v-model="formData.category"
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.name"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- 메모 입력 -->
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

        <!-- 모달 바닥 버튼 -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            닫기
          </button>

          <!-- 수정 버튼과 추가 버튼을 조건에 맞게 표시 -->
          <div v-if="mode === 0">
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCategory } from '/src/api/transaction.js';

const emit = defineEmits(['close', 'edit', 'delete', 'confirm']);

const formData = ref({
  date: '',
  type: '',
  price: '',
  category: '',
  memo: '',
});

const categories = ref([]); // 카테고리 목록
const mode = ref(1); // 기본 모드는 추가 모드 (1)

const closeModal = () => {
  emit('close');
};

const confirmAction = () => {
  emit('confirm', formData.value);
};

const editItem = () => {
  emit('edit', formData.value);
};

const deleteItem = () => {
  emit('delete', formData.value);
};

// 카테고리 로딩
onMounted(async () => {
  categories.value = await getCategory();
});

// 부모로부터 props로 데이터를 받는 부분
const props = defineProps({
  mode: {
    type: Number,
    default: 1, // 기본값은 추가 모드 (1)
  },
  itemData: {
    type: Object,
    default: () => ({}),
  },
});

// edit 모드일 때 초기화
if (props.mode === 0) {
  formData.value = { ...props.itemData };
  mode.value = 0; // 수정 모드로 설정
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-dialog {
  max-width: 600px; /* 모달 너비 조정 */
  width: 100%;
}

.modal-content {
  background-color: #e7f1fe;
  padding: 20px;
  border-radius: 8px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
