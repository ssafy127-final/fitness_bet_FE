<template>
  <div class="container" :class="{ 'finished-container': props.finished }">
    <div class="content">
      <p class="checkJoin" v-if="props.betting.history">참여완료</p>
      <h3>
        <span class="point">{{ props.betting.challengeUser.name }}</span
        >님이 <span class="point">{{ props.betting.mission.content }}</span
        >을(를) <span class="point">{{ props.betting.missionCnt }}</span
        >회(초 안에) 할 수 있다? 없다?
      </h3>
      <BettingProgressBar
        :failCnt="props.betting.failCnt"
        :successCnt="props.betting.successCnt"
        :history="props.betting.history"
      />
    </div>
    <button
      class="detail"
      :class="{ 'finished-detail': props.finished }"
      @click="
        router.push({ path: !props.finished ? `/betting/${props.betting.id}` : `/betting/finish/${props.betting.id}` })
      "
    >
      상세보기
    </button>
  </div>
</template>

<script setup>
import router from "@/router";
import BettingProgressBar from "./BettingProgressBar.vue";

const props = defineProps({
  betting: Object,
  finished: Boolean,
});
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
.finished-container {
  border: 2px solid #d8d8d8;
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
.finished-detail {
  background-color: #97c1c3;
}
</style>
