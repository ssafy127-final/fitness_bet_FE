<template>
  <div class="centered-progress-bar">
    <!-- 성공 퍼센트 바 -->
    <div class="progress-success" :style="{ width: successPercentage / 2 + '%' }"></div>
    <!-- 실패 퍼센트 바 -->
    <div class="progress-fail" :style="{ width: failPercentage / 2 + '%' }"></div>
    <div class="labels">
      <span class="label-left" :style="{ color: select == 1 ? '#000' : '#868585' }"
        >가능<br />
        {{ successPercentage.toFixed(0) }}%</span
      >
      <span class="label-right" :style="{ color: select == -1 ? '#000' : '#868585' }"
        >불가능<br />{{ failPercentage.toFixed(0) }}%</span
      >
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
const props = defineProps({
  failCnt: Number,
  successCnt: Number,
  history: Object,
});
const total = computed(() => props.successCnt + props.failCnt);
const successPercentage = computed(() => (total.value > 0 ? (props.successCnt / total.value) * 100 : 0));
const failPercentage = computed(() => (total.value > 0 ? (props.failCnt / total.value) * 100 : 0));
const select = ref(0);
if (props.history) {
  select.value = props.history.choice == 1 ? 1 : -1;
}
</script>

<style scoped>
.centered-progress-bar {
  position: relative;
  width: 80%;
  margin: 10px auto 0;
  height: 20px;
  background-color: white;
  border-radius: 10px;
  /* overflow: hidden; */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #dfdfdf;
}

.progress-success {
  position: absolute;
  height: 100%;
  background-color: #99a7ff; /* 파란색 */
  right: 50%;
  border-radius: 10px 0 0 10px;
  transition: width 0.3s ease;
}

.progress-fail {
  position: absolute;
  height: 100%;
  background-color: #fd9ed3; /* 분홍색 */
  left: 50%;
  border-radius: 0 10px 10px 0;
  transition: width 0.3s ease;
}

/* 라벨 스타일 */
.labels {
  display: flex;
  font-size: 13px;
  color: #868585;
}

.label-left {
  position: absolute;
  top: -7px;
  left: -40px;
}

.label-right {
  position: absolute;
  top: -7px;
  right: -50px;
}
</style>
