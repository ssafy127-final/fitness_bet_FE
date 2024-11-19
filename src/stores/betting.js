import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useBettingStore = defineStore("betting", () => {
  const REST_API_URL = `http://localhost:1219/betting`;
  const bettingList = ref([]);
  const betting = ref({});
  const reviewList = ref([]);

  const getList = (userId) => {
    axios
      .get(REST_API_URL, { params: { userId } })
      .then((res) => (bettingList.value = res.data))
      .catch((err) => console.log(err));
  };

  const getBettingDetail = (id) => {
    betting.value = bettingList.value.find((item) => item.id == id);
  };

  const registBet = (betting, userId) => {
    axios
      .post(`${REST_API_URL}/create`, betting)
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        getList(userId);
        router.push({ path: "/betting" });
      })
      .catch((err) => console.log(err));
  };
  const getReviewList = (bettingId, userId) => {
    axios
      .get(`${REST_API_URL}/${bettingId}`, { params: { userId } })
      .then((res) => (reviewList.value = res.data))
      .catch((err) => console.log(err));
  };

  const finishedList = ref([]);
  const getFinishedList = () => {};
  const getFinishedDetail = (id) => {
    betting.value = finishedList.value.find((item) => item.id == id);
  };
  const bettingJoinList = ref([]);
  const getJoinList = () => {};

  const bettingChallengeList = ref([]);
  const getChallengeList = () => {};

  return {
    REST_API_URL,
    bettingList,
    getList,
    betting,
    getBettingDetail,
    reviewList,
    getReviewList,
    finishedList,
    getFinishedList,
    getFinishedDetail,
    bettingJoinList,
    getJoinList,
    bettingChallengeList,
    getChallengeList,
    registBet,
  };
});
