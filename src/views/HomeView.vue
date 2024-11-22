<template>
  <div class="container">
    <div class="welcome">
      <h4>
        <span class="point">{{ userStore.loginUser.name }}</span
        >님, <br />환영합니다.
      </h4>
      <div
        v-if="userStore.loginUser.visited < moment().format('YYYY-MM-DD') || !userStore.loginUser.visited"
        class="notIn"
        @click="dailyCheck"
      >
        <p>출석</p>
        <p>하기</p>
      </div>
      <div v-else class="alreadyIn">
        <p>출석</p>
        <p>완료</p>
      </div>
    </div>
    <div class="info">
      <h3>내 포인트 : {{ userStore.loginUser.currentPoint }} POINT</h3>
      <p>당신은 현재 '00승 00패' 입니다.</p>
      <p>내 승률 : 00 %</p>
    </div>
    <div class="betting">
      <div class="title">
        <p>진행중인 우리반 배팅</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Filled"
          viewBox="0 0 24 24"
          width="30"
          height="30"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.dev/svgjs"
          @click="router.push({ path: '/betting' })"
        >
          <g width="100%" height="100%" transform="matrix(1,0,0,1,0,0)">
            <path
              d="M17,11H13V7a1,1,0,0,0-2,0v4H7a1,1,0,0,0,0,2h4v4a1,1,0,0,0,2,0V13h4a1,1,0,0,0,0-2Z"
              fill="#8c8a8a"
              fill-opacity="1"
              data-original-color="#000000ff"
              stroke="none"
              stroke-opacity="1"
            />
          </g>
        </svg>
      </div>
      <ul class="betting-list">
        <li
          v-for="betting in bettingStore.bettingList"
          :key="betting.id"
          class="bet-item"
          @click="router.push({ path: `/betting/${betting.id}` })"
        >
          <p>
            {{ betting.challengeUser.name }}님이 {{ betting.mission.content }}를(을) {{ betting.missionCnt }}개(초 안에)
          </p>
          <div class="gotosee">
            <p>{{ betting.successCnt ? betting.successCnt : 0 + betting.failCnt ? betting.failCnt : 0 }} 명 참여중</p>
            <p>상세보기 -></p>
          </div>
        </li>
      </ul>
    </div>
    <div class="ranking">
      <h3>우리반 Top 5</h3>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { useBettingStore } from "@/stores/betting";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import moment from "moment";
import { onMounted, watch } from "vue";

const userStore = useUserStore();
const bettingStore = useBettingStore();
console.log();
onMounted(() => {
  bettingStore.getList(userStore.loginUser.id);
  userStore.restoreLogin();
});
console.log(bettingStore.bettingList);
watch(() => userStore.loginUser);
const REST_API_URL = "http://localhost:1219/user";

const dailyCheck = () => {
  userStore.restoreLogin();
  console.log(typeof userStore.loginUser.id);
  axios
    .post(`${REST_API_URL}/daily`, null, { params: { id: userStore.loginUser.id } })
    .then(() => {
      userStore.restoreLogin();
    })
    .catch((error) => {
      console.error("에러!!! ", error);
    });
};
</script>

<style scoped>
.container {
  width: 70%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 4fr 4fr;
  grid-template-rows: 1fr 2fr;
  gap: 20px;
  padding: 20px 0;
  height: calc(100vh - 130px);
}
.welcome {
  background-color: #d6e4f0;
  padding: 30px;
  position: relative;
}
.welcome h4 {
  font-size: 24px;
  font-weight: 500;
}
.welcome .point {
  font-size: 28px;
  font-weight: 600;
}
.welcome div {
  position: absolute;
  width: 80px;
  height: 70px;
  right: 20px;
  bottom: 20px;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.notIn {
  cursor: pointer;
  background-color: #82d4d9;
}
.alreadyIn {
  background-color: #ccc;
}
.info {
  grid-column: 2/4;
  background-color: #f6ceb6;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.betting {
  grid-column: 1/3;
  background-color: #f2f3f3;
}
.betting-list {
  max-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  overflow-y: auto;
}
.bet-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  border-bottom: 1px solid #d8d8d8;
  cursor: pointer;
}

.gotosee {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 6px;
}
.bet-item :last-child {
  font-size: 14px;
  color: #6a6a6a;
}
.bet-item:hover {
  font-weight: bold;
}
.bet-item:hover p:last-child {
  font-size: 15px;
}
.title {
  border-bottom: 2px solid #bcbbbb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 5px;
}
.title :first-child {
  font-size: 20px;
  font-weight: 600;
}
.title :last-child {
  cursor: pointer;
}

.ranking {
  border: 3px solid #82d4d9;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  padding: 20px 10px;
}
</style>
