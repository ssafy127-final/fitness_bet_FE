<template>
  <div class="containerBox">
    <header>
      <h3>상품 교환 신청 내역</h3>
    </header>
    <div class="table-container">
      <table width="100%">
        <thead>
          <tr>
            <th width="20%">신청일</th>
            <th width="25%">신청자 정보</th>
            <th width="15%">신청자명</th>
            <th width="25%">품목</th>
            <th width="15%">사용 포인트</th>
          </tr>
        </thead>
        <tbody v-if="exchangeList.length != 0">
          <tr v-for="history in exchangeList" :key="history.id">
            <td>{{ history.recordDate }}</td>
            <td>{{ history.userCampus }} {{ history.userClass }}반</td>
            <td>{{ history.userName }}</td>
            <td>{{ history.productName }}</td>
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

onMounted(() => {
  getExchangeList();
});

watch(() => getExchangeList.value);
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
.headerR {
  display: flex;
  flex-direction: row;
  font-size: 14px;
}
.headerR input {
  margin: 0 3px 0 20px;
  cursor: pointer;
}
.headerR label {
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
