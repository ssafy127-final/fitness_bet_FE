import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const REST_API_URL = `http://localhost:1219/betting`;
// const userCampus = sessionStorage.getItem("campus");
const userCampus = "서울";
// const userClassNum = sessionStorage.getItem("classNum");
const userClassNum = 7;
// const userId = sessionStorage.getItem("userId");
const userId = "1241530";

let id = 0;
export const useBettingStore = defineStore("betting", () => {
  //   const bettingList = ref([]);
  const bettingList = ref([
    {
      id: id++,
      challengeUser: { name: "김땡땡" },
      mission: { content: "플랭크" },
      missionCnt: 5,
      successCnt: 3,
      failCnt: 7,
      successPoint: 300,
      failPoint: 400,
      result: 1,
      history: { id: 2, choice: 1 },
    },
    {
      id: id++,
      challengeUser: { name: "이땡땡" },
      mission: { content: "팔굽혀펴기" },
      missionCnt: 7,
      successCnt: 8,
      failCnt: 3,
      successPoint: 440,
      failPoint: 200,
      result: 2,
      history: null,
    },
  ]);
  const betting = ref({});
  const reviewList = ref([]);
  const getList = () => {
    //   axios
    //     .get(REST_API_URL, { params: { userId } })
    //     .then((res) => (bettingList.value = res.data))
    //     .catch((err) => console.log(err));
  };
  const getBettingDetail = (id) => {
    betting.value = bettingList.value.find((item) => item.id == id);
  };
  const getReviewList = (bettingId) => {
    reviewList.value = [
      {
        id: 0,
        writerName: "최혁규",
        content: "대박박 이거 못하면 집에 가라",
      },
      {
        id: 1,
        writerName: "배장한",
        content: "성공 못하면 내 포인트 돌려내",
      },
      {
        id: 2,
        writerName: "손진호",
        content: "ㅋㅋㅋㅋㅋㅋㅋㅋ이거 가능?",
      },
    ];
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
  };
});
