import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useBettingStore = defineStore("betting", () => {
  const REST_API_URL = `http://localhost:1219/betting`;
  const bettingList = ref([]);
  const betting = ref({
    challengeUser: { name: null },
    mission: { content: null },
    missionCnt: 0,
    failCnt: 0,
    successCnt: 0,
    history: null,
    result: 0,
  });
  const reviewList = ref([{ id: null, writer: null, content: null }]);

  const getList = (userId) => {
    axios
      .get(REST_API_URL, { params: { userId } })
      .then((res) => (bettingList.value = res.data))
      .catch((err) => console.log(err));
  };

  const getBettingDetail = (id) => {
    betting.value = bettingList.value.find((item) => item.id == id);
  };
  const getDetailFromBack = (bettingId) => {
    axios
      .get(`${REST_API_URL}/detail/${bettingId}`)
      .then((res) => (betting.value = res.data))
      .catch((err) => console.log(err));
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
    console.log(userId);
    axios
      .get(`${REST_API_URL}/${bettingId}`, { params: { userId } })
      .then((res) => (reviewList.value = res.data))
      .then(() => console.log(reviewList.value))
      .catch((err) => console.log(err));
  };

  const finishedList = ref([]);
  const getFinishedList = (userId) => {
    axios
      .get(REST_API_URL, { params: { userId, status: "finish" } })
      .then((res) => {
        console.log(res.data);
        finishedList.value = res.data;
        console.log(finishedList.value);
      })
      .catch((err) => console.log(err));
  };
  const getFinishedDetail = (id) => {
    betting.value = finishedList.value.find((item) => item.id == id);
  };
  const bettingJoinList = ref([]);
  const getJoinList = (id) => {
    axios
      .get(`${REST_API_URL}/history/join`, { params: { id } })
      .then((res) => {
        bettingJoinList.value = res.data;
      })
      .catch((err) => console.log(err));
  };

  const bettingChallengeList = ref([]);
  const getChallengeList = (id) => {
    axios
      .get(`${REST_API_URL}/history/challenger`, { params: { id } })
      .then((res) => (bettingChallengeList.value = res.data))
      .catch((err) => console.log(err));
  };
  watch(
    () => sessionStorage.getItem("userId"),
    (newId) => {
      if (!newId) {
        bettingList.value = [];
        bettingChallengeList.value = [];
        finishedList.value = [];
        betting.value = {
          challengeUser: { name: null },
          mission: { content: null },
          missionCnt: 0,
          failCnt: 0,
          successCnt: 0,
          history: null,
          result: 0,
        };
        reviewList.value = [{ id: null, writer: null, content: null }];
        bettingJoinList.value = [];
      }
    }
  );

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
    getDetailFromBack,
  };
});
