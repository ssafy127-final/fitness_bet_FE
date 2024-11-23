<template>
  <div class="containerBox">
    <header>
      <h3>상품 교환 신청 내역</h3>
      <div class="date-filter">
        <input type="date" v-model="date.from" /> ~
        <input type="date" v-model="date.to" />
        <button @click="search">검색</button>
      </div>
    </header>
    <div class="table-container">
      <table width="100%">
        <thead>
          <tr>
            <th width="10%">신청일</th>
            <th width="20%">신청자 정보</th>
            <th width="15%">신청자명</th>
            <th width="25%">품목</th>
            <th width="15%">핸드폰 번호</th>
            <th width="15%">사용 포인트</th>
          </tr>
        </thead>
        <tbody v-if="exchangeList.length != 0">
          <tr v-for="history in exchangeList" :key="history.id">
            <td>{{ history.recordDate }}</td>
            <td>{{ history.userInfo.campus }} {{ history.userInfo.classNum }}반</td>
            <td>{{ history.userInfo.name }}</td>
            <td>{{ history.productName }}</td>
            <td>{{ history.userInfo.phone }}</td>
            <td>{{ -history.point }} Point</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr class="no-data">
            <td colspan="6">데이터가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
const date = ref({
  from: null,
  to: null,
});

const exchangeList = ref([]);
const REST_API_URL = `http://localhost:1219/product`;
const getExchangeList = () => {
  axios
    .get(`${REST_API_URL}/exchange/history`)
    .then((res) => {
      exchangeList.value = res.data;
    })
    .catch((err) => console.log(err));
};

const search = () => {
  axios
    .get(`${REST_API_URL}/exchange/history`, { params: { from: date.value.from, to: date.value.to } })
    .then((res) => {
      exchangeList.value = res.data;
    })
    .catch((err) => console.log(err));
};

onMounted(() => {
  getExchangeList();
});

watch(() => getExchangeList.value);
watch(
  () => date.value,
  (newVal) => {
    if (newVal.from && newVal.to && newVal.from > newVal.to) {
      alert("시작일은 종료일 이후 날짜로 설정할 수 없습니다.");

      date.value.from = null;
      date.value.to = null;
    }
  },
  { deep: true }
);
</script>

<style scoped>
.containerBox {
  background-color: white;
  border: 2px solid #82d4d9;
  height: calc(100vh - 130px - 2rem);
  margin: 1rem;
  border-radius: 10px;
  padding: 2rem;
}
.table-container {
  overflow-y: auto;
  max-height: calc(100vh - 130px - 9rem);
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
.date-filter {
  display: flex;
  flex-direction: row;
  font-size: 14px;
  gap: 0.8rem;
}

.date-filter input {
  cursor: pointer;
}
table {
  border-collapse: collapse;
  text-align: center;
}
tr,
td,
th {
  border-bottom: 1.5px solid #7b7a7a;
  padding: 0.5rem 0;
}
th {
  position: sticky;
  top: 0;
  background-color: white;
}
td {
  padding: 1rem 0;
}
.no-data {
  text-align: center;
}
.label {
  border: #7b7a7a;
  padding: 5px 8px;
  border-radius: 20px;
  font-size: 0.8rem;
}
.daily {
  background-color: #c7ed98;
}
.betting {
  background-color: #ed98e6;
}
.product {
  background-color: #98d2ed;
}
.desc {
  text-align: left;
  padding-left: 10px;
}
</style>
