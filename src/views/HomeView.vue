<template>
  <div class="container">
    <div class="welcome">
      <h4>
        <span class="point">{{ userStore.loginUser.name }}</span
        >님,
      </h4>
      <h4 style="margin-top: 0.4rem">환영합니다.</h4>
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
      <div class="info-data">
        <h3>내 포인트 : {{ userStore.loginUser.currentPoint }} POINT</h3>
        <p>내 승률 : {{ loginUserWinRateInfo.winRate }}</p>
        <p>
          전적 : {{ loginUserWinRateInfo.totalGames }} 전 {{ loginUserWinRateInfo.winGames }} 승
          {{ loginUserWinRateInfo.totalGames - loginUserWinRateInfo.winGames }} 패
        </p>
      </div>
      <div v-if="myRank" class="myRank">현재 내 순위 : {{ myRank }} 위</div>
      <div v-else class="myRank">배팅에 참여하고 상위 랭커가 되어보세요!</div>
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
            <p>
              {{ (betting.successCnt ? betting.successCnt : 0) + (betting.failCnt ? betting.failCnt : 0) }} 명 참여중
            </p>
            <p>상세보기 -></p>
          </div>
        </li>
        <li v-if="bettingStore.bettingList.length == 0" style="text-align: center; margin-top: 1rem">
          진행중인 배팅이 없습니다.
        </li>
      </ul>
    </div>
    <div class="ranking-box">
      <div class="ranking-header">
        <h3>우리반 Top 5</h3>
      </div>
      <table width="100%">
        <thead>
          <tr>
            <th>순위</th>
            <th>이름</th>
            <th>승률</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in top5Users" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.winRate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { useBettingStore } from "@/stores/betting";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import moment from "moment";
import { onMounted, watch, ref } from "vue";

const userStore = useUserStore();
const bettingStore = useBettingStore();
onMounted(async () => {
  try {
    bettingStore.getList(userStore.loginUser.id);
    userStore.restoreLogin();
    console.log("랭킹리스트불러온다");
    await userStore.getRankingList(userStore.loginUser.id);
    console.log(userStore.sortedRankingList);
    await getWinRate(userStore.loginUser.id);
    getTop5ByWinRate();
  } catch (error) {
    console.error("에러 발생:", error);
  }
});

const loginUserWinRateInfo = ref({
  totalGames: "",
  winGames: "",
  winRate: "",
});

const getWinRate = async function (loginUserId) {
  try {
    if (!userStore.sortedRankingList || userStore.sortedRankingList.length === 0) {
      console.log("랭킹 리스트를 가져오는 중...");
      await userStore.getRankingList(userStore.loginUser.id); // 비동기 함수 대기
    }

    // 로그인한 유저 정보를 검색
    const userInfo = userStore.sortedRankingList.find((user) => user.id === loginUserId);
    if (userInfo) {
      // loginUserWinRateInfo에 유저 정보 저장
      loginUserWinRateInfo.value = {
        totalGames: userInfo.totalGames,
        winGames: userInfo.winGames,
        winRate: userInfo.winRate,
      };
      console.log("로그인한 유저의 승률 정보:", loginUserWinRateInfo.value);
    } else {
      console.log("로그인한 유저 정보를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("승률 정보를 가져오는 중 에러 발생:", error);
  }
};

// TOP 5명을 저장 객체
const top5Users = ref([]);
const myRank = ref(null);

const getTop5ByWinRate = function () {
  if (!userStore.sortedRankingList || userStore.sortedRankingList.length === 0) {
    console.log("랭킹 리스트가 비어 있습니다.");
    top5Users.value = []; // 빈 배열로 초기화
    return;
  }

  // totalGames가 0이 아닌 유저만 필터링
  const filteredList = userStore.sortedRankingList.filter((user) => user.totalGames > 0);

  if (filteredList.length === 0) {
    console.log("조건에 맞는 유저가 없습니다.");
    top5Users.value = []; // 빈 배열로 초기화
    return;
  }
  console.log(filteredList);
  const rank = filteredList.findIndex((item) => item.id === userStore.loginUser.id);
  myRank.value = rank ? rank + 1 : null;

  // 상위 5명 추출
  top5Users.value = filteredList.slice(0, 5);
  console.log("TOP5 승률 랭킹 리스트 : ", top5Users.value);
};

watch(() => userStore.loginUser);
const REST_API_URL = "http://localhost:1219/user";

const dailyCheck = () => {
  userStore.restoreLogin();
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
  right: 1.7rem;
  bottom: 1.7rem;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.1rem;
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
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info-data {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.3rem;
}
.info-data h3 {
  font-size: 1.5rem;
}
.myRank {
  background-color: #f9e1ce;
  font-size: 1.3rem;
  padding: 1.5rem;
  color: #535353;
  font-weight: bold;
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

.ranking-box {
  border: 3px solid #82d4d9;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.ranking-header {
  margin-bottom: 1.5rem;
}

th {
  position: sticky;
  top: 0;
  background-color: white;
}

table {
  border-collapse: collapse;
  text-align: center;
  flex-grow: 1; /* table을 컨테이너 높이에 맞춤 */
  width: 100%;
  height: 100%; /* 테이블을 박스 크기에 맞춤 */
}

tr,
td,
th {
  border-bottom: 1.5px solid #7b7a7a;
  padding: 0.5rem 0;
}

tr:last-child,
tr:last-child td {
  border-bottom: none;
}

th,
td {
  padding: 0.5rem 0;
}

tr {
  padding: 1rem 0;
}
</style>
