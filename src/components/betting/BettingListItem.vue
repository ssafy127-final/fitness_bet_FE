<template>
  <div class="container" :class="{ 'finished-container': props.finished }">
    <div class="content">
      <p
        class="checkJoin info"
        v-if="props.betting.history != null && props.betting.history.player == userStore.loginUser.id"
      >
        참여완료
      </p>
      <div class="finished info">
        <p v-if="props.betting.result == 2">배팅마감</p>
      </div>
      <h3>
        <p>
          <span class="point">{{ props.betting.challengeUser.name }}</span
          >님이 <span class="point">{{ props.betting.mission.content }}</span
          >을(를) <span class="point">{{ props.betting.missionCnt }}</span
          >회(초 안에) 할 수 있다? 없다?
        </p>
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
import { useUserStore } from "@/stores/user";
import { onBeforeMount, onMounted } from "vue";
import { useBettingStore } from "@/stores/betting";
const userStore = useUserStore();
const bettingStore = useBettingStore();
const props = defineProps({
  betting: Object,
  finished: Boolean,
});
onBeforeMount(() => {
  console.log(props.betting.history);
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
.info {
  position: absolute;
  font-size: 13px;
  color: #868585;
  left: 0;
}
.checkJoin {
  top: 0;
}
.finished {
  bottom: 0rem;
  color: red;
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
