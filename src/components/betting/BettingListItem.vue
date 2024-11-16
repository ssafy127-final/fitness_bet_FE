<template>
  <div class="container">
    <div class="content">
      <p class="checkJoin" v-if="props.betting.history">참여완료</p>
      <h3>
        <span class="point">{{ props.betting.user.name }}</span
        >님이 <span class="point">{{ props.betting.mission.content }}</span
        >을(를) <span class="point">{{ props.betting.missionCnt }}</span
        >회(초 안에) 할 수 있다? 없다?
      </h3>
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
    </div>
    <button class="detail" @click="router.push({ name: 'bettingDetail', params: { id: props.betting.id } })">
      상세보기
    </button>
  </div>
</template>

<script setup>
import router from "@/router";
import { computed, ref } from "vue";

const props = defineProps({
  betting: Object,
});
const total = computed(() => props.betting.successCnt + props.betting.failCnt);
const successPercentage = computed(() => (total.value > 0 ? (props.betting.successCnt / total.value) * 100 : 0));
const failPercentage = computed(() => (total.value > 0 ? (props.betting.failCnt / total.value) * 100 : 0));
const select = ref(0);
if (props.betting.history) {
  select.value = props.betting.history.choice == 1 ? 1 : -1;
}
</script>

<style scoped>
.container {
  border: 2px solid #82d4d9;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 60px;
}
.content {
  text-align: center;
  position: relative;
  padding: 5px;
}
.checkJoin {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 13px;
  color: #868585;
}
.detail {
  border-radius: 5px;
  padding: 20px 0;
  background-color: #82d4d9;
  color: white;
  border: none;
}
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
