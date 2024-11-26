<template>
  <div>
    <header>
      <h3 :class="{ dark: store.darkMode }">종료된 배팅</h3>
    </header>
    <div class="content">
      <BettingListItem v-for="item in store.finishedList" :key="item.id" :betting="item" finished="true" />
      <div
        v-if="store.finishedList.length == 0"
        style="text-align: center; margin-top: 2.5rem"
        :class="{ dark: store.darkMode }"
      >
        종료된 배팅이 없습니다.
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import BettingListItem from "./BettingListItem.vue";
import { useBettingStore } from "@/stores/betting";
import { useUserStore } from "@/stores/user";

const store = useBettingStore();
const userStore = useUserStore();

onMounted(() => {
  store.getFinishedList(userStore.loginUser.id);
});
</script>

<style scoped>
h3 {
  margin: 30px 0 20px;
  font-size: 24px;
}
.createBtn {
  background-color: #82d4d9;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
}
.headerL {
  display: flex;
  gap: 10px;
}
.headerR {
  display: flex;
  flex-direction: row;
  font-size: 14px;
}
.headerR input {
  margin: 0 3px 0 20px;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: calc(100vh - 220px);
  overflow-y: auto;
}
.dark {
  color: white;
}
</style>
