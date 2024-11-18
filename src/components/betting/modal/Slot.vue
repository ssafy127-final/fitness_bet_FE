<template>
  <div class="slot-machine">
    <div class="slot-container" :style="{ width: props.size }">
      <div class="slot" :style="slotStyle">
        <div class="slot-item" v-for="(word, index) in props.text" :key="index">
          {{ word }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUpdated } from "vue";

const props = defineProps({
  text: Array,
  size: String,
  modalOn: Boolean,
});
const currentIndex = ref(0); // 현재 보여질 단어의 인덱스

// 애니메이션 효과 스타일
const slotStyle = computed(() => {
  return {
    transform: `translateY(-${currentIndex.value * 50}px)`, // 한 단어 높이만큼 이동
    transition: "transform 0.5s ease-out", // 부드럽게 이동
  };
});

// 슬롯머신 작동 로직
const startSlotMachine = () => {
  let interval = setInterval(() => {
    if (currentIndex.value < props.text.length - 1) {
      currentIndex.value++; // 다음 단어로 이동
    } else {
      clearInterval(interval); // 마지막 단어에서 멈춤
    }
  }, 100); // 단어 이동 간격 0.5초
};

// 컴포넌트 로드 시 슬롯머신 자동 실행
onMounted(() => {
  if (props.modalOn) {
    startSlotMachine();
  }
});
onUpdated(() => {
  startSlotMachine();
});
</script>

<style scoped>
.slot-machine {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}

.slot-container {
  height: 50px; /* 한 단어 높이 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  border: 2px solid #82d4d9;
  border-radius: 5px;
  position: relative;
}

.slot {
  display: flex;
  flex-direction: column;
}

.slot-item {
  height: 50px; /* 한 단어 높이 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
</style>
