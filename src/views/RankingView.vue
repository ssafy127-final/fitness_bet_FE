<template>
  <div class="container">
    <div class="containerBox">
      <div class="header">
        <div class="headerL">
          <h2>우리반 랭킹</h2>
        </div>
        <div class="headerR">
          <div class="checkbox-group">
            <input type="checkbox" id="winRate" />
            <label for="winRate">승률</label>
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="currentPoints" />
            <label for="currentPoints">현재 포인트</label>
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="totalPoints" />
            <label for="totalPoints">누적 포인트</label>
          </div>
        </div>
      </div>

      <div class="ranking-content">
        <table width="100%">
          <thead>
            <tr>
              <th width="10%">순위</th>
              <th width="15%">이름</th>
              <th width="20%">승률</th>
              <th width="20%">현재 포인트</th>
              <th width="20%">누적 포인트</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(user, index) in rankingList" :key="user.id">
              <td>{{ index + 1 }}</td>
              <td>{{ user.name }}</td>
              <td>
                <div>
                  {{ calculateWinRate(user) }}
                </div>
                <div class="detail-win-record">
                  {{ user.totalGames }} 전 {{ user.winGames }} 승 {{ user.totalGames - user.winGames }} 패
                </div>
              </td>
              <td>{{ user.currentPoint }}</td>
              <td>{{ user.totalPoint }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const REST_API_URL = `http://localhost:1219/user`;

const selected = ref("total");
const rankingList = ref([]);
const filterRankingList = ref([]);
const loginUserId = sessionStorage.getItem("userId");

const getRankingList = function (userId) {
  axios
    .get(`${REST_API_URL}/ranking`, { params: { userId } })
    .then((response) => {
      rankingList.value = response.data;
      console.log(response.data);
    })
    .catch((error) => {
      console.error("에러 ::", error);
    });
};

onMounted(() => {
  getRankingList(loginUserId); // 전체 리스트
});

const calculateWinRate = (user) => {
  if (user.totalGames === 0) return "0%";
  return ((user.winGames / user.totalGames) * 100).toFixed(2) + "%";
};

const select = (id) => {
  selected.value = id;
  if (id === "winRate") {
    filterBettingList.value = list; // 승률 순
  } else if (id === "currentPoints") {
    filterBettingList.value = list.filter((item) => !item.history || item.history === null); // 참여 가능 보기
  } else if (id === "totalPoints") {
    filterBettingList.value = list.filter(
      (item) => item.history != null && item.history.player != userStore.loginUser.id
    ); // 참여한 리스트 보기
  }
};
</script>

<style scoped>
.container {
  padding: 1rem;
}

.containerBox {
  background-color: white;
  border: 2px solid #82d4d9;
  height: calc(100vh - 130px - 2rem);
  margin: 0 auto;
  border-radius: 10px;
  padding: 2rem;
  overflow: auto;
  width: 70%;
}

.header {
  display: flex;
  justify-content: space-between;
}

.headerR {
  display: flex;
  align-items: center;
}

.headerR input[type="checkbox"] {
  margin-right: 4px;
}

.headerR .checkbox-group {
  display: inline-block; /* 라인 내 디스플레이로 설정하여 자연스러운 흐름 유지 */
  margin-right: 20px; /* 각 체크박스 그룹 사이의 오른쪽 마진 */
}

.headerR .checkbox-group:last-child {
  margin-right: 0; /* 마지막 체크박스 그룹의 마진 제거 */
}

h3 {
  font-size: 24px;
}
header {
  margin: 0.5rem 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: end;
}

table {
  border-collapse: collapse;
  text-align: center;
}
.ranking-content {
  overflow-y: auto;
  max-height: calc(100vh - 130px - 8rem);
}
th {
  position: sticky;
  top: 0;
  background-color: white;
}
tr,
td,
th {
  border-bottom: 1.5px solid #7b7a7a;
  padding: 0.5rem 0;
}
.no-data {
  text-align: center;
}

.detail-win-record {
  font-size: 0.8rem;
}
</style>
